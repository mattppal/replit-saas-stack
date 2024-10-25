'use client'

import { useState } from 'react'
import { useSession, signOut } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Settings() {
  const session = useSession()
  const router = useRouter()
  const [email, setEmail] = useState(session.data?.user.email || '')

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implement email change logic here
    console.log('Email change requested:', email)
  }

  const handleDeleteAccount = async () => {
    // Implement account deletion logic here
    console.log('Account deletion requested')
    await signOut()
    router.push('/')
  }

  if (session.status === 'loading') {
    return <div>Loading...</div>
  }

  if (session.status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-8">User Settings</h1>
      
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
          <Button onClick={handleEmailChange}>Save Changes</Button>
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
    </div>
  )
}
