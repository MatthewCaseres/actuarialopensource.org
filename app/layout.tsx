import './styles/globals.css'
import Header from './Header'

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex h-full flex-col bg-white dark:bg-black">
        <Header />
        {children}
      </body>
    </html>
  )
}
