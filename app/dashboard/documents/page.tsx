"use client"

import DashboardNav from "@/components/dashboard-nav"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Share2 } from "lucide-react"

const documents = [
  { id: 1, name: "Q4 2024 Board Report", type: "PDF", date: "2025-01-15", size: "2.4 MB" },
  { id: 2, name: "Hedge Policy Document", type: "PDF", date: "2024-12-01", size: "1.1 MB" },
  { id: 3, name: "Monthly P&L Statement (Jan)", type: "Excel", date: "2025-01-10", size: "850 KB" },
  { id: 4, name: "Treasury Risk Report", type: "PDF", date: "2025-01-08", size: "1.8 MB" },
  { id: 5, name: "Compliance Checklist 2024", type: "Word", date: "2024-12-15", size: "450 KB" },
]

export default function Documents() {
  return (
    <main className="min-h-screen bg-[#f5f7f6]">
      <DashboardNav />

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#12261f] mb-2">Document Vault</h1>
            <p className="text-[#4a5a55]">
              Access and export your hedging documents, reports, and compliance materials.
            </p>
          </div>

          <div className="space-y-3">
            {documents.map((doc) => (
              <Card key={doc.id} className="bg-white border-[#dce5e1] p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <FileText className="text-[#bd6908] flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-[#12261f]">{doc.name}</h3>
                      <p className="text-xs text-[#4a5a55]">
                        {doc.date} • {doc.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" className="text-[#bd6908]" title="Download">
                      <Download size={18} />
                    </Button>
                    <Button variant="ghost" className="text-[#bd6908]" title="Share">
                      <Share2 size={18} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-white rounded border border-[#dce5e1]">
            <p className="text-sm text-[#4a5a55]">
              <strong>Export Options:</strong> All documents can be downloaded individually. Bulk export to PDF or Excel
              coming soon. Contact support for custom report formats.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
