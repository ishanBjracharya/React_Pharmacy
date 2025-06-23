'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function RequestPage() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/requests?depth=2', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setRequests(data.docs || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 text-black">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">All Requests</h1>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No requests found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request: any) => (
            <Link
              key={request.id}
              href={`/request/${request.id}`}
              className="block bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 p-5 border border-gray-200"
            >
              <div className="flex flex-col gap-2">
                <div className="text-sm text-gray-500">
                  <strong className="text-gray-700">Request No:</strong> {request.requestNumber}
                </div>

                <div>
                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full w-fit ${
                      request.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : request.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : request.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {request.status}
                  </span>
                </div>

                {request.photo?.url && (
                  <img
                    src={request.photo.url}
                    alt="Request Photo"
                    className="w-full h-40 object-cover rounded-lg mt-3 border"
                  />
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
