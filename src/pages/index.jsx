import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { Card } from '@/components/Card'
import { Article } from '@/components/Article'
import { Quotes } from '@/components/Quotes'
import LinkedIn from '@/images/linkedin.svg'
import { Hero } from '@/components/Hero'
import { generateRssFeed } from '@/lib/generateRssFeed'
import { getAllArticles } from '@/lib/getAllArticles'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getReposFlat, repoUrls } from '@/lib/query'
import { ProjectGrid } from '@/components/ProjectGrid'

export default function Home({ articles, repos }) {
  return (
    <>
      <Head>
        <title>Actuarial Open Source Community</title>
        <meta
          name="description"
          content="A community of actuaries and developers building open source
              actuarial software."
        />
      </Head>
      <Hero />
      <Container className="mt-32">
        <ProjectGrid repos={repos} />
      </Container>
      <Container className="mt-5">
        <Quotes />
      </Container>
      <SimpleLayout
        title="Recent blog posts"
        intro="Thoughts on open source technology and actuarial science collected in chronological order."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.slice(0, 3).map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }
  const repos = await getReposFlat(repoUrls)
  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
      repos: repos,
    },
    revalidate: 120,
  }
}
