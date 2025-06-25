'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

type Request = {
  id: string
  requestName: string
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled' | string
  photo?: string
  description?: string
}

export default function RequestsListPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/requests')
      .then((res) => res.json())
      .then((data) => {
        setRequests(data.docs || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  console.log('Requests:', requests)

  const getStatusBadge = (status: Request['status']) => {
    const variants: Record<Request['status'], string> = {
      pending: 'bg-amber-100 text-black',
      'in-progress': 'bg-blue-100 text-black',
      completed: 'bg-emerald-100 text-black',
      cancelled: 'bg-red-100 text-black',
    }
    return <Badge className={variants[status] || 'bg-gray-100 text-black'}>{status}</Badge>
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-black">
        <Loader2 className="animate-spin mr-2" /> Loading requests...
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 text-black">
      <h1 className="text-3xl font-bold mb-6">All Requests</h1>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <Link key={req.id} href={`/request/${req.id}`} className="block">
              <div className="bg-white rounded-lg shadow hover:shadow-md transition p-4 space-y-3">
                {req.photo && (
                  <div className="relative w-full h-40 rounded overflow-hidden border">
                    <img src={req.photo} alt="Request" className="object-cover" />
                  </div>
                )}
                <div className="text-lg font-semibold text-black">{req.requestName}</div>
                {getStatusBadge(req.status)}
                <p className="text-sm text-black line-clamp-3">{req.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
