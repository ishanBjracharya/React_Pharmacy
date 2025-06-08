'use client'

import React, { useEffect, useState } from 'react'

type User = {
  id: string
  email: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data.docs || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <main>
      <h1>Users</h1>
      {users.length === 0 && <p>No users found.</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </main>
  )
}