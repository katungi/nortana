import { CortanaIcon } from '../../../public/Icons'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function ChatLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <CortanaIcon className='w-16 ml-64 mt-8' />
          {children}
      </body>
    </html>
  )
}