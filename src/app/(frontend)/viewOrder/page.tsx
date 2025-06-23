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
}

export default function ViewOrderPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const email = typeof window !== 'undefined' ? localStorage.getItem('user-email') : null

  useEffect(() => {
    if (!email) {
      setLoading(false)
      return
    }
    fetch(`http://localhost:3000/api/transactions?where[email][equals]=${email}`)
      .then(res => res.json())
      .then(data => {
        setTransactions(data.docs || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [email])

  if (loading) return <p className="text-center text-gray-600 mt-10">Loading...</p>
  if (!email) return <p className="text-center text-red-600 mt-10">Please log in to view your orders.</p>
  if (transactions.length === 0) return <p className="text-center text-gray-500 mt-10">No orders found.</p>

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">🧾 My Orders</h1>
      <div className="space-y-6">
        {transactions.map(tx => (
          <div
            key={tx.id}
            className="bg-white shadow rounded-lg p-6 border border-slate-200"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-700">
                  Order ID: <span className="text-slate-500">{tx.id.slice(0, 8)}...</span>
                </h2>
                <p className="text-sm text-gray-500">Email: {tx.email}</p>
              </div>
              <span
                className={`text-sm px-3 py-1 rounded-full font-medium ${
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
                <div key={idx} className="py-2 flex justify-between text-gray-700">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="text-right font-semibold text-slate-800">
              Total: <span className="text-green-600">${tx.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
