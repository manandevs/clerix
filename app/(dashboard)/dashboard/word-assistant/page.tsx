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
  const [inputValue, setInputValue] = useState("")
  const [documentContent, setDocumentContent] = useState(INITIAL_DOCUMENT)
  const [isTyping, setIsTyping] = useState(false)
  const[copied, setCopied] = useState(false)
  
  const chatEndRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", content: text }
    setMessages(prev =>[...prev, userMsg])
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
    <div className="flex flex-col h-screen overflow-hidden bg-[#fafafa] p-4 lg:p-6 pb-6 text-zinc-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-zinc-200/60 rounded-xl border border-zinc-300/60 hidden sm:block">
            <FileText className="w-6 h-6 text-zinc-800" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1 text-zinc-900">Word Assistant</h1>
            <p className="text-zinc-500 text-sm max-w-2xl">
              AI-driven drafting environment for custom legal privacy requests and out-of-band communications.
            </p>
          </div>
        </div>
      </div>

      {/* Two-Column IDE Workspace */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden gap-6 h-full">
        
        {/* Left Column: AI Prompt Interface */}
        <div className={`w-full lg:w-[420px] flex flex-col bg-white border border-zinc-200/80 rounded-xl overflow-hidden shrink-0 shadow-sm ${isMobile ? 'h-1/2' : 'h-full'}`}>
          <div className="p-4 border-b border-zinc-100 flex items-center justify-between shrink-0">
            <h2 className="font-semibold flex items-center gap-2 text-sm text-zinc-900">
              <Sparkles className="w-4 h-4 text-zinc-700" />
              Clerix AI Drafter
            </h2>
            <Badge variant="outline" className="text-[10px] font-medium border-zinc-200 text-zinc-500 bg-zinc-50 hover:bg-zinc-50">
              Legal Model v2.1
            </Badge>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                  msg.role === 'user' ? 'bg-zinc-100 border-zinc-200 text-zinc-600' : 'bg-zinc-100 border-zinc-200 text-zinc-700'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                  <div className={`p-4 rounded-3xl text-[14px] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-zinc-100 rounded-tr-sm text-zinc-800' 
                      : 'bg-[#18181b] text-zinc-200 rounded-tl-sm shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border bg-zinc-100 border-zinc-200 text-zinc-700">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-3xl bg-[#18181b] rounded-tl-sm flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce[animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce[animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Prompt Presets & Input Area */}
          <div className="p-4 border-t border-zinc-100 bg-white shrink-0">
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {PRESET_PROMPTS.map((preset, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSendMessage(preset)}
                    className="text-[12px] px-3 py-1.5 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors text-zinc-500"
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
                className="bg-white border-zinc-200/80 pr-10 focus-visible:ring-zinc-300 text-[14px] h-11"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="absolute right-1.5 w-8 h-8 rounded-md bg-zinc-500 hover:bg-zinc-600 text-white"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column: WYSIWYG Editor */}
        <div className={`flex-1 flex flex-col bg-[#09090b] border border-zinc-800 rounded-xl overflow-hidden relative shadow-xl ${isMobile ? 'h-1/2 mt-4' : 'h-full'}`}>
          
          {/* Floating Actions Header */}
          <div className="px-4 py-3 border-b border-zinc-800 bg-[#09090b] flex items-center justify-between shrink-0">
            {/* Mock Formatting Toolbar */}
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-md border border-zinc-800 p-0.5">
                <Button variant="ghost" size="icon" className="w-8 h-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-sm"><Bold className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-sm"><Italic className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-sm"><Underline className="w-4 h-4" /></Button>
              </div>
              <Separator orientation="vertical" className="h-5 mx-1 bg-zinc-800" />
              <div className="flex items-center rounded-md border border-zinc-800 p-0.5">
                <Button variant="ghost" size="icon" className="w-8 h-8 text-zinc-200 bg-zinc-800 hover:bg-zinc-700 rounded-sm"><AlignLeft className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-sm"><AlignCenter className="w-4 h-4" /></Button>
              </div>
              <Separator orientation="vertical" className="h-5 mx-1 bg-zinc-800 hidden sm:block" />
              <div className="hidden sm:flex items-center rounded-md border border-zinc-800 p-0.5">
                <Button variant="ghost" size="icon" className="w-8 h-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-sm"><List className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-sm"><ListOrdered className="w-4 h-4" /></Button>
              </div>
            </div>

            {/* Export & Copy Actions */}
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopy}
                className={`h-9 px-4 border-0 rounded-md font-medium transition-all ${
                  copied 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-white text-black hover:bg-zinc-200'
                }`}
              >
                {copied ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Text'}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 px-3 gap-2 text-zinc-200 hover:bg-zinc-800 hover:text-white"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Export PDF</span>
              </Button>
            </div>
          </div>

          {/* Live Document Area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[#09090b] p-6 md:p-10 lg:p-14 flex justify-center [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-[#09090b] [&::-webkit-scrollbar-thumb]:bg-zinc-700[&::-webkit-scrollbar-thumb]:border-4 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-[#09090b] [&::-webkit-scrollbar-thumb]:rounded-full">
            {/* The "Paper" Container */}
            <div 
              className="w-full max-w-3xl min-h-[800px] h-fit bg-[#121214] border border-zinc-800/80 rounded-lg shadow-2xl p-10 md:p-14 outline-none focus-within:ring-1 focus-within:ring-zinc-700 transition-all"
            >
              <div 
                ref={editorRef}
                className="whitespace-pre-wrap font-serif text-[15.5px] text-zinc-300 leading-relaxed outline-none"
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => setDocumentContent(e.currentTarget.innerText)}
              >
                {documentContent}
              </div>
            </div>
          </div>

          {/* Sync Status Footer */}
          <div className="px-4 py-2 bg-[#09090b] border-t border-zinc-900 flex items-center justify-end text-[11px] text-zinc-500 shrink-0 gap-1.5">
            <RefreshCw className="w-3 h-3" />
            Last synced with AI: Just now
          </div>
        </div>

      </div>
    </div>
  )
}