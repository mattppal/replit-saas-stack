'use client'

import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="bg-black text-white">
      <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
          Your complete platform for the web
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl text-gray-400">
          Build, deploy, and scale modern web applications with unmatched speed and reliability.
        </p>
        <div className="flex space-x-4">
          <Link href="/signup">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200">
              Start Building
            </Button>
          </Link>
          <Link href="/docs">
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
              View Documentation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
