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
        setMessage('Purchase successful!')
        setCart([])
        localStorage.removeItem('cart')
      } else {
        setMessage('Purchase failed. Please try again.')
      }
    } catch {
      setMessage('Purchase failed. Please try again.')
    }
    setBuying(false)
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {cart.map(item => (
                <li key={item.id} className="py-4 flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
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
                  <div className="text-right font-semibold text-blue-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-between items-center border-t pt-4">
              <h3 className="text-xl font-semibold">Total:</h3>
              <h3 className="text-xl font-bold text-green-600">${total.toFixed(2)}</h3>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                onClick={handleBuy}
                disabled={buying}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                {buying ? 'Processing...' : 'Buy'}
              </button>
            </div>

            {message && (
              <p className="mt-4 text-center text-sm font-medium text-gray-700">
                {message}
              </p>
            )}
          </>
        )}
      </div>
    </main>
  )
}
