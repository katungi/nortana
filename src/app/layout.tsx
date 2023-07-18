import { Toaster } from 'react-hot-toast'
import './globals.css'
import { Inter } from 'next/font/google'
import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cortana',
  description: 'We miss cortana, so we built it!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
