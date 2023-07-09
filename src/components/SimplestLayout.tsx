type SimplestLayoutProps = {
  children?: React.ReactNode
}

const SimplestLayout: React.FC<SimplestLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div className="prose flex flex-grow items-end justify-end dark:prose-invert">
        <main className="xs:max-w-sm mx-auto  max-w-xs  self-end px-1 sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
          {children}
        </main>
      </div>
    </div>
  )
}

export default SimplestLayout
