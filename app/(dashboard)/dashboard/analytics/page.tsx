"use client"

import React, { useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
  ResponsiveContainer
} from "recharts"
import { 
  Filter, 
  Download, 
  Calendar, 
  RefreshCcw 
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

// --- Mock Data ---

const timelineData =[
  { month: "Aug", high: 140, medium: 280, low: 450 },
  { month: "Sep", high: 120, medium: 260, low: 410 },
  { month: "Oct", high: 190, medium: 310, low: 520 }, // Breach peak
  { month: "Nov", high: 80, medium: 190, low: 380 },  // Clerix activated
  { month: "Dec", high: 40, medium: 120, low: 250 },
  { month: "Jan", high: 15, medium: 80, low: 170 },
  { month: "Feb", high: 5, medium: 45, low: 110 },
]

const threatVectorData =[
  { vector: "Financial", exposure: 85, avg: 45 },
  { vector: "Location", exposure: 95, avg: 60 },
  { vector: "Contact", exposure: 120, avg: 80 },
  { vector: "Relatives", exposure: 60, avg: 40 },
  { vector: "Identity", exposure: 40, avg: 30 },
  { vector: "Social", exposure: 110, avg: 75 },
]

const worstBrokersData =[
  { name: "Acxiom", records: 450, removed: 400 },
  { name: "Spokeo", records: 380, removed: 350 },
  { name: "Whitepages", records: 320, removed: 300 },
  { name: "Intelius", records: 290, removed: 290 },
  { name: "ZoomInfo", records: 210, removed: 150 },
  { name: "Radaris", records: 180, removed: 100 },
]

const breachAnomalyData =[
  { date: 1, severity: 8, records: 400, source: "LinkedIn" },
  { date: 5, severity: 4, records: 150, source: "Canva" },
  { date: 12, severity: 9, records: 850, source: "Equifax" },
  { date: 18, severity: 3, records: 90, source: "Apollo" },
  { date: 24, severity: 6, records: 300, source: "Twitter" },
  { date: 28, severity: 7, records: 500, source: "Ticketmaster" },
]

// --- Chart Configurations ---

const timelineConfig = {
  high: { label: "High Severity", color: "hsl(var(--destructive))" },
  medium: { label: "Medium Severity", color: "hsl(var(--chart-4))" },
  low: { label: "Low Severity", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig

const vectorConfig = {
  exposure: { label: "Your Exposure", color: "var(--primary)" },
  avg: { label: "Global Average", color: "hsl(var(--muted-foreground))" },
} satisfies ChartConfig

const brokerConfig = {
  records: { label: "Total Found", color: "hsl(var(--chart-2))" },
  removed: { label: "Verified Removed", color: "var(--primary)" },
} satisfies ChartConfig

const scatterConfig = {
  records: { label: "Exposed Records", color: "var(--primary)" },
} satisfies ChartConfig


// --- Main Component ---

export default function AnalyticsPage() {
  const[timeRange, setTimeRange] = useState("6m")
  const [severity, setSeverity] = useState("all")
  const[region, setRegion] = useState("global")

  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6 pb-8">
      
      {/* Header & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/50 backdrop-blur border border-border/50 p-4 rounded-xl shadow-sm z-10 sticky top-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg hidden sm:block">
            <Filter className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-bold">Deep Analytics</h2>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px] h-9 bg-background/50">
              <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>

          <Select value={severity} onValueChange={setSeverity}>
            <SelectTrigger className="w-[140px] h-9 bg-background/50">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="high">High Only</SelectItem>
              <SelectItem value="medium">Medium & Above</SelectItem>
            </SelectContent>
          </Select>

          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-[120px] h-9 bg-background/50">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">Global</SelectItem>
              <SelectItem value="us">US Only (CCPA)</SelectItem>
              <SelectItem value="eu">EU Only (GDPR)</SelectItem>
            </SelectContent>
          </Select>

          <div className="w-px h-6 bg-border mx-1 hidden sm:block" />

          <Button variant="outline" size="icon" className="h-9 w-9">
            <RefreshCcw className="w-4 h-4" />
          </Button>
          <Button variant="default" className="h-9 gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Masonry Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Full Width: Historical Exposure Timeline */}
        <Card className="lg:col-span-3 bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>Historical Exposure Timeline</CardTitle>
            <CardDescription>Aggregate view of PII records detected on the clear and dark web over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={timelineConfig} className="h-[300px] w-full">
              <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillHigh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-high)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-high)" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="fillMedium" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-medium)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-medium)" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="fillLow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-low)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-low)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Area dataKey="high" type="monotone" fill="url(#fillHigh)" stroke="var(--color-high)" stackId="1" />
                <Area dataKey="medium" type="monotone" fill="url(#fillMedium)" stroke="var(--color-medium)" stackId="1" />
                <Area dataKey="low" type="monotone" fill="url(#fillLow)" stroke="var(--color-low)" stackId="1" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 1/3 Width: Threat Vectors (Radar Chart) */}
        <Card className="lg:col-span-1 bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>Threat Vectors</CardTitle>
            <CardDescription>Categorical distribution of exposed data.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-4">
            <ChartContainer config={vectorConfig} className="h-[250px] w-full max-w-[300px]">
              <RadarChart data={threatVectorData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="vector" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <Radar name="Global Average" dataKey="avg" stroke="var(--color-avg)" fill="var(--color-avg)" fillOpacity={0.3} />
                <Radar name="Your Exposure" dataKey="exposure" stroke="var(--color-exposure)" fill="var(--color-exposure)" fillOpacity={0.6} />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 2/3 Width: Worst Offending Brokers (Bar Chart) */}
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>Top Offending Data Brokers</CardTitle>
            <CardDescription>Entities holding the highest volume of your personal records vs. successful removals.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={brokerConfig} className="h-[250px] w-full">
              <BarChart data={worstBrokersData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tickMargin={10} width={80} />
                <ChartTooltip cursor={{ fill: "hsl(var(--muted)/0.5)" }} content={<ChartTooltipContent indicator="dashed" />} />
                <Bar dataKey="records" fill="var(--color-records)" radius={[0, 4, 4, 0]} barSize={20} />
                <Bar dataKey="removed" fill="var(--color-removed)" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Full Width: Breach Anomaly Scatter Plot */}
        <Card className="lg:col-span-3 bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>Breach Origin Anomalies</CardTitle>
            <CardDescription>Correlation between breach severity (1-10) and volume of records exposed per incident over the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={scatterConfig} className="h-[250px] w-full">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  type="number" 
                  name="Day of Month" 
                  domain={[1, 30]} 
                  tickCount={10} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <YAxis 
                  dataKey="severity" 
                  type="number" 
                  name="Severity Score" 
                  domain={[1, 10]} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <ZAxis dataKey="records" type="number" range={[50, 600]} name="Exposed Records" />
                <ChartTooltip 
                  cursor={{ strokeDasharray: '3 3' }} 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-popover border border-border p-3 rounded-lg shadow-lg">
                          <p className="font-bold text-foreground mb-1">{data.source} Breach</p>
                          <p className="text-sm text-muted-foreground">Severity: <span className="text-primary font-bold">{data.severity}/10</span></p>
                          <p className="text-sm text-muted-foreground">Records Exposed: <span className="text-foreground font-semibold">{data.records}</span></p>
                          <p className="text-xs text-muted-foreground mt-2">Day {data.date} of month</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="Breaches" data={breachAnomalyData} fill="var(--color-records)" opacity={0.8} />
              </ScatterChart>
            </ChartContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}