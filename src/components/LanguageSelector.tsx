import React from 'react'
import Link from 'next/link' // If using Next.js, otherwise use the appropriate import for your router
import { useRouter } from 'next/router'

function LanguageButton({
  targetLocale,
  label,
}: {
  targetLocale: string
  label: string
}) {
  const { locale } = useRouter()
  const isActive = locale === targetLocale
  return (
    <button
      className={`rounded ${
        isActive
          ? 'bg-gray-700 text-white dark:bg-gray-300 dark:text-black'
          : 'bg-gray-100 dark:bg-gray-800 dark:text-white'
      } px-4 py-2`}
    >
      {label}
    </button>
  )
}

const LanguageSelector = () => {
  return (
    <div className="flex justify-center space-x-4 p-4">
      <Link href="/en">
        <LanguageButton targetLocale="en" label="English" />
      </Link>
      <Link href="/es">
        <LanguageButton targetLocale="es" label="Español" />
      </Link>
      <Link href="/zh">
        <LanguageButton targetLocale="zh" label="中文" />
      </Link>
    </div>
  )
}

export default LanguageSelector
