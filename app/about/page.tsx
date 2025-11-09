"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Disclaimer from "@/components/disclaimer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#12261f] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-balance">About SwitchYard</h1>
          <p className="text-xl text-[#dce5e1]">
            Partnering with CFOs to navigate FX uncertainty and unlock strategic value through tailored treasury
            solutions.
          </p>
        </div>
      </section>

      {/* Mission & Partnership */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-[#12261f] mb-4">Our Mission</h2>
            <p className="text-lg text-[#4a5a55] leading-relaxed mb-4">
              SwitchYard simplifies FX risk management for mid-market CFOs. We believe treasury teams deserve better –
              smarter solutions, clearer guidance, and genuine partnership.
            </p>
            <p className="text-lg text-[#4a5a55] leading-relaxed">
              By combining deep FX expertise with intuitive tools and advisory, we help you make confident decisions
              that protect margins and unlock growth.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#12261f] mb-4">Our Partnership</h2>
            <p className="text-lg text-[#4a5a55] leading-relaxed mb-4">
              SwitchYard operates as a Programme Manager under Ebury Partners Australia Pty Ltd (AFSL 520548). This
              partnership ensures world-class execution, global FX expertise, and complete regulatory compliance.
            </p>
            <p className="text-lg text-[#4a5a55] leading-relaxed">
              Every transaction is backed by Ebury's institutional strength and 20+ years of FX market experience.
            </p>
          </div>
        </div>
      </section>

      {/* How We Work Process */}
      <section className="bg-[#f5f7f6] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#12261f] mb-12 text-center">Our Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Assess",
                desc: "Understand your FX exposures, business drivers, and risk appetite.",
              },
              { step: "02", title: "Hedge", desc: "Design and execute tailored hedging strategies." },
              { step: "03", title: "Track", desc: "Monitor hedge performance in real-time dashboards." },
              { step: "04", title: "Report", desc: "Deliver board-ready insights and compliance documentation." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="bg-[#bd6908] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg text-[#12261f] mb-2">{item.title}</h3>
                <p className="text-sm text-[#4a5a55] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#12261f] mb-6">Ready to Get Started?</h2>
        <p className="text-lg text-[#4a5a55] mb-8 max-w-2xl mx-auto">
          Schedule a free consultation with our FX specialists to discuss your treasury challenges.
        </p>
        <Link href="/contact" className="inline-block">
          <Button className="bg-[#bd6908] hover:bg-[#a35a07] text-white font-bold px-8 py-4">
            Book a Consultation
          </Button>
        </Link>
      </section>

      <Disclaimer />
      <Footer />
    </main>
  )
}
