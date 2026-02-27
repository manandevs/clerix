"use client"

import React from "react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts"
import { ShieldCheck, MapPin, CreditCard, User, Info, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const radarData = [
  { subject: "Financial", A: 85, fullMark: 100 },
  { subject: "Location", A: 65, fullMark: 100 },
  { subject: "Identity", A: 90, fullMark: 100 },
  { subject: "Social", A: 40, fullMark: 100 },
  { subject: "Family", A: 75, fullMark: 100 },
]

export default function ScorePage() {
  const score = 68
  const circumference = 2 * Math.PI * 120
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col gap-8 px-4 lg:px-6 pb-12 items-center">
      {/* Hero Centralized Score Ring */}
      <div className="w-full max-w-4xl flex flex-col items-center pt-8 md:pt-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            <circle cx="50%" cy="50%" r="120" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-zinc-900" />
            <circle 
              cx="50%" cy="50%" r="120" stroke="currentColor" strokeWidth="12" fill="transparent"
              strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
              className="text-primary transition-all duration-1000 ease-out" 
            />
          </svg>
          <div className="absolute flex flex-col items-center text-center">
            <span className="text-6xl md:text-8xl font-bold tracking-tighter text-white">{score}</span>
            <span className="text-sm md:text-base font-semibold text-primary uppercase tracking-widest mt-1">Fair Health</span>
          </div>
        </div>
        
        <div className="mt-8 text-center max-w-xl">
          <h1 className="text-2xl font-bold mb-2">Your Privacy Score</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your score is in the top 35% of users. To reach "Excellent" status (90+), you need to resolve 12 pending high-severity broker removals and enable 2FA.
          </p>
        </div>
      </div>

      {/* 3-Column Diagnostic Masonry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-colors">
          <CardHeader className="pb-2">
            <div className="p-2 bg-primary/10 w-fit rounded-lg mb-2"><CreditCard className="w-5 h-5 text-primary" /></div>
            <CardTitle className="text-base">Financial Vectors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Mortgage records and estimated net worth exposed on 4 sites.</p>
            <Button variant="outline" size="sm" className="w-full justify-between group">
              Fix Exposure <ArrowUpRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-colors">
          <CardHeader className="pb-2">
            <div className="p-2 bg-primary/10 w-fit rounded-lg mb-2"><MapPin className="w-5 h-5 text-primary" /></div>
            <CardTitle className="text-base">Location Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Current residential address is visible on Whitepages and Spokeo.</p>
            <Badge variant="destructive" className="w-full justify-center bg-red-500/10 text-red-500 border-red-500/20 py-1.5">-15 Points</Badge>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50 row-span-2 hidden md:flex flex-col">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary" /> Exposure Radar</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center p-0 pb-4">
             <div className="w-full h-full min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Radar dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}