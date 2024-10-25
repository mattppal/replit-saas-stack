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
    setError('')
    try {
      console.log('Attempting login with:', { email });
      const result = await signIn.email({ 
        email, 
        password,
      })
      
      console.log('Login response:', result);
      
      if (result.error) {
        setError(result.error.message || 'An error occurred during login')
      } else if (result.data) {
        console.log('Login successful, redirecting to dashboard');
        router.push('/dashboard')
      } else {
        setError('No data or error returned from login attempt')
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
