'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { UploadButton } from '@/utils/uploadthing'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Loader2, CheckCircle, XCircle, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

type Inputs = {
  requestName: string
  photo: string
  description: string
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
}

export default function PutRequestPage() {
  const { register, handleSubmit, reset, setValue } = useForm<Inputs>()
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [submittedRequests, setSubmittedRequests] = useState<Inputs[]>([])
  const [uploading, setUploading] = useState(false)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setSubmitting(true)
    setMessage('')

    if (!data.requestName || !imageUrl || !data.description || !data.status) {
      setMessage('All fields are required.')
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch('http://localhost:3000/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestName: data.requestName,
          photo: imageUrl,
          description: data.description,
          status: data.status,
        }),
      })

      if (res.ok) {
        const newRequest = {
          requestName: data.requestName,
          photo: imageUrl,
          description: data.description,
          status: data.status,
        }
        setMessage('Request submitted successfully!')
        setSubmittedRequests((prev) => [...prev, newRequest])
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Pending</Badge>
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">In Progress</Badge>
      case 'completed':
        return (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">Completed</Badge>
        )
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Main Form Card */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
            <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
              <ImageIcon className="h-6 w-6" />
              Submit a New Request
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Request Name</label>
                <Input
                  {...register('requestName')}
                  placeholder="What do you need?"
                  required
                  className="focus:ring-2 focus:ring-blue-500 border-gray-300 hover:border-gray-400 transition"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Upload Photo</label>
                {!imageUrl ? (
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 hover:bg-gray-50 hover:border-blue-400 transition-all duration-300 group">
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        setImageUrl(res?.[0]?.url || '')
                        setValue('photo', res?.[0]?.url || '')
                        setUploading(false)
                      }}
                      onUploadError={(error) => {
                        setMessage(`Upload Error: ${error.message}`)
                        setUploading(false)
                      }}
                      onUploadBegin={() => {
                        setUploading(true)
                      }}
                      className="ut-button:bg-blue-600 ut-button:hover:bg-blue-700 ut-button:transition-all ut-button:duration-300 ut-button:rounded-lg ut-button:shadow-sm"
                    />
                    {uploading && (
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading your image...
                      </div>
                    )}
                    <p className="mt-3 text-sm text-gray-500 group-hover:text-blue-600 transition">
                      Drag & drop or click to upload
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-start gap-4">
                    <div className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-200 group">
                      <Image
                        src={imageUrl}
                        alt="Uploaded request"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setImageUrl('')
                        setValue('photo', '')
                      }}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700 transition-all"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Change Image
                    </Button>
                  </div>
                )}
                <input {...register('photo')} value={imageUrl} type="hidden" />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  {...register('description')}
                  placeholder="Provide detailed information about your request..."
                  required
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  {...register('status')}
                  defaultValue="pending"
                  onChange={(e) => setValue('status', e.target.value as any)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <Button
                type="submit"
                disabled={submitting || !imageUrl}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md hover:shadow-lg transition-all duration-300 h-12 text-lg font-medium"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Submit Request'
                )}
              </Button>

              {message && (
                <div
                  className={`p-4 rounded-lg flex items-center gap-3 ${
                    message.includes('success')
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  } transition-all`}
                >
                  {message.includes('success') ? (
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 flex-shrink-0" />
                  )}
                  <span>{message}</span>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Submitted Requests Section */}
        {submittedRequests.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Requests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {submittedRequests.map((request, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={request.photo}
                      alt={request.requestName}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
                        {request.requestName}
                      </h3>
                      {getStatusBadge(request.status)}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{request.description}</p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs text-gray-500">
                        Submitted {new Date().toLocaleDateString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
