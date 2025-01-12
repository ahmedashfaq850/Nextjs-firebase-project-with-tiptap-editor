'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit3 } from 'lucide-react'
import { useRouter } from 'next/navigation'


export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/onboarding')

  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-transparent to-indigo-500/20 opacity-50" />
      <div className="relative mx-auto max-w-md w-full space-y-8 p-8 bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-white/10">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-8">
            <div className="relative size-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Edit3 className="h-6 w-6 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-600 blur-lg opacity-50 rounded-xl" />
            </div>
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
              DocEditor
            </span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Create an account</h1>
          <p className="text-zinc-400">
            Enter your details to get started
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
      
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-300">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-violet-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-300">Password</Label>
            <Input
              id="password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-violet-500/20"
            />
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
            type="submit"
            disabled={false}
          >
            { 'Sign Up'}
          </Button>
        </form>
        <div className="text-center text-sm text-zinc-400">
          Already have an account?{' '}
          <Link className="text-violet-400 hover:text-violet-300 transition-colors" href="/login">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

