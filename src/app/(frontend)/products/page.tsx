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

  if (loading) return <p>Loading...</p>;

  return (
    <main>
      <h1>Products</h1>
      {products.length === 0 && <p>No products found.</p>}
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            style={{ cursor: 'pointer', marginBottom: 16 }}
            onClick={() => router.push(`/products/${product.id}`)}
          >
            <strong>{product.name}</strong> - ${product.price} <br />
            {product.description}
            {product.inStock !== undefined && (
              <div>Stock: {product.inStock}</div>
            )}
            {product.brand && <div>Brand: {product.brand}</div>}
            {product.prescriptionRequired && (
              <div style={{ color: 'red' }}>Prescription Required</div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}