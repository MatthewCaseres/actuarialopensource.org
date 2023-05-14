import { useEffect, useRef } from 'react'

import { Header } from '@/components/Header'
import {LastEditorIdProvider} from '../components/CodeEditor/LastEditorContext'

import { Analytics } from '@vercel/analytics/react';

import '@/styles/tailwind.css'
import 'focus-visible'

import dynamic from 'next/dynamic'

const PythonProvider = dynamic(
  () => import('react-py').then((module) => module.PythonProvider),
  {
    ssr: false
  }
)

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname)

  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full" />
        </div>
      </div>
      <div className="relative">
        <Header />
        <LastEditorIdProvider>
        <main>
          <Component previousPathname={previousPathname} {...pageProps} />
          <Analytics />
        </main>
        </LastEditorIdProvider>
      </div>
    </>
  )
}
