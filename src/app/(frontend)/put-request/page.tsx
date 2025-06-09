'use client'

import React, { useState } from 'react'
import { UploadButton } from "../../../utils/uploadthing";

export default function PutRequestPage() {
  const [requestNumber, setRequestNumber] = useState('')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [status, setStatus] = useState('pending')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')

    const formData = new FormData()
    formData.append('requestNumber', requestNumber)
    // Convert description to richText format
    formData.append('description', JSON.stringify([
      { type: 'paragraph', children: [{ text: description }] }
    ]))
    formData.append('status', status)
    if (photo) {
      formData.append('photo', photo)
    }

    try {
      const res = await fetch('http://localhost:3000/api/requests', {
        method: 'POST',
        body: formData,
      })
      if (res.ok) {
        setMessage('Request submitted successfully!')
        setRequestNumber('')
        setDescription('')
        setPhoto(null)
        setStatus('pending')
      } else {
        setMessage('Failed to submit request.')
      }
    } catch {
      setMessage('Failed to submit request.')
    }
    setSubmitting(false)
  }

  return (
    <main className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-4">Put a Request</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Request Number</label>
          <input
            type="text"
            value={requestNumber}
            onChange={e => setRequestNumber(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Photo (optional)</label>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
              
                console.log("Files: ", res);
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                  (                e: { target: { files: React.SetStateAction<File | null>[]; }; }) => setPhoto(e.target.files ? e.target.files[0] : null)
                alert(`ERROR! ${error.message}`);
              }}
            />
        </div>
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="pending">Pending</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Request'}
        </button>
        {message && <div className="mt-2">{message}</div>}
      </form>
    </main>
  )
}