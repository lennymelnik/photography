import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Leonard Melnik | NYC Street Photography',
  description: "A look at NYC.",
   icons: {
    icon: '/leonard.jpg',
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
