'use client'

import React, { useEffect, useState } from 'react'

type CartItem = {
  productId: string
  name: string
  price: number
  quantity: number
}

type Transaction = {
  id: string
  email: string
  cart: CartItem[]
  total: number
  status: string
  deliveryDate?: string
}

export default function ViewOrderPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Get user email from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('user-email')
      setEmail(storedEmail)
      if (!storedEmail) {
        setLoading(false)
        setError('Please log in to view your orders.')
      }
    }
  }, [])

  // Fetch transactions when email is available
  useEffect(() => {
    if (!email) return

    setLoading(true)
    fetch(`http://localhost:3000/api/transactions?where[email][equals]=${encodeURIComponent(email)}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error fetching orders: ${res.status}`)
        }
        return res.json()
      })
      .then(data => {
        console.log('Fetched transactions:', data.docs)
        setTransactions(data.docs || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Fetch error:', err)
        setError('Failed to load your orders. Please try again later.')
        setLoading(false)
      })
  }, [email])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-slate-600"></div>
      </div>
    )
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10 text-lg">{error}</p>
  }

  if (!email) {
    return <p className="text-center text-red-500 mt-10 text-lg">Please log in to view your orders.</p>
  }

  if (transactions.length === 0) {
    return <p className="text-center text-gray-400 mt-10 text-lg">No orders found.</p>
  }

  return (
    <main className="bg-gray-50 min-h-screen max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">🧾 My Orders</h1>
      <div className="space-y-8">
        {transactions.map(tx => (
          <div
            key={tx.id}
            className="bg-white shadow-md hover:shadow-lg transition-shadow border border-slate-200 rounded-2xl p-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <div>
                <h2 className="text-lg font-semibold text-slate-700">
                  Order ID: <span className="text-slate-500">{tx.id.slice(0, 8)}...</span>
                </h2>
                <p className="text-sm text-gray-500">Email: {tx.email}</p>
              </div>
              <span
                className={`text-xs px-4 py-1 rounded-full font-medium uppercase tracking-wide ${
                  tx.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : tx.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {tx.status}
              </span>
            </div>

            <div className="divide-y divide-gray-100 mb-4">
              {tx.cart.map((item, idx) => (
                <div key={idx} className="py-3 flex justify-between items-center text-gray-700">
                  <span className="text-sm sm:text-base">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-sm font-medium text-slate-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-right text-base sm:text-lg font-semibold text-slate-800 mb-2">
              Total: <span className="text-green-600">${tx.total.toFixed(2)}</span>
            </div>

            {tx.status === 'completed' && tx.deliveryDate && (
              <div className="text-right text-sm text-slate-500">
                Delivered on:{' '}
                <span className="text-slate-700 font-medium">
                  {new Date(tx.deliveryDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
