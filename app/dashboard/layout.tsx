import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Treasury Dashboard - SwitchYard FX",
  description: "Manage your FX hedges, track performance, and submit instructions",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
