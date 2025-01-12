'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'





export default function DashboardPage() {



  return (
   
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Your Blogs</h1>
        <Link href="/dashboard/new">
          <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0">
            <Plus className="mr-2 h-4 w-4" /> New Blog
          </Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

      </div>
    </div>
  )
}

