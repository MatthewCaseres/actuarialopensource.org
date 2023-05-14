import React, { createContext, useContext, useState } from 'react'

const LastEditorIdContext = createContext<
  | {
      lastEditorId: string
      setLastEditorId: React.Dispatch<React.SetStateAction<string>>
    }
  | undefined
>(undefined)

export const LastEditorIdProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [lastEditorId, setLastEditorId] = useState<string>('uuid of editor')
  const value = { lastEditorId, setLastEditorId }
  return (
    <LastEditorIdContext.Provider value={value}>
      {children}
    </LastEditorIdContext.Provider>
  )
}

export const useLastEditorId = () => {
  const context = useContext(LastEditorIdContext)
  if (context === undefined) {
    throw new Error('useTabs must be used within a TabsProvider')
  }
  return context
}
