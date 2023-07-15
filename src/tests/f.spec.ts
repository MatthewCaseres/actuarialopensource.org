import { test, expect } from '@playwright/test'
import { getOwnerRepoFromUrl } from '@/lib/query'
import { z } from 'zod'

test('git-url parsing', async () => {
  const { repo, owner } = await getOwnerRepoFromUrl(
    'https://github.com/JuliaActuary/LifeContingencies.jl'
  )
  console.log(repo, owner)
  console.log(z.coerce.string().parse(null))
})
