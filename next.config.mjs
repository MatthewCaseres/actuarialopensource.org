import nextra from 'nextra'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['jsx', 'mdx', 'tsx'],
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    //supported languages
    locales: ['en', 'es', 'zh', 'de', 'fr', 'hi', 'ja', 'pt-br'],
    defaultLocale: 'en',
  },
}

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  flexsearch: true,
  themeConfig: './theme.config.jsx'
})
 
export default withNextra(nextConfig)
