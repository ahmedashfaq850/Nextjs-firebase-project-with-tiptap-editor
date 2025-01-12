import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DocEditor - Rich Text Editing Made Simple",
  description: "Create, edit, and collaborate on documents with our powerful rich text editor.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

