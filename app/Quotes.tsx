/* This example requires Tailwind CSS v2.0+ */
const faqs = [
  {
    id: 1,
    question: 'Open source is about collaborating; not competing.',
    answer: 'Kelsey Hightower, principal engineer for Google Cloud',
  },
  {
    id: 2,
    question:
      'In real open source, you have the right to control your own destiny.',
    answer: 'Linus Torvalds, creator of Linux',
  },
  {
    id: 4,
    question:
      "Certainly there's a phenomenon around open source. You know free software will be a vibrant area. There will be a lot of neat things that get done there.",
    answer: 'Bill Gates, founder of Microsoft',
  },

  {
    id: 6,
    question:
      'Once open source gets good enough, competing with it would be insane.',
    answer: 'Larry Ellison, founder of Oracle',
  },
  {
    id: 3,
    question:
      'Empowerment of individuals is a key part of what makes open source work, since in the end, innovations tend to come from small groups, not from large, structured efforts.',
    answer: "Tim O'Reilly, founder of O'Reilly Media",
  },
  {
    id: 5,
    question:
      'Microsoft was on the wrong side of history when open source exploded at the beginning of the century ... The good news is that, if life is long enough, you can learn that you need to change.',
    answer: "Brad Smith, Microsoft's president and vice chair",
  },

  // More questions...
]

export default async function Quotes() {
  return (
    <div className="text-zinc-800 dark:text-zinc-100">
      <div className="mx-auto max-w-7xl divide-y-2 divide-gray-200 py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold">
          What people are saying about open source
        </h2>
        <div className="mt-6 pt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 md:space-y-0">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className="text-lg font-medium leading-6">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
