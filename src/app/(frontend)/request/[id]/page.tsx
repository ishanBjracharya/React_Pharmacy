'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default function RequestPage() {
  const params = useParams()
  const id = typeof params === 'object' && 'id' in params ? params.id : undefined

  const [request, setRequest] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Comments state
  const [comments, setComments] = useState<any[]>([])
  const [commentLoading, setCommentLoading] = useState(true)
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  // Update status state
  const [newStatus, setNewStatus] = useState('')
  const [updateStatusMessage, setUpdateStatusMessage] = useState('')
  const [updatingStatus, setUpdatingStatus] = useState(false)

  // Fetch request
  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:3000/api/requests/${id}?depth=2`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setRequest(data)
        setNewStatus(data?.status || '')
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  // Fetch comments
  useEffect(() => {
    if (!id) return
    setCommentLoading(true)
    fetch(`http://localhost:3000/api/comments?where[product][equals]=${id}`)
      .then(res => res.json())
      .then(data => {
        setComments(data.docs || [])
        setCommentLoading(false)
      })
      .catch(() => setCommentLoading(false))
  }, [id, submitting])

  // Post comment
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

  // Update request status
  const handleUpdateStatus = async () => {
    if (!newStatus) return
    setUpdatingStatus(true)
    setUpdateStatusMessage('')
    try {
      const res = await fetch(`http://localhost:3000/api/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        const updated = await res.json()
        setRequest(updated)
        setUpdateStatusMessage('Status updated successfully!')
      } else {
        setUpdateStatusMessage('Failed to update status.')
      }
    } catch (error) {
      setUpdateStatusMessage('Failed to update status.')
    }
    setUpdatingStatus(false)
  }

  if (loading) return <p>Loading...</p>
  if (!request) return <p>No request found.</p>

  return (
    <div className="text-black">
      <strong>Request Number:</strong> {request.requestNumber} <br />
      <strong>Status:</strong> {request.status} <br />
      {request.photo?.url && (
        <img src={request.photo.url} alt="Request Photo" style={{ maxWidth: 200, margin: '8px 0' }} />
      )}
      <div>
        <strong>Description:</strong>
        <RichText data={request.description} />
      </div>

      {/* Update Request Status */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Update Request Status</h3>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="border px-2 py-1 rounded mr-2"
          disabled={updatingStatus}
        >
          <option value="">Select status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="completed">Completed</option>
        </select>
        <button
          onClick={handleUpdateStatus}
          disabled={updatingStatus}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {updatingStatus ? 'Updating...' : 'Update Status'}
        </button>
        {updateStatusMessage && (
          <p className={`mt-2 ${updateStatusMessage.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
            {updateStatusMessage}
          </p>
        )}
      </div>

      {/* Comment Section */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2">Comments</h2>
        {commentLoading ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className="mb-4 border-b pb-2">
                <strong>{comment.author}</strong>{' '}
                <span className="text-xs text-gray-500">
                  {comment.createdAt && new Date(comment.createdAt).toLocaleString()}
                </span>
                <div>{comment.content}</div>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-2">
          <input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            disabled={submitting}
          />
          <textarea
            placeholder="Your comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            disabled={submitting}
          />
          {message && <div className={message.includes('success') ? 'text-green-600' : 'text-red-500'}>{message}</div>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Add Comment'}
          </button>
        </form>
      </div>
    </div>
  )
}
