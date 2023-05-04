import Sidebar from './Sidebar'

type SidebarLayoutProps = {
  children?: React.ReactNode
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center">
      <Sidebar />
      <div className="prose flex-grow dark:prose-invert">
        <main className="mx-auto max-w-4xl p-8">{children}</main>
      </div>
    </div>
  )
}

export default SidebarLayout
