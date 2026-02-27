"use client"

import React from "react"
import { AlertCircle, TrendingDown, Box, Activity } from "lucide-react"
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const velocityData = [{ v: 10 }, { v: 12 }, { v: 15 }, { v: 22 }, { v: 35 }, { v: 45 }, { v: 50 }]
const categoryData = [
  { name: "Mon", hardware: 40, software: 24, merch: 24 },
  { name: "Tue", hardware: 30, software: 13, merch: 22 },
  { name: "Wed", hardware: 20, software: 58, merch: 22 },
  { name: "Thu", hardware: 27, software: 39, merch: 20 },
]

export default function InventoryOverviewPage() {
  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6 pb-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Inventory Intelligence</h1>
          <p className="text-muted-foreground text-sm">Real-time stock valuations and depletion anomalies.</p>
        </div>
      </div>

      {/* KPI Top Tier */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2"><Box className="w-4 h-4" /> Global Valuation</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-white">$142,500.00</div><p className="text-xs text-green-500 mt-1">+12% vs last month</p></CardContent>
        </Card>
        <Card className="bg-zinc-950 border-red-500/30 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-red-500 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Action Required</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-red-500">4 SKUs</div><p className="text-xs text-red-400 mt-1">Critically low stock detected</p></CardContent>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2"><TrendingDown className="w-4 h-4" /> Avg Depletion Rate</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-white">45 units/day</div><p className="text-xs text-zinc-500 mt-1">Across top 10 products</p></CardContent>
        </Card>
      </div>

      {/* Dual Pane Bottom Tier */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Urgent Action List */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-zinc-400">Critical Alerts</h3>
          <Alert className="bg-red-500/10 border-red-500/50">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertTitle className="text-red-500 font-bold">Stockout Imminent: CLRX-HW-02</AlertTitle>
            <AlertDescription className="text-red-400 text-sm mt-1 flex flex-col gap-2">
              <span>Depletion velocity spiked 400% in 48hrs. 12 units remaining.</span>
              <Button size="sm" variant="destructive" className="w-fit h-8">Draft Purchase Order</Button>
            </AlertDescription>
          </Alert>

          <Card className="bg-zinc-950 border-zinc-800 overflow-hidden mt-4">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900 text-zinc-400 text-xs">
                <tr><th className="p-3 font-semibold">SKU</th><th className="p-3 font-semibold">Remaining</th><th className="p-3 font-semibold">30d Velocity</th></tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                <tr className="bg-red-500/5">
                  <td className="p-3 font-mono text-xs text-red-400">CLRX-HW-02</td>
                  <td className="p-3"><Badge className="bg-red-500 text-white hover:bg-red-600">12</Badge></td>
                  <td className="p-3 w-32 h-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={velocityData}><Line type="monotone" dataKey="v" stroke="#ef4444" strokeWidth={2} dot={false} /></LineChart>
                    </ResponsiveContainer>
                  </td>
                </tr>
                <tr className="hover:bg-zinc-900/50">
                  <td className="p-3 font-mono text-xs text-zinc-300">CLRX-MER-TEE</td>
                  <td className="p-3 text-zinc-400">45</td>
                  <td className="p-3 w-32 h-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={velocityData.slice().reverse()}><Line type="monotone" dataKey="v" stroke="#a1a1aa" strokeWidth={2} dot={false} /></LineChart>
                    </ResponsiveContainer>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>

        {/* Right: Distribution Chart */}
        <div className="space-y-4 flex flex-col">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-zinc-400 flex justify-between items-center">
            Stock Distribution <Activity className="w-4 h-4 text-primary" />
          </h3>
          <Card className="bg-zinc-950 border-zinc-800 flex-1 p-6 flex flex-col min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="name" tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "#27272a", opacity: 0.4 }} contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a" }} />
                <Bar dataKey="hardware" stackId="a" fill="var(--primary)" />
                <Bar dataKey="software" stackId="a" fill="#52525b" />
                <Bar dataKey="merch" stackId="a" fill="#27272a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

      </div>
    </div>
  )
}