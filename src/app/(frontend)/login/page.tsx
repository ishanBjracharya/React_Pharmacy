'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError('')

  try {
    const res = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      const data = await res.json()

      if (data.token) {
        localStorage.setItem('payload-token', data.token)
      }

      const user = {
        name: data.user.name || data.user.email,
        email: data.user.email,
      }

      localStorage.setItem('user', JSON.stringify(user))

      // 🔥 Force refresh so Navbar updates
      window.location.href = '/'
    } else {
      setError('Invalid email or password')
    }
  } catch (err) {
    console.error('Login failed:', err)
    setError('Something went wrong. Please try again.')
  }
}


  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-slate-800 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full text-slate-600 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 text-slate-500 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hover:shadow-md transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  )
}
