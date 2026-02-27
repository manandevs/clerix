"use client"

import React, { useState, useEffect, useRef } from "react"
import { Activity, Shield, WifiOff, Settings2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts"

const barData = [
  { time: "10:00", ads: 40, trackers: 120 },
  { time: "10:05", ads: 30, trackers: 80 },
  { time: "10:10", ads: 60, trackers: 150 },
  { time: "10:15", ads: 20, trackers: 50 },
]

export default function ExtensionPage() {
  const [logs, setLogs] = useState<string[]>([])
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const domains = ["tracker.facebook.com", "google-analytics.com", "ads.twitter.com", "pixel.quantserve.com"]
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-49), `[BLOCKED] ${domains[Math.floor(Math.random() * domains.length)]} - Saved ${Math.floor(Math.random() * 15)}ms`])
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    logRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [logs])

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-theme(spacing.24))] gap-6 px-4 lg:px-6 pb-6">
      
      {/* Left: Live Streaming Telemetry */}
      <Card className="flex-1 bg-zinc-950 border-zinc-800 flex flex-col overflow-hidden relative shadow-inner">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        <CardHeader className="pb-2 border-b border-zinc-900 bg-zinc-900/50">
          <CardTitle className="text-sm font-mono text-zinc-400 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary animate-pulse" /> Live Network Telemetry
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-4 overflow-y-auto font-mono text-[11px] text-zinc-500 space-y-1.5 scrollbar-hide">
          {logs.map((log, i) => (
            <div key={i} className="animate-in fade-in slide-in-from-left-2">
              <span className="text-primary/70">{new Date().toLocaleTimeString()}</span> {log}
            </div>
          ))}
          <div ref={logRef} />
        </CardContent>
      </Card>

      {/* Right: Config & Analytics */}
      <div className="flex-1 flex flex-col gap-6">
        <Card className="bg-card/50 backdrop-blur border-border/50 shrink-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Settings2 className="w-5 h-5 text-primary" /> Active Shields</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Cross-site Tracker Blocking</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Canvas Fingerprint Spoofing</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Force WebRTC Leak Protection</span>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50 flex-1 flex flex-col min-h-[200px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /> Traffic Neutralized</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0 pb-4 pr-4">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={barData}>
                 <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                 <Tooltip cursor={{ fill: "hsl(var(--muted)/0.5)" }} contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a" }} />
                 <Bar dataKey="trackers" stackId="a" fill="var(--primary)" radius={[0, 0, 4, 4]} />
                 <Bar dataKey="ads" stackId="a" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}