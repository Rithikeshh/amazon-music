import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar/Navbar'
import AuthProvider from './providers/AuthProvider'
import MusicProvider from './providers/MusicProvider'
import SearchValueProvider from './providers/SearchValueProvider'
import AskForSignProvider from './providers/AskForSignProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Amazon Music',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <SearchValueProvider>
          <AskForSignProvider>
        <MusicProvider>
          <Navbar/>
          {children}
        </MusicProvider>
        </AskForSignProvider>
        </SearchValueProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
