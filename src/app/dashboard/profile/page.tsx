'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from 'lucide-react'

export default function ProfilePage() {
  const { user, deleteUserAccount } = useAuth()
  const [displayName, setDisplayName] = useState(user?.displayName || '')
  const [bio, setBio] = useState(user?.bio || '')
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      await deleteUserAccount();
      alert('Account deleted successfully.');
    } catch {
      alert('Failed to delete account. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    setDeleteError('')
    
    try {
      await deleteUserAccount()
      router.push('/') // Redirect to home page after successful deletion
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account. Please try again.');
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="displayName" className="text-zinc-300">Display Name</Label>
          <Input
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-violet-500/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio" className="text-zinc-300">Bio</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
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

      <div className="mt-12 pt-6 border-t border-zinc-700/50">
        <h2 className="text-xl font-semibold text-white mb-4">Danger Zone</h2>
        
        {deleteError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{deleteError}</AlertDescription>
          </Alert>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Account
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border border-zinc-700/50">
            <DialogHeader>
              <DialogTitle className="text-white">Delete Account</DialogTitle>
              <DialogDescription className="text-zinc-400">
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <Button
                type="button"
                variant="destructive"
                disabled={isDeleting}
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete My Account'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

