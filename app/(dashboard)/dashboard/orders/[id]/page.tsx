"use client"

import React from "react"
import { ChevronLeft, Package, CreditCard, AlertTriangle, Truck, MapPin, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function OrderDetailPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] overflow-hidden px-4 lg:px-6 pb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/50 shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-800" onClick={() => window.history.back()}><ChevronLeft className="w-4 h-4" /></Button>
          <div>
            <h1 className="text-xl font-bold tracking-tight font-mono">#ORD-1042</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Placed Oct 24, 2025 at 14:32</p>
          </div>
          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 ml-2">Unfulfilled</Badge>
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Paid</Badge>
        </div>
      </div>

      {/* 3-Column Dossier Layout */}
      <div className="flex-1 overflow-y-auto pt-6 pb-12 scrollbar-hide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
          
          {/* Left Column: Physical Reality (60%) */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="bg-zinc-950 border-zinc-800 overflow-hidden">
              <CardHeader className="bg-zinc-900/50 border-b border-zinc-800 pb-4">
                <CardTitle className="text-base flex items-center gap-2"><Package className="w-4 h-4 text-primary" /> Fulfillment Queue (1 Item)</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4 flex items-center gap-4 border-b border-zinc-800/50">
                  <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-md flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6 text-zinc-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-white">Clerix Hardware Security Key</h4>
                    <p className="text-xs font-mono text-zinc-500 mt-1">SKU: CLRX-HW-01-C</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">$120.00</p>
                    <p className="text-xs text-zinc-500">Qty: 1</p>
                  </div>
                </div>
                
                {/* Active Fulfillment Input State */}
                <div className="p-4 bg-primary/5 border-t border-primary/20 flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex-1 w-full flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary shrink-0" />
                    <Input placeholder="Enter Tracking Number..." className="bg-zinc-950 border-zinc-800 h-9 text-sm w-full" autoFocus />
                  </div>
                  <Button size="sm" className="w-full sm:w-auto h-9 font-bold bg-primary hover:bg-primary/90 text-white shrink-0">Mark as Shipped</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-950 border-zinc-800">
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><CreditCard className="w-4 h-4 text-zinc-400" /> Payment Summary</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between text-zinc-400"><span>Subtotal</span><span>$120.00</span></div>
                <div className="flex justify-between text-zinc-400"><span>Shipping (Standard)</span><span>$0.00</span></div>
                <div className="flex justify-between text-zinc-400"><span>Tax</span><span>$10.20</span></div>
                <div className="flex justify-between font-bold text-white pt-2 border-t border-zinc-800 mt-2"><span>Total</span><span>$130.20</span></div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column Grid (40%) */}
          <div className="lg:col-span-5 grid grid-rows-2 gap-6">
            
            {/* Top Right: Customer Reality */}
            <Card className="bg-zinc-950 border-zinc-800">
              <CardHeader className="pb-4 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-zinc-700"><AvatarFallback className="bg-zinc-800 text-zinc-300">ER</AvatarFallback></Avatar>
                  <div>
                    <CardTitle className="text-base text-white">Elena Rodriguez</CardTitle>
                    <p className="text-xs text-zinc-500 mt-0.5">1 order • Customer since Oct 2025</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {/* Fraud Alert */}
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-red-500">Elevated Fraud Risk</p>
                    <p className="text-xs text-red-400/80 mt-1">Billing ZIP code does not match credit card registered address. Proceed with caution.</p>
                  </div>
                </div>
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Shipping Address</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">Elena Rodriguez<br/>123 Privacy Lane, Apt 4B<br/>Austin, TX 78701<br/>United States</p>
                </div>
              </CardContent>
            </Card>

            {/* Bottom Right: Temporal Reality (Timeline) */}
            <Card className="bg-zinc-950 border-zinc-800">
              <CardHeader><CardTitle className="text-base">Order Timeline</CardTitle></CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="relative border-l-2 border-zinc-800 ml-3 space-y-6">
                  <div className="relative pl-6">
                    <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-zinc-950 border-2 border-zinc-600" />
                    <p className="font-semibold text-sm text-zinc-300">Awaiting Fulfillment</p>
                  </div>
                  <div className="relative pl-6">
                    <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-zinc-950 border-2 border-green-500 flex items-center justify-center"><CheckCircle2 className="w-2.5 h-2.5 text-green-500" /></span>
                    <p className="font-semibold text-sm text-white">Payment Captured</p>
                    <p className="text-xs text-zinc-500 mt-1">$130.20 via Stripe (ending 4242)</p>
                    <p className="text-[10px] text-zinc-600 font-mono mt-1">Oct 24, 14:35</p>
                  </div>
                  <div className="relative pl-6">
                    <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-zinc-950 border-2 border-zinc-500" />
                    <p className="font-semibold text-sm text-zinc-300">Order Placed</p>
                    <p className="text-[10px] text-zinc-600 font-mono mt-1">Oct 24, 14:32</p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}