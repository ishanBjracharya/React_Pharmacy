'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type HomePageData = {
  title: string
  subtitle?: string
  heroImage?: string
  content?: string
}

export default function Home() {
  const [data, setData] = useState<HomePageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/globals/home-page')
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>
  if (!data) return <p className="text-center mt-10 text-lg text-red-500">No homepage content found.</p>

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 flex flex-col items-center justify-center px-4">
      <section className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 mt-12 mb-8 flex flex-col items-center">
        {data.heroImage && (
          <Image
            src={data.heroImage}
            alt="Hero"
            className="w-full max-w-xs rounded-lg mb-6 shadow"
            width={600}
            height={400}
          />
        )}
        <h1 className="text-4xl font-bold text-blue-700 mb-2 text-center">{data.title}</h1>
        {data.subtitle && (
          <h2 className="text-xl text-gray-600 mb-4 text-center">{data.subtitle}</h2>
        )}
        {data.content && (
          <div
            className="prose prose-lg text-gray-700 mt-4"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        )}
        <Link
          href="/products"
          className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition"
        >
          Shop Now
        </Link>
      </section>
      <footer className="text-gray-500 text-sm mt-auto mb-4">
        &copy; {new Date().getFullYear()} Pharmacy Delivery. All rights reserved.
      </footer>
    </main>
  )
}