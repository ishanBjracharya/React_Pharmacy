'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-green-100 py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
      
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 leading-tight mb-6">
            Trusted Medical Pharmacy <br /> Delivered to Your Doorstep
          </h1>
          <p className="text-blue-700 text-lg mb-8">
            Get your prescriptions and healthcare essentials delivered safely and swiftly. 
            Quality you can trust, convenience you deserve.
          </p>
          <div className="flex gap-4">
            <Link
              href="/products"
              className="bg-blue-700 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-800 transition duration-200"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="text-blue-700 border border-blue-700 px-6 py-3 rounded-xl text-lg hover:bg-blue-100 transition duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>

        
        <div className="md:w-1/2">
          <Image
            src="/OIP.jpeg" 
            alt="Medical Delivery Illustration"
            width={500}
            height={500}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>  
  )
}
