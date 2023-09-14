/**
 * Root layout component for the Family Guy app.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The rendered root layout.
 */

import './globals.css'
import { Inter } from 'next/font/google'
import { Navigation } from '@/components'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Family Guy - Know your Guy',
  description:
    'Family Guy is one of the popular TV shows around the world. It is now available to watch in Disney Hotstar. You can see this website to get to know about them in detail for a headsup',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
