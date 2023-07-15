import SimplestLayout from '@/components/SimplestLayout'
import Table from '@/components/Table/Table'
// import flatRepos from '../langs/q.json'
import { TableProvider } from '@/components/Table/TableContext'
import { useIntl, FormattedMessage } from 'react-intl'
import { getReposFlat, reposConfig } from '@/lib/query'

export default function JoinUs({ flatRepos }) {
  const intl = useIntl()
  return (
    <SimplestLayout>
      <div className="prose dark:prose-invert">
        <h1 className="mt-24">
          <FormattedMessage id="all_projects" defaultMessage="All Projects" />
        </h1>
        <div>
          <FormattedMessage
            id="add_here"
            defaultMessage="Add your project here"
          />
        </div>
      </div>
      <TableProvider rows={flatRepos}>
        <Table />
      </TableProvider>
    </SimplestLayout>
  )
}

export async function getStaticProps() {
  //   if (process.env.NODE_ENV === 'production') {
  //     await generateRssFeed()
  //   }
  // truncate to only have six repos from the repoConfig
  const flatRepos = (await getReposFlat(reposConfig)).sort(
    (a, b) => b.stars - a.stars
  )
  return {
    props: {
      flatRepos,
    },
    revalidate: 60 * 60 * 3,
  }
}
