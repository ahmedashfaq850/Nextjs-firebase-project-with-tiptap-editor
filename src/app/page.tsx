import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Edit3, Sparkles, Zap, Users, Star, Shield, Laptop } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link className="flex items-center justify-center gap-2" href="#">
            <div className="relative size-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Edit3 className="h-5 w-5 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-600 blur-lg opacity-50" />
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-500">
              DocEditor
            </span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link className="text-sm font-medium text-zinc-400 hover:text-white transition-colors" href="#features">
              Features
            </Link>
            <Link className="text-sm font-medium text-zinc-400 hover:text-white transition-colors" href="#how-it-works">
              How it works
            </Link>
            <Link className="text-sm font-medium text-zinc-400 hover:text-white transition-colors" href="#pricing">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link 
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors" 
              href="/login"
            >
              Sign in
            </Link>
            <Link href="/signup">
              <Button variant="default" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 md:pt-40 lg:pt-48 pb-20 md:pb-28 lg:pb-30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-transparent" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent opacity-50" />
          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-8 mb-12">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-500/10 to-indigo-500/10 px-4 py-1.5 text-sm font-medium text-violet-300 border border-violet-500/20 mb-4">
                <Sparkles className="mr-2 h-4 w-4" />
                AI Powered Text Editor
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-300 to-zinc-400">
                Transform Your Writing with
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
                  AI-Powered Intelligence
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
                Experience the future of document editing with real-time AI assistance, 
                collaborative features, and powerful formatting tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 min-[400px]:items-center justify-center">
                <Link href="/signup">
                  <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 w-full sm:w-auto">
                    Start Writing Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-zinc-800 text-[#8b8bf8] hover:bg-zinc-800">
                    Watch Demo
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative mx-auto max-w-6xl">
              <div className="relative rounded-xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-indigo-500/10 rounded-xl" />
                <Image
                  src="https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/657c692a05329ebd9b46f958_Notion%20like%20editor.png"
                  width={1200}
                  height={600}
                  alt="Editor Interface"
                  className="rounded-xl opacity-90"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-violet-500/30 to-indigo-500/30 blur-3xl" />
              <div className="absolute -z-10 bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black to-transparent" />
            </div>

            {/* Stats Section */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border border-white/10 rounded-xl bg-gradient-to-b from-zinc-900 to-black p-8">
              {[
                { number: "20K+", label: "Active Users" },
                { number: "100K+", label: "Documents Created" },
                { number: "99.9%", label: "Uptime" },
                { number: "24/7", label: "Support" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
                    {stat.number}
                  </div>
                  <div className="text-sm text-zinc-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />
          <div className="container relative px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400 mb-4">
                Powerful Features
              </h2>
              <p className="text-zinc-400 md:text-lg max-w-2xl mx-auto">
                Everything you need to create amazing documents and collaborate with your team
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "AI-Powered Writing",
                  description: "Get intelligent suggestions and auto-completions as you write",
                  gradient: "from-yellow-500 to-orange-500"
                },
                {
                  icon: Users,
                  title: "Real-time Collaboration",
                  description: "Work together seamlessly with your team in real-time",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description: "Bank-grade encryption and security features",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Star,
                  title: "Smart Formatting",
                  description: "Beautiful documents with intelligent formatting",
                  gradient: "from-pink-500 to-rose-500"
                },
                {
                  icon: Laptop,
                  title: "Cross-Platform",
                  description: "Access your documents from any device",
                  gradient: "from-purple-500 to-violet-500"
                },
                {
                  icon: Edit3,
                  title: "Rich Text Editor",
                  description: "Full-featured editor with extensive formatting options",
                  gradient: "from-indigo-500 to-blue-500"
                }
              ].map((feature, i) => (
                <div key={i} className="group relative p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent hover:border-white/20 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-4 relative`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-zinc-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI-Powered Editing Section */}
        <section className="py-20 md:py-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950 to-black opacity-50" />
          <div className="container relative px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Experience the Power of{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
                  AI-Assisted Editing
                </span>
              </h2>
              <p className="text-zinc-300 md:text-lg">
                Harness the capabilities of Gemini AI to elevate your writing experience
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-violet-500/20">
                  <h3 className="text-xl font-semibold text-white mb-2">Intelligent Suggestions</h3>
                  <p className="text-zinc-300">
                    Get real-time writing suggestions and improvements powered by advanced language models.
                  </p>
                </div>
                <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-indigo-500/20">
                  <h3 className="text-xl font-semibold text-white mb-2">Auto-Completion</h3>
                  <p className="text-zinc-300">
                    Finish your sentences faster with context-aware auto-completion suggestions.
                  </p>
                </div>
                <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-violet-500/20">
                  <h3 className="text-xl font-semibold text-white mb-2">Style Adaptation</h3>
                  <p className="text-zinc-300">
                    Automatically adjust your writing style for different types of content and audiences.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full blur-3xl opacity-30" />
                <div className="relative bg-zinc-900/50 backdrop-blur-xl p-8 rounded-xl border border-white/10 shadow-2xl">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-4">
                    <p className="text-zinc-300">Writing with AI is like having a co-author...</p>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-violet-500 mr-2 animate-pulse" />
                      <p className="text-zinc-400">AI is thinking...</p>
                    </div>
                    <p className="text-white">
                      Writing with AI is like having a co-author who understands your style, anticipates your needs, and helps you express your ideas more effectively. It&apos;s not just about correcting grammar; it&apos;s about enhancing your creativity and productivity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10" />
          <div className="container relative px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to transform your writing?
              </h2>
              <p className="text-zinc-400 md:text-lg mb-8">
                Join thousands of users who are already experiencing the future of document editing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-zinc-700 text-[#8b8bf8] hover:bg-zinc-800">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black">
        <div className="container flex flex-col gap-8 py-12 px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <Link className="flex items-center gap-2" href="#">
              <div className="relative size-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Edit3 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-500">
                DocEditor
              </span>
            </Link>
            <nav className="flex flex-wrap gap-4 md:gap-8">
              <Link className="text-sm text-zinc-400 hover:text-white transition-colors" href="#">
                About
              </Link>
              <Link className="text-sm text-zinc-400 hover:text-white transition-colors" href="#">
                Features
              </Link>
              <Link className="text-sm text-zinc-400 hover:text-white transition-colors" href="#">
                Pricing
              </Link>
              <Link className="text-sm text-zinc-400 hover:text-white transition-colors" href="#">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 pt-8">
            <p className="text-sm text-zinc-400">
              © 2024 DocEditor. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link className="text-sm text-zinc-400 hover:text-white transition-colors" href="#">
                Privacy Policy
              </Link>
              <Link className="text-sm text-zinc-400 hover:text-white transition-colors" href="#">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

