import React, { useState } from 'react'
import Link from 'next/link'
import DoubleChevron from './DoubleChevron'
import { LeftNav } from './LeftNav'
import { SidebarProvider } from './SidebarContext'
import { Controls } from '../Header'

type RawStatefulNode = {
  title: string
  open?: boolean
  children?: RawStatefulNode[]
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <div>
        <div
          className={`${
            isOpen ? 'translate-x-0' : '-translate-x-80'
          } fixed z-10 flex min-h-screen w-80 flex-col border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-700 dark:bg-black`}
        >
          <Controls />
          <nav className="flex-grow">
            <SidebarProvider rawNodes={rawNodes}>
              <LeftNav />
            </SidebarProvider>
          </nav>
          <button
            className="group sticky bottom-0 flex items-center justify-center bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none dark:bg-gray-800 hover:dark:bg-gray-700"
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            <DoubleChevron leftRight="left" />
          </button>
        </div>
      </div>
      <button
        className={`${
          !isOpen ? 'translate-x-0' : '-translate-x-80'
        }  w-100 group fixed bottom-0 z-10 flex w-36 cursor-pointer justify-center rounded bg-gray-200 p-2 transition-transform duration-300 hover:bg-gray-300 dark:bg-gray-800 hover:dark:bg-gray-700`}
        onClick={toggleSidebar}
        aria-label="Open Sidebar"
      >
        <DoubleChevron leftRight="right" />
      </button>
    </div>
  )
}

const rawNodes: RawStatefulNode[] = [
  {
    title: 'IT Operations',
    children: [
      {
        title: 'Deploy a Streamlit app to the cloud',
      },
    ],
  },
  {
    title: 'Actuarial modeling',
    children: [
      {
        title: 'Caching thing',
      },
    ],
  },
  {
    title: 'Actuarial mathematics',
    children: [
      {
        title: 'Poisson thing',
      },
    ],
  },
]

export default Sidebar
