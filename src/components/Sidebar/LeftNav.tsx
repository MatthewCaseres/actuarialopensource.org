import Chevron from './Chevron'
import {
  useSidebarState,
  useSidebarDispatch,
  StatefulNode,
} from './SidebarContext'

const TreeNode = ({ node }: { node: StatefulNode }) => {
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
      <span className="flex items-center">
        <Chevron isVisible={!!node.children} expanded={node.open} />
        <span className="ml-1">{node.title}</span>
      </span>
      {node.children && node.open && <TreeNodes nodes={node.children} />}
    </li>
  )
}

{
  /* <div class="shadow-[0_0_0_5px_rgba(0,0,0,0.3)]">
  <!-- ... -->
</div> */
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

export { LeftNav }
