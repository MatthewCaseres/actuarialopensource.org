import { StarIcon } from '@heroicons/react/24/outline'
import { VscRepoForked } from 'react-icons/vsc'
import { useIntl, FormattedMessage } from 'react-intl'
import Link from 'next/link'

export function LinkButton() {
  return (
    <div className="mx-auto mt-10 flex justify-center ">
      <Link href="/joinus">
        <div className="rounded border  px-4 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
          <FormattedMessage id="all_projects" defaultMessage="All Projects" />
        </div>
      </Link>
    </div>
  )
}

export function Lang({ repo }) {
  return (
    <>
      <span
        className={` inline-block h-3 w-3 rounded-full`}
        style={{ backgroundColor: repo.color }}
      />
      <span className="ml-1 mr-2 text-sm font-light">{repo.language}</span>
    </>
  )
}

export function ProjectGrid({ repos }) {
  const intl = useIntl()
  return (
    <div>
      <ul
        role="list"
        className=" mt-6 grid max-w-7xl grid-cols-1 pt-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {repos
          .sort((a, b) => b.stars - a.stars)
          .map((repo, idx) => (
            <li
              key={idx}
              className="group col-span-1 m-1 divide-y divide-gray-200 rounded-lg border border-gray-300 bg-white shadow hover:bg-blue-100 dark:border-gray-600 dark:bg-gray-800  dark:text-zinc-100 dark:hover:bg-gray-700"
            >
              <a target="_blank" rel="noopener noreferrer" href={repo.url}>
                <div>
                  {/* <div className="flex items-center justify-center truncate p-3"> */}
                  <h3 className="truncate  p-3 font-medium text-blue-700 group-hover:underline dark:text-blue-500">
                    {repo.name}
                  </h3>
                  {/* </div> */}
                  <div className="truncate px-2 pb-2 text-sm font-light text-gray-600 dark:text-zinc-200">
                    {repo.description}
                  </div>
                  <div className="ml-auto flex flex-row items-center pl-2 pb-2">
                    <Lang repo={repo} />
                    {/* <span className="h-3 w-3 rounded-full bg-[#3472a5]" />
                    <span className="ml-1 mr-2 text-sm font-light">Python</span> */}
                    <StarIcon className="h-4 w-4 stroke-slate-500 dark:stroke-slate-300" />
                    <span className="text-sm font-light text-slate-600 dark:text-slate-300">
                      {repo.stars}
                    </span>
                    <VscRepoForked className="ml-2 h-4 w-4 fill-slate-500 dark:fill-slate-300" />
                    <span className="text-sm font-light text-slate-600 dark:text-slate-300">
                      {repo.forks}
                    </span>
                  </div>
                </div>
              </a>
            </li>
          ))}
      </ul>
      <div className=" text-zinc-600 dark:text-zinc-300">
        <LinkButton />
      </div>
    </div>
  )
}
