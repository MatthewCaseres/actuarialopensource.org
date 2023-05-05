import Link from 'next/link'
import Chevron from './Chevron'
import {
  useSidebarState,
  useSidebarDispatch,
  StatefulNode,
} from './SidebarContext'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'

const TreeNodeBase = ({ node }: { node: StatefulNode }) => {
  const dispatch = useSidebarDispatch()

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation()
    if (node.children) {
      dispatch({
        type: 'toggle',
        path: node.treePath,
      })
    }
  }

  return (
    <li onClick={handleClick} className="p-1">
      <span className="group flex items-center">
        <Chevron isVisible={!!node.children} expanded={node.open} />
        <span className="ml-1 rounded p-1 ">
          <span>{node.title}</span>
        </span>
      </span>
      {node.children && node.open && <TreeNodes nodes={node.children} />}
    </li>
  )
}
// ${
//   router.asPath === node.url ? 'text-indigo-500' : ''
// }
const TreeNode = ({ node }: { node: StatefulNode }) => {
  const router = useRouter()
  return node.url ? (
    <Link href={node.url}>
      <div
        className={`hover:bg-gray-200 hover:text-indigo-500 hover:underline dark:hover:bg-gray-700 ${
          router.asPath === node.url
            ? 'bg-gray-100 text-indigo-500 dark:bg-gray-800'
            : ''
        }`}
      >
        <TreeNodeBase node={node} />
      </div>
    </Link>
  ) : (
    <TreeNodeBase node={node} />
  )
}

const TreeNodes = ({ nodes }: { nodes: StatefulNode[] }) => {
  return (
    <ul className="ml-[.85rem] border-l border-gray-300 dark:border-gray-700">
      {nodes.map((node, i) => (
        <TreeNode key={i} node={node} />
      ))}
    </ul>
  )
}

function LeftNav() {
  const sidebarState = useSidebarState()
  const dispatch = useSidebarDispatch()

  const router = useRouter()
  useEffect(() => {
    const node = findNodeByUrl(sidebarState, router.asPath)
    if (node) {
      dispatch({
        type: 'toggle',
        path: node.treePath,
      })
    }
  }, [router.asPath])

  return (
    <div className="select-none font-light text-gray-700 dark:text-gray-200">
      <ul className="ml-2">
        {sidebarState.map((node, i) => (
          <TreeNode key={i} node={node} />
        ))}
      </ul>
    </div>
  )
}

// write a dfs to find the node with the given url
function findNodeByUrl(
  nodes: StatefulNode[],
  url: string
): StatefulNode | undefined {
  for (const node of nodes) {
    if (node.url === url) {
      return node
    }
    if (node.children) {
      const found = findNodeByUrl(node.children, url)
      if (found) {
        return found
      }
    }
  }
  return undefined
}

export { LeftNav }
