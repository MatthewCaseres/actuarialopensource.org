import { test, expect } from '@playwright/test'
import { getOwnerRepoFromUrl, Repo, getRepoInfo } from '@/lib/query'
import { z } from 'zod'

const repo: Repo = {
  url: 'https://github.com/fumitoh/modelx',
  category: 'General'
}

test('git-url parsing', async () => {
  const { repo, owner } = getOwnerRepoFromUrl(
    'https://github.com/JuliaActuary/LifeContingencies.jl'
  )
  expect(repo).toBe('LifeContingencies.jl')
  expect(owner).toBe('JuliaActuary')
})

test('query GitHub API', async () => {
  const res = await getRepoInfo(repo)
  console.log(res)
})



