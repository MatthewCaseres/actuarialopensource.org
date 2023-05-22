import React, { useEffect } from 'react'
import { useWorker } from './WorkerContext'

export default function Go() {
  const { runner, stdout } = useWorker()
  const [count, setCount] = React.useState(0)
  useEffect(() => {
    console.log(stdout)
  }, [stdout])

  return (
    <div className="mt-20">
      <h1
        onClick={() => {
          setCount(count + 1)
          runner.current?.run(
            `print([1,2,3])\nprint(${count})\nprint(${count})`
          )
        }}
      >
        Go
      </h1>
    </div>
  )
}
