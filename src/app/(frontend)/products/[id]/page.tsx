'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'

type Product = {
  id: string
  name: string
  description: string
  brand?: string
  price: number
  inStock: number
  sku?: string
  prescriptionRequired: boolean
  expiryDate?: string
  dosageForm?: string
  strength?: string
  tags?: { tag: string }[]
  image?: string
  category?: string
  isActive: boolean
  featured: boolean
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:3000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const handleAddToCart = () => {
    if (!product) return
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const exists = cart.find((item: any) => item.id === product.id)
    if (!exists) {
      cart.push({ ...product, quantity: 1 })
      localStorage.setItem('cart', JSON.stringify(cart))
      setAdded(true)
    } else {
      exists.quantity += 1
      localStorage.setItem('cart', JSON.stringify(cart))
      setAdded(true)
    }
  }

  if (loading) return <p>Loading...</p>
  if (!product) return <p>Product not found.</p>

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Product Image */}
        {product.image && (
          <div className="flex-shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg shadow-lg object-contain"
            />
          </div>
        )}

        {/* Right: Product Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>

          <div className="space-y-2 text-gray-800">
            <div>💵 <strong>Price:</strong> ${product.price}</div>
            <div>📦 <strong>Stock:</strong> {product.inStock}</div>
            {product.brand && <div><strong>Brand:</strong> {product.brand}</div>}
            {product.sku && <div><strong>SKU:</strong> {product.sku}</div>}
            {product.prescriptionRequired && (
              <div className="text-red-600 font-semibold">⚠️ Prescription Required</div>
            )}
            {product.expiryDate && <div><strong>Expiry:</strong> {product.expiryDate}</div>}
            {product.dosageForm && <div><strong>Dosage Form:</strong> {product.dosageForm}</div>}
            {product.strength && <div><strong>Strength:</strong> {product.strength}</div>}
            {product.category && <div><strong>Category:</strong> {product.category}</div>}
            {product.tags && product.tags.length > 0 && (
              <div><strong>Tags:</strong> {product.tags.map(t => t.tag).join(', ')}</div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`mt-6 px-6 py-2 rounded-lg text-white font-semibold ${
              added ? 'bg-green-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {added ? '✔ Added to Cart' : '🛒 Add to Cart'}
          </button>
        </div>
      </div>
    </main>
  )
}
