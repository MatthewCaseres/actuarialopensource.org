import React, { useEffect, useState } from 'react'
import { produce } from 'immer'
import { TabsProvider, useTabs } from './EditorContext'

import { usePython } from 'react-py'
import type { Packages } from 'react-py/dist/types/Packages'
import type { Tab } from './EditorContext'

import Controls from './Controls'
import { ArrowUpIcon, PlayIcon, StopIcon } from '@heroicons/react/solid'
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
    <div className="">
      <div className="flex text-xs font-semibold ">
        {tabs.map((tab, i) => (
          <div
            key={i}
            className={`flex select-none items-center ${
              i === tabs.length - 1 ? '' : 'border-r'
            } ${
              i === tabIndex ? 'text-neutral-200' : 'text-neutral-400'
            } border-black bg-neutral-900 p-2 text-center`}
            style={{ backgroundColor: i == tabIndex ? '#323232' : '' }}
            onClick={() => dispatch({ type: 'SET_TAB_INDEX', payload: i })}
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
  tabs: Tab[]
  packages?: Packages
}

export default function CodeEditor2(props: CodeEditorProps) {
  return (
    <TabsProvider tabs={props.tabs}>
      <CodeEditor {...props} />
    </TabsProvider>
  )
}

function CodeEditor(props: { packages?: Packages }) {
  const {
    state: { tabIndex, tabs },
    initialState,
    dispatch,
  } = useTabs()
  const { packages } = props
  const [showOutput, setShowOutput] = useState(false)

  // useEffect(() => {
  //   dispatch({ type: 'SET_TABS', payload: initialTabs })
  //   setShowOutput(false)
  // }, [initialTabs])

  const {
    runPython,
    stdout,
    stderr,
    isLoading,
    isRunning,
    interruptExecution,
  } = usePython({ packages })

  function run() {
    runPython(tabs[tabIndex].content)
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
      <Tabs />
      <Controls
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
      />

      <AceEditor
        value={tabs.length > 0 ? tabs[tabIndex].content : ''}
        mode="python"
        name="CodeBlock"
        fontSize="0.9rem"
        className="-mt-1 min-h-[4rem] overflow-clip rounded shadow-md"
        theme="idle_fingers"
        onChange={(newValue) =>
          dispatch({
            type: 'SET_TABS',
            payload: produce(tabs, (draft) => {
              draft[tabIndex].content = newValue
            }),
          })
        }
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
