import React, { createContext, useReducer, useContext, useState } from 'react'

export type Tab = {
  title: string
  content: string
}

type State = {
  tabIndex: number
  tabs: Tab[]
}

const initialState: State = {
  tabIndex: 0,
  tabs: [],
}

type Action =
  | { type: 'SET_TAB_INDEX'; payload: number }
  | { type: 'SET_TABS'; payload: Tab[] }
  | { type: 'RESET_TABS'; payload: State }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_TAB_INDEX':
      return { ...state, tabIndex: action.payload }
    case 'SET_TABS':
      return { ...state, tabs: action.payload }
    case 'RESET_TABS':
      return action.payload
    default:
      throw new Error()
  }
}

const TabsContext = createContext<
  | { state: State; initialState: State; dispatch: React.Dispatch<Action> }
  | undefined
>(undefined)

export const TabsProvider: React.FC<{
  tabs: Tab[]
  children: React.ReactNode
}> = ({ children, tabs }) => {
  const [state, dispatch] = useReducer(reducer, {
    tabIndex: 0,
    tabs: tabs,
  })
  const [initialState] = useState({ tabIndex: 0, tabs: tabs })
  const value = { state, dispatch, initialState }
  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>
}

export const useTabs = () => {
  const context = useContext(TabsContext)
  if (context === undefined) {
    throw new Error('useTabs must be used within a TabsProvider')
  }
  return context
}
