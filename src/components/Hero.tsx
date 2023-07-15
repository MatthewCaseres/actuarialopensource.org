import LinkedIn from '@/images/LinkedIn'
import TechBook from '@/images/TechBook'
import Link from 'next/link'
import { useIntl, FormattedMessage } from 'react-intl'
import LanguageSelector from './LanguageSelector'

export function Hero() {
  const intl = useIntl()
  return (
    <div className="relative overflow-hidden">
      <div className="relative pt-6">
        <main className="mx-auto mt-16 max-w-7xl px-4 text-zinc-800 dark:text-zinc-100 sm:mt-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight  sm:text-5xl md:text-6xl">
              <span className="block xl:inline">
                <FormattedMessage id="actuarial" defaultMessage="Actuarial" />
              </span>{' '}
              <span className="block xl:inline">
                <FormattedMessage
                  id="open_source"
                  defaultMessage="Open Source"
                />
              </span>
            </h1>
            <p className="mx-auto my-3 max-w-md text-base sm:text-lg md:my-5 md:max-w-3xl md:text-xl">
              <FormattedMessage
                id="tagline"
                defaultMessage="A community of actuaries and developers building open source actuarial software."
              />
            </p>
            <LanguageSelector />
          </div>
        </main>
      </div>
    </div>
  )
}
