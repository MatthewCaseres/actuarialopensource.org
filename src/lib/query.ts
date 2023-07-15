import gitUrlParse from 'git-url-parse'
import { Octokit } from 'octokit'
import { z } from 'zod'

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
    url: z.string(),
  }),
  // rateLimit: z.object({
  //   cost: z.number(),
  //   limit: z.number(),
  // }),
})

export type QueryResult = z.infer<typeof queryResultSchema>

export function getOwnerRepoFromUrl(url: string) {
  console.log(url)
  const parsed = gitUrlParse(url)
  return { owner: parsed.owner, repo: parsed.name }
}
async function getRepoInfo(url: string): Promise<QueryResult> {
  const { owner, repo } = getOwnerRepoFromUrl(url)
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
        rateLimit {
          limit
          cost
          remaining
          resetAt
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
  return repoInfo
}

export type FlatQuery = {
  description: string | null
  forks: number
  stars: number
  name: string
  language: string
  color: string
  url: string
}

function flattenQuery(query: QueryResult): FlatQuery {
  return {
    description: query.repository.description ?? '',
    forks: query.repository.forks.totalCount,
    stars: query.repository.stargazers.totalCount,
    name: query.repository.name,
    url: query.repository.url,
    language: query.repository.primaryLanguage.name,
    color: query.repository.primaryLanguage.color,
  }
}

export type FlatWithCategory = FlatQuery & {
  category: string
}

async function getReposRaw(urls: string[]) {
  return Promise.all(urls.map(getRepoInfo))
}

export async function getReposFlat(repos: Repo[]): Promise<FlatWithCategory[]> {
  const raw = await getReposRaw(repos.map((x) => x.url))
  const flat = raw.map(flattenQuery)
  return flat.map((x, i) => ({ ...x, category: repos[i].category }))
}

type Repo = {
  url: string
  category: 'Life' | 'P&C' | 'Health' | 'Finance' | 'Education' | 'General'
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
