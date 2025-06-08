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

  if (loading) return <p>Loading...</p>
  if (!email) return <p>Please log in to view your orders.</p>
  if (transactions.length === 0) return <p>No orders found.</p>

  return (
    <main>
      <h1>My Orders</h1>
      <ul>
        {transactions.map(tx => (
          <li key={tx.id} style={{ marginBottom: 24 }}>
            <strong>Status:</strong> {tx.status} <br />
            <strong>Total:</strong> ${tx.total} <br />
            <div>
              <strong>Products:</strong>
              <ul>
                {tx.cart.map((item, idx) => (
                  <li key={idx}>
                    {item.name} x {item.quantity} (${item.price} each)
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}