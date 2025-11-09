"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, FileText, Download } from "lucide-react"

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#F5F7F6]">
      <Header />

      {/* Dashboard Header */}
      <section className="bg-[#12261F] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Treasury Dashboard</h1>
              <p className="text-[#DCE5E1]">Monitor your FX hedges and risk metrics</p>
            </div>
            <Button className="bg-[#BD6908] hover:bg-[#a35a07] text-white font-bold">+ New Instruction</Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Active Hedges", value: "12", icon: TrendingUp },
              { label: "Notional Value", value: "$2.4M", icon: TrendingUp },
              { label: "Risk Score", value: "Low", icon: TrendingUp },
              { label: "Avg Strike", value: "0.6850", icon: TrendingUp },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <Card key={i} className="bg-white border-[#DCE5E1] p-6">
                  <Icon className="text-[#BD6908] mb-2" size={24} />
                  <p className="text-xs text-[#4A5A55] mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#12261F]">{stat.value}</p>
                </Card>
              )
            })}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="hedges" className="space-y-4">
            <TabsList className="bg-white border-b border-[#DCE5E1]">
              <TabsTrigger
                value="hedges"
                className="data-[state=active]:text-[#BD6908] data-[state=active]:border-b-2 data-[state=active]:border-[#BD6908]"
              >
                Active Hedges
              </TabsTrigger>
              <TabsTrigger
                value="instructions"
                className="data-[state=active]:text-[#BD6908] data-[state=active]:border-b-2 data-[state=active]:border-[#BD6908]"
              >
                Instructions
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="data-[state=active]:text-[#BD6908] data-[state=active]:border-b-2 data-[state=active]:border-[#BD6908]"
              >
                Document Vault
              </TabsTrigger>
            </TabsList>

            {/* Hedges Tab */}
            <TabsContent value="hedges" className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#F5F7F6] border-b border-[#DCE5E1]">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-[#12261F]">Pair</th>
                      <th className="px-4 py-3 text-left font-bold text-[#12261F]">Type</th>
                      <th className="px-4 py-3 text-left font-bold text-[#12261F]">Notional</th>
                      <th className="px-4 py-3 text-left font-bold text-[#12261F]">Strike</th>
                      <th className="px-4 py-3 text-left font-bold text-[#12261F]">Maturity</th>
                      <th className="px-4 py-3 text-left font-bold text-[#12261F]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        pair: "AUD/USD",
                        type: "Forward",
                        notional: "$500K",
                        strike: "0.6850",
                        maturity: "2025-03-31",
                        status: "Active",
                      },
                      {
                        pair: "AUD/EUR",
                        type: "Option",
                        notional: "$300K",
                        strike: "0.6290",
                        maturity: "2025-06-30",
                        status: "Active",
                      },
                      {
                        pair: "AUD/GBP",
                        type: "Forward",
                        notional: "$200K",
                        strike: "0.5412",
                        maturity: "2025-02-28",
                        status: "Near Expiry",
                      },
                    ].map((hedge, i) => (
                      <tr key={i} className="border-b border-[#DCE5E1] hover:bg-[#F5F7F6]">
                        <td className="px-4 py-3 font-medium text-[#12261F]">{hedge.pair}</td>
                        <td className="px-4 py-3 text-[#4A5A55]">{hedge.type}</td>
                        <td className="px-4 py-3 text-[#4A5A55]">{hedge.notional}</td>
                        <td className="px-4 py-3 text-[#4A5A55]">{hedge.strike}</td>
                        <td className="px-4 py-3 text-[#4A5A55]">{hedge.maturity}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${hedge.status === "Near Expiry" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}
                          >
                            {hedge.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* Instructions Tab */}
            <TabsContent value="instructions" className="space-y-4">
              <Card className="bg-white border-[#DCE5E1] p-6">
                <h3 className="font-bold text-[#12261F] mb-4">Submit Instruction</h3>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <select className="px-4 py-3 rounded border border-[#DCE5E1] focus:outline-none focus:ring-2 focus:ring-[#BD6908]">
                      <option>Select Instruction Type</option>
                      <option>Close Position</option>
                      <option>Roll Forward</option>
                      <option>Deliver</option>
                    </select>
                    <select className="px-4 py-3 rounded border border-[#DCE5E1] focus:outline-none focus:ring-2 focus:ring-[#BD6908]">
                      <option>Select Hedge</option>
                      <option>AUD/USD Forward</option>
                      <option>AUD/EUR Option</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Instructions & notes..."
                    rows={4}
                    className="w-full px-4 py-3 rounded border border-[#DCE5E1] focus:outline-none focus:ring-2 focus:ring-[#BD6908]"
                  />
                  <Button className="bg-[#BD6908] hover:bg-[#a35a07] text-white font-bold">Submit Instruction</Button>
                </form>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-4">
              <Card className="bg-white border-[#DCE5E1] p-6">
                <h3 className="font-bold text-[#12261F] mb-4 flex items-center gap-2">
                  <FileText size={20} /> Document Vault
                </h3>
                <div className="space-y-2">
                  {[
                    { name: "Q4 2024 Board Report", date: "2025-01-15" },
                    { name: "Hedge Policy Document", date: "2024-12-01" },
                    { name: "Monthly P&L Statement", date: "2025-01-10" },
                  ].map((doc, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 border border-[#DCE5E1] rounded hover:bg-[#F5F7F6]"
                    >
                      <div>
                        <p className="font-medium text-[#12261F]">{doc.name}</p>
                        <p className="text-xs text-[#4A5A55]">{doc.date}</p>
                      </div>
                      <Button variant="ghost" className="text-[#BD6908]">
                        <Download size={18} />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </main>
  )
}
