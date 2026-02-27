"use client"

import React, { useState } from "react"
import { Search, Building, Scale, Clock, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

const BROKERS = [
  { name: "Acxiom", type: "Aggregator", compliance: "30 Days", framework: "CCPA/GDPR", risk: "High", success: 98 },
  { name: "BeenVerified", type: "People Search", compliance: "15 Days", framework: "CCPA", risk: "High", success: 94 },
  { name: "CoreLogic", type: "Financial", compliance: "45 Days", framework: "FCRA", risk: "Critical", success: 89 },
  { name: "Epsilon", type: "Marketing", compliance: "30 Days", framework: "GDPR", risk: "Medium", success: 99 },
  { name: "Intelius", type: "People Search", compliance: "15 Days", framework: "CCPA", risk: "High", success: 95 },
  { name: "Spokeo", type: "People Search", compliance: "15 Days", framework: "CCPA", risk: "High", success: 96 },
  { name: "Whitepages", type: "Directory", compliance: "21 Days", framework: "CCPA", risk: "Medium", success: 92 },
]

export default function BrokersPage() {
  const [search, setSearch] = useState("")

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] overflow-hidden px-4 lg:px-6 pb-6">
      {/* Sticky Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/50 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Data Broker Directory</h1>
          <p className="text-muted-foreground text-sm">Encyclopedic index of 214 active adversarial networks.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search broker registry..."
            className="pl-9 bg-card/50 border-border/50"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden mt-6 gap-6">
        {/* Dense Card Grid */}
        <div className="flex-1 overflow-y-auto scrollbar-hide grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-max pb-12">
          {BROKERS.filter(b => b.name.toLowerCase().includes(search.toLowerCase())).map((broker, idx) => (
            <Card key={idx} className="bg-card/30 backdrop-blur border-border/50 hover:border-primary/40 transition-colors group cursor-pointer h-fit">
              <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded group-hover:rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:bg-white group-hover:border-zinc-400 group-hover:text-zinc-400 transition-all duration-300 cursor-pointer">
                    <Building className="w-4 h-4 transition-colors" />
                  </div>
                  <h3 className="font-bold">{broker.name}</h3>
                </div>
                <Badge variant="outline" className={`text-[10px] ${broker.risk === 'Critical' ? 'border-red-500/50 text-red-500' : 'border-zinc-700 text-zinc-800'}`}>
                  {broker.risk} Risk
                </Badge>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                  <span className="flex items-center gap-1"><Scale className="w-3.5 h-3.5" /> {broker.framework}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {broker.compliance} SLA</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 opacity-50 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-xs font-medium text-primary">{broker.success}% Removal Success</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}