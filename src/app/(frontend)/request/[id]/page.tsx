'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function RequestPage() {
  const params = useParams()
  const id = typeof params === 'object' && 'id' in params ? params.id : undefined

  const [request, setRequest] = useState<any>(null)
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
      .then(res => res.json())
      .then(data => {
        setRequest(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:3000/api/comments?where[product][equals]=${id}`)
      .then(res => res.json())
      .then(data => {
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
      setMessage('Please fill all fields.')
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
        setMessage('Comment submitted!')
        setAuthor('')
        setContent('')
      } else {
        setMessage('Failed to submit comment.')
      }
    } catch {
      setMessage('Failed to submit comment.')
    }
    setSubmitting(false)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        <Loader2 className="h-5 w-5 mr-2 animate-spin" /> Loading request...
      </div>
    )
  }

  if (!request) {
    return <div className="text-center py-12 text-gray-600">No request found.</div>
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case 'completed':
        return <Badge className="bg-emerald-100 text-emerald-800">Completed</Badge>
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-10">
      <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">{request.requestName}</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Status:</span>
          {getStatusBadge(request.status)}
        </div>
        {request.photo?.url && (
          <div className="relative w-full h-64 rounded-lg overflow-hidden border">
            <Image
              src={request.photo.url}
              alt="Request"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
        <div className="prose max-w-none">
          <RichText data={request.description} />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        {commentLoading ? (
          <p className="text-sm text-gray-500">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-gray-500">No comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map(comment => (
              <li key={comment.id} className="border-b pb-2">
                <div className="text-sm font-semibold">{comment.author}</div>
                <div className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </div>
                <p className="text-sm">{comment.content}</p>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled={submitting}
          />
          <textarea
            placeholder="Your comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            disabled={submitting}
          />
          {message && (
            <div className={`text-sm ${message.includes('submitted') ? 'text-green-600' : 'text-red-500'}`}>
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
