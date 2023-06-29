import { useIntl, FormattedMessage } from 'react-intl'

export function WhyOpenSource() {
  const intl = useIntl()

  return <div className="text-zinc-800 dark:text-zinc-100">
    <div className="mx-auto max-w-7xl divide-y-2 divide-gray-200 py-10 px-4 sm:py-16 sm:px-6 lg:px-8 prose">
      <h2 className="text-3xl font-extrabold">
      <FormattedMessage id={"why?"} />
      </h2>
      <ol className="text-lg">
        <li>
        <FormattedMessage id={"ans1"} />
        </li>
        <li>
        <FormattedMessage id={"ans2"} />
        </li>
        <li>
        <FormattedMessage id={"ans3"} />
        </li>
      </ol>
    </div>
  </div>
}