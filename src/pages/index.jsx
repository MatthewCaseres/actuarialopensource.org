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
import { useRouter } from 'next/router'
import { IntlProvider } from 'react-intl'

import enMessages from '../langs/en-US'
import esMessages from '../langs/es-ES'
import cnMessages from '../langs/zh-CN'

const allMessages = {
  'en-US': enMessages,
  'es-ES': esMessages,
  'zh-CN': cnMessages,
}

export default function Home({ repos }) {
  const router = useRouter()
  const { locale } = router
  return (
    <IntlProvider locale={locale} messages={allMessages[locale]}>
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
        <Container className="mt-16">
          <ProjectGrid repos={repos} />
        </Container>
        <Container className="mt-5">
          <Quotes />
        </Container>
      </>
    </IntlProvider>
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