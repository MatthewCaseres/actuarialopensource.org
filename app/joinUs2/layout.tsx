import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join the Actuarial Open Source Community',
  description:
    'A community of actuaries and developers building open source actuarial software.',
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
