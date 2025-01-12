'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, FileEdit, User, LogOut, Edit3 } from 'lucide-react'

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'New Blog',
    href: '/dashboard/new',
    icon: FileEdit,
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: User,
  },
]

export function DashboardNav() {
  const pathname = usePathname()
  

  const handleSignOut = async () => {
    // Implement sign out logic here
  }

  return (
    <div className="flex h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
      <div className="p-4">
        <Link href="/" className="inline-flex items-center justify-center gap-2 mb-8">
          <div className="relative size-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Edit3 className="h-6 w-6 text-white" />
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-600 blur-lg opacity-50 rounded-xl" />
          </div>
          <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
            DocEditor
          </span>
        </Link>
        <h2 className="mb-4 px-2 text-lg font-semibold text-white">
          Welcome,
        </h2>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center rounded-lg px-2 py-2 text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-violet-500/10 text-violet-400'
                  : 'text-zinc-400 hover:bg-violet-500/5 hover:text-violet-300'
              )}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-zinc-400 hover:bg-red-500/10 hover:text-red-400"
          onClick={handleSignOut}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  )
}

