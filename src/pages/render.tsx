// This page is for development only

import React, { useEffect, useRef } from 'react'
import SidebarLayout from '@/components/Sidebar/SidebarLayout'
import dynamic from 'next/dynamic'
const CodeEditor = dynamic(
  () => import('@/components/CodeEditor/CodeEditor3'),
  {
    ssr: false,
  }
)
// import CodeEditor from '@/components/CodeEditor/CodeEditor2'


const initialTabs = [
  {
    title: 'model',
    content: 'print("hello world1")',
  },
  {
    title: 'framework',
    content: 'print("hello world2")',
  },
]

function App() {
  const initialTabTitles = ['file1.py', 'file2.py', 'C']
  const inputRef = useRef(null)
  const [count, setCount] = React.useState(0);
  useEffect(() => {
      const height = inputRef.current.offsetHeight;
      console.log('Input height', height);   
  }, [inputRef, count]);


  return (
    <SidebarLayout>
      <div className="mt-20" onClick={()=>setCount(t => t+1)}>
        ds sfd fs sadf sdf sfd sdfa fd dsfa afds dfsa safd fsda dsaf dsfa sadf
        fsda fdsa dsfa fsad dsaf df
      </div>
      <div ref={inputRef} style={{minHeight: 520}}>
      <CodeEditor 
      id="fde2be7e-519e-4db1-9f2b-de87da5eb6f0" 
      tabs={[{"title":"model","content":"from framework import Model\nimport numpy as np\nfrom pprint import pprint\n\nclass SimpleModel(Model):\n    \n    def __init__(self, mortality: np.ndarray):\n        super().__init__()\n        self.mortality = mortality\n    \n    def pols_if(self, t):\n        if t == 0:\n            return np.ones_like(self.mortality)\n        return self.pols_if(t-1) - self.pols_death(t-1)\n    \n    def pols_death(self, t):\n        return self.pols_if(t) * self.mortality\n        \n\nmodel = SimpleModel(np.linspace(.01, .1, 10))\nmodel.pols_if(5)\nprint(\"pols_if\")\npprint(model.pols_if.cache)"},{"title":"framework","content":"from collections import defaultdict\nfrom inspect import getmembers\nfrom types import MethodType\n\nclass Cache:\n    def __init__(self, func, shared_cache: dict):\n        self.func = func\n        self.cache = shared_cache[func.__name__]\n\n    def __call__(self, *arg): # does not support kwargs\n        if arg in self.cache:\n            return self.cache[arg]\n        else:\n            result = self.func(*arg)\n            self.cache[arg] = result\n            return result\n\nclass Model:\n    def __init__(self):\n        self.shared_cache = defaultdict(dict)\n        for method_name, method in getmembers(self):\n            if ( # do not cache these\n                not method_name[0].islower()\n                or method_name.startswith(\"_\")\n                or not isinstance(method, MethodType)\n            ):\n                continue\n            setattr(self, method_name, Cache(method, self.shared_cache))\n\n    def Clear(self):\n        self.shared_cache.clear()"}]} 
      packages={{official: ['numpy']}}/>
      </div>
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
        packages={{official: ['numpy']}}
      />
      <div>lol</div>
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
