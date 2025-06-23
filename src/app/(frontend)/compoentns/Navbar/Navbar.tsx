'use client'

import { useState } from 'react'
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
  Search,
} from 'lucide-react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginDropdown, setLoginDropdown] = useState(false)

  return (
    <nav className="w-full bg-gradient-to-r from-blue-700 via-sky-600 to-green-500 px-6 py-4 text-white shadow">
      <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
      
        <Link
          href="/"
          className="font-bold text-2xl tracking-wide hover:text-slate-100 transition duration-200 ease-out"
        >
          Pharmacy Delivery
        </Link>

      
        <div className="flex-grow max-w-md w-full md:mx-4">
          <SearchInput />
        </div>

        
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
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

        
          <div className="relative">
            <button
              onClick={() => setLoginDropdown(!loginDropdown)}
              className="flex items-center gap-2 hover:bg-white hover:text-blue-700 px-3 py-2 rounded-xl transition duration-200 ease-out"
            >
              <LogIn className="w-5 h-5" />
              Login
              <ChevronDown className="w-4 h-4" />
            </button>
            {loginDropdown && (
              <div className="absolute right-0 mt-2 bg-white text-blue-700 rounded-md shadow-md py-2 z-10 w-40">
                <Link
                  href="/login"
                  className="flex items-center px-4 py-2 hover:bg-blue-100"
                >
                  <User className="w-4 h-4 mr-2" /> Sign In
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center px-4 py-2 hover:bg-blue-100"
                >
                  <Settings className="w-4 h-4 mr-2" /> Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({
  href,
  label,
  Icon,
}: {
  href: string
  label: string
  Icon: React.ElementType
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-white hover:bg-white hover:text-blue-700 px-3 py-2 rounded-xl transition duration-200 ease-out"
    >
      <Icon className="w-5 h-5" />
      {label}
    </Link>
  )
}

function SearchInput() {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search..."
        className="pl-10 pr-3 py-2 w-full rounded-xl text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <Search className="absolute left-3 top-2.5 w-4 h-4 text-blue-500" />
    </div>
  )
}
