'use client'

import React, { useEffect, useState } from 'react'

type CartProduct = {
  id: string
  name: string
  price: number
  quantity: number
}

export default function CartPage() {
  const [cart, setCart] = useState<CartProduct[]>([])
  const [buying, setBuying] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(storedCart)
  }, [])

  const handleRemove = (id: string) => {
    const updatedCart = cart.filter(item => item.id !== id)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const handleQuantityChange = (id: string, delta: number) => {
    const updatedCart = cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    )
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleBuy = async () => {
    setBuying(true)
    setMessage('')
    const email = localStorage.getItem('user-email')
    if (!email) {
      setMessage('Please log in to complete your purchase.')
      setBuying(false)
      return
    }
    try {
      const res = await fetch('http://localhost:3000/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          cart: cart.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total,
        }),
      })
      if (res.ok) {
        setMessage('✅ Purchase successful!')
        setCart([])
        localStorage.removeItem('cart')
      } else {
        setMessage('❌ Purchase failed. Please try again.')
      }
    } catch {
      setMessage('❌ Purchase failed. Please try again.')
    }
    setBuying(false)
  }

  return (

    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.map(item => (
              <li
                key={item.id}
                className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)} × {item.quantity}</p>
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-sm rounded disabled:opacity-50"
                    >
                      −
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-sm rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="ml-4 text-red-600 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-lg font-medium text-slate-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-right">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Total: <span className="text-green-600">${total.toFixed(2)}</span>
            </h3>
            <button
              onClick={handleBuy}
              disabled={buying}
              className={`px-6 py-3 rounded-lg font-semibold text-white ${
                buying ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {buying ? 'Processing...' : 'Buy Now'}
            </button>
            {message && <p className="mt-4 text-sm text-slate-700">{message}</p>}
          </div>
        </>
      )}

    </main>
  )
}
