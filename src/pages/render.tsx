import React from 'react'
import BrowserTabs from '@/components/CodeEditor/Tabs'

function App() {
  const initialTabTitles = ['Home', 'About', 'Contact']

  return (
    <div className="mt-20">
      <BrowserTabs initialTabs={initialTabTitles} />
    </div>
  )
}

export default App
