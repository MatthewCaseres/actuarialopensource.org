import SimplestLayout from '@/components/SimplestLayout'
import Link from 'next/link'
import Table from '@/components/Table/Table'
import Filter from '@/components/Table/Filter'
import flatRepos from '../langs/q.json'
import { TableProvider } from '@/components/Table/TableContext'
import { useIntl, FormattedMessage } from 'react-intl'

export default function JoinUs() {
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
