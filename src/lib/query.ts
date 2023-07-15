import gitUrlParse from 'git-url-parse'
import { Octokit } from 'octokit'
import { z } from 'zod'

/**All of the data available for a repo */
export type FlatQuery = {
  author: string
  description: string | null
  forks: number
  stars: number
  name: string
  language: string
  color: string
  url: string
  category: string
}

/**The data we need to query a repo */
type Repo = {
  url: string
  category: 'Life' | 'P&C' | 'Health' | 'Finance' | 'Education' | 'General'
}

/**Get all of the data for a repo */
export async function getReposFlat(repos: Repo[]): Promise<FlatQuery[]> {
  return Promise.all(repos.map(getRepoInfo))
}

// Helper functions

const queryResultSchema = z.object({
  repository: z.object({
    description: z.string().nullable(),
    forks: z.object({
      totalCount: z.number(),
    }),
    stargazers: z.object({
      totalCount: z.number(),
    }),
    primaryLanguage: z.object({
      name: z.string(),
      color: z.string(),
    }),
    name: z.string(),
  }),
  // rateLimit: z.object({
  //   cost: z.number(),
  //   limit: z.number(),
  // }),
})

type QueryResult = z.infer<typeof queryResultSchema>

export function getOwnerRepoFromUrl(url: string) {
  const parsed = gitUrlParse(url)
  return { owner: parsed.owner, repo: parsed.name }
}
async function getRepoInfo(repoConfig: Repo): Promise<FlatQuery> {
  const { owner, repo } = getOwnerRepoFromUrl(repoConfig.url)
  const octokit = new Octokit({
    auth: process.env.GH_TOKEN,
  })
  const repoInfo = queryResultSchema.parse(
    await octokit.graphql(
      `
      query repoInfo($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          stargazers {
            totalCount
          }
          forks {
            totalCount
          }
          name
          url
          description
          primaryLanguage {
            name
            color
    	    }
        }
      }
    `,
      {
        owner: owner,
        repo: repo,
        headers: {
          authorization: process.env.GH_TOKEN,
        },
      }
    )
  )
  return flattenQuery(repoInfo, repoConfig)
}

function flattenQuery(query: QueryResult, repo: Repo): FlatQuery {
  const { owner } = getOwnerRepoFromUrl(repo.url)
  return {
    description: query.repository.description ?? '', // from the query
    forks: query.repository.forks.totalCount,
    stars: query.repository.stargazers.totalCount,
    name: query.repository.name,
    language: query.repository.primaryLanguage.name,
    color: query.repository.primaryLanguage.color,
    url: repo.url, // from the config
    category: repo.category,
    author: owner,
  }
}

export const reposConfig: Repo[] = [
  {
    url: 'https://github.com/JuliaActuary/LifeContingencies.jl',
    category: 'Life',
  },
  {
    url: 'https://github.com/actuarialopensource/actuarialopensource.org',
    category: 'Education',
  },
  { url: 'https://github.com/lrnv/Copulas.jl', category: 'Finance' },
  {
    url: 'https://github.com/JuliaActuary/ActuaryUtilities.jl',
    category: 'Finance',
  },
  {
    url: 'https://github.com/OasisLMF/OasisLMF',
    category: 'P&C',
  },
  {
    url: 'https://github.com/casact/chainladder-python',
    category: 'P&C',
  },
  {
    url: 'https://github.com/fumitoh/lifelib',
    category: 'Life',
  },
  {
    url: 'https://github.com/fumitoh/modelx',
    category: 'General',
  },
  { url: 'https://github.com/mages/ChainLadder', category: 'P&C' },
  { url: 'https://github.com/vigou3/actuar', category: 'General' },
  { url: 'https://github.com/A1arcon/R_Actuarial', category: 'Education' },
  {
    url: 'https://github.com/OpenActTexts/Loss-Data-Analytics',
    category: 'Education',
  },
  {
    url: 'https://github.com/JuliaActuary/MortalityTables.jl',
    category: 'Life',
  },
  {
    url: 'https://github.com/JuliaActuary/MortalityTables.jl',
    category: 'Life',
  },
  { url: 'https://github.com/amvillegas/StMoMo', category: 'Life' },
  { url: 'https://github.com/acturtle/cashflower', category: 'Life' },
  { url: 'https://github.com/actuarialopensource/pymort', category: 'Life' },
  { url: 'https://github.com/mattheaphy/actxps/', category: 'Life' },
  {
    url: 'https://github.com/actuarialopensource/benchmarks',
    category: 'General',
  },
  { url: 'https://github.com/jimbrig/lossrx', category: 'P&C' },
  { url: 'https://github.com/casact/tryangle', category: 'P&C' },
  { url: 'https://github.com/casact/FASLR', category: 'P&C' },
  { url: 'https://github.com/casact/risky-router', category: 'P&C' },
]
