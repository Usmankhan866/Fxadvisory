"use client"

import type React from "react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Login attempt:", { email })
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="py-20 px-6">
        <div className="max-w-md mx-auto">
          <Card className="bg-white border border-[#DCE5E1] p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-[#12261F] mb-2">Welcome Back</h1>
              <p className="text-[#4A5A55]">Access your FX hedge dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#12261F] mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded border border-[#DCE5E1] focus:outline-none focus:ring-2 focus:ring-[#BD6908]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#12261F] mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded border border-[#DCE5E1] focus:outline-none focus:ring-2 focus:ring-[#BD6908]"
                />
              </div>

              <Button className="w-full bg-[#BD6908] hover:bg-[#a35a07] text-white font-bold py-3">Sign In</Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-[#4A5A55]">
                Don't have an account?{" "}
                <a href="#" className="text-[#BD6908] hover:underline font-medium">
                  Request access
                </a>
              </p>
            </div>
          </Card>

          <div className="mt-8 p-4 bg-[#F5F7F6] rounded text-xs text-[#4A5A55] text-center">
            <strong>Demo Note:</strong> This is a placeholder. Connect to Clerk for full authentication with MFA.
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
