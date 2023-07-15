import { useEffect, useRef } from 'react'

import { Header } from '@/components/Header'
import { LastEditorIdProvider } from '../components/CodeEditor/LastEditorContext'

import { Analytics } from '@vercel/analytics/react'
import { IntlProvider } from 'react-intl'

import '@/styles/tailwind.css'
import 'focus-visible'

import dynamic from 'next/dynamic'

import enMessages from '../langs/en'
import esMessages from '../langs/es'
import cnMessages from '../langs/zh'
import deMessages from '../langs/de'
import frMessages from '../langs/fr'
import jaMessages from '../langs/ja'
import hiMessages from '../langs/hi'
import ptMessages from '../langs/pt-br'

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

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname)
  const { locale } = router

  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full" />
        </div>
      </div>
      <div className="relative">
        <Header />
        <IntlProvider locale={locale} messages={allMessages[locale]}>
          <LastEditorIdProvider>
            <main>
              <Component previousPathname={previousPathname} {...pageProps} />
              <Analytics />
            </main>
          </LastEditorIdProvider>
        </IntlProvider>
      </div>
    </>
  )
}
