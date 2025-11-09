"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface AuthGuardProps {
  children: ReactNode
  requireAuth?: boolean
}

export default function AuthGuard({ children, requireAuth = false }: AuthGuardProps) {
  // This is a placeholder - integrate with Clerk for real auth
  const isAuthenticated = false

  if (requireAuth && !isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f7f6] px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#12261f] mb-4">Sign In Required</h2>
          <p className="text-[#4a5a55] mb-6">You need to be signed in to access this content.</p>
          <div className="space-y-2">
            <Link href="/login" className="inline-block">
              <Button className="bg-[#bd6908] hover:bg-[#a35a07] text-white font-bold">Sign In</Button>
            </Link>
            <p className="text-sm text-[#4a5a55]">
              Don't have access?{" "}
              <Link href="/register" className="text-[#bd6908] hover:underline">
                Request access
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
