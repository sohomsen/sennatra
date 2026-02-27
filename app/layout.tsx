import type { Metadata, Viewport } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'
import './globals.css'

import { TransitionProvider } from '@/components/transition/TransitionProvider'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import Nav from '@/components/nav/Nav'
// TransitionCanvasLoader is 'use client' and owns the ssr:false dynamic import
// (Next.js 15+ forbids dynamic({ssr:false}) inside Server Components)
import TransitionCanvasLoader from '@/components/transition/TransitionCanvasLoader'
import { Footer } from '@/components/ui/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | sennatra',
    default: 'sennatra',
  },
  description:
    'Electronic artist. Dark ambient. Industrial. Official website of sennatra.',
  openGraph: {
    type: 'website',
    siteName: 'sennatra',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body suppressHydrationWarning>
        <TransitionProvider>
          <SmoothScrollProvider>
            <Nav />
            <TransitionCanvasLoader />
            {children}
            <Footer />
          </SmoothScrollProvider>
        </TransitionProvider>
      </body>
    </html>
  )
}
