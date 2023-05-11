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

function App() {
  const initialTabTitles = ['file1.py', 'file2.py', 'C']

  return (
    <SidebarLayout>
      <div className="mt-20">
        ds sfd fs sadf sdf sfd sdfa fd dsfa afds dfsa safd fsda dsaf dsfa sadf
        fsda fdsa dsfa fsad dsaf df
      </div>
      <CodeEditor code="Hello world" />
    </SidebarLayout>
  )
}

export default App
