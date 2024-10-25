'use client'

import { Button } from "@/components/ui/button"
import { useSession, signOut } from '@/lib/auth-client'
import Link from 'next/link'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function NavBar() {
  const session = useSession()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    console.log('Session data:', session.data)
  }, [session])

  const handleSignOut = async () => {
    await signOut()
    // You might want to redirect the user after signing out
  }

  const renderAvatar = () => {
    if (session.data?.user?.name) {
      return (
        <Avatar className="cursor-pointer">
          <AvatarFallback className="bg-secondary-200 text-secondary-700">
            {session.data.user.name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )
    }
    return null
  }

  return (
    <nav className="py-4 px-6 bg-white shadow-sm">
      <div className="container mx-auto max-w-6xl flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="h-8 w-auto mr-4" />
          <span className="text-xl font-bold text-primary-900">Your Logo</span>
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">Pricing</Button>
          <Button variant="ghost">Resources</Button>
          {isClient && (
            <>
              {session.data?.user?.name ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {renderAvatar()}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline">Log In</Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="default">Sign Up</Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
