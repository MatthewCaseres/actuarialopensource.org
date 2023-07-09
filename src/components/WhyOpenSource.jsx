import { useIntl, FormattedMessage } from 'react-intl'

export function WhyOpenSource() {
  const intl = useIntl()

  return (
    <div className="prose  mx-auto max-w-7xl divide-y-2 divide-gray-200 py-10 px-4 sm:py-16 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-zinc-800 dark:text-zinc-100 ">
        <FormattedMessage id={'why?'} />
      </h2>
      <ol className="text-lg text-zinc-800 dark:text-zinc-100">
        <li>
          <FormattedMessage id={'ans2'} />
          {/* ans2 before ans1 due to refactor */}
        </li>
        <li>
          <FormattedMessage id={'ans1'} />
        </li>
        <li>
          <FormattedMessage id={'ans3'} />
        </li>
      </ol>
    </div>
  )
}
