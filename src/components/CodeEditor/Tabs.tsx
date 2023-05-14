import { TabsProvider, useTabs } from './EditorContext'
import PythonSVG from './PythonSVG'

export default function Tabs() {
  const {
    state: { tabIndex, tabs },
    dispatch,
  } = useTabs()

  return (
    <div className="flex text-xs font-semibold ">
      {tabs.map((tab, i) => (
        <div
          key={i}
          className={`flex select-none items-center border-r
           ${
             i === tabIndex ? 'text-neutral-200' : 'text-neutral-400'
           } border-black bg-neutral-900 p-2 text-center`}
          style={{ backgroundColor: i == tabIndex ? '#323232' : '' }}
          onClick={() => dispatch({ type: 'SET_TAB_INDEX', payload: i })}
        >
          <PythonSVG />
          <span>{tab.title + '.py'}</span>
        </div>
      ))}
    </div>
  )
}
