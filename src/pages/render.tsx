import React from 'react'
import BrowserTabs from '@/components/CodeEditor/Tabs'
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
    title: 'file1.py',
    content: 'print("hello world1")',
  },
  {
    title: 'file2.py',
    content: 'print("hello world2")',
  },
  {
    title: 'f.py',
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
      <CodeEditor tabs={initialTabs} />
    </SidebarLayout>
  )
}

export default App
