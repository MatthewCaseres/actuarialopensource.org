import gitUrlParse from 'git-url-parse'

type QueryResult = {
  repository: {
    description: string
    forks: {
      totalCount: number
    }
    stargazers: {
      totalCount: number
    }
    primaryLanguage: {
      name: string
      color: string
    }
    name: string
    url: string
  }
  rateLimit: {
    cost: number
    limit: number
  }
}

export type FlatQuery = {
  description: string
  forks: number
  stars: number
  name: string
  language: string
  color: string
  url: string
  rate: number
  limit: number
}

function flattenQuery(query: QueryResult): FlatQuery {
  return {
    description: query.repository.description,
    forks: query.repository.forks.totalCount,
    stars: query.repository.stargazers.totalCount,
    name: query.repository.name,
    url: query.repository.url,
    rate: query.rateLimit.cost,
    limit: query.rateLimit.limit,
    language: query.repository.primaryLanguage.name,
    color: query.repository.primaryLanguage.color,
  }
}

function getOwnerRepoFromUrl(url: string) {
  const parsed = gitUrlParse(url)
  return { owner: parsed.owner, repo: parsed.name }
}

async function getRepoInfo(url: string) {
  const { owner, repo } = getOwnerRepoFromUrl(url)

  const query = `
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
    }`

  const variables = {
    owner: owner,
    repo: repo,
  }

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.GH_TOKEN}`,
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  })

  if (response.ok) {
    const { data } = await response.json()
    return data as QueryResult
  } else {
    throw new Error('Network response was not ok.')
  }
}

async function getReposRaw(urls: string[]) {
  return Promise.all(urls.map(getRepoInfo))
}

async function getReposFlat(urls: string[]) {
  const raw = await getReposRaw(urls)
  return raw.map(flattenQuery)
}

const repoUrls: string[] = [
  'https://github.com/JuliaActuary/LifeContingencies.jl',
  'https://github.com/lrnv/Copulas.jl',
  'https://github.com/JuliaActuary/ActuaryUtilities.jl',
  'https://github.com/OasisLMF/OasisLMF',
  'https://github.com/actuarialopensource/actuarialopensource.org',
  'https://github.com/JuliaActuary/MortalityTables.jl',
  'https://github.com/casact/chainladder-python',
  'https://github.com/fumitoh/lifelib',
  'https://github.com/fumitoh/modelx',
  'https://github.com/mages/ChainLadder',
  'https://github.com/amvillegas/StMoMo',
  'https://github.com/vigou3/actuar',
]

export async function getRepos() {
  return getReposFlat(repoUrls)
}
