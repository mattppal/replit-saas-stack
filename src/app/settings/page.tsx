'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession, updateUser, changePassword, changeEmail, deleteAccount } from "@/lib/auth-client"

export default function SettingsPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  // Profile states
  const [name, setName] = useState(session?.user.name || '')
  const [email, setEmail] = useState(session?.user.email || '')
  
  // Password states
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    try {
      // Update name
      await updateUser({
        name,
      })

      // Update email if changed
      if (email !== session?.user.email) {
        await changeEmail({
          newEmail: email,
          callbackURL: '/settings'
        })
      }

      setSuccess('Profile updated successfully')
    } catch (err: any) {
      setError(err.message || 'Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    try {
      await changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true
      })
      setSuccess('Password updated successfully')
      setCurrentPassword('')
      setNewPassword('')
    } catch (err: any) {
      setError(err.message || 'Failed to update password')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccountDeletion = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return
    }

    setIsLoading(true)
    try {
      await deleteAccount()
      router.push('/login')
    } catch (err: any) {
      setError(err.message || 'Failed to delete account')
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Account Settings</h1>

      <div className="space-y-8">
        {/* Profile Section */}
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <h2 className="text-xl font-semibold">Profile Information</h2>
          
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {email !== session?.user.email && (
              <p className="text-sm text-muted-foreground">
                You'll need to verify your new email address
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>

        {/* Password Section */}
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <h2 className="text-xl font-semibold">Change Password</h2>

          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Password'}
          </Button>
        </form>

        {/* Status Messages */}
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        {success && (
          <div className="text-green-500 text-sm">{success}</div>
        )}

        {/* Delete Account Section */}
        <div className="pt-8 border-t">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h2>
          <Button
            variant="destructive"
            onClick={handleAccountDeletion}
            disabled={isLoading}
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}
