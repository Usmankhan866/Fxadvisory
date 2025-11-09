"use client"

import type React from "react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Disclaimer from "@/components/disclaimer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Mail, Phone, MessageCircle } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Contact form submitted:", formData)
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-[#12261f] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-balance">Let's Talk FX Strategy</h1>
          <p className="text-xl text-[#dce5e1]">
            Book a consultation, ask questions, or discuss your specific FX challenges with our team.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Left: Booking */}
          <div>
            <h2 className="text-3xl font-bold text-[#12261f] mb-6">Schedule a Call</h2>
            <Card className="bg-[#f5f7f6] border-0 p-8 mb-6">
              <p className="text-sm text-[#4a5a55] mb-6 leading-relaxed">
                Book a 15-minute strategy call with our FX specialists. We'll help you understand your exposure, explore
                hedging options, and answer any questions about our services.
              </p>

              <div className="space-y-3 mb-6">
                <div className="p-4 bg-white rounded border border-[#dce5e1]">
                  <p className="font-bold text-[#12261f] text-sm mb-2">Available Times</p>
                  <p className="text-xs text-[#4a5a55]">Monday - Friday, 9:00 AM - 5:00 PM (AEDT)</p>
                </div>
              </div>

              <Button className="w-full bg-[#bd6908] hover:bg-[#a35a07] text-white font-bold py-3 mb-3">
                View Calendar & Book
              </Button>

              <p className="text-xs text-[#4a5a55] text-center">
                Cal.com booking widget integration ready. Add your calendar URL above.
              </p>
            </Card>

            {/* Resources */}
            <Card className="bg-white border-[#dce5e1] p-6">
              <h3 className="font-bold text-[#12261f] mb-4">Pre-Meeting Resources</h3>
              <Button
                variant="outline"
                className="w-full border-[#bd6908] text-[#bd6908] hover:bg-[#f5f7f6] mb-2 bg-transparent"
              >
                Watch Loom: Pre-Meeting Questions
              </Button>
              <p className="text-xs text-[#4a5a55] text-center">5-minute video on how to prepare</p>
            </Card>
          </div>

          {/* Right: Contact Options */}
          <div>
            <h2 className="text-3xl font-bold text-[#12261f] mb-6">Other Ways to Connect</h2>
            <div className="space-y-4 mb-8">
              <Card className="bg-white border-[#dce5e1] p-6 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-start gap-4">
                  <Phone className="text-[#bd6908] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-[#12261f] mb-1">Phone</h3>
                    <a href="tel:+61261234567" className="text-[#bd6908] hover:underline font-medium">
                      +61 2 6123 4567
                    </a>
                    <p className="text-xs text-[#4a5a55] mt-1">Mon-Fri, 9 AM - 5 PM AEDT</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white border-[#dce5e1] p-6 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-start gap-4">
                  <Mail className="text-[#bd6908] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-[#12261f] mb-1">Email</h3>
                    <a href="mailto:hello@switchyardfx.com" className="text-[#bd6908] hover:underline font-medium">
                      hello@switchyardfx.com
                    </a>
                    <p className="text-xs text-[#4a5a55] mt-1">Response within 2 hours</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white border-[#dce5e1] p-6 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-start gap-4">
                  <MessageCircle className="text-[#bd6908] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-[#12261f] mb-1">WhatsApp</h3>
                    <a href="https://wa.me/61261234567" className="text-[#bd6908] hover:underline font-medium">
                      Send a message
                    </a>
                    <p className="text-xs text-[#4a5a55] mt-1">Quick questions & urgent issues</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white border-[#dce5e1] p-6 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-start gap-4">
                  <MessageCircle className="text-[#bd6908] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-[#12261f] mb-1">WeChat</h3>
                    <p className="text-[#bd6908] font-medium">Scan to connect</p>
                    <p className="text-xs text-[#4a5a55] mt-1">QR code & ID: switchyard_fx</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* General Inquiry Form */}
      <section className="bg-[#f5f7f6] py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-[#12261f] mb-8 text-center">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded border border-[#dce5e1] focus:outline-none focus:ring-2 focus:ring-[#bd6908] bg-white"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded border border-[#dce5e1] focus:outline-none focus:ring-2 focus:ring-[#bd6908] bg-white"
              />
            </div>
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded border border-[#dce5e1] focus:outline-none focus:ring-2 focus:ring-[#bd6908] bg-white"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded border border-[#dce5e1] focus:outline-none focus:ring-2 focus:ring-[#bd6908] bg-white"
            />
            <textarea
              name="message"
              placeholder="Your Message..."
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded border border-[#dce5e1] focus:outline-none focus:ring-2 focus:ring-[#bd6908] bg-white"
            />
            <Button type="submit" className="w-full bg-[#bd6908] hover:bg-[#a35a07] text-white font-bold py-3">
              Send Message
            </Button>
          </form>
        </div>
      </section>

      <Disclaimer />
      <Footer />
    </main>
  )
}
