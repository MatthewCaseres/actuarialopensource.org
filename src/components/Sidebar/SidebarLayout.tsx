import Sidebar from './Sidebar'

type SidebarLayoutProps = {
  children?: React.ReactNode
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center">
      <Sidebar />
      <div className="prose flex flex-grow items-end justify-end dark:prose-invert">
        <main className="xs:max-w-sm mx-auto  max-w-xs  self-end px-1 sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
          {children}
        </main>
      </div>
    </div>
  )
}

export default SidebarLayout
