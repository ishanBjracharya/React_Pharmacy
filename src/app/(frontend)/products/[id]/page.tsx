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
    // Check if already in cart
    const exists = cart.find((item: any) => item.id === product.id)
    if (!exists) {
      cart.push({ ...product, quantity: 1 })
      localStorage.setItem('cart', JSON.stringify(cart))
      setAdded(true)
    } else {
      // Optionally, increase quantity if already in cart
      exists.quantity += 1
      localStorage.setItem('cart', JSON.stringify(cart))
      setAdded(true)
    }
  }

  if (loading) return <p>Loading...</p>
  if (!product) return <p>Product not found.</p>

  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <div>Price: ${product.price}</div>
      <div>Stock: {product.inStock}</div>
      {product.brand && <div>Brand: {product.brand}</div>}
      {product.sku && <div>SKU: {product.sku}</div>}
      {product.prescriptionRequired && (
        <div style={{ color: 'red' }}>Prescription Required</div>
      )}
      {product.expiryDate && <div>Expiry: {product.expiryDate}</div>}
      {product.dosageForm && <div>Dosage Form: {product.dosageForm}</div>}
      {product.strength && <div>Strength: {product.strength}</div>}
      {product.category && <div>Category: {product.category}</div>}
      {product.tags && product.tags.length > 0 && (
        <div>
          Tags: {product.tags.map(t => t.tag).join(', ')}
        </div>
      )}
      {product.image && (
        <div>
          <Image src={product.image} alt={product.name} style={{ maxWidth: 300 }}
          width={600}
          height={400} className="rounded-lg shadow-lg"
          />
        </div>
      )}
      <button onClick={handleAddToCart} disabled={added} style={{ marginTop: 16 }}>
        {added ? 'Added to Cart' : 'Add to Cart'}
      </button>
    </main>
  )
}