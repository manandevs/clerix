"use client"

import React, { useState } from "react"
import { Eye, ShieldAlert, Database, Calendar } from "lucide-react"
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const mockMapData = [
  { x: 20, y: 50, z: 200, name: "Collection #1" },
  { x: 60, y: 70, z: 500, name: "LinkedIn 2012" },
  { x: 80, y: 30, z: 100, name: "Canva" },
  { x: 40, y: 80, z: 300, name: "Ticketmaster" }
]

const BREACHES = [
  { source: "LinkedIn 2012", date: "May 2012", vector: "Password Hash", data: "brypt$12$kas923... (Redacted)" },
  { source: "Collection #1", date: "Jan 2019", vector: "Plaintext Password", data: "Hunter2!" },
]

export default function DarkWebPage() {
  const [unredactedIndex, setUnredactedIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] overflow-hidden px-4 lg:px-6 pb-6">
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-red-500 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6" /> Deep Web Telemetry
        </h1>
        <p className="text-muted-foreground text-sm">Monitoring illicit marketplaces and credential dumps for identity fragments.</p>
      </div>

      {/* Split View */}
      <div className="flex flex-col flex-1 gap-6 min-h-0">
        
        {/* Top: Threat Radar Map */}
        <Card className="h-1/2 min-h-[250px] bg-zinc-950 border-red-500/20 relative overflow-hidden flex flex-col p-4 shadow-[inset_0_0_50px_rgba(220,38,38,0.05)]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
          <h3 className="text-xs font-bold text-red-500/70 mb-2 uppercase tracking-widest z-10">Global Breach Nodes</h3>
          <div className="flex-1 w-full h-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <XAxis type="number" dataKey="x" hide domain={[0, 100]} />
                <YAxis type="number" dataKey="y" hide domain={[0, 100]} />
                <ZAxis type="number" dataKey="z" range={[100, 800]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ payload }) => (
                  payload?.length ? <div className="bg-zinc-900 border border-red-500/30 p-2 rounded text-xs text-red-400 ">{payload[0].payload.name}</div> : null
                )} />
                <Scatter data={mockMapData} fill="rgba(239, 68, 68, 0.6)" className="drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Bottom: Credential List */}
        <div className="h-1/2 min-h-[250px] overflow-y-auto space-y-4 pr-2 scrollbar-hide">
          {BREACHES.map((b, i) => (
            <div key={i} className="bg-zinc-900/5 border border-zinc-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-4 hover:border-red-500/30 transition-colors">
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase text-zinc-700 font-bold tracking-wider">Source</p>
                  <p className="font-semibold text-sm flex items-center gap-1.5"><Database className="w-3.5 h-3.5 text-red-500" />{b.source}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase text-zinc-700 font-bold tracking-wider">Date Found</p>
                  <p className="text-sm text-zinc-500 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-zinc-700" />{b.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase text-zinc-700 font-bold tracking-wider">Vector</p>
                  <p className="text-sm text-zinc-500">{b.vector}</p>
                </div>
                <div className="space-y-1 relative">
                  <p className="text-[10px] uppercase text-zinc-700 font-bold tracking-wider">Exposed Data</p>
                  <p className={`text-sm  text-zinc-900 transition-all duration-300 ${unredactedIndex === i ? 'blur-none select-all' : 'blur-md select-none'}`}>
                    {b.data}
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" size="sm" 
                className="shrink-0 h-9 border-zinc-700 hover:bg-zinc-200"
                onPointerDown={() => setUnredactedIndex(i)}
                onPointerUp={() => setUnredactedIndex(null)}
                onPointerLeave={() => setUnredactedIndex(null)}
              >
                <Eye className="w-4 h-4 mr-2" /> Hold to View
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}