import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  ReactNode,
  useState,
} from 'react'
import { proxy, Remote, wrap } from 'comlink'
import { Runner, PythonRunner } from './types'

interface WorkerContextProps {
  runner: React.MutableRefObject<Remote<PythonRunner> | undefined>
  isLoading: boolean
  pyodideVersion: string | undefined
  stdout: string
}

// Create the context
const WorkerContext = createContext<WorkerContextProps | undefined>(undefined)

interface WorkerProviderProps {
  children: ReactNode
}

// Create a provider component
export const WorkerProvider: React.FC<WorkerProviderProps> = ({ children }) => {
  const workerRef = useRef<Worker | null>(null)
  const runnerRef = useRef<Remote<PythonRunner>>()
  const [isLoading, setIsLoading] = useState(false)
  const [pyodideVersion, setPyodideVersion] = useState<string | undefined>()
  const [output, setOutput] = useState<string[]>([])
  const [stdout, setStdout] = useState('')

  // Immediately set stdout upon receiving new input
  useEffect(() => {
    if (output.length > 0) {
      console.log('output', output)
      setStdout(output.join('\n'))
    }
  }, [output])

  useEffect(() => {
    const worker = new Worker(new URL('./python-worker', import.meta.url))
    workerRef.current = worker
    const init = async () => {
      try {
        setIsLoading(true)
        const runner: Remote<PythonRunner> = wrap(workerRef.current as Worker)
        runnerRef.current = runner

        await runner.init(
          proxy((msg: string) => {
            // Suppress messages that are not useful for the user
            setOutput((prev) => [...prev, msg])
          }),
          proxy(({ version }) => {
            // The runner is ready once the Pyodide version has been set
            setPyodideVersion(version)
            console.debug('Loaded pyodide version:', version)
          }),
          [[], []]
        )
      } catch (error) {
        console.error('Error loading Pyodide:', error)
      } finally {
        setIsLoading(false)
      }
    }
    init()
    // Cleanup worker on unmount
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate()
        workerRef.current = null
      }
    }
  }, [])

  // now runner ref
  console.log('runnerRef', runnerRef)

  // The value provided by the context includes both the worker and functions to interact with it
  return (
    <WorkerContext.Provider
      value={{ runner: runnerRef, isLoading, pyodideVersion, stdout }}
    >
      {children}
    </WorkerContext.Provider>
  )
}

// Create a custom hook to access the worker
export const useWorker = (): WorkerContextProps => {
  const context = useContext(WorkerContext)
  if (context === undefined) {
    throw new Error('useWorker must be used within a WorkerProvider')
  }
  return context
}
