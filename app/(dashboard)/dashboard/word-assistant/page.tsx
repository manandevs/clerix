"use client"

import React, { useState, useRef, useEffect } from "react"
import { 
  Bot, 
  User, 
  Send, 
  Copy, 
  Download, 
  FileText, 
  Sparkles,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  List,
  ListOrdered,
  CheckCircle2,
  RefreshCw
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useIsMobile } from "@/hooks/use-mobile"

// --- Mock Data & Types ---

interface ChatMessage {
  id: string
  role: "user" | "ai"
  content: string
}

const INITIAL_DOCUMENT = `
[Your Name]
[Your Address][Your Email]
[Date]

[Data Controller Name]
[Data Controller Address]

Subject: Data Erasure Request (Article 17 GDPR / CCPA)

To the Privacy Officer,

I am writing to formally request the immediate deletion of all personal data that your company holds about me, in accordance with my right to erasure under Article 17 of the General Data Protection Regulation (GDPR) and/or the California Consumer Privacy Act (CCPA).

Please confirm the successful deletion of my data within 30 days of receiving this request. If you require further information to identify my records, please contact me at the email address provided above.

Sincerely,

[Your Name]
`

const PRESET_PROMPTS =[
  "Draft a strict DMCA Takedown Notice",
  "Write a CCPA 'Do Not Sell' request",
  "Generate a GDPR Article 17 Erasure request",
]

// --- Main Component ---

export default function WordAssistantPage() {
  const isMobile = useIsMobile()
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "ai",
      content: "Hello. I am the Clerix Legal Assistant. I can help you draft custom legal privacy requests (GDPR, CCPA, DMCA) for entities not covered by our automated broker network. What would you like to draft today?"
    }
  ])
  const[inputValue, setInputValue] = useState("")
  const [documentContent, setDocumentContent] = useState(INITIAL_DOCUMENT)
  const [isTyping, setIsTyping] = useState(false)
  const [copied, setCopied] = useState(false)
  
  const chatEndRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", content: text }
    setMessages(prev => [...prev, userMsg])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI drafting delay
    setTimeout(() => {
      const aiMsg: ChatMessage = { 
        id: (Date.now() + 1).toString(), 
        role: "ai", 
        content: "I have drafted a formal request based on your instructions. I've updated the document editor on the right. Please review the bracketed information [like this] and fill in your specific details before exporting." 
      }
      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
      
      // Update document based on prompt (Simulated AI generation)
      if (text.toLowerCase().includes("dmca")) {
        setDocumentContent(`[Your Name]\n[Your Address]\n[Date]\n\nDesignated Copyright Agent\n[Company Name]\n\nSubject: Notice of Copyright Infringement (DMCA)\n\nTo whom it may concern,\n\nI am the copyright owner of the following highly sensitive personal media which is being displayed on your platform without my authorization: [URL to infringing content].\n\nI request that you immediately take down this content pursuant to the Digital Millennium Copyright Act (DMCA).\n\nSincerely,\n\n[Your Name]`)
      }
    }, 1500)
  }

  const handleCopy = () => {
    if (editorRef.current) {
      navigator.clipboard.writeText(editorRef.current.innerText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] overflow-hidden px-4 lg:px-6 pb-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20 hidden sm:block">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">Word Assistant</h1>
            <p className="text-muted-foreground text-sm max-w-2xl">
              AI-driven drafting environment for custom legal privacy requests and out-of-band communications.
            </p>
          </div>
        </div>
      </div>

      {/* Two-Column IDE Workspace */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden gap-6">
        
        {/* Left Column: AI Prompt Interface */}
        <div className={`w-full lg:w-[400px] flex flex-col bg-card/20 backdrop-blur border border-border/50 rounded-xl overflow-hidden shrink-0 ${isMobile ? 'h-1/2' : 'h-full'}`}>
          <div className="p-4 border-b border-border/50 bg-background/40 flex items-center justify-between shrink-0">
            <h2 className="font-semibold flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              Clerix AI Drafter
            </h2>
            <Badge variant="outline" className="text-[10px] border-primary/30 text-primary bg-primary/5">
              Legal Model v2.1
            </Badge>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                  msg.role === 'user' ? 'bg-muted border-border' : 'bg-primary/10 border-primary/30 text-primary'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                  <div className={`p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                      : 'bg-zinc-900 border border-border/50 text-foreground rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border bg-primary/10 border-primary/30 text-primary">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl bg-zinc-900 border border-border/50 rounded-tl-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce[animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Prompt Presets & Input Area */}
          <div className="p-4 border-t border-border/50 bg-background/40 shrink-0">
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {PRESET_PROMPTS.map((preset, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSendMessage(preset)}
                    className="text-[11px] px-2.5 py-1.5 rounded-full border border-border/50 bg-background hover:border-primary/50 hover:text-primary transition-colors text-muted-foreground"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            )}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
              className="flex items-center gap-2 relative"
            >
              <Input 
                placeholder="Ask Clerix AI to draft a document..." 
                className="bg-background/50 border-border/50 pr-10"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="absolute right-1 w-8 h-8 bg-primary hover:bg-primary/90"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="w-4 h-4 text-primary-foreground" />
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column: WYSIWYG Editor */}
        <div className={`flex-1 flex flex-col bg-zinc-950 border border-border/50 rounded-xl overflow-hidden relative ${isMobile ? 'h-1/2 mt-4' : 'h-full'}`}>
          
          {/* Floating Actions Header */}
          <div className="p-2 border-b border-border/50 bg-zinc-900/80 backdrop-blur flex items-center justify-between shrink-0">
            {/* Mock Formatting Toolbar */}
            <div className="flex items-center gap-1">
              <div className="flex items-center bg-zinc-950 rounded-md border border-zinc-800 p-0.5">
                <Button variant="ghost" size="icon" className="w-8 h-8 text-zinc-400 hover:text-foreground"><Bold className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 text-zinc-400 hover:text-foreground"><Italic className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 text-zinc-400 hover:text-foreground"><Underline className="w-4 h-4" /></Button>
              </div>
              <Separator orientation="vertical" className="h-6 mx-1 bg-zinc-800" />
              <div className="flex items-center bg-zinc-950 rounded-md border border-zinc-800 p-0.5">
                <Button variant="ghost" size="icon" className="w-8 h-8 text-zinc-400 hover:text-foreground bg-zinc-800"><AlignLeft className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 text-zinc-400 hover:text-foreground"><AlignCenter className="w-4 h-4" /></Button>
              </div>
              <Separator orientation="vertical" className="h-6 mx-1 bg-zinc-800 hidden sm:block" />
              <div className="hidden sm:flex items-center bg-zinc-950 rounded-md border border-zinc-800 p-0.5">
                <Button variant="ghost" size="icon" className="w-8 h-8 text-zinc-400 hover:text-foreground"><List className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 text-zinc-400 hover:text-foreground"><ListOrdered className="w-4 h-4" /></Button>
              </div>
            </div>

            {/* Export & Copy Actions */}
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopy}
                className={`h-9 border-zinc-800 hover:bg-zinc-800 transition-all ${copied ? 'text-green-500 border-green-500/30 bg-green-500/10' : ''}`}
              >
                {copied ? <CheckCircle2 className="w-4 h-4 mr-1.5" /> : <Copy className="w-4 h-4 mr-1.5" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Text'}</span>
              </Button>
              <Button size="sm" className="h-9 gap-1.5 bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export PDF</span>
              </Button>
            </div>
          </div>

          {/* Live Document Area */}
          <div className="flex-1 overflow-y-auto bg-zinc-950 p-6 md:p-10 lg:p-14 flex justify-center">
            {/* The "Paper" Container */}
            <div 
              className="w-full max-w-3xl min-h-full bg-zinc-900 border border-zinc-800 rounded-sm shadow-2xl p-8 md:p-12 outline-none text-zinc-300 focus:ring-1 focus:ring-primary/50 transition-shadow"
            >
              <div 
                ref={editorRef}
                className="whitespace-pre-wrap font-serif text-[15px] leading-relaxed outline-none"
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => setDocumentContent(e.currentTarget.innerText)}
              >
                {documentContent}
              </div>
            </div>
          </div>

          {/* Sync Status Footer */}
          <div className="p-2 bg-zinc-900/80 border-t border-zinc-800 flex items-center justify-end text-[10px] text-zinc-500 shrink-0 gap-2">
            <RefreshCw className="w-3 h-3" />
            Last synced with AI: Just now
          </div>
        </div>

      </div>
    </div>
  )
}