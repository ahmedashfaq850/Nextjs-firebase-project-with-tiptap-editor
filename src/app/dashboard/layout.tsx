'use client'
import { DashboardNav } from '@/components/dashboard-nav'
import ProtectedRoute from '@/components/ProtectedRoutes'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
    <div className="flex min-h-screen bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-transparent to-indigo-500/20 opacity-50" />
      <DashboardNav />
      <main className="flex-1 p-8 relative">{children}</main>
    </div>
    </ProtectedRoute>
  )
}

