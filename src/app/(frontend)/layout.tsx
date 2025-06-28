import React from 'react'
import './styles.css'

import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'
import { ourFileRouter } from '../../app/api/uploadthing/core'
import Navbar from '../(frontend)/compoentns/Navbar/Navbar'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react'
import Link from 'next/link'

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-50 to-white border-t border-gray-100 mt-24 pt-16 pb-8 px-6 sm:px-12 text-gray-600">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="bg-blue-600 text-white p-2 rounded-lg">
                <Heart className="h-5 w-5" />
              </span>
              PharmaCare
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your trusted partner in healthcare delivery. Fast, reliable, and discreet medication
              services.
            </p>

            {/* Social Buttons */}
            <div className="flex gap-4 pt-2">
              {[
                {
                  icon: <Facebook className="h-5 w-5" />,
                  color: 'hover:bg-blue-100 hover:text-blue-600',
                  href: 'https://facebook.com',
                },
                {
                  icon: <Instagram className="h-5 w-5" />,
                  color: 'hover:bg-pink-100 hover:text-pink-600',
                  href: 'https://instagram.com',
                },
                {
                  icon: <Twitter className="h-5 w-5" />,
                  color: 'hover:bg-sky-100 hover:text-sky-600',
                  href: 'https://twitter.com',
                },
                {
                  icon: <Mail className="h-5 w-5" />,
                  color: 'hover:bg-red-100 hover:text-red-600',
                  href: 'mailto:contact@pharmacare.com',
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-full bg-white border border-gray-200 text-gray-600 transition-all duration-300 ${item.color} hover:-translate-y-1 hover:shadow-md`}
                  aria-label="Social media link"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Fixed About Us Link */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'Shop', href: '/products' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    passHref
                    className="text-gray-500 hover:text-blue-600 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3 group-hover:bg-blue-600 transition-colors duration-200"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Our Services</h4>
            <ul className="space-y-3">
              {[
                '24/7 Delivery',
                'Doctor Consultations',
                'Medicine Reminders',
                'Health Checkups',
                'Emergency Services',
              ].map((service) => (
                <li key={service} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-500 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Contact Us</h4>
            <div className="space-y-3 text-gray-500 ">
              <a
                href="tel:+9779812345678"
                className="flex items-start gap-3 group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors duration-200 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <div>
                    <p className="text-sm">+977 9812345678</p>
                  </div>
                </div>
              </a>

              <a
                href="mailto:contact@pharmacare.com"
                className="flex items-start gap-3 group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors duration-200 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <div>
                    <p className="text-sm">contact@pharmacare.com</p>
                  </div>
                </div>
              </a>

              <a
                href="https://maps.google.com?q=123+Health+St,+Kathmandu,+Nepal"
                className="flex items-start gap-3 group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors duration-200 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <div>
                    <p className="text-sm">123 Health St, Kathmandu, Nepal</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="text-gray-500">
            &copy; {new Date().getFullYear()} PharmaCare. All rights reserved.
          </div>

          <div className="flex gap-6">
            <Link
              href="/privacy"
              passHref
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              passHref
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              href="/faq"
              passHref
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <title>PharmaCare</title>
        <meta name="description" content="Your trusted healthcare partner" />
      </head>
      <body className="bg-white min-h-screen">
        <div>
          <Navbar />
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
