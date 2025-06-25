'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { useParams } from 'next/navigation'

import { ShoppingCart, Heart, Shield, Clock, Pill } from 'lucide-react'
import { useRouter } from 'next/navigation'

type ProductImage = {
  url?: string
  filename?: string
  alt?: string
  width?: number
  height?: number
}

type Product = {
  id: string
  name: string
  description: string
  price: number
  brand: string
  inStock: number
  prescriptionRequired: boolean
  expiryDate: string
  dosageForm: string
  strength: string
  image: ProductImage
}

export default function ProductDetails() {
  const params = useParams()
  const id = params?.id
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:3000/api/products/${id}`)
        if (!res.ok) throw new Error('Failed to fetch product')
        const data = await res.json()
        setProduct(data)
      } catch (err: any) {
        setError(err.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const getImageSrc = () => {
    if (!product?.image) return ''
    if (product.image.url) {
      return product.image.url.startsWith('http')
        ? product.image.url
        : `http://localhost:3000/${product.image.url}`
    }
    if (product.image.filename) {
      return `http://localhost:3000/api/media/file/${product.image.filename}`
    }
    return ''
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const addToCart = () => {
    if (!product) return

    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = storedCart.find((item: any) => item.id === product.id)

    const updatedCart = existing
      ? storedCart.map((item: any) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      : [
          ...storedCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: getImageSrc(),
            prescriptionRequired: product.prescriptionRequired,
          },
        ]

    localStorage.setItem('cart', JSON.stringify(updatedCart))
    router.push('/cart')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-black rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!product) {
    return <p className="text-center py-10">Product not found</p>
  }

  const imageSrc = getImageSrc()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-black">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section - Left Side */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
            <div className="relative w-full h-96">
              {imageSrc ? (
                <img src={imageSrc} alt="image" className="object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                  No Image Available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Section - Right Side */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {/* Product Header */}
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              {product.prescriptionRequired && (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  Prescription Required
                </span>
              )}
            </div>

            {/* Brand and Rating */}
            <div className="flex items-center mb-6">
              <span className="text-sm text-gray-600">Brand: {product.brand}</span>
            </div>

            {/* Price and Stock */}
            <div className="mb-6">
              <p className="text-3xl font-bold text-blue-600 mb-2">
                Rs. {product.price.toFixed(2)}
              </p>
              <p className={`text-sm ${product.inStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock > 0 ? `${product.inStock} in stock` : 'Out of stock'}
              </p>
            </div>

            {/* Product Details */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Product Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Pill className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Strength: {product.strength}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Dosage: {product.dosageForm}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Expires: {formatDate(product.expiryDate)}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={addToCart}
                disabled={product.inStock <= 0}
                className={`flex-1 py-3 px-6 rounded-lg font-medium flex items-center justify-center ${
                  product.inStock <= 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-black'
                }`}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              <button className="flex-1 py-3 px-6 border border-gray-300 rounded-lg font-medium flex items-center justify-center hover:bg-gray-50">
                <Heart className="h-5 w-5 mr-2 text-gray-500" />
                Save for Later
              </button>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Storage Instructions</h3>
                <p className="text-gray-600">
                  Store at room temperature away from moisture and heat.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Safety Information</h3>
                <p className="text-gray-600">
                  Keep out of reach of children. Consult your doctor before use if pregnant or
                  breastfeeding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
