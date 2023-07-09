import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { Quotes } from '../components/Quotes'
import { Hero } from '../components/Hero'
// import { generateRssFeed } from '@/lib/generateRssFeed'
import { getReposFlat, repoUrls } from '@/lib/query'
import { ProjectGrid } from '@/components/ProjectGrid'
import { useRouter } from 'next/router'
import { IntlProvider } from 'react-intl'

import enMessages from '../langs/en'
import esMessages from '../langs/es'
import cnMessages from '../langs/zh'
import deMessages from '../langs/de'
import frMessages from '../langs/fr'
import jaMessages from '../langs/ja'
import hiMessages from '../langs/hi'
import ptMessages from '../langs/pt-br'
import { WhyOpenSource } from '../components/WhyOpenSource'

const allMessages = {
  en: enMessages,
  es: esMessages,
  zh: cnMessages,
  de: deMessages,
  fr: frMessages,
  ja: jaMessages,
  hi: hiMessages,
  'pt-br': ptMessages,
}

export default function Home({ repos }) {
  const { locale } = useRouter()
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
        <Container className="mt-5">
          <WhyOpenSource />
        </Container>
        <Container className="mt-3">
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
