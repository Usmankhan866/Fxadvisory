"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Disclaimer from "@/components/disclaimer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Zap, CreditCard, Users, Briefcase } from "lucide-react"

const services = [
  {
    id: "forward-contracts",
    icon: TrendingUp,
    title: "Forward Contracts",
    summary: "Lock in FX rates for future transactions with certainty.",
    benefits: [
      "Eliminates FX uncertainty on forecasted exposures",
      "Customizable maturity dates and amounts",
      "No upfront premium required",
      "Transparent pricing with competitive rates",
    ],
    useCases: [
      "Overseas supplier payments",
      "Forecast revenue hedging",
      "M&A transaction costs",
      "Dividend repatriation",
    ],
    description:
      "Forward contracts provide certainty for your FX exposures by locking in exchange rates today for future settlements. Ideal for businesses with predictable cross-border cash flows.",
    cta: "Request Pricing",
  },
  {
    id: "options-zero-cost",
    icon: Zap,
    title: "Options & Zero Cost Structures",
    summary: "Protect downside while preserving profit potential.",
    benefits: [
      "Caps adverse FX moves while retaining upside",
      "Flexible premium structures",
      "Customizable strike prices",
      "Perfect for strategic deals and M&A",
    ],
    useCases: [
      "Earnings protection",
      "Tender bid defense",
      "Strategic international expansion",
      "Seasonal exposure management",
    ],
    description:
      "Options and zero-cost collar strategies give you asymmetric risk profiles – protecting against downside while preserving profit potential when markets move in your favor.",
    cta: "Request Pricing",
  },
  {
    id: "payments-settlements",
    icon: CreditCard,
    title: "Payments & Settlements",
    summary: "Competitive rates and efficient execution.",
    benefits: [
      "Institutional FX pricing",
      "Fast settlement (same-day or T+1)",
      "Transparent fee structure",
      "Multi-currency capabilities",
    ],
    useCases: [
      "Cross-border supplier payments",
      "Dividend repatriation",
      "International receivables",
      "Bank transfers and wire instructions",
    ],
    description:
      "Streamlined cross-border payment solutions with competitive rates and transparent fees. Get institutional pricing without institutional complexity.",
    cta: "Learn More",
  },
  {
    id: "risk-strategy",
    icon: Users,
    title: "Risk Strategy Advisory",
    summary: "Expert guidance on FX risk frameworks and policy.",
    benefits: [
      "Custom hedging policy development",
      "Scenario analysis & stress testing",
      "Board-level reporting frameworks",
      "Ongoing strategy optimization",
    ],
    useCases: [
      "Hedging policy development",
      "Treasury KPI design",
      "Compliance documentation",
      "Board reporting standards",
    ],
    description:
      "Our advisory team works with you to design hedging policies, frameworks, and reporting structures that align with your risk appetite and business objectives.",
    cta: "Book Consultation",
  },
  {
    id: "treasury-support",
    icon: Briefcase,
    title: "Treasury Support",
    summary: "On-demand advisory for complex transactions.",
    benefits: [
      "Real-time market insights",
      "Complex transaction structuring",
      "Deal support & negotiation",
      "Execution oversight",
    ],
    useCases: [
      "Large M&A hedging",
      "Multi-currency restructuring",
      "Financing optimization",
      "Refinancing FX strategies",
    ],
    description:
      "On-demand treasury support for your most complex FX challenges. Our specialists provide real-time market insights and transaction structuring expertise.",
    cta: "Request Support",
  },
]

export default function Services() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-[#12261f] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-balance">Corporate FX Solutions</h1>
          <p className="text-xl text-[#dce5e1]">
            Tailored strategies for mid-market CFOs. Every solution is built for your business, not a one-size-fits-all
            approach.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {services.map((service, idx) => {
              const Icon = service.icon
              return (
                <Card key={service.id} className="bg-white border-[#dce5e1] hover:shadow-lg transition overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-0">
                    {/* Left: Icon & Title */}
                    <div className="bg-[#f5f7f6] p-8 flex flex-col justify-center md:border-r border-[#dce5e1]">
                      <Icon className="text-[#bd6908] mb-4" size={32} />
                      <h3 className="text-2xl font-bold text-[#12261f] mb-3">{service.title}</h3>
                      <p className="text-[#4a5a55]">{service.summary}</p>
                    </div>

                    {/* Right: Details */}
                    <div className="p-8 md:col-span-2">
                      <p className="text-[#4a5a55] mb-6 leading-relaxed">{service.description}</p>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-bold text-[#12261f] mb-3">Key Benefits</h4>
                          <ul className="space-y-2">
                            {service.benefits.map((benefit, i) => (
                              <li key={i} className="text-sm text-[#4a5a55] flex gap-2">
                                <span className="text-[#bd6908] font-bold">•</span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-bold text-[#12261f] mb-3">Use Cases</h4>
                          <ul className="space-y-2">
                            {service.useCases.map((useCase, i) => (
                              <li key={i} className="text-sm text-[#4a5a55] flex gap-2">
                                <span className="text-[#bd6908] font-bold">•</span>
                                {useCase}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <Button className="bg-[#bd6908] hover:bg-[#a35a07] text-white font-bold">{service.cta}</Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#12261f] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Not Sure Which Solution Fits?</h2>
          <p className="text-[#dce5e1] mb-6">
            Book a free consultation with our FX specialists to discuss your unique needs.
          </p>
          <a href="/contact" className="inline-block">
            <Button className="bg-[#bd6908] hover:bg-[#a35a07] text-white font-bold px-8 py-3">
              Schedule Consultation
            </Button>
          </a>
        </div>
      </section>

      <Disclaimer />
      <Footer />
    </main>
  )
}
