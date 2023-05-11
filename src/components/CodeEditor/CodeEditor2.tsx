import React, { useEffect, useState } from 'react'

import { usePython } from 'react-py'
import type { Packages } from 'react-py/dist/types/Packages'

import Controls from './Controls'
import { ArrowUpIcon, PlayIcon, StopIcon } from '@heroicons/react/solid'
// require('react-ace').default
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/theme-textmate'
import 'ace-builds/src-noconflict/theme-idle_fingers'
import 'ace-builds/src-noconflict/ext-language_tools'

import { Provider, atom, useAtom } from 'jotai'
import PythonSVG from './PythonSVG'

const tabIndexAtom = atom(0)

type Tab = {
  title: string
  content: string
}

function Tabs() {
  const [tabIndex, setTabIndex] = useAtom(tabIndexAtom)
  const tabs: Tab[] = [
    {
      title: 'file1.py',
      content: 'print("hello world")',
    },
    {
      title: 'file2.py',
      content: 'print("hello world")',
    },
    {
      title: 'f.py',
      content: 'print("hello world")',
    },
  ]

  return (
    <div className="">
      <div className="flex text-xs font-semibold text-neutral-400">
        {tabs.map((tab, i) => (
          <div
            key={i}
            className={`flex items-center ${
              i === tabs.length - 1 ? '' : 'border-r'
            } border-black bg-neutral-900 p-2 text-center`}
            style={{ backgroundColor: i == tabIndex ? '#323232' : '' }}
            onClick={() => setTabIndex(i)}
          >
            <PythonSVG />
            <span>{tab.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const editorOptions = {
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  highlightActiveLine: false,
  showPrintMargin: false,
}

const editorOnLoad = (editor) => {
  editor.renderer.setScrollMargin(10, 10, 0, 0)
  editor.moveCursorTo(0, 0)
}

interface CodeEditorProps {
  code: string
  packages?: Packages
}

export default function CodeEditor(props: CodeEditorProps) {
  const { code, packages } = props
  const [input, setInput] = useState(code.trimEnd())
  const [showOutput, setShowOutput] = useState(false)

  useEffect(() => {
    setInput(code.trimEnd())
    setShowOutput(false)
  }, [code])

  const {
    runPython,
    stdout,
    stderr,
    isLoading,
    isRunning,
    interruptExecution,
  } = usePython({ packages })

  function run() {
    runPython(input)
    setShowOutput(true)
  }

  function stop() {
    interruptExecution()
    setShowOutput(false)
  }

  function reset() {
    setShowOutput(false)
    setInput(code.trimEnd())
  }

  return (
    <div className="relative mb-10 flex flex-col">
      {/* <Controls
        items={[
          {
            label: 'Run',
            icon: PlayIcon,
            onClick: run,
            disabled: isLoading || isRunning,
            hidden: isRunning,
          },
          { label: 'Stop', icon: StopIcon, onClick: stop, hidden: !isRunning },
          {
            label: 'Reset',
            icon: ArrowUpIcon,
            onClick: reset,
            disabled: isRunning,
          },
        ]}
      /> */}
      <Tabs />

      <AceEditor
        value={input}
        mode="python"
        name="CodeBlock"
        fontSize="0.9rem"
        className="-mt-1 min-h-[4rem] overflow-clip rounded shadow-md"
        theme="idle_fingers"
        onChange={(newValue) => setInput(newValue)}
        width="100%"
        maxLines={Infinity}
        onLoad={editorOnLoad}
        editorProps={{ $blockScrolling: true }}
        setOptions={editorOptions}
      />

      {showOutput && (
        <pre className=" overflow-auto text-left">
          <code>{stdout}</code>
          <code className="text-red-500">{stderr}</code>
        </pre>
      )}
    </div>
  )
}
