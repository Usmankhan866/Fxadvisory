"use client"

import type React from "react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    role: "",
    fxVolume: "",
    providers: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Registration submitted:", formData)
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="py-20 px-6">
        <div className="max-w-md mx-auto">
          <Card className="bg-white border border-[#dce5e1] p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-[#12261f] mb-2">Request Access</h1>
              <p className="text-[#4a5a55]">Join SwitchYard to manage your FX hedges</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#12261f] mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded border border-[#dce5e1] focus:outline-none focus:ring-2 focus:ring-[#bd6908]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#12261f] mb-2">Work Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded border border-[#dce5e1] focus:outline-none focus:ring-2 focus:ring-[#bd6908]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#12261f] mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded border border-[#dce5e1] focus:outline-none focus:ring-2 focus:ring-[#bd6908]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#12261f] mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded border border-[#dce5e1] focus:outline-none focus:ring-2 focus:ring-[#bd6908]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#12261f] mb-2">Your Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded border border-[#dce5e1] focus:outline-none focus:ring-2 focus:ring-[#bd6908]"
                >
                  <option value="">Select your role</option>
                  <option value="cfo">CFO / Finance Director</option>
                  <option value="treasury">Treasury Manager</option>
                  <option value="controller">Controller</option>
                  <option value="owner">Business Owner</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#12261f] mb-2">Estimated Annual FX Volume</label>
                <select
                  name="fxVolume"
                  value={formData.fxVolume}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded border border-[#dce5e1] focus:outline-none focus:ring-2 focus:ring-[#bd6908]"
                >
                  <option value="">Select range</option>
                  <option value="<1m">Less than $1M</option>
                  <option value="1-5m">$1M - $5M</option>
                  <option value="5-20m">$5M - $20M</option>
                  <option value="20-50m">$20M - $50M</option>
                  <option value=">50m">Over $50M</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#12261f] mb-2">Current FX Providers</label>
                <textarea
                  name="providers"
                  placeholder="e.g., NAB, Westpac, OFX..."
                  value={formData.providers}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 rounded border border-[#dce5e1] focus:outline-none focus:ring-2 focus:ring-[#bd6908]"
                />
              </div>

              <Button type="submit" className="w-full bg-[#bd6908] hover:bg-[#a35a07] text-white font-bold py-3">
                Request Access
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-[#4a5a55]">
                Already have access?{" "}
                <Link href="/login" className="text-[#bd6908] hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </Card>

          <div className="mt-8 p-4 bg-[#f5f7f6] rounded text-xs text-[#4a5a55] text-center">
            <p className="font-bold mb-2">Demo Note:</p>
            <p>
              Connect to Clerk for full authentication. This collects pre-qualifier information for access requests.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
