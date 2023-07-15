import repos2 from '../langs/q.json'
import { useState } from 'react'
import { FlatWithCategory } from '@/lib/query'
import { StarIcon } from '@heroicons/react/24/outline'
import { FunnelIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Filter from './Filter'

import { Lang } from './ProjectGrid'

export default function Table() {
  const [repos, setRepos] = useState<FlatWithCategory[]>(repos2)
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Repository
            </th>
            <th scope="col" className="flex flex-row items-end px-6 py-3">
              <Filter {...{ label: 'LANGUAGE' }} />
              {/* <FunnelIcon className="ml-1 rounded p-1 hover:bg-gray-200" /> */}
              <span className="hover:bg-slate-200"></span>
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Stars
            </th>
            <th scope="col" className="px-6 py-3">
              Forks
            </th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo) => (
            <tr
              key={repo.name}
              className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                <a href={repo.url}>{repo.name}</a>
              </th>
              <td className="px-6 py-4">
                <span
                  className="mr-1 inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: repo.color }}
                />
                {repo.language}
              </td>
              <td className="px-6 py-4">{repo.category}</td>
              <td className="px-6 py-4">{repo.stars}</td>
              <td className="px-6 py-4">{repo.forks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
