'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Star,
  Shield,
  Truck,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from 'lucide-react'

import Slider from './compoentns/marcus/slider'

type HomePageData = {
  title: string
  subtitle?: string
  heroImage?: {
    filename: string
    url: string
  }
  content?: any
}

type Product = {
  id: string
  title: string
  price: number
  image?: {
    url: string
  }
}

function renderRichText(node: any): React.ReactNode {
  if (!node) return null

  if (typeof node === 'string') return node

  if (Array.isArray(node)) {
    return node.map((child, i) => <React.Fragment key={i}>{renderRichText(child)}</React.Fragment>)
  }

  if (node.text) return node.text

  switch (node.type) {
    case 'root':
      return <>{renderRichText(node.children)}</>
    case 'paragraph':
      return <p className="my-2 text-gray-700">{renderRichText(node.children)}</p>
    case 'h1':
      return (
        <h1 className="text-3xl font-bold my-4 text-slate-800">{renderRichText(node.children)}</h1>
      )
    case 'h2':
      return (
        <h2 className="text-2xl font-semibold my-3 text-slate-700">
          {renderRichText(node.children)}
        </h2>
      )
    case 'h3':
      return (
        <h3 className="text-xl font-semibold my-2 text-slate-600">
          {renderRichText(node.children)}
        </h3>
      )
    default:
      return renderRichText(node.children)
  }
}

export default function Home() {
  const [data, setData] = useState<HomePageData | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [productsLoading, setProductsLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/globals/home-page')
      .then((res) => res.json())
      .then((data) => setData(data))
      .finally(() => setLoading(false))

    fetch('http://localhost:3000/api/products?limit=12')
      .then((res) => res.json())
      .then((data) => {
        if (data.docs) {
          setProducts(data.docs)
        }
      })
      .finally(() => setProductsLoading(false))
  }, [])

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>
  if (!data)
    return <p className="text-center mt-10 text-lg text-red-500">No homepage content found.</p>
  console.log(products)
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100">
      <Slider />

      {/* Featured Products */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Products</h2>

        {productsLoading ? (
          <div className="text-center">Loading products...</div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative h-64 w-full">
                    {product.image?.url ? (
                      <img
                        src={product.image.url}
                        alt={product.title}
                        className="hover:opacity-90 transition-opacity"
                      />
                    ) : (
                      <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
                    <p className="text-lg font-bold text-blue-600">
                      Rs. {product.price.toFixed(2)}
                    </p>
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No featured products available</div>
        )}
      </section>

      {/* About Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">About Us</h2>
          <p className="text-slate-600 text-lg">
            We are dedicated to making health and wellness accessible. Our pharmacy brings you
            high-quality medicines and trusted healthcare solutions, delivered to your doorstep.
            With a passion for care and a commitment to innovation, we ensure a smooth and reliable
            experience for all our customers.
          </p>
        </div>
      </section>

      {/* CMS Rich Content Section */}
      {data.content && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t">
          <div className="max-w-4xl mx-auto prose prose-slate">{renderRichText(data.content)}</div>
        </section>
      )}
    </main>
  )
}
