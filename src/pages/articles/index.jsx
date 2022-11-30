import { SimpleLayout } from '@/components/SimpleLayout'
import { Article } from '@/components/Article'
import { getAllArticles } from '@/lib/getAllArticles'

export default function lol({ articles }) {
  return (
    <SimpleLayout
      title="Blog posts"
      intro="Thoughts on open source technology and actuarial science collected in chronological order."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}

export async function getStaticProps() {
  //   if (process.env.NODE_ENV === 'production') {
  //     await generateRssFeed()
  //   }
  return {
    props: {
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta),
    },
  }
}
