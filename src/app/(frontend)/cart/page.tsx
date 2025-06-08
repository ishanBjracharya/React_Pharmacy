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
    // Get email from localStorage (assume you saved it at login)
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
    <main>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id} style={{ marginBottom: 16 }}>
                <strong>{item.name}</strong> - ${item.price} x {item.quantity}
                <br />
                <button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>-</button>
                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                <button onClick={() => handleRemove(item.id)} style={{ marginLeft: 8 }}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={handleBuy} disabled={buying} style={{ marginTop: 16 }}>
            {buying ? 'Processing...' : 'Buy'}
          </button>
          {message && <p>{message}</p>}
        </>
      )}
    </main>
  )
}