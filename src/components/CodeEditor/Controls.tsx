import React from 'react'
import clsx from 'clsx'

interface ControlProps {
  items: {
    label: string
    icon: any
    onClick: () => void
    disabled?: boolean
    hidden?: boolean
  }[]
}

export default function Controls(props: ControlProps) {
  const { items } = props
  const visibleItems = items.filter((item) => !item.hidden)

  return (
    <div className="pointer-events-none">
      <div className="pointer-events-auto">
        <span className="isolate inline-flex rounded-md">
          {visibleItems.map((item, i) => (
            <button
              aria-label={item.label}
              key={item.label}
              type="button"
              onClick={item.onClick}
              disabled={item.disabled}
              className={clsx(
                'relative inline-flex items-center px-4 py-2 focus:z-10 focus:outline-none focus:ring-0',
                !item.disabled
                  ? 'opacity-75 hover:cursor-pointer'
                  : 'opacity-50 hover:cursor-not-allowed',
                i === 0 && 'rounded-l-md',
                i === visibleItems.length - 1 && 'rounded-r-md'
              )}
            >
              <item.icon className="h-5 w-5 text-white" aria-hidden="true" />
            </button>
          ))}
        </span>
      </div>
    </div>
  )
}
