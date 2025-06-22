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
  const [message, setMessage] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)
  const [imageUrl, setImageUrl] = useState<string>('')

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setSubmitting(true)
    setMessage('')

    // Use imageUrl for photo field
    const payload = {
      requestName: data.requestName,
      photo: imageUrl, // use imageUrl, not data.photo
      description: data.description,
      status: data.status,
    }

    // Check for empty fields
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
    <main className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-4">Put a Request</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('requestName')}
          placeholder="Request Name"
          required
          className="border rounded px-2 py-1 w-full"
        />
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
          <div className="mt-4">
            <img src={imageUrl} alt="Profile" className="rounded w-40 h-40 object-cover" />
            <div className="text-xs mt-2 break-all">{imageUrl}</div>
          </div>
        )}
        <input {...register('photo')} value={imageUrl} type="hidden" />
        <input
          {...register('description')}
          placeholder="Description"
          required
          className="border rounded px-2 py-1 w-full"
        />
        <select {...register('status')} className="border rounded px-2 py-1 w-full">
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
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
