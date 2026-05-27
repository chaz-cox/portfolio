'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Home',       href: '/'           },
  { label: 'Projects',   href: '/projects'   },
  { label: 'Experience', href: '/experience' },
  { label: 'Education',  href: '/education'  },
  // { label: 'Showcase',   href: '/showcase'   },
  { label: 'Contact',    href: '/contact'    },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50
                 bg-[#0a0a0a]/80 backdrop-blur-md
                 border-b border-gray-800">
      <div className="max-w-3xl mx-auto px-6 h-16
                   flex items-center justify-between">

        {/* Logo / name */}
        <Link
          href="/"
          className="font-semibold text-white
                     hover:text-blue-400 transition text-sm"
        >
          Chaz Cox
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`px-3 py-1.5 rounded-lg text-sm transition
                ${pathname === href
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-400 hover:text-white
                     transition text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-800
                     bg-[#0a0a0a] px-6 py-3 flex flex-col gap-1">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm transition
                ${pathname === href
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
