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

  const products = [
    {
      id: 1,
      name: "Paracetamol",
      description: "Effective for mild to moderate pain relief.",
      image: "/paracetamol.jpeg",
    },
    {
      id: 2,
      name: "Vitamin C",
      description: "Boosts immunity and promotes skin health.",
      image: "/vitaminc.jpeg",
    },
    {
      id: 3,
      name: "Cough Syrup",
      description: "Soothes sore throat and reduces coughing.",
      image: "/coughsyrup.jpeg",
    },
    {
      id: 4,
      name: "Antibiotics",
      description: "Treats bacterial infections effectively.",
      image: "/products/antibiotics.jpg",
    },
    {
      id: 5,
      name: "Pain Relief Balm",
      description: "Relieves muscle and joint pain.",
      image: "/products/balm.jpg",
    },
    {
      id: 6,
      name: "Allergy Relief",
      description: "Quick relief from allergic symptoms.",
      image: "/products/allergy.jpg",
    },
    {
      id: 7,
      name: "Multivitamins",
      description: "Daily supplement for overall health.",
      image: "/products/multivitamins.jpg",
    },
    {
      id: 8,
      name: "Energy Booster",
      description: "Instant energy for a busy day.",
      image: "/products/energy.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 flex flex-col items-center px-4">
      {/* HERO SECTION */}
      <section className="w-full max-w-6xl bg-white rounded-xl shadow-xl p-8 mt-12 mb-8 text-center flex flex-col items-center">
        {data.heroImage && (
          <Image
            src={data.heroImage}
            alt="Hero Image"
            width={600}
            height={300}
            className="rounded-lg mb-6 shadow-lg object-cover"
          />
        )}
        <h1 className="text-5xl font-extrabold text-blue-800 mb-3 drop-shadow">
          {data.title || 'Welcome to Your Trusted Pharmacy'}
        </h1>
        <p className="text-xl text-gray-600 mb-5 max-w-2xl">
          {data.subtitle || 'Fast delivery. Certified medicines. Health & care at your fingertips.'}
        </p>
        <Link
          href="/products"
          className="mt-2 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-lg shadow-md transition-all duration-300"
        >
          Shop Now
        </Link>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="w-full max-w-7xl mb-16 px-4">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-10">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden group transition transform hover:scale-105 duration-300"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={300}
                className="w-full h-[300px] object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{product.description}</p>
              </div>
              <div className="absolute inset-0 bg-blue-700 bg-opacity-0 group-hover:bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Link
                  href="/products"
                  className="text-white text-lg font-semibold border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-700 transition"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US SECTION */}
      <section className="w-full max-w-6xl bg-white rounded-xl shadow-xl p-10 mb-16">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-lg">
          <div>✔ Fast and secure delivery at your doorstep.</div>
          <div>✔ Trusted by thousands of satisfied customers.</div>
          <div>✔ Certified and approved pharmaceutical products.</div>
          <div>✔ 24/7 customer support with expert consultation.</div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="w-full max-w-6xl bg-blue-100 rounded-xl shadow-xl p-10 mb-16">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="italic">&quot;Excellent service! Medicines delivered on time and well-packaged.&quot;</p>
            <p className="mt-2 font-bold text-blue-800">— Aayush, Kathmandu</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="italic">&quot;Customer support was very helpful with my prescription needs!&quot;</p>
            <p className="mt-2 font-bold text-blue-800">— Sneha, Pokhara</p>
          </div>
        </div>
      </section>

      {/* HEALTH TIPS SECTION */}
      <section className="w-full max-w-6xl bg-white rounded-xl shadow-xl p-10 mb-16">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Health Tips</h2>
        <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
          <li>Stay hydrated — drink at least 8 glasses of water a day.</li>
          <li>Exercise regularly to maintain your mental and physical health.</li>
          <li>Don’t skip breakfast — it fuels your day!</li>
          <li>Take vitamins and medications as prescribed by your doctor.</li>
        </ul>
      </section>

      {/* NEWSLETTER SIGNUP */}
      <section className="w-full max-w-4xl bg-blue-700 rounded-xl shadow-xl p-10 mb-20 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Updated With Us</h2>
        <p className="mb-6">Get exclusive health tips, offers & product updates directly in your inbox.</p>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg w-full sm:w-80 text-black"
          />
          <button
            type="submit"
            className="bg-white text-blue-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="text-gray-500 text-sm mt-auto mb-8 text-center">
        &copy; {new Date().getFullYear()} Pharmacy Delivery. All rights reserved.
      </footer>
    </main>
  );
}
