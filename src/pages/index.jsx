import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { Quotes } from '@/components/Quotes'
import { Hero } from '@/components/Hero'
// import { generateRssFeed } from '@/lib/generateRssFeed'
import { getReposFlat, repoUrls } from '@/lib/query'
import { ProjectGrid } from '@/components/ProjectGrid'

export default function Home({ repos }) {
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
    </>
  )
}

export async function getStaticProps() {
  //   if (process.env.NODE_ENV === 'production') {
  //     await generateRssFeed()
  //   }
  const repos = await getReposFlat(repoUrls)
  return {
    props: {
      repos: repos,
    },
    revalidate: 120,
  }
}
