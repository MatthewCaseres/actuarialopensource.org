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
      className={`my-1 rounded ${
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
    <div className="flex flex-wrap justify-center space-x-4 p-4">
      <Link href="/en">
        <LanguageButton targetLocale="en" label="English" />
      </Link>
      <Link href="/es">
        <LanguageButton targetLocale="es" label="Español" />
      </Link>
      <Link href="/zh">
        <LanguageButton targetLocale="zh" label="中文" />
      </Link>
      {/* <Link href="/de">
        <LanguageButton targetLocale="de" label="Deutsch" />
      </Link>
      <Link href="/fr">
        <LanguageButton targetLocale="fr" label="Français" />
      </Link>
      <Link href="/hi">
        <LanguageButton targetLocale="hi" label="हिन्दी" />
      </Link>
      <Link href="/ja">
        <LanguageButton targetLocale="ja" label="日本語" />
      </Link>
      <Link href="/pt-br">
        <LanguageButton targetLocale="pt-br" label="Português" />
      </Link> */}
    </div>
  )
}

export default LanguageSelector
