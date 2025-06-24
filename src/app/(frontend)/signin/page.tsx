'use client'

import React, { useState } from 'react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      if (res.ok) {
        setMessage('Registration successful! You can now sign in.')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      } else {
        const data = await res.json()
        setMessage(data?.errors?.[0]?.message || 'Registration failed.')
      }
    } catch {
      setMessage('Registration failed.')
    }
    setSubmitting(false)
  }

  return (
    <main className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={submitting}
        >
          {submitting ? 'Registering...' : 'Register'}
        </button>
        {message && <div className="mt-2 text-center">{message}</div>}
      </form>
    </main>
  )
}
