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

  if (loading) return <p>Loading...</p>
  console.log(requests)

  return (
    <main className="text-black">
      <h1>Requests</h1>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <ul>
          {requests.map((request: any) => (
            <Link href={`/request/${request.id}`} key={request.id} className="block hover:bg-gray-100 p-4 rounded">
            <li key={request.id} className="mb-6 border-b pb-4">
              <strong>Request Number:</strong> {request.requestNumber} <br />
              <strong>Status:</strong> {request.status} <br />
              {request.photo?.url && (
                  <img src={request.photo.url} alt="Request Photo" style={{ maxWidth: 200, margin: '8px 0' }} />
                )}

            </li>
                </Link>
          ))}
        </ul>
      )}
    </main>
  )
}