'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function ProfilePage() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        
       
        <div className="space-y-2">
          <Label htmlFor="email" className="text-zinc-300">Email</Label>
          <Input 
            id="email" 
            value={''} 
            disabled 
            className="bg-zinc-800/50 border-zinc-700 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="displayName" className="text-zinc-300">Display Name</Label>
          <Input
            id="displayName"
            value={''}
            // onChange={(e) => setDisplayName(e.target.value)}
            className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-violet-500/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio" className="text-zinc-300">Bio</Label>
          <Textarea
            id="bio"
            value={''}
            // onChange={(e) => setBio(e.target.value)}
            className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-violet-500/20"
          />
        </div>
        <Button 
          type="submit"
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0"
        >
          Update Profile
        </Button>
      </form>
    </div>
  )
}

