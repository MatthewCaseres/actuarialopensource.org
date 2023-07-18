// This page is for development only

import React from 'react'
import SidebarLayout from '@/components/Sidebar/SidebarLayout'
import dynamic from 'next/dynamic'
const CodeEditor = dynamic(
  () => import('@/components/CodeEditor/CodeEditor2'),
  {
    ssr: false,
  }
)
// import CodeEditor from '@/components/CodeEditor/CodeEditor2'

const initialTabs = [
  {
    title: 'file1',
    content: 'print("hello world1")',
  },
  {
    title: 'file2',
    content: 'print("hello world2")',
  },
  {
    title: 'f',
    content: 'print("hello world")',
  },
]

function App() {
  const initialTabTitles = ['file1.py', 'file2.py', 'C']

  return (
    <SidebarLayout>
      <div className="mt-20">
        ds sfd fs sadf sdf sfd sdfa fd dsfa afds dfsa safd fsda dsaf dsfa sadf
        fsda fdsa dsfa fsad dsaf df
      </div>
      <CodeEditor id="kjsadhlsajkl" tabs={initialTabs} />
      <CodeEditor
        id="fs;jkas"
        tabs={[
          {
            title: 'file1',
            content:
              'from file2 import add\nfrom f import subb\n\nprint(add(1,2))\nprint(subb(1,2))\n',
          },
          { title: 'file2', content: 'def add(a, b):\n    return a + b' },
          { title: 'f', content: 'def subb(a, b):\n    return a - b' },
        ]}
      />
      <CodeEditor
        tabs={[
          {
            title: 'main',
            content: '',
          },
        ]}
        id="feas"
        debug
      />
      <CodeEditor
        tabs={[
          {
            title: 'main',
            content: '',
          },
          {
            title: 'somefile',
            content: '',
          },
        ]}
        id="feas"
        debug
      />
    </SidebarLayout>
  )
}

export default App
