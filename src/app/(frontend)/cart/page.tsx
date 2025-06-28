'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Minus, Plus, ShoppingCart, Trash2, CreditCard, Shield, Pill, Clock } from 'lucide-react'

type CartProduct = {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  prescriptionRequired?: boolean
  strength?: string
  dosageForm?: string
}

export default function CartPage() {
  const [cart, setCart] = useState<CartProduct[]>([])
  const [buying, setBuying] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (message.includes('✅')) {
      const timeout = setTimeout(() => {
        setMessage('')
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [message])

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(storedCart)
  }, [])

  const handleRemove = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const handleQuantityChange = (id: string, delta: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item,
    )
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleBuy = async () => {
    setBuying(true)
    setMessage('')
    const user = localStorage.getItem('user')
    const email = user ? JSON.parse(user).email : null
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
          cart: cart.map((item) => ({
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
    <div className="  bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="h-8 w-8 text-slate-700" />
          <h1 className="text-4xl font-bold text-slate-800">Your Cart</h1>
          {cart.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </Badge>
          )}
        </div>

        {cart.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="pt-6">
              <ShoppingCart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-600 mb-2">Your cart is empty</h2>
              <p className="text-slate-500">Add some items to get started!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="object-contain rounded-lg bg-slate-100"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-lg">
                            <Pill className="h-8 w-8 text-slate-300" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-1">
                              {item.name}
                            </h3>
                            {item.prescriptionRequired && (
                              <Badge variant="destructive" className="mb-2">
                                <Shield className="h-3 w-3 mr-1" />
                                Prescription Required
                              </Badge>
                            )}
                          </div>
                          <div className="text-xl font-bold text-slate-800">
                            Rs. {(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 mb-4">
                          {item.strength && (
                            <div className="flex items-center">
                              <Pill className="h-3 w-3 mr-1 text-slate-400" />
                              <span>{item.strength}</span>
                            </div>
                          )}
                          {item.dosageForm && (
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1 text-slate-400" />
                              <span>{item.dosageForm}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, -1)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemove(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Subtotal</span>
                      <span className="font-medium">Rs. {total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-2xl font-bold text-green-600">
                        Rs. {total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleBuy}
                    disabled={buying || cart.some((item) => item.prescriptionRequired)}
                    className="w-full h-12 text-base font-semibold"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Payment
                  </Button>

                  {cart.some((item) => item.prescriptionRequired) && (
                    <div className="text-sm text-red-600 p-3 bg-red-50 rounded-lg">
                      Prescription required for some items. Please consult a doctor before purchase.
                    </div>
                  )}

                  {message && (
                    <div
                      className={`p-3 rounded-lg text-sm font-medium ${
                        message.includes('✅')
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {message}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {message && (
          <div
            className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-md shadow-md transition-all duration-300
      ${
        message.includes('✅')
          ? 'bg-green-100 text-green-700 border border-green-300'
          : 'bg-red-100 text-red-700 border border-red-300'
      }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  )
}
