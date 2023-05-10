import React, { useState } from 'react'
import PythonSVG from './PythonSVG'

type Tab = {
  id: number
  title: string
}

function Tabs({ initialTabs }: { initialTabs: string[] }) {
  const tabs: Tab[] = initialTabs.map((title, index) => ({ id: index, title }))

  return (
    <div className="bg-gray-100 p-4">
      <div className="flex text-sm font-semibold text-gray-400">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className="flex items-center border-r border-gray-300 bg-gray-800 p-2 text-center"
          >
            <PythonSVG />
            <span>{tab.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tabs
