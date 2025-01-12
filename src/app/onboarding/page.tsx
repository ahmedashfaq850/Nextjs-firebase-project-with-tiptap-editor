'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Edit3 } from 'lucide-react'
import { doc, setDoc } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'

// Initialize Firestore
const firestore = getFirestore()

export default function OnboardingPage() {
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Assuming you have the user's ID after signup
      const userId = 'user_id_here'
      const userRef = doc(firestore, 'users', userId)

      // Update the user's display name and bio in Firestore
      await setDoc(userRef, {
        displayName: displayName,
        bio: bio,
      }, { merge: true })

      // Optionally, redirect to the dashboard or another page
      router.push('/dashboard')
    } catch (error) {
      console.error("Error updating profile:", error)
      // Optionally, display an error message to the user
    }
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
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Complete your profile</h1>
          <p className="text-zinc-400">
            Tell us a little bit about yourself
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="displayName" className="text-zinc-300">Display Name</Label>
            <Input
              id="displayName"
              placeholder="John Doe"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-violet-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-zinc-300">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-violet-500/20 min-h-[100px]"
            />
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
            type="submit"
          >
            Complete Profile
          </Button>
        </form>
      </div>
    </div>
  )
}

