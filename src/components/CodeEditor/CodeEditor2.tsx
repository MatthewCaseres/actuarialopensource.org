import React, { useEffect, useState } from 'react'
import { produce } from 'immer'
import { TabsProvider, useTabs } from './EditorContext'
import { useLastEditorId } from './LastEditorContext'
import Tabs from './Tabs'
import clsx from 'clsx'

import { PythonProvider, usePython } from 'react-py'
import type { Packages } from 'react-py/dist/types/Packages'
import type { Tab } from './EditorContext'
import { v4 as uuid } from 'uuid'

import Controls from './Controls'
import {
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
  id: string
}

export default function CodeEditor(props: CodeEditorProps) {
  const { lastEditorId } = useLastEditorId()
  return (
    <PythonProvider
      terminateOnCompletion={lastEditorId !== props.id}
      lazy={true}
    >
      <TabsProvider tabs={props.tabs}>
        <CodeEditorBase {...props} />
      </TabsProvider>
    </PythonProvider>
  )
}

function CodeEditorBase(props: {
  packages?: Packages
  debug?: boolean
  id: string
}) {
  const {
    state: { tabIndex, tabs },
    initialState,
    dispatch,
  } = useTabs()
  const { packages, debug } = props
  const [showOutput, setShowOutput] = useState(false)
  const { setLastEditorId } = useLastEditorId()

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

  function copyConfig() {
    navigator.clipboard.writeText(
      `<CodeEditor id="${uuid()}" tabs={${JSON.stringify(tabs)}} />`
    )
  }

  function run() {
    setLastEditorId(props.id)
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
                    onClick: copyConfig,
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
