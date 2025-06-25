'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Request = {
  id: string
  requestName: string
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled' | string
  photo?: string
  description?: string
}

export default function RequestPage() {
  const params = useParams()
  const id = typeof params === 'object' && 'id' in params ? params.id : undefined

  const [request, setRequest] = useState<Request>({ id: '', requestName: '', status: 'pending' })
  const [loading, setLoading] = useState(true)

  const [comments, setComments] = useState<any[]>([])
  const [commentLoading, setCommentLoading] = useState(true)

  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:3000/api/requests/${id}?depth=2`)
      .then((res) => res.json())
      .then((data) => {
        setRequest(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:3000/api/comments?where[product][equals]=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.docs || [])
        setCommentLoading(false)
      })
      .catch(() => setCommentLoading(false))
  }, [id, submitting])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')
    if (!author || !content) {
      setMessage('All fields required.')
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch('http://localhost:3000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: id, author, content }),
      })
      if (res.ok) {
        setAuthor('')
        setContent('')
        setMessage('Comment submitted!')
      } else {
        setMessage('Error submitting comment.')
      }
    } catch {
      setMessage('Error submitting comment.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin mr-2 text-black" /> Loading request...
      </div>
    )
  }

  if (!request) return <div className="text-center mt-10">Request not found.</div>

  const getStatusBadge = (
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled' | string,
  ) => {
    const variants: Record<'pending' | 'in-progress' | 'completed' | 'cancelled', string> = {
      pending: 'bg-amber-100 text-amber-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-emerald-100 text-emerald-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-700'}>
        {status}
      </Badge>
    )
  }
  console.log('Request:', request)

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h1 className="text-2xl font-bold text-black">{request.requestName}</h1>
        {getStatusBadge(request.status)}
        {request.photo && (
          <div className="relative w-full h-64 rounded overflow-hidden border">
            <img src={request.photo} alt="Photo" className="object-cover" />
          </div>
        )}
        <div className="prose max-w-none">{request.description}</div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow space-y-4 text-black">
        <h2 className="text-lg font-semibold">Comments</h2>
        {commentLoading ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="border-t pt-2">
              <strong>{c.author}</strong>
              <div className="text-sm text-gray-500">{new Date(c.createdAt).toLocaleString()}</div>
              <p>{c.content}</p>
            </div>
          ))
        )}

        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled={submitting}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            placeholder="Your comment"
            className="w-full border rounded px-3 py-2"
            disabled={submitting}
          />
          {message && (
            <div
              className={`text-sm ${message.includes('submitted') ? 'text-green-600' : 'text-red-600'}`}
            >
              {message}
            </div>
          )}
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Add Comment'}
          </Button>
        </form>
      </div>
    </div>
  )
}
