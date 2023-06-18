import { useIntl, FormattedMessage } from 'react-intl'

const faqs = [
  {
    id: 1,
    question: 'quote1',
    answer: 'quote1_author',
  },
  {
    id: 2,
    question: 'quote2',
    answer: 'quote2_author',
  },
  {
    id: 4,
    question: 'quote3',
    answer: 'quote3_author',
  },
  {
    id: 6,
    question: 'quote4',
    answer: 'quote4_author',
  },
  {
    id: 3,
    question: 'quote5',
    answer: 'quote5_author',
  },
  {
    id: 5,
    question: 'quote6',
    answer: 'quote6_author',
  },
  // More questions...
]

export function Quotes() {
  const intl = useIntl()
  return (
    <div className="text-zinc-800 dark:text-zinc-100">
      <div className="mx-auto max-w-7xl divide-y-2 divide-gray-200 py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold">
          <FormattedMessage id="what_people_say" defaultMessage="What people are saying about open source" />
        </h2>
        <div className="mt-6 pt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 md:space-y-0">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className="text-lg font-medium leading-6">
                  <FormattedMessage id={faq.question} />
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  <FormattedMessage id={faq.answer} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}