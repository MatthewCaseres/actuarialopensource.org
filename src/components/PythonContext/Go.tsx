import React, { useEffect } from 'react'
import { useWorker } from './WorkerContext'

export default function Go() {
  const { runner, output, runCode } = useWorker()
  const [count, setCount] = React.useState(0)
  const [stdout, setStdout] = React.useState('')
  const id = '4022iiuj'
  useEffect(() => {
    // check that length is greater than 0 to avoid the initial empty array
    if (output.length > 0 && output[0] === id) {
      // join them all with newlines except the first one
      setStdout(output.slice(1).join('\n'))
    }
  }, [output])
  // useEffect to check the state of stdout and stderr
  useEffect(() => {
    if (stdout) {
      console.log(stdout)
      console.log(output)
    }
  }, [stdout])

  return (
    <div className="mt-20">
      <h1
        onClick={async () => {
          setCount(count + 1)
          await runCode('print(1+2)', '4022iiuj')
        }}
      >
        Go
      </h1>
    </div>
  )
}
