import { useReducer, createContext, useContext, Reducer } from 'react'
import { produce, Draft } from 'immer'

export type RawStatefulNode = {
  title: string
  url?: string
  children?: RawStatefulNode[]
}

type StatefulNode = {
  title: string
  url?: string
  treePath: number[]
  open: boolean
  children?: StatefulNode[]
}

function processRawNodes(
  rawNodes: RawStatefulNode[],
  treePath: number[] = []
): StatefulNode[] {
  return rawNodes.map((rawNode, index) => {
    const node: StatefulNode = {
      title: rawNode.title,
      url: rawNode.url,
      treePath: [...treePath, index],
      open: false,
      children: rawNode.children
        ? processRawNodes(rawNode.children, [...treePath, index])
        : undefined,
    }
    return node
  })
}

type Action = { type: 'toggle'; path: readonly number[] } | { type: '' }

type SidebarDispatch = (action: Action) => void
const SidebarStateContext = createContext<StatefulNode[] | undefined>(undefined)
const SidebarDispatchContext = createContext<SidebarDispatch | undefined>(
  undefined
)

const sideBarReducer: Reducer<StatefulNode[], Action> = produce(
  (nodes: Draft<StatefulNode[]>, action: Action) => {
    if (action.type === 'toggle') {
      for (let i = 0; i < action.path.length; i++) {
        const index = action.path[i]
        const node = nodes[index]
        if (i === action.path.length - 1) {
          node.open = !node.open
        } else {
          node.open = true
        }
        nodes = node.children ? node.children : nodes
      }
    }
  }
)

const SidebarProvider: React.FC<{
  rawNodes: RawStatefulNode[]
  children?: React.ReactNode
}> = ({ children, rawNodes }) => {
  const nodes = processRawNodes(rawNodes)
  const [state, dispatch] = useReducer(sideBarReducer, nodes)

  return (
    <SidebarStateContext.Provider value={state}>
      <SidebarDispatchContext.Provider value={dispatch}>
        {children}
      </SidebarDispatchContext.Provider>
    </SidebarStateContext.Provider>
  )
}

function useSidebarState() {
  const context = useContext(SidebarStateContext)
  if (context === undefined) {
    throw new Error('useSidebarState must be used within a SidebarProvider')
  }
  return context
}

function useSidebarDispatch() {
  const context = useContext(SidebarDispatchContext)
  if (context === undefined) {
    throw new Error('useSidebarDispatch must be used within a SidebarProvider')
  }
  return context
}

// write a

const rawNodes: RawStatefulNode[] = [
  {
    title: 'Welcome',
    url: '/book/welcome',
  },
  {
    title: 'IT Operations',
    children: [
      {
        title: 'Deploy dashboards with Docker (Python)',
        url: '/book/chainladder-streamlit',
      },
    ],
  },
  {
    title: 'Actuarial modeling',
    children: [
      {
        title: 'Basic financial math',
        url: '/book/basic-fm',
      },
      {
        title: 'Memoization and life contingencies',
        url: '/book/memoization-and-life',
      },
    ],
  },
  {
    title: 'GPT generated',
    children: [
      {
        title: 'Algorithms',
        url: '/book/gpt-4/algorithms',
      },
      {
        title: 'Memoization',
        url: '/book/gpt-4/memoization',
      },
      {
        title: 'Markov chains',
        url: '/book/gpt-4/02-markov',
      },
      {
        title: 'Poisson processes',
        url: '/book/gpt-4/01-poisson',
      },
    ],
  },
]

export { SidebarProvider, useSidebarState, useSidebarDispatch, rawNodes }
export type { StatefulNode }
