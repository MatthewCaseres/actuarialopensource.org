import SimplestLayout from '@/components/SimplestLayout'
import Lol from '@/components/Lol'
import Link from 'next/link'

export default function JoinUs() {
  return (
    <SimplestLayout>
      <h1 className="my-10">How to join us?</h1>
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
      <div>Many people are doing interesting work.</div>
      <Lol />
    </SimplestLayout>
  )
}
