import ProjectGrid from './ProjectGrid'
import Hero from './Hero'
import Quotes from './Quotes'

export default async function Page() {
  return (
    <div className="mx-auto max-w-2xl lg:max-w-4xl xl:max-w-6xl">
      <Hero />
      <div className="mt-16">
        <ProjectGrid />
      </div>
      <div className="mt-16">
        <Quotes />
      </div>
    </div>
  )
}
