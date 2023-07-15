import { useReducer, createContext, useContext, Reducer } from 'react'
import { produce, Draft } from 'immer'
import { FlatQuery } from '@/lib/query'

type TableState = {
  starsDescending: boolean
  forksDescending: boolean
  languages: Record<string, boolean>
  languagesFresh: boolean
  categories: Record<string, boolean>
  categoriesFresh: boolean
  startingRows: FlatQuery[]
  activeRows: FlatQuery[]
}

function initializeTableState(rows: FlatQuery[]): TableState {
  const sortedRows = sortRowsStarsFirst(rows, true, true)
  return {
    starsDescending: true,
    forksDescending: true,
    languages: rows.reduce((acc, row) => {
      acc[row.language] = false
      return acc
    }, {}),
    languagesFresh: true,
    categories: rows.reduce((acc, row) => {
      acc[row.category] = false
      return acc
    }, {}),
    categoriesFresh: true,
    startingRows: sortedRows,
    activeRows: sortedRows,
  }
}

type Action =
  | { type: 'toggleStars' }
  | { type: 'toggleForks' }
  | { type: 'resetFilters' }
  | { type: 'toggleLanguage'; toggled: string }
  | { type: 'toggleCategory'; toggled: string }

type TableDispatch = (action: Action) => void
const TableStateContext = createContext<TableState | undefined>(undefined)
const TableDispatchContext = createContext<TableDispatch | undefined>(undefined)

const tableReducer: Reducer<TableState, Action> = produce(
  (table: Draft<TableState>, action: Action) => {
    if (action.type === 'toggleStars') {
      table.starsDescending = !table.starsDescending
      table.activeRows = sortRowsStarsFirst(
        table.activeRows,
        table.starsDescending,
        table.forksDescending
      )
    }
    if (action.type === 'toggleForks') {
      table.forksDescending = !table.forksDescending
      table.activeRows = sortRowsForksFirst(
        table.activeRows,
        table.starsDescending,
        table.forksDescending
      )
    }
    if (action.type === 'toggleLanguage') {
      table.languages[action.toggled] = !table.languages[action.toggled]
      table.languagesFresh = false
      table.activeRows = filterRows(table)
    }
    if (action.type === 'toggleCategory') {
      table.categories[action.toggled] = !table.categories[action.toggled]
      table.categoriesFresh = false
      table.activeRows = filterRows(table)
    }
    if (action.type === 'resetFilters') {
      table.languages = Object.keys(table.languages).reduce((acc, lang) => {
        acc[lang] = false
        return acc
      }, {})
      table.categories = Object.keys(table.categories).reduce((acc, cat) => {
        acc[cat] = false
        return acc
      }, {})
      table.languagesFresh = true
      table.categoriesFresh = true
      table.activeRows = table.startingRows
    }
  }
)

function filterRows(tableState: TableState): FlatQuery[] {
  const ts = tableState
  return ts.startingRows.filter(
    (row) =>
      (ts.languagesFresh || ts.languages[row.language]) &&
      (ts.categoriesFresh || ts.categories[row.category])
  )
}

const TableProvider: React.FC<{
  rows: FlatQuery[]
  children?: React.ReactNode
}> = ({ children, rows }) => {
  const tableState = initializeTableState(rows)
  const [state, dispatch] = useReducer(tableReducer, tableState)

  return (
    <TableStateContext.Provider value={state}>
      <TableDispatchContext.Provider value={dispatch}>
        {children}
      </TableDispatchContext.Provider>
    </TableStateContext.Provider>
  )
}

function useTableState() {
  const context = useContext(TableStateContext)
  if (context === undefined) {
    throw new Error('useSidebarState must be used within a SidebarProvider')
  }
  return context
}

function useTableDispatch() {
  const context = useContext(TableDispatchContext)
  if (context === undefined) {
    throw new Error('useSidebarDispatch must be used within a SidebarProvider')
  }
  return context
}

function sortRowsStarsFirst(
  rows: FlatQuery[],
  starsDescending: boolean,
  forksDescending: boolean
): FlatQuery[] {
  return [...rows].sort((a, b) => {
    // Compare stars
    if (b.stars !== a.stars) {
      return starsDescending ? b.stars - a.stars : a.stars - b.stars
    }
    // If stars are equal, compare forks
    else if (b.forks !== a.forks) {
      return forksDescending ? b.forks - a.forks : a.forks - b.forks
    }
    // If both stars and forks are equal
    else {
      return 0
    }
  })
}

function sortRowsForksFirst(
  rows: FlatQuery[],
  starsDescending: boolean,
  forksDescending: boolean
): FlatQuery[] {
  return [...rows].sort((a, b) => {
    // Compare forks
    if (b.forks !== a.forks) {
      return forksDescending ? b.forks - a.forks : a.forks - b.forks
    }
    // If forks are equal, compare stars
    else if (b.stars !== a.stars) {
      return starsDescending ? b.stars - a.stars : a.stars - b.stars
    }
    // If both stars and forks are equal
    else {
      return 0
    }
  })
}

export { TableProvider, useTableDispatch, useTableState }
