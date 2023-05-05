import React, { useState } from 'react'
import Link from 'next/link'
import DoubleChevron from './DoubleChevron'
import { LeftNav } from './LeftNav'
import { SidebarProvider, rawNodes } from './SidebarContext'
import { Controls } from '../Header'

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <div
        className={`${
          isOpen ? 'lg:w-72' : 'w-0'
        }  invisible -my-1 transition-all`}
      ></div>
      <div
        className={`${
          isOpen
            ? '-translate-x-72 lg:translate-x-0'
            : 'translate-x-0 lg:-translate-x-72'
        } fixed z-10 flex min-h-screen w-72 flex-col border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-700 dark:bg-black`}
      >
        <Controls />
        <nav className="h-screen flex-grow overflow-y-auto">
          <SidebarProvider rawNodes={rawNodes}>
            <LeftNav />
          </SidebarProvider>
          {/* somehow, this fixes the scroll overflow bug */}
          {[...Array(6)].map((_, i) => (
            <div className="invisible" key={i}>
              lol
            </div>
          ))}
        </nav>
        <button
          className="group sticky bottom-0 flex items-center justify-center bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none dark:bg-gray-800 hover:dark:bg-gray-700"
          onClick={toggleSidebar}
          aria-label="Close Sidebar"
        >
          <DoubleChevron leftRight="left" />
        </button>
      </div>
      <button
        className={`${
          !isOpen
            ? '-translate-x-80 lg:translate-x-0'
            : 'translate-x-0 lg:-translate-x-80'
        }  w-100 group fixed bottom-0 z-10 flex w-36 cursor-pointer justify-center rounded bg-gray-200 p-2 transition-transform duration-300 hover:bg-gray-300 dark:bg-gray-800 hover:dark:bg-gray-700`}
        onClick={toggleSidebar}
        aria-label="Open Sidebar"
      >
        <DoubleChevron leftRight="right" />
      </button>
    </div>
  )
}

export default Sidebar
