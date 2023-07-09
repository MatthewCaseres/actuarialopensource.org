import { Metadata } from 'next'

{
  /* <title>Actuarial Open Source Community</title>
<meta
  name="description"
  content="A community of actuaries and developers building open source
      actuarial software."
/> */
}

export const metadata: Metadata = {
  title: 'Actuarial Open Source Community',
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
