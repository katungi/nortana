import { Inter } from "next/font/google";
import { CortanaIcon } from "../../../public/Icons";

const inter = Inter({ subsets: ['latin'] })

export default function VoiceLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <CortanaIcon className='w-16 ml-64 mt-8' /> */}
        {children}
      </body>
    </html>
  )
}