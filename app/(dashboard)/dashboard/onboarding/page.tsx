"use client"

import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ShieldAlert, Terminal, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const SCAN_STEPS = [
  "Initializing Zero-Knowledge Vault...",
  "Querying major data broker networks (0/214)...",
  "Bypassing CAPTCHAs on Acxiom and Spokeo...",
  "Scanning dark web dumps (Collection #1, LinkedIn 2012)...",
  "Cross-referencing leaked financial vectors...",
  "Compiling exposure footprint...",
]

export default function OnboardingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const [threats, setThreats] = useState<{ broker: string; severity: string }[]>([])
  const logsEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let step = 0
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 / 60) // 6 seconds total
        if (next >= 100) clearInterval(interval)
        return next > 100 ? 100 : next
      })

      if (step < SCAN_STEPS.length && Math.random() > 0.6) {
        setLogs((prev) => [...prev, SCAN_STEPS[step]])
        step++
      }

      const THREAT_POOL = [
        { broker: "Spokeo", severity: "High" },
        { broker: "Whitepages", severity: "Medium" },
        { broker: "Acxiom", severity: "Critical" },
        { broker: "Dark Web (Email)", severity: "High" }
      ]

      if (Math.random() > 0.85) {
        setThreats((prev) => {
          if (prev.length >= THREAT_POOL.length) return prev
          return [...prev, THREAT_POOL[prev.length]]
        })
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [logs])

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 flex flex-col items-center justify-center  overflow-hidden">
      {/* Dynamic Radar/Pulse Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/20 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary/40 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
          {progress < 100 ? <Terminal className="w-8 h-8 text-primary animate-pulse" /> : <ShieldAlert className="w-8 h-8 text-primary" />}
        </div>

        <h1 className="text-3xl font-bold mb-2 tracking-tight text-white">
          {progress < 100 ? "Scanning Global Networks" : "Exposure Footprint Compiled"}
        </h1>
        <p className="text-muted-foreground text-center mb-8 h-6">
          {progress < 100 ? "Please do not close this window. Clerix AI is mapping your data." : `${threats.length} high-risk exposures found across broker databases.`}
        </p>

        {/* Console / Threat UI */}
        <div className="w-full bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-xl p-4 mb-8 h-64 flex flex-col shadow-2xl">
          <div className="flex-1 overflow-y-auto space-y-2  text-xs text-zinc-400 mb-4 scrollbar-hide">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2 animate-in fade-in slide-in-from-bottom-2">
                <span className="text-primary">{">"}</span> {log}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
          <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800">
            {threats.map((t, i) => (
              <Badge key={i} variant="outline" className="animate-in zoom-in bg-zinc-950 border-primary/40 text-primary py-1 px-3">
                <AlertTriangle className="w-3 h-3 mr-1.5" />
                {t.broker} ({t.severity})
              </Badge>
            ))}
          </div>
        </div>

        {/* Progress & CTA */}
        <div className="w-full space-y-4">
          <div className="flex justify-between text-xs  font-bold text-primary">
            <span>SYSTEM.SCAN</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-1.5 bg-zinc-900 [&>div]:bg-primary" />

          <div className={`pt-6 transition-all duration-1000 ${progress >= 100 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <Button size="lg" className="w-full text-lg h-14 bg-primary hover:bg-primary/90 text-white font-bold tracking-wide group" onClick={() => router.push('/dashboard')}>
              Initialize Removal Pipeline
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}