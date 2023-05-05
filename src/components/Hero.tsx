import LinkedIn from '@/images/LinkedIn'
import TechBook from '@/images/TechBook'
import Link from 'next/link'

const HeroButton: React.FC<{
  title: string
  children?: React.ReactNode
}> = ({ title, children }) => {
  return (
    <div className="mb-2 flex w-40 flex-row items-center justify-center border border-gray-300 p-2 shadow-md dark:border-gray-500">
      {title}
      <div className="ml-4">{children}</div>
    </div>
  )
}

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
            <p className="text-basesm:text-lg mx-auto my-3 max-w-md md:my-5 md:max-w-3xl md:text-xl">
              A community of actuaries and developers building open source
              actuarial software.
            </p>
            <div className="mx-auto mt-10 flex flex-col items-center justify-center sm:flex-row sm:space-x-3 ">
              <a
                href="https://www.linkedin.com/groups/13937070/"
                target="_blank"
                rel="noreferrer"
              >
                <HeroButton title=" Join Us ">
                  <LinkedIn height={30} width={30} alt="LinkedIn Logo" />
                </HeroButton>
              </a>
              <Link href="/articles/welcome">
                <HeroButton title="Education">
                  <TechBook
                    className="fill-sky-700"
                    height={30}
                    width={30}
                    alt="LinkedIn Logo"
                  />
                </HeroButton>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
{
  /* <a
href="https://www.linkedin.com/groups/13937070/"
> */
}
