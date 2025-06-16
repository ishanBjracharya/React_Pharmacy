'use client'

import React, { useState } from 'react'
import { UploadButton } from "../../../utils/uploadthing";
import { ClientUploadedFileData } from 'uploadthing/types';

export default function PutRequestPage() {
  const [requestNumber, setRequestNumber] = useState('')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [status, setStatus] = useState('pending')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  // const [data] = useState()
  const [file, setFile] = useState("")

 
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
  await fetch('/api/requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // If you're using auth, include the token:
      // 'Authorization': `JWT ${yourToken}`
    },
    body: JSON.stringify({
      requestNumber: 'REQ123',
      description: 'Need paracetamol 500mg',
      status: 'pending',
      // other fields defined in your collection schema
    }),
    }
   )
  console.log("dasdasd",file)
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
              onClientUploadComplete={(respo) => {
                setFile(respo[0].ufsUrl);
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                
                alert(`ERROR! ${error.message}`);
              }}
            />
        </div>
                  <textarea
            value={description}


            onChange={e => setDescription(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            required
          />
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