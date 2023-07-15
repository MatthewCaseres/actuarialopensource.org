import SimplestLayout from '@/components/SimplestLayout'
import Link from 'next/link'
import Table from '@/components/Table'
import Filter from '@/components/Filter'

export default function JoinUs() {
  return (
    <SimplestLayout>
      <div className="prose dark:prose-invert">
        <h1 className="mt-24">How to join us?</h1>
        <ul>
          <li>
            <span>This website is associated with a group on </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/groups/13961522/"
            >
              LinkedIn
            </a>
          </li>
          <li>
            You don't need to be on LinkedIn to be a member of the open source
            community, you just need to share code under an open source license.
          </li>
        </ul>
        <div className="mt-10 mb-12">
          Many people are doing interesting work.
        </div>
      </div>
      <Table />
    </SimplestLayout>
  )
}
