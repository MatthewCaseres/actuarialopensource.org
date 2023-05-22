import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  ReactNode,
  useState,
  useCallback,
} from 'react'
import { proxy, Remote, wrap } from 'comlink'
import { Runner, PythonRunner } from './types'

interface WorkerContextProps {
  runner: React.MutableRefObject<Remote<PythonRunner> | undefined>
  runCode: (code: string, id: string) => Promise<void>
  isLoading: boolean
  pyodideVersion: string | undefined
  output: string[]
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
  const [stderr, setStderr] = useState('')

  const runCode = useCallback(async (code: string, id: string) => {
    if (!runnerRef.current) {
      throw new Error('Pyodide is not loaded')
    }
    try {
      setOutput([id])
      await runnerRef.current.run(code)
    } catch (error) {
      console.error('Error:', error)
      setStderr('Traceback (most recent call): \n' + error.message)
    }
  }, [])
  // useEffect to check on stdErr
  useEffect(() => {
    if (stderr) {
      console.log(stderr)
    }
  }, [stderr])

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

  // The value provided by the context includes both the worker and functions to interact with it
  return (
    <WorkerContext.Provider
      value={{ runner: runnerRef, isLoading, pyodideVersion, output, runCode }}
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
