import React from 'react'
import './styles.css'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "../../app/api/uploadthing/core";

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

function Navbar() {
  return (
    <nav className="w-full bg-blue-700 text-white px-6 py-4 flex items-center justify-between shadow">
      <a href="/" className="font-bold text-xl tracking-wide">Pharmacy Delivery</a>
      <div className="space-x-6">
        <a href="/products" className="hover:underline">Products</a>
        <a href="/cart" className="hover:underline">Cart</a>
        <a href="/viewOrder" className="hover:underline">My Orders</a>
        <a href="/login" className="hover:underline">Login</a>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="w-full text-center text-gray-500 text-sm py-4 border-t mt-8">
      &copy; {new Date().getFullYear()} Pharmacy Delivery. All rights reserved.
    </footer>
  )
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-50 to-green-100 min-h-screen flex flex-col">
        <Navbar />
                <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
