// boilerplate div returns

import { FormattedMessage, useIntl } from 'react-intl'

type HeadLineProps = {
  children: React.ReactNode
  headline_id: string
}

export default function HeadLine({ children, headline_id }: HeadLineProps) {
  const intl = useIntl()
  return (
    <div className="mx-auto max-w-7xl  space-y-3 divide-y-2 divide-gray-200 py-10 px-4 dark:divide-gray-400 sm:py-16 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-zinc-800 dark:text-zinc-100 ">
        <FormattedMessage id={headline_id} />
      </h2>
      {children}
    </div>
  )
}
