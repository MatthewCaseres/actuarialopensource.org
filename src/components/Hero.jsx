/* This example requires Tailwind CSS v2.0+ */

import Image from 'next/image'
import LinkedIn from '@/images/linkedin.svg'
import Link from 'next/link'

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="relative pt-6">
        <main className="mx-auto mt-16 max-w-7xl px-4 text-zinc-800 dark:text-zinc-100 sm:mt-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight  sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Actuarial</span>{' '}
              <span className="block xl:inline">Open Source</span>
            </h1>
            <p className="text-basesm:text-lg mx-auto mt-3 max-w-md md:mt-5 md:max-w-3xl md:text-xl">
              A community of actuaries and developers building open source
              actuarial software.
            </p>
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3">
                <a
                  href="https://www.linkedin.com/groups/13937070/"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-50 px-8 py-3 text-base font-medium hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 md:py-4 md:px-10 md:text-lg"
                >
                  LinkedIn Community
                  <div className="ml-4">
                    <Image
                      src={LinkedIn}
                      height={34}
                      width={34}
                      alt="LinkedIn Logo"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
