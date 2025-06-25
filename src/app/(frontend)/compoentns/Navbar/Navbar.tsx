'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Menu,
  ShoppingCart,
  LogIn,
  Package,
  LayoutGrid,
  ChevronDown,
  User,
  Settings,
} from 'lucide-react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginDropdown, setLoginDropdown] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (err) {
        console.error('Invalid user data in storage.')
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setLoginDropdown(false)
  }

  return (
    <nav className="w-full bg-slate-800 px-6 py-4 shadow">
      <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
        <Link
          href="/"
          className="font-bold text-white hover:bg-slate-700 text-2xl px-3 py-2 rounded-xl transition"
        >
          Pharmacy Delivery
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none p-2 rounded-xl transition"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div
          className={`w-full md:w-auto md:flex items-center gap-4 ${
            menuOpen ? 'block' : 'hidden md:flex'
          }`}
        >
          <NavLink href="/products" label="Products" Icon={Package} />
          <NavLink href="/cart" label="Cart" Icon={ShoppingCart} />
          <NavLink href="/viewOrder" label="My Orders" Icon={LayoutGrid} />

          {user ? (
            <div className="relative">
              <button
                onClick={() => setLoginDropdown(!loginDropdown)}
                className="flex items-center gap-2 text-white px-3 py-2 rounded-xl transition hover:bg-slate-700"
              >
                <User className="w-5 h-5" />
                {user.name}
                <ChevronDown className="w-4 h-4" />
              </button>
              {loginDropdown && (
                <div className="absolute right-0 mt-2 bg-white text-slate-900 rounded-md shadow-md py-2 z-10 w-40">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-4 py-2 hover:bg-slate-100 transition"
                  >
                    <LogIn className="w-4 h-4 mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setLoginDropdown(!loginDropdown)}
                className="flex items-center gap-2 text-white px-3 py-2 rounded-xl transition hover:bg-slate-700"
              >
                <LogIn className="w-5 h-5" />
                Login
                <ChevronDown className="w-4 h-4" />
              </button>
              {loginDropdown && (
                <div className="absolute right-0 mt-2 bg-white text-slate-900 rounded-md shadow-md py-2 z-10 w-40">
                  <Link
                    href="/login"
                    className="flex items-center px-4 py-2 hover:bg-slate-100 transition"
                  >
                    <User className="w-4 h-4 mr-2" /> Sign In
                  </Link>
                  <Link
                    href="/signin"
                    className="flex items-center px-4 py-2 hover:bg-slate-100 transition"
                  >
                    <Settings className="w-4 h-4 mr-2" /> Register
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

function NavLink({
  href,
  label,
  Icon,
  hoverBg = 'hover:bg-slate-700',
}: {
  href: string
  label: string
  Icon: React.ElementType
  hoverBg?: string
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 text-white px-3 py-2 rounded-xl transition hover:text-slate-800 ${hoverBg}`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </Link>
  )
}
