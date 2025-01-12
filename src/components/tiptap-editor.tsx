'use client'

import { useState, useCallback, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import FontSize from '@tiptap/extension-font-size'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { Bold, Italic, UnderlineIcon, Strikethrough, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify, Indent, Outdent, Search, Scissors, Copy, Clipboard, Undo, Redo, Type, Highlighter, LinkIcon, TableIcon, Code, Quote, Paintbrush, ImageIcon, Upload, Wand2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Fragment, Slice } from '@tiptap/pm/model'
import ToolbarButton from './ToolbarButton'
import { Textarea } from '@/components/ui/textarea'

interface TipTapEditorProps {
  content?: string
  onChange?: (content: string) => void
}

const lowlight = createLowlight(common)

const TipTapEditor = ({ content = '<p>Start writing your blog post...</p>', onChange }: TipTapEditorProps) => {
  const [imageUrl, setImageUrl] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [findText, setFindText] = useState('')
  const [replaceText, setReplaceText] = useState('')
  const [fontSize, setFontSize] = useState(16)
  const [wordCount, setWordCount] = useState(0)
  const [characterCount, setCharacterCount] = useState(0)
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      Link,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Placeholder.configure({
        placeholder: 'Write something amazing...',
      }),
      CharacterCount.configure({
        limit: 10000,
      }),
      Color,
      TextStyle,
      FontSize,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'min-h-[150px] w-full rounded-md bg-zinc-800/50 p-4 text-zinc-100 text-base focus:outline-none overflow-y-auto',
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
      setWordCount(editor.storage.characterCount.words())
      setCharacterCount(editor.storage.characterCount.characters())
    },
  })

  useEffect(() => {
    if (editor) {
      editor.chain().focus()
        .setFontSize(`${fontSize}px`)
        // .setLineHeight(lineSpacing)
        .run()
    }
  }, [editor, fontSize])

  const addImage = useCallback(() => {
    if (imageUrl && editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl('')
    }
  }, [editor, imageUrl])

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && editor) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === 'string') {
          editor.chain().focus().setImage({ src: result }).run()
        }
      }
      reader.readAsDataURL(file)
    }
  }, [editor])

  const setLink = useCallback(() => {
    if (linkUrl && editor) {
      editor.chain().focus().setLink({ href: linkUrl }).run()
      setLinkUrl('')
    }
  }, [editor, linkUrl])

  const findAndReplace = useCallback(() => {
    if (findText && replaceText && editor) {
      const { state, dispatch } = editor.view
      const { from, to } = state.selection
      const { doc } = state
      const textBetween = doc.textBetween(from, to, ' ')
      const newText = textBetween.replace(new RegExp(findText, 'g'), replaceText)
      
      // Replace the selected text with the new text
      const newSlice = new Slice(Fragment.from(editor.schema.text(newText)), 0, 0);
      dispatch(state.tr.replace(from, to, newSlice))
    }
  }, [editor, findText, replaceText])


  const generateAIContent = useCallback(async () => {
    if (!aiPrompt || !editor) return

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: aiPrompt }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content')
      }

      // Insert the generated content as plain text
      editor.chain().focus().insertContent(data.content).run()

      // Clear the AI prompt input
      setAiPrompt('')
    } catch (error) {
      console.error('Error generating content:', error)
      // You can add a toast notification here to show the error to the user
    } finally {
      setIsGenerating(false)
    }
  }, [aiPrompt, editor])

  if (!editor) {
    return null
  }

  return (
    <div className="w-full rounded-lg border border-zinc-700/50 bg-zinc-900 shadow-lg">
      <div className="flex flex-wrap items-center gap-1 border-b border-zinc-700/50 bg-zinc-800/50 p-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-6 bg-zinc-700/50" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bulleted List"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-6 bg-zinc-700/50" />

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          isActive={editor.isActive({ textAlign: 'justify' })}
          title="Align Justify"
        >
          <AlignJustify className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-6 bg-zinc-700/50" />

        <ToolbarButton
          onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
          title="Indent"
        >
          <Indent className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().liftListItem('listItem').run()}
          title="Outdent"
        >
          <Outdent className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-6 bg-zinc-700/50" />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 border border-transparent p-2 text-zinc-300 hover:bg-violet-500/20 hover:text-violet-200">
              <Search className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 border border-zinc-700/50 bg-zinc-800 text-zinc-100">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none text-zinc-100">Find and Replace</h4>
                <p className="text-sm text-zinc-400">
                  Search for text and replace it.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="find">Find</Label>
                  <Input
                    id="find"
                    value={findText}
                    onChange={(e) => setFindText(e.target.value)}
                    className="col-span-2 h-8 bg-zinc-900 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500/50"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="replace">Replace</Label>
                  <Input
                    id="replace"
                    value={replaceText}
                    onChange={(e) => setReplaceText(e.target.value)}
                    className="col-span-2 h-8 bg-zinc-900 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500/50"
                  />
                </div>
              </div>
              <Button onClick={findAndReplace} className="bg-violet-500 text-white hover:bg-violet-600">Replace All</Button>
            </div>
          </PopoverContent>
        </Popover>

        <ToolbarButton
          onClick={() => {
            const { state, dispatch } = editor.view
            const { from, to } = state.selection
            const text = state.doc.textBetween(from, to)
            navigator.clipboard.writeText(text)
            dispatch(state.tr.delete(from, to))
          }}
          title="Cut"
        >
          <Scissors className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            const { state } = editor.view
            const { from, to } = state.selection
            const text = state.doc.textBetween(from, to)
            navigator.clipboard.writeText(text)
          }}
          title="Copy"
        >
          <Copy className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={async () => {
            const text = await navigator.clipboard.readText()
            editor.chain().focus().insertContent(text).run()
          }}
          title="Paste"
        >
          <Clipboard className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-6 bg-zinc-700/50" />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-6 bg-zinc-700/50" />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 border border-transparent p-2 text-zinc-300 hover:bg-violet-500/20 hover:text-violet-200">
              <Type className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 border border-zinc-700/50 bg-zinc-800 text-zinc-100">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none text-zinc-100">Font Size</h4>
                <p className="text-sm text-zinc-400">
                  Set the font size for the selected text.
                </p>
              </div>
              <Slider
                min={8}
                max={72}
                step={1}
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
              />
              <div>{fontSize}px</div>
            </div>
          </PopoverContent>
        </Popover>


        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive('highlight')}
          title="Highlight"
        >
          <Highlighter className="h-4 w-4" />
        </ToolbarButton>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 border border-transparent p-2 text-zinc-300 hover:bg-violet-500/20 hover:text-violet-200">
            <LinkIcon className="h-4 w-4" />
          </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 border border-zinc-700/50 bg-zinc-800 text-zinc-100">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none text-zinc-100">Insert Link</h4>
                <p className="text-sm text-zinc-400">
                  Add a hyperlink to the selected text.
                </p>
              </div>
              <div className="grid gap-2">
                <Input
                  id="link"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="bg-zinc-900 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500/50"
                />
              </div>
              <Button onClick={setLink} className="bg-violet-500 text-white hover:bg-violet-600">Insert Link</Button>
            </div>
          </PopoverContent>
        </Popover>

        <ToolbarButton
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          title="Insert Table"
        >
          <TableIcon className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          title="Code Block"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => {
            const currentColor = editor.getAttributes('textStyle').color
            if (currentColor === '#958DF1') {
              editor.chain().focus().unsetColor().run()
            } else {
              editor.chain().focus().setColor('#958DF1').run()
            }
          }}
          isActive={editor.isActive('textStyle', { color: '#958DF1' })}
          title="Text Color"
        >
          <Paintbrush className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-6 bg-zinc-700/50" />

        <div className="ml-auto flex items-center gap-2">
          <Input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="h-9 w-[200px] border-zinc-700/50 bg-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-violet-500/20"
          />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={addImage}
            className="h-9 w-9 border border-transparent p-2 text-zinc-300 hover:bg-violet-500/20 hover:text-violet-200"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Label htmlFor="image-upload" className="cursor-pointer">
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Upload className="h-4 w-4 text-zinc-300 hover:text-violet-200" />
          </Label>
        </div>
      </div>

      <div className="prose prose-invert prose-zinc max-w-none bg-zinc-900/50 p-4 max-h-[500px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>

      <div className="flex justify-between items-center p-2 border-t border-zinc-700/50 bg-zinc-800/50">
        <div className="text-sm text-zinc-400">
          {wordCount} words | {characterCount} characters
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center gap-2 bg-violet-500/10 text-violet-200 hover:bg-violet-500/20 hover:text-violet-100"
            >
              <Wand2 className="h-4 w-4 text-violet-400" />
              AI Generate
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 border border-zinc-700/50 bg-zinc-800 text-zinc-100">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none text-zinc-100">AI Text Generation</h4>
                <p className="text-sm text-zinc-400">
                  Enter a prompt to generate concise AI content (max 150 words).
                </p>
              </div>
              <div className="grid gap-2">
                <Textarea
                  id="ai-prompt"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="E.g., 'Write a brief introduction about artificial intelligence' or 'List 3 tips for productive writing'"
                  className="h-24 resize-none bg-zinc-900 border-zinc-700/50 placeholder:text-zinc-500 focus:border-violet-500/50"
                />
              </div>
              <Button 
                onClick={generateAIContent} 
                disabled={isGenerating}
                className="bg-violet-500 text-white hover:bg-violet-600"
              >
                {isGenerating ? 'Generating...' : 'Generate Content'}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <style jsx global>{`
        .ProseMirror p {
          margin: 1em 0;
        }
        .ProseMirror:focus {
          outline: none;
        }
        .ProseMirror > * + * {
          margin-top: 0.75em;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding: 0 1rem;
        }
        .ProseMirror ul {
          list-style-type: disc;
        }
        .ProseMirror ol {
          list-style-type: decimal;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          margin: 1em 0;
          border-radius: 0.5rem;
        }
        .ProseMirror blockquote {
          border-left: 4px solid #958DF1;
          padding-left: 1rem;
          font-style: italic;
        }
        .ProseMirror code {
          background-color: rgba(#958DF1, 0.1);
          color: #958DF1;
          padding: 0.2em 0.4em;
          border-radius: 0.3em;
        }
        .ProseMirror pre {
          background-color: #0D0D0D;
          color: #FFF;
          padding: 0.75em 1em;
          border-radius: 0.5em;
          font-family: 'JetBrains Mono', monospace;
        }
        .ProseMirror pre code {
          color: inherit;
          padding: 0;
          background: none;
          font-size: 0.8em;
        }
        .ProseMirror table {
          border-collapse: collapse;
          margin: 0;
          overflow: hidden;
          table-layout: fixed;
          width: 100%;
        }
        .ProseMirror table td,
        .ProseMirror table th {
          border: 2px solid #958DF1;
          box-sizing: border-box;
          min-width: 1em;
          padding: 3px 5px;
          position: relative;
          vertical-align: top;
        }
        .ProseMirror table th {
          background-color: #958DF1;
          font-weight: bold;
          text-align: left;
        }
        .ProseMirror table .selectedCell:after {
          background: rgba(200, 200, 255, 0.4);
          content: "";
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          pointer-events: none;
          position: absolute;
          z-index: 2;
        }
        .ProseMirror::-webkit-scrollbar {
          width: 8px;
        }
        .ProseMirror::-webkit-scrollbar-track {
          background: rgba(24, 24, 27, 0.5);
          border-radius: 4px;
        }
        .ProseMirror::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 4px;
        }
        .ProseMirror::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </div>
  )
}

export default TipTapEditor

