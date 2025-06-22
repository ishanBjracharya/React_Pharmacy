'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import {
  Heart,
  Shield,
  Truck,
  Clock,
  Phone,
  Mail,
  MapPin,
  Star,
  ShoppingCart,
  Search,
  Menu,
  Pill,
  Stethoscope,
  Users,
  Award,
} from "lucide-react"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

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

const featuredProducts = [
    {
      id: 1,
      name: "Vitamin D3 Supplements",
      price: "$24.99",
      originalPrice: "$29.99",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 124,
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Blood Pressure Monitor",
      price: "$89.99",
      originalPrice: "$109.99",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 89,
      badge: "New",
    },
    {
      id: 3,
      name: "First Aid Kit",
      price: "$34.99",
      originalPrice: "$44.99",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 156,
      badge: "Sale",
    },
    {
      id: 4,
      name: "Omega-3 Fish Oil",
      price: "$19.99",
      originalPrice: "$24.99",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
      reviews: 203,
      badge: "Popular",
    },
  ]

  const services = [
    {
      icon: <Pill className="h-8 w-8" />,
      title: "Prescription Services",
      description: "Fast and accurate prescription filling with licensed pharmacists",
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Free Delivery",
      description: "Free same-day delivery for orders over $50 in your area",
    },
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "Health Consultations",
      description: "Professional health advice and medication counseling",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for your health needs",
    },
  ]



  

  return (
   <div className="min-h-screen bg-white">
      {/* Navigation */}
    

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-50 to-blue-50 py-20">
        <div className="container px-4">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Trusted by 50,000+ customers</Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                  Your Health, Our <span className="text-green-600">Priority</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-[600px]">
                  Get your medications delivered fast and safely. Licensed pharmacists, quality products, and
                  exceptional service - all at your fingertips.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Shop Now
                  
                </Button>
                <Button size="lg" variant="outline">
                  Upload Prescription
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>FDA Approved</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Pharmacy Hero"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular health and wellness products, carefully selected by our licensed pharmacists.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-4">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-green-600">{product.badge}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-green-600">{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className=" mx-auto container px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800">About MediCare+</Badge>
                <h2 className="text-3xl font-bold">Trusted Healthcare Partner Since 1995</h2>
                <p className="text-gray-600 text-lg">
                  For over 25 years, MediCare+ has been serving communities with reliable pharmaceutical services. We
                  combine traditional pharmacy values with modern technology to provide you with the best healthcare
                  experience.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold">50,000+</div>
                    <div className="text-sm text-gray-600">Happy Customers</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <Award className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold">25+ Years</div>
                    <div className="text-sm text-gray-600">Experience</div>
                  </div>
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">Learn More About Us</Button>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="About Us"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare services designed to meet all your medical needs with convenience and care.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-green-600">
        <div className="container px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for health tips, product updates, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="bg-white text-gray-900" />
              <Button className="bg-white text-green-600 hover:bg-gray-100">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">MediCare+</span>
              </div>
              <p className="text-gray-400">
                Your trusted healthcare partner, providing quality medications and exceptional service since 1995.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-4567</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Prescriptions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Prescription Refills
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Health Consultations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Delivery Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Insurance Support
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>123 Health St, Medical City, MC 12345</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@medicareplus.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Mon-Fri: 8AM-10PM, Sat-Sun: 9AM-8PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} MediCare+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

  