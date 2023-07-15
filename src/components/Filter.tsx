import React, { useState } from 'react'
import { FunnelIcon } from '@heroicons/react/20/solid'
import { useTableDispatch } from './Table/TableContext'
import { Popover, PopoverTrigger, PopoverContent } from './Popover'

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
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex gap-x-1.5">
            {label}
            <FunnelIcon className=" h-5 w-5 text-gray-400" aria-hidden="true" />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col rounded border bg-white p-2">
            {Object.keys(filterables).map((category) => (
              <div
                className="flex rounded p-1 hover:bg-gray-100"
                onClick={() => {
                  dispatch({ type: filterType, toggled: category })
                }}
                key={category}
              >
                <input
                  onChange={(e) => {}}
                  type="checkbox"
                  checked={filterables[category]}
                />
                <div className="ml-2">{category}</div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
