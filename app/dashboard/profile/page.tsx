"use client"

import DashboardNav from "@/components/dashboard-nav"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Profile() {
  return (
    <main className="min-h-screen bg-[#f5f7f6]">
      <DashboardNav />

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#12261f] mb-8">Profile Settings</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div>
              <Card className="bg-white border-[#dce5e1] p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#dce5e1] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#12261f]">JD</span>
                  </div>
                  <h3 className="font-bold text-[#12261f]">John Doe</h3>
                  <p className="text-sm text-[#4a5a55]">CFO</p>
                </div>
              </Card>
            </div>

            {/* Main */}
            <div className="md:col-span-2 space-y-6">
              <Card className="bg-white border-[#dce5e1] p-6">
                <h2 className="font-bold text-[#12261f] mb-4">Account Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#12261f] mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      disabled
                      className="w-full px-4 py-2 bg-[#f5f7f6] rounded border border-[#dce5e1] text-[#4a5a55]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#12261f] mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="john@company.com"
                      disabled
                      className="w-full px-4 py-2 bg-[#f5f7f6] rounded border border-[#dce5e1] text-[#4a5a55]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#12261f] mb-2">Company</label>
                    <input
                      type="text"
                      defaultValue="ABC Corporation"
                      disabled
                      className="w-full px-4 py-2 bg-[#f5f7f6] rounded border border-[#dce5e1] text-[#4a5a55]"
                    />
                  </div>
                </div>
              </Card>

              <Card className="bg-white border-[#dce5e1] p-6">
                <h2 className="font-bold text-[#12261f] mb-4">Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-[#4a5a55]">Daily Market Insights</label>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-[#4a5a55]">Weekly Treasury Report</label>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-[#4a5a55]">Hedge Expiry Alerts</label>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                </div>
              </Card>

              <Card className="bg-white border-[#dce5e1] p-6">
                <h2 className="font-bold text-[#12261f] mb-4">Security</h2>
                <Button className="bg-[#bd6908] hover:bg-[#a35a07] text-white font-bold">Change Password</Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
