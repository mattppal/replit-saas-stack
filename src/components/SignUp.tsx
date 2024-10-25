'use client'

import { useState } from 'react'
import { signUp } from '@/lib/auth-client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await signUp.email({ 
        email, 
        password, 
        name, 
      }, { 
        onRequest: () => {
          console.log('Sign-up request started');
        }, 
        onSuccess: () => {
          console.log('Sign-up successful');
          router.push('/dashboard')
        }, 
        onError: (ctx) => { 
          console.error('Sign-up error:', ctx.error);
          setError(ctx.error.message)
        }, 
      })
      if (error) {
        console.error('Sign-up error:', error);
        setError(error.message)
      } else if (data) {
        console.log('Sign-up successful, redirecting...');
        router.push('/dashboard')
      }
    } catch (err) {
      console.error('Unexpected error during sign-up:', err);
      setError('An unexpected error occurred')
    }
  }

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit">Sign Up</Button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}
