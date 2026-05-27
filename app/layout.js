import { Inter } from 'next/font/google'
import './globals.css'
import Navbar  from '@/components/Navbar'
import ChatBot from '@/components/ChatBot'  // ← add this

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title:       'Chaz Cox — Full Stack Developer',
  description: 'Portfolio of Chaz Cox, Full Stack Developer based ' +
               'in St. George, UT.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a0a]
                   text-gray-100 min-h-screen antialiased`}>

        <Navbar />

        <div className="pt-16">
          {children}
        </div>

        <ChatBot />  {/* ← add this — renders on every page */}

      </body>
    </html>
  )
}
