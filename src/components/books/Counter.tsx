import React, { useState } from 'react'
import dynamic from 'next/dynamic'
const Codeblock = dynamic(() => import('@/components/Codeblock'), {
  ssr: false,
})
const CodeEditor = dynamic(() => import('@/components/CodeEditor/CodeEditor'), {
  ssr: false,
})
interface CounterProps {
  initialValue?: number
}

const Counter: React.FC<CounterProps> = ({ initialValue = 0 }) => {
  const [count, setCount] = useState<number>(initialValue)

  const handleIncrement = (): void => {
    setCount(count + 1)
  }

  const handleDecrement = (): void => {
    setCount(count - 1)
  }

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <Codeblock />
      <CodeEditor code="print(2)" />
    </div>
  )
}

export default Counter
