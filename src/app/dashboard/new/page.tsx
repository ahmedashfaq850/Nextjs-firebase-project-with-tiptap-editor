'use client'

import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import TipTapEditor from '@/components/tiptap-editor'

export default function NewBlogPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle blog submission here
    console.log({ title, content })
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-4xl font-bold tracking-tight text-white">Create New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-14 border-zinc-700/50 bg-zinc-800/50 text-xl text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-violet-500/20"
        />
        <TipTapEditor content={content} onChange={setContent} />
        <Button 
          type="submit"
          className="bg-violet-600 px-8 text-white hover:bg-violet-700"
        >
          Publish
        </Button>
      </form>
    </div>
  )
}

