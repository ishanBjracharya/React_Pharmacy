'use client'

import React, { useEffect, useState } from 'react'

type HomePageData = {
  title: string
  subtitle?: string
  heroImage?: string
  content?: string
}

export default function Home() {
  const [data, setData] = useState<HomePageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/globals/home-page')
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>
  if (!data) return <p>No homepage content found.</p>

  return (
    <main>
      <h1>{data.title}</h1>
      {data.subtitle && <h2>{data.subtitle}</h2>}
      {data.heroImage && (
        <img src={data.heroImage} alt="Hero" style={{ maxWidth: 400 }} />
      )}
      {data.content && (
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      )}
    </main>
  )
}