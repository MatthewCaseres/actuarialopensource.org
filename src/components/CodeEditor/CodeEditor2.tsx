import React, { useEffect, useState } from 'react'
import { produce } from 'immer'
import { TabsProvider, useTabs } from './EditorContext'
import clsx from 'clsx'

import { usePython } from 'react-py'
import type { Packages } from 'react-py/dist/types/Packages'
import type { Tab } from './EditorContext'

import Controls from './Controls'
import {
  ArrowUpIcon,
  CodeBracketIcon,
  PlayIcon,
  StopIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid'
// require('react-ace').default
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/theme-textmate'
import 'ace-builds/src-noconflict/theme-idle_fingers'
import 'ace-builds/src-noconflict/ext-language_tools'

import PythonSVG from './PythonSVG'

function Tabs() {
  const {
    state: { tabIndex, tabs },
    dispatch,
  } = useTabs()

  return (
    <div className="flex text-xs font-semibold ">
      {tabs.map((tab, i) => (
        <div
          key={i}
          className={`flex select-none items-center border-r
           ${
             i === tabIndex ? 'text-neutral-200' : 'text-neutral-400'
           } border-black bg-neutral-900 p-2 text-center`}
          style={{ backgroundColor: i == tabIndex ? '#323232' : '' }}
          onClick={() => dispatch({ type: 'SET_TAB_INDEX', payload: i })}
        >
          <PythonSVG />
          <span>{tab.title + '.py'}</span>
        </div>
      ))}
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
  tabs: Tab[]
  debug?: boolean
  packages?: Packages
}

export default function CodeEditor2(props: CodeEditorProps) {
  return (
    <TabsProvider tabs={props.tabs}>
      <CodeEditor {...props} />
    </TabsProvider>
  )
}

function CodeEditor(props: { packages?: Packages; debug?: boolean }) {
  const {
    state: { tabIndex, tabs },
    initialState,
    dispatch,
  } = useTabs()
  const { packages, debug } = props
  const [showOutput, setShowOutput] = useState(false)

  const {
    runPython,
    stdout,
    stderr,
    isLoading,
    isRunning,
    interruptExecution,
  } = usePython({ packages })

  function writeFilesPreamble() {
    const preamble = tabs
      .map((tab) => {
        return `with open('${tab.title}.py', 'w') as f:
    f.write('''${tab.content}''')`
      })
      .join('\n')
    return preamble
  }

  function run() {
    runPython(`${writeFilesPreamble()}\n${tabs[tabIndex].content}`)
    setShowOutput(true)
  }

  function stop() {
    interruptExecution()
    setShowOutput(false)
  }

  function reset() {
    setShowOutput(false)
    dispatch({ type: 'RESET_TABS', payload: initialState })
  }

  return (
    <div className="relative mb-10 flex flex-col">
      <div
        className="flex justify-between"
        style={{ backgroundColor: '#323232' }}
      >
        <Tabs />
        <Controls
          items={[
            ...(debug
              ? [
                  {
                    label: 'ConfigCopy',
                    icon: CodeBracketIcon,
                    onClick: () => {
                      navigator.clipboard.writeText(
                        `<CodeEditor tabs={${JSON.stringify(tabs)}} />`
                      )
                    },
                  },
                ]
              : []),
            {
              label: 'Run',
              icon: PlayIcon,
              onClick: run,
              disabled: isLoading || isRunning,
              hidden: isRunning,
            },
            {
              label: 'Stop',
              icon: StopIcon,
              onClick: stop,
              hidden: !isRunning,
            },
            {
              label: 'Reset',
              icon: ArrowPathIcon,
              onClick: reset,
              disabled: isRunning,
            },
          ]}
        />
      </div>
      {tabs.map((tab, i) => (
        <AceEditor
          key={i}
          value={tab.content}
          mode="python"
          name={`CodeBlock_${i}`}
          fontSize="0.9rem"
          className="-mt-1 min-h-[4rem] overflow-clip rounded-none border-t border-black shadow-md"
          style={{ display: i === tabIndex ? 'block' : 'none' }}
          theme="idle_fingers"
          onChange={(newValue) =>
            dispatch({
              type: 'SET_TABS',
              payload: produce(tabs, (draft) => {
                draft[i].content = newValue
              }),
            })
          }
          width="100%"
          maxLines={Infinity}
          onLoad={editorOnLoad}
          editorProps={{ $blockScrolling: true }}
          setOptions={editorOptions}
        />
      ))}
      {showOutput && (
        <pre className=" overflow-auto text-left">
          <code>{stdout}</code>
          <code className="text-red-500">{stderr}</code>
        </pre>
      )}
    </div>
  )
}
