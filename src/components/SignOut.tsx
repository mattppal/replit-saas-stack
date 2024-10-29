'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function SignOut() {
    const router = useRouter()

    const handleSignOut = async () => {
        try {
            const result = await signOut()

            if (result.success) {
                router.push('/login')
            } else {
                console.error('Failed to sign out:', result.error)
            }
        } catch (err) {
            console.error('Unexpected error during sign-out:', err)
        }
    }

    return (
        <Button
            onClick={handleSignOut}
            variant="ghost"
        >
            Sign Out
        </Button>
    )
} 