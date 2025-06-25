'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Star, Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'

type ProductImage = {
  url?: string
  filename?: string
  alt?: string
  mimeType?: string
  width?: number
  height?: number
}

type Product = {
  id: string
  _id?: string
  name: string
  description?: string
  price?: number
  brand?: string
  inStock?: number
  prescriptionRequired?: boolean
  strength?: string
  dosageForm?: string
  expiryDate?: string
  rating?: number
  images?: ProductImage[]
  image?: ProductImage
  isActive?: boolean
  featured?: boolean
}

type ApiResponse = {
  docs: Product[]
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${API_URL}/api/products?limit=12`)
        if (!res.ok) throw new Error('Failed to fetch products')
        const data: ApiResponse = await res.json()
        setProducts(data.docs || [])
      } catch (err: any) {
        setError(err.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [API_URL])

  const getImageSrc = (product: Product): string => {
    const img = product.image || product.images?.[0]
    if (!img) return ''

    // Handle different image URL formats
    if (img.url) {
      return img.url.startsWith('http') ? img.url : `${API_URL}${img.url}`
    }
    if (img.filename) {
      return `${API_URL}/api/media/file/${img.filename}`
    }
    return ''
  }

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const addToCart = (product: Product) => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const productId = product._id || product.id
    const existing = storedCart.find((item: any) => item.id === productId)

    const updatedCart = existing
      ? storedCart.map((item: any) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
        )
      : [
          ...storedCart,
          {
            id: productId,
            name: product.name,
            price: product.price || 0,
            quantity: 1,
            image: getImageSrc(product),
            prescriptionRequired: product.prescriptionRequired,
          },
        ]

    localStorage.setItem('cart', JSON.stringify(updatedCart))
    router.push('/cart')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 mx-auto border-4 border-blue-500 rounded-full border-t-transparent" />
          <p className="mt-4 text-lg text-black">Loading our products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black">
        <div className="text-center max-w-md p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error loading products</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-black rounded hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12  text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-black mb-2">Our Pharmacy Products</h1>
          <p className="text-lg text-black max-w-2xl mx-auto">
            High-quality medications and healthcare products for your wellness
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => {
            const imageSrc = getImageSrc(product)
            const productId = product._id || product.id

            return (
              <div
                key={productId}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative h-60 w-full text-black">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={product.image?.alt || product.name || 'Product image'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      priority={true}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.onerror = null
                        target.src = '/placeholder-product.png'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                      No Image
                    </div>
                  )}
                  {product.prescriptionRequired && (
                    <div className="absolute top-2 left-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      Prescription Required
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-black truncate">{product.name}</h3>
                    {product.featured && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-black mb-1">
                    {product.brand && <span>Brand: {product.brand}</span>}
                  </p>
                  {product.strength && (
                    <p className="text-sm text-black mb-1">Strength: {product.strength}</p>
                  )}
                  {product.dosageForm && (
                    <p className="text-sm text-black mb-1">Dosage: {product.dosageForm}</p>
                  )}
                  <p className="text-xs text-gray-500 mb-2">
                    Expires: {formatDate(product.expiryDate)}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <p className="text-xl font-bold text-blue-600">
                        Rs. {product.price?.toFixed(2) || 'N/A'}
                      </p>
                      {product.inStock !== undefined && (
                        <p
                          className={`text-xs ${product.inStock > 0 ? 'text-green-600' : 'text-red-600'}`}
                        >
                          {product.inStock > 0 ? `${product.inStock} in stock` : 'Out of stock'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex space-x-3">
                    <button
                      onClick={() => router.push(`/products/${productId}`)}
                      className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-black hover:bg-gray-50"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock || product.inStock <= 0}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium text-black flex items-center justify-center space-x-1 ${
                        !product.inStock || product.inStock <= 0
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {products.length === 0 && !loading && (
          <div className="text-center py-20">
            <h3 className="text-lg font-medium text-black mb-2">No products found</h3>
            <p className="text-black">We couldn&apos;t find any products matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
