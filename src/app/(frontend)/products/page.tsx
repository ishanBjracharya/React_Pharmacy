'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <li
              key={product.id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg cursor-pointer transition-transform hover:scale-105"
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-1">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-2 line-clamp-3">
                {product.description}
              </p>
              <div className="text-sm text-gray-800 mb-1">
                <span className="font-medium">Price:</span> ${product.price.toFixed(2)}
              </div>
              {product.inStock !== undefined && (
                <div className="text-sm text-gray-800">
                  <span className="font-medium">Stock:</span> {product.inStock}
                </div>
              )}
              {product.brand && (
                <div className="text-sm text-gray-800">
                  <span className="font-medium">Brand:</span> {product.brand}
                </div>
              )}
              {product.prescriptionRequired && (
                <div className="mt-2 text-sm text-red-600 font-semibold">
                  Prescription Required
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
