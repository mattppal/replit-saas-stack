'use client'

import { useState } from 'react'
import { signIn } from '@/lib/auth-client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await signIn.email({ 
        email, 
        password, 
      }, { 
        onRequest: () => {
          console.log('Login request started');
        }, 
        onSuccess: () => {
          console.log('Login successful');
          router.push('/dashboard')
        }, 
        onError: (ctx) => { 
          console.error('Login error:', ctx.error);
          setError(ctx.error.message)
        }, 
      })
      if (error) {
        console.error('Login error:', error);
        setError(error.message)
      } else if (data) {
        console.log('Login successful, redirecting...');
        router.push('/dashboard')
      }
    } catch (err) {
      console.error('Unexpected error during login:', err);
      setError('An unexpected error occurred')
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
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
      <Button type="submit">Log In</Button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}
