'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Product = {
  id: string;
  name: string;
  description: string;
  brand?: string;
  price: number;
  inStock: number;
  sku?: string;
  prescriptionRequired: boolean;
  expiryDate?: string;
  dosageForm?: string;
  strength?: string;
  tags?: { tag: string }[];
  image?: string;
  category?: string;
  isActive: boolean;
  featured: boolean;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.docs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  console.log(products);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );

  return (

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">Our Products</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Number(product.id) * 0.05 }}
              onClick={() => router.push(`/products/${product.id}`)}
              className="bg-white rounded-xl shadow-md cursor-pointer overflow-hidden transition group hover:shadow-2xl hover:ring-2 hover:ring-blue-300"
            >
              <Image
                src={product.image || "/placeholder.jpg"}
                alt={product.name}
                width={500}
                height={300}
                className="w-full h-52 object-cover group-hover:opacity-90 transition duration-300"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-blue-800">{product.name}</h3>
                <p className="text-gray-700 text-sm mt-1">{product.description}</p>

                <div className="mt-3 text-gray-800 font-medium">
                  ${product.price}
                </div>

                {product.inStock !== undefined && (
                  <div
                    className={`mt-1 text-sm font-medium ${
                      product.inStock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.inStock > 0
                      ? `In Stock: ${product.inStock}`
                      : "Out of Stock"}
                  </div>
                )}

                {product.brand && (
                  <div className="text-sm text-gray-600 mt-1">Brand: {product.brand}</div>
                )}

                {product.prescriptionRequired && (
                  <div className="text-sm text-red-600 mt-2 font-semibold">
                    Prescription Required
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}

  

