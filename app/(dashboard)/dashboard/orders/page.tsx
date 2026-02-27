"use client"

import React from "react"
import { Clock, Search, CreditCard, Package, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function OrdersPage() {
  const router = useRouter()

  const COLUMNS = [
    { 
      id: "unfulfilled", title: "Unfulfilled Triage", count: 3, 
      orders: [
        { id: "#ORD-1042", customer: "Elena R.", total: "$120.00", items: 1, time: "48h ago", urgent: true },
        { id: "#ORD-1043", customer: "Marcus T.", total: "$299.00", items: 2, time: "2h ago", urgent: false },
        { id: "#ORD-1044", customer: "Sarah J.", total: "$35.00", items: 1, time: "1h ago", urgent: false },
      ]
    },
    { 
      id: "processing", title: "Pick & Pack", count: 1, 
      orders: [
        { id: "#ORD-1041", customer: "David K.", total: "$189.00", items: 1, time: "Yesterday", urgent: false },
      ]
    },
    { 
      id: "shipped", title: "In Transit", count: 12, 
      orders: [
        { id: "#ORD-1040", customer: "Anon User", total: "$120.00", items: 1, time: "2 days ago", urgent: false },
      ]
    }
  ]

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] overflow-hidden px-4 lg:px-6 pb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Fulfillment Queue</h1>
          <p className="text-muted-foreground text-sm">Triage and process incoming hardware and merchandise orders.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input placeholder="Search Order ID or Customer..." className="pl-9 bg-zinc-950 border-zinc-800 rounded-full" />
        </div>
      </div>

      {/* Horizontal Kanban Layout */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide">
        <div className="flex h-full gap-6 items-start min-w-max">
          
          {COLUMNS.map((col) => (
            <div key={col.id} className="w-[320px] flex flex-col h-full bg-zinc-950/30 border border-zinc-800/50 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-zinc-800/50 bg-zinc-900/40 flex items-center justify-between shrink-0">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-zinc-300">{col.title}</h3>
                <Badge variant="secondary" className="bg-zinc-800 text-zinc-400">{col.count}</Badge>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide">
                {col.orders.map((order) => (
                  <Card 
                    key={order.id} 
                    onClick={() => router.push(`/dashboard/orders/${order.id.replace('#', '')}`)}
                    className={`cursor-pointer transition-all hover:-translate-y-1 ${order.urgent ? 'bg-red-500/5 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'bg-zinc-950 border-zinc-800 hover:border-primary/40'}`}
                  >
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                      <span className=" font-bold text-sm text-white">{order.id}</span>
                      <div className={`flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-md ${order.urgent ? 'bg-red-500/20 text-red-500' : 'bg-zinc-900 text-zinc-400'}`}>
                        <Clock className="w-3.5 h-3.5" /> {order.time}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-zinc-300">{order.customer}</span>
                        <span className="text-sm font-bold text-white">{order.total}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-zinc-800/50">
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-500 border-transparent px-1.5"><CreditCard className="w-3 h-3 mr-1"/> Paid</Badge>
                          <Badge variant="outline" className="text-[10px] bg-zinc-800 text-zinc-400 border-transparent px-1.5"><Package className="w-3 h-3 mr-1"/> {order.items} Item</Badge>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500 hover:text-primary"><ArrowRight className="w-4 h-4" /></Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}