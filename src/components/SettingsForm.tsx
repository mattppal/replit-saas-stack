'use client'

import { useState } from 'react'
import { useSession, signOut } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SettingsForm() {
  const session = useSession()
  const router = useRouter()
  const [name, setName] = useState(session.data?.user?.name || '')
  const [email, setEmail] = useState(session.data?.user?.email || '')
  const [error, setError] = useState('')

  const handleNameChange = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Implement name change logic here
      console.log('Name change requested:', name)
      // If there's an error, use setError
      // setError('Failed to update name')
    } catch (err) {
      setError('An unexpected error occurred')
    }
  }

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Implement email change logic here
      console.log('Email change requested:', email)
      // If there's an error, use setError
      // setError('Failed to update email')
    } catch (err) {
      setError('An unexpected error occurred')
    }
  }

  const handleDeleteAccount = async () => {
    try {
      // Implement account deletion logic here
      console.log('Account deletion requested')
      await signOut()
      router.push('/')
    } catch (err) {
      setError('Failed to delete account')
    }
  }

  if (session.isPending) {
    return <div>Loading...</div>
  }

  if (!session.data) {
    router.push('/login')
    return null
  }

  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Change Name</CardTitle>
          <CardDescription>Update your display name</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleNameChange}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleNameChange}>Save Name</Button>
        </CardFooter>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Change Email</CardTitle>
          <CardDescription>Update your email address</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailChange}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleEmailChange}>Save Email</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>Permanently delete your account and all associated data</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
        </CardFooter>
      </Card>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </>
  )
}
