import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { Quotes } from '../components/Quotes'
import { Hero } from '../components/Hero'
// import { generateRssFeed } from '@/lib/generateRssFeed'

import { ProjectGrid } from '@/components/ProjectGrid'
import { useRouter } from 'next/router'
import { IntlProvider } from 'react-intl'
import { reposConfig } from '../lib/query'
import { getReposFlat } from '../lib/query'
import repos from '../langs/q.json'
import { WhyOpenSource } from '../components/WhyOpenSource'
import HeadLine from '../components/HeadLine'

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
      <div className="mt-5">
        <Hero />
      </div>
      <Container className="mt-5">
        <HeadLine headline_id="why?">
          <WhyOpenSource />
        </HeadLine>
      </Container>
      <Container className="mt-3">
        <HeadLine headline_id="open_source_by_actuaries">
          <ProjectGrid
            repos={[...repos].sort((a, b) => b.stars - a.stars).splice(0, 6)}
          />
        </HeadLine>
        {/* "open_source_by_actuaries" */}
      </Container>
      <Container className="mt-5">
        <HeadLine headline_id="what_people_say">
          <Quotes />
        </HeadLine>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  //   if (process.env.NODE_ENV === 'production') {
  //     await generateRssFeed()
  //   }
  // truncate to only have six repos from the repoConfig
  const repos = (
    await getReposFlat([...reposConfig].sort((a, b) => b.stars - a.stars))
  ).splice(0, 6)
  return {
    props: {
      repos: repos,
    },
    revalidate: 120,
  }
}
