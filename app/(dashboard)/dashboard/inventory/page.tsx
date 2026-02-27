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
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <Box className="w-4 h-4 text-zinc-500" />
              Global Valuation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-100">
              $142,500.00
            </div>
            <p className="text-xs text-emerald-400 mt-1">
              +12% vs last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950 border-rose-500/30 shadow-[inset_0_0_20px_rgba(244,63,94,0.05)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-rose-400">
              4 SKUs
            </div>
            <p className="text-xs text-rose-300 mt-1">
              Critically low stock detected
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-zinc-500" />
              Avg Depletion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-100">
              45 units/day
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Across top 10 products
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Tier */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Alerts */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-zinc-400">
            Critical Alerts
          </h3>

          <Alert className="bg-rose-500/10 border-rose-500/40">
            <AlertCircle className="h-4 w-4 text-rose-400" />
            <AlertTitle className="text-rose-400 font-bold">
              Stockout Imminent: CLRX-HW-02
            </AlertTitle>
            <AlertDescription className="text-rose-300 text-sm mt-1 flex flex-col gap-2">
              <span>
                Depletion velocity spiked 400% in 48hrs. 12 units remaining.
              </span>
              <Button
                size="sm"
                variant="destructive"
                className="w-fit h-8"
              >
                Draft Purchase Order
              </Button>
            </AlertDescription>
          </Alert>

          <Card className="bg-zinc-950 border-zinc-800 overflow-hidden mt-4">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900 text-zinc-500 text-xs">
                <tr>
                  <th className="p-3 font-semibold">SKU</th>
                  <th className="p-3 font-semibold">Remaining</th>
                  <th className="p-3 font-semibold">30d Velocity</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800">
                <tr className="bg-rose-500/5">
                  <td className="p-3 text-xs text-rose-400">
                    CLRX-HW-02
                  </td>
                  <td className="p-3">
                    <Badge className="bg-rose-500 text-white hover:bg-rose-600">
                      12
                    </Badge>
                  </td>
                  <td className="p-3 w-32 h-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={velocityData}>
                        <Line
                          type="monotone"
                          dataKey="v"
                          stroke="#f43f5e"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </td>
                </tr>

                <tr className="hover:bg-zinc-900/60">
                  <td className="p-3 text-xs text-zinc-300">
                    CLRX-MER-TEE
                  </td>
                  <td className="p-3 text-zinc-400">
                    45
                  </td>
                  <td className="p-3 w-32 h-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={velocityData.slice().reverse()}>
                        <Line
                          type="monotone"
                          dataKey="v"
                          stroke="#71717a"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>

        {/* Distribution */}
        <div className="space-y-4 flex flex-col">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-zinc-400 flex justify-between items-center">
            Stock Distribution
            <Activity className="w-4 h-4 text-zinc-500" />
          </h3>

          <Card className="bg-zinc-950 border-zinc-800 flex-1 p-6 flex flex-col min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#a1a1aa", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "#27272a", opacity: 0.3 }}
                  contentStyle={{
                    backgroundColor: "#09090b",
                    borderColor: "#27272a",
                    color: "#e4e4e7"
                  }}
                />
                <Bar dataKey="hardware" stackId="a" fill="#6366f1" />
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