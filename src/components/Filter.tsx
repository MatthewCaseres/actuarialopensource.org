import { Fragment } from 'react'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'
import { Popover } from '@headlessui/react'
import { useTableDispatch, useTableState } from './Table/TableContext'

type FilterType = 'toggleCategory' | 'toggleLanguage'

type FilterProps = {
  label: string
  filterables: Record<string, boolean>
  filterType: FilterType
}

export default function Filter({
  label,
  filterables,
  filterType,
}: FilterProps) {
  const dispatch = useTableDispatch()
  return (
    <Popover className="relative">
      <Popover.Button className="flex gap-x-1.5">
        {label}
        <FunnelIcon className=" h-5 w-5 text-gray-400" aria-hidden="true" />
      </Popover.Button>

      <Popover.Panel className="absolute z-10 ">
        <div className="flex flex-col rounded border bg-white p-2">
          {Object.keys(filterables).map((category) => (
            <div
              className="flex rounded p-1 hover:bg-gray-100"
              onClick={() => {
                dispatch({ type: filterType, toggled: category })
              }}
              key={category}
            >
              <input type="checkbox" checked={filterables[category]} />
              <div className="ml-2 ">{category}</div>
            </div>
          ))}
        </div>

        <img src="/solutions.jpg" alt="" />
      </Popover.Panel>
    </Popover>
  )
}
