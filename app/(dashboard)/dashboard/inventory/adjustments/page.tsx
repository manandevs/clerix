"use client"

import React from "react"
import { ScanBarcode, Minus, Plus, Save, History } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const MOCK_AUDIT = [
  { id: "adj_9012", sku: "CLRX-HW-02", delta: "-3", reason: "Shrinkage / Damaged", user: "Admin", time: "10:42 AM" },
  { id: "adj_9011", sku: "CLRX-HW-01", delta: "+50", reason: "PO Received", user: "Warehouse_1", time: "09:15 AM" },
  { id: "adj_9010", sku: "CLRX-MER-TEE", delta: "-1", reason: "Promotional Giveaway", user: "Admin", time: "Yesterday" },
]

export default function AdjustmentsPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] overflow-hidden px-4 lg:px-6 pb-6 max-w-5xl mx-auto w-full">
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-bold tracking-tight">Rapid Stock Audit</h1>
        <p className="text-muted-foreground text-sm">Keyboard-optimized terminal for logging physical inventory deltas.</p>
      </div>

      {/* Top: Massive POS Staging Area */}
      <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-6 sm:p-8 shrink-0 shadow-[0_0_30px_rgba(244,63,94,0.05)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          <div className="md:col-span-5 space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-rose-400 flex items-center gap-2">
              <ScanBarcode className="w-4 h-4 text-rose-400" />
              Scan or Enter SKU
            </label>
            <Input
              autoFocus
              placeholder="e.g. CLRX-HW-01"
              className="h-16 text-xl bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-rose-500/40"
            />
          </div>

          <div className="md:col-span-3 space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              Delta Qty
            </label>
            <div className="flex items-center h-16 bg-zinc-950 border border-zinc-800 rounded-md overflow-hidden">
              <button className="h-full px-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="text"
                defaultValue="1"
                className="w-full h-full bg-transparent text-center font-bold text-xl text-zinc-100 outline-none"
              />
              <button className="h-full px-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              Reason Code
            </label>
            <Select defaultValue="receive">
              <SelectTrigger className="h-16 bg-zinc-950 border-zinc-800 text-base font-medium text-zinc-200 focus:border-rose-500/40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
                <SelectItem value="receive">Purchase Order Received</SelectItem>
                <SelectItem value="damage">Damaged / Shrinkage</SelectItem>
                <SelectItem value="transfer">Internal Transfer</SelectItem>
                <SelectItem value="promo">Promotional Allocation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            size="lg"
            className="h-14 px-8 text-lg font-bold tracking-wide shadow-lg gap-2 bg-rose-500 hover:bg-rose-600 text-white"
          >
            <Save className="w-5 h-5" />
            Commit Ledger Entry (↵)
          </Button>
        </div>
      </div>

      {/* Bottom: Immutable Audit Ledger */}
      <div className="mt-8 flex-1 flex flex-col min-h-0 bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-zinc-800 bg-zinc-900/60 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <History className="w-4 h-4 text-zinc-500" />
          Recent Adjustments
        </div>

        <div className="flex-1 overflow-auto scrollbar-hide">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-900/80 text-zinc-500 text-xs uppercase tracking-wider sticky top-0">
              <tr>
                <th className="px-6 py-3 font-semibold">Reconciliation ID</th>
                <th className="px-6 py-3 font-semibold">SKU Target</th>
                <th className="px-6 py-3 font-semibold">Delta</th>
                <th className="px-6 py-3 font-semibold">Reason Code</th>
                <th className="px-6 py-3 font-semibold">Timestamp / Actor</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-800 text-zinc-300 text-xs">
              {MOCK_AUDIT.map((row) => (
                <tr key={row.id} className="hover:bg-zinc-900/50 transition-colors">
                  <td className="px-6 py-4 text-zinc-500">
                    {row.id}
                  </td>

                  <td className="px-6 py-4 font-bold text-zinc-100">
                    {row.sku}
                  </td>

                  <td className="px-6 py-4">
                    <Badge
                      variant="outline"
                      className={`font-bold border-transparent ${row.delta.startsWith('+')
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-rose-500/15 text-rose-400'
                        }`}
                    >
                      {row.delta}
                    </Badge>
                  </td>

                  <td className="px-6 py-4 text-zinc-300">
                    {row.reason}
                  </td>

                  <td className="px-6 py-4 text-zinc-500">
                    {row.time} • {row.user}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}