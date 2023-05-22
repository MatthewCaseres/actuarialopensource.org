import React from 'react'
import { WorkerProvider } from '../components/PythonContext/WorkerContext'
import Go from '../components/PythonContext/Go'

export default function f() {
  return (
    <div className="mt-20">
      <WorkerProvider>
        <Go />
      </WorkerProvider>
    </div>
  )
}
