'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function SettingsForm() {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch('/api/auth/delete-account', {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/signup')
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to delete account')
      }
    } catch (error) {
      console.error('Error deleting account:', error)
      alert('An unexpected error occurred')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="border-t pt-4">
        <h3 className="text-lg font-medium">Delete Account</h3>
        <p className="text-sm text-muted-foreground">
          Permanently delete your account and all associated data
        </p>
        <Button
          variant="destructive"
          onClick={handleDeleteAccount}
          disabled={isDeleting}
          className="mt-2"
        >
          {isDeleting ? 'Deleting...' : 'Delete Account'}
        </Button>
      </div>
    </div>
  )
}
