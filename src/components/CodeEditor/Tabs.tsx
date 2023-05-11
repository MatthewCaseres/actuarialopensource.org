import React, { useState } from 'react'
import { Provider, atom, useAtom } from 'jotai'
import PythonSVG from './PythonSVG'

type Tab = {
  title: string
  content: string
}

function Tabs() {
  const tabs: Tab[] = [
    {
      title: 'file1.py',
      content: 'print("hello world")',
    },
    {
      title: 'file2.py',
      content: 'print("hello world")',
    },
  ]

  return (
    <div className=" p-4">
      <div className="flex text-sm font-semibold text-neutral-400">
        {tabs.map((tab, i) => (
          <div
            key={i}
            className="flex  items-center border border-neutral-600 bg-gray-800 p-2 text-center"
            style={{ minWidth: '90px' }}
          >
            <PythonSVG />
            <span>{tab.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  const initialTabTitles = ['file1.py', 'file2.py', 'C']

  return (
    <div className="mt-20">
      <Tabs />
    </div>
  )
}

export default App
