import repos2 from '../../langs/q.json'
import { useState } from 'react'
import { FlatQuery } from '@/lib/query'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import Filter from './Filter'

import { useTableDispatch, useTableState } from './TableContext'

export default function Table() {
  const [repos, setRepos] = useState<FlatQuery[]>(repos2)
  const dispatch = useTableDispatch()
  const table = useTableState()
  const {
    starsDescending,
    forksDescending,
    languages,
    categories,
    startingRows,
    activeRows,
  } = useTableState()
  return (
    <div className="overflow-x-auto ">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="select-none bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Repository
            </th>
            <th scope="col" className="px-6 py-3">
              <Filter
                {...{
                  label: 'LANGUAGE',
                  filterables: languages,
                  filterType: 'toggleLanguage',
                  isFresh: table.languagesFresh,
                }}
              />
            </th>
            <th scope="col" className="px-6 py-3">
              <Filter
                {...{
                  label: 'CATEGORY',
                  filterables: categories,
                  filterType: 'toggleCategory',
                  isFresh: table.categoriesFresh,
                }}
              />
            </th>
            <th scope="col" className="px-6 py-3">
              <div
                className="flex items-center"
                onClick={() => {
                  dispatch({ type: 'toggleStars' })
                }}
              >
                Stars
                {starsDescending ? (
                  <ChevronDownIcon className="h-6 w-6" />
                ) : (
                  <ChevronUpIcon className="h-6 w-6" />
                )}
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div
                className="flex items-center"
                onClick={() => {
                  dispatch({ type: 'toggleForks' })
                  console.log('toggleForks')
                }}
              >
                Forks
                {forksDescending ? (
                  <ChevronDownIcon className="h-6 w-6" />
                ) : (
                  <ChevronUpIcon className="h-6 w-6" />
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {activeRows.map((repo) => (
            <tr
              key={repo.name}
              className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <th
                scope="row"
                className="prose whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
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
