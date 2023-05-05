import Sidebar from './Sidebar'

type SidebarLayoutProps = {
  children?: React.ReactNode
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center">
      <Sidebar />
      <div className="prose flex flex-grow items-end justify-end dark:prose-invert">
        <main className="mx-auto max-w-xs self-end  px-1 sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-3xl">
          {children}
        </main>
      </div>
    </div>
  )
}

export default SidebarLayout
