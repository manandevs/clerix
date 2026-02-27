"use client"

import React, { useState } from "react"
import { Search, Plus, LayoutGrid, List as ListIcon, MoreVertical, Archive, Copy, Image as ImageIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const MOCK_PRODUCTS = [
  { id: "PROD-001", sku: "CLRX-HW-01", title: "Clerix Hardware Security Key", price: "$120.00", stock: 450, status: "Active", image: true },
  { id: "PROD-002", sku: "CLRX-SW-FAM", title: "Family Protection License (1 Yr)", price: "$299.00", stock: "∞", status: "Active", image: false },
  { id: "PROD-003", sku: "CLRX-MER-TEE", title: "Zero-Knowledge Vault T-Shirt", price: "$35.00", stock: 12, status: "Low Stock", image: true },
  { id: "PROD-004", sku: "CLRX-HW-02", title: "Clerix Biometric Wallet", price: "$189.00", stock: 0, status: "Out of Stock", image: true },
]

export default function ProductsPage() {
  const [view, setView] = useState<"list" | "grid">("list")

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] px-4 lg:px-6 pb-6 overflow-hidden">

      {/* Sticky Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/50 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Product Catalog</h1>
          <p className="text-muted-foreground text-sm">Manage inventory, digital assets, and physical merchandise.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1">
            <Button variant="ghost" size="sm" className={`h-7 w-8 px-0 ${view === 'list' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`} onClick={() => setView('list')}>
              <ListIcon className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className={`h-7 w-8 px-0 ${view === 'grid' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`} onClick={() => setView('grid')}>
              <LayoutGrid className="w-4 h-4" />
            </Button>
          </div>
          <Button className="gap-2 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
            <Plus className="w-4 h-4" /> Create Product
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 py-4 shrink-0">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
          <Input
            placeholder="Search SKU or title..."
            className="pl-9 bg-zinc-900 border-zinc-800 text-zinc-300 placeholder-zinc-300"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px] bg-zinc-900 border-zinc-800 text-zinc-300">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-12">
        {view === "list" ? (
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3 font-semibold text-zinc-300">Product</th>
                  <th className="px-4 py-3 font-semibold text-zinc-300">SKU</th>
                  <th className="px-4 py-3 font-semibold text-zinc-300">Price</th>
                  <th className="px-4 py-3 font-semibold text-zinc-300">Inventory</th>
                  <th className="px-4 py-3 font-semibold text-right text-zinc-300">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800">
                {MOCK_PRODUCTS.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-zinc-900/70 transition-colors group"
                  >
                    <td className="px-4 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                        {p.image ? (
                          <ImageIcon className="w-4 h-4 text-zinc-500" />
                        ) : (
                          <span className="text-[10px] text-zinc-500">
                            DIGITAL
                          </span>
                        )}
                      </div>
                      <span className="font-semibold text-zinc-100">
                        {p.title}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-xs text-zinc-500">
                      {p.sku}
                    </td>

                    <td className="px-4 py-3 text-zinc-200 font-medium">
                      {p.price}
                    </td>

                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={`rounded-full px-2 py-0.5 text-[11px] border-transparent ${p.status === "Active"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : p.status === "Low Stock"
                            ? "bg-amber-500/15 text-amber-400"
                            : "bg-rose-500/15 text-rose-400"
                          }`}
                      >
                        {p.stock} in stock
                      </Badge>
                    </td>

                    <td className="px-4 py-3 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800"
                      >
                        <Archive className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.map((p) => (
              <Card
                key={p.id}
                className="bg-zinc-950 border border-zinc-800 hover:border-red-500/40 transition-all group overflow-hidden flex flex-col cursor-pointer hover:shadow-[0_0_20px_rgba(220,38,38,0.08)] pt-0"
              >
                <div className="aspect-video w-full bg-zinc-900 border-b border-zinc-800 relative flex items-center justify-center">
                  {p.image ? (
                    <ImageIcon className="w-10 h-10 text-zinc-700" />
                  ) : (
                    <span className="text-xs text-zinc-600">
                      NO MEDIA
                    </span>
                  )}

                  <Badge
                    className={`absolute top-2 right-2 rounded-full text-[10px] shadow-lg ${p.status === "Out of Stock"
                      ? "bg-rose-500 text-white"
                      : "bg-zinc-800 text-zinc-300 border border-zinc-700"
                      }`}
                  >
                    {p.status}
                  </Badge>
                </div>

                <CardContent className="p-4 flex flex-col flex-1">
                  <p className="text-[10px] text-zinc-500 mb-1">
                    {p.sku}
                  </p>

                  <h3 className="font-bold text-sm leading-tight text-zinc-100 group-hover:text-red-400 transition-colors line-clamp-2">
                    {p.title}
                  </h3>

                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="font-semibold text-zinc-200">
                      {p.price}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {p.stock} units
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}