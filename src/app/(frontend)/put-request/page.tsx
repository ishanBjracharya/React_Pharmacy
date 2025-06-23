'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import React, { useState } from 'react'
import { UploadButton } from '@/utils/uploadthing'

type Inputs = {
  requestName: string
  photo: string
  description: string
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
}

export default function PutRequestPage() {
  const { register, handleSubmit, reset } = useForm<Inputs>()
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [submittedRequests, setSubmittedRequests] = useState<Inputs[]>([])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setSubmitting(true)
    setMessage('')

    const payload = {
      requestName: data.requestName,
      photo: imageUrl,
      description: data.description,
      status: data.status,
    }

    if (!payload.requestName || !payload.photo || !payload.description || !payload.status) {
      setMessage('All fields are required.')
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch('http://localhost:3000/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setMessage('Request submitted successfully!')
        setSubmittedRequests(prev => [...prev, payload])
        reset()
        setImageUrl('')
      } else {
        setMessage('Failed to submit request.')
      }
    } catch (error) {
      setMessage('Error submitting request.')
    }

    setSubmitting(false)
  }

  return (
    <main className="max-w-4xl mx-auto mt-12 px-6 py-8 bg-white rounded-2xl shadow-lg border text-black">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Put a Request</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Request Name</label>
          <input
            {...register('requestName')}
            placeholder="Enter request name"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Photo</label>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res?.[0]?.url || '')
              alert('Upload Completed')
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`)
            }}
          />
          {imageUrl && (
            <div className="mt-4 flex flex-col items-start gap-2">
              <img
                src={imageUrl}
                alt="Uploaded"
                className="rounded-lg w-40 h-40 object-cover border"
              />
              <p className="text-xs break-all text-gray-500">{imageUrl}</p>
            </div>
          )}
          <input {...register('photo')} value={imageUrl} type="hidden" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
          <input
            {...register('description')}
            placeholder="Short description"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
          <select
            {...register('status')}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          {submitting ? 'Submitting...' : 'Submit Request'}
        </button>

        {message && (
          <div
            className={`text-center mt-4 font-medium ${
              message.includes('success') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </div>
        )}
      </form>

      {submittedRequests.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-center mb-6 text-gray-700">Submitted Requests</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {submittedRequests.map((req, index) => (
              <div
                key={index}
                className="bg-white border rounded-xl shadow hover:shadow-xl hover:scale-[1.02] transition-all duration-200 p-4"
              >
                <img
                  src={req.photo}
                  alt={req.requestName}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold text-blue-700">{req.requestName}</h3>
                <p className="text-gray-600 text-sm mb-2">{req.description}</p>
                <span
                  className={`inline-block px-3 py-1 text-xs rounded-full ${
                    req.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : req.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-800'
                      : req.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
