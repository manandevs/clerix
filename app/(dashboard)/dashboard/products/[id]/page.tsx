"use client"

import React from "react"
import { ChevronLeft, UploadCloud, Globe, Tag, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function ProductDetailPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] overflow-hidden px-4 lg:px-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/50 shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-800"><ChevronLeft className="w-4 h-4" /></Button>
          <h1 className="text-xl font-bold tracking-tight">Clerix Hardware Security Key</h1>
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20 rounded-full">Active</Badge>
        </div>
        <Button className="gap-2"><Save className="w-4 h-4" /> Save Changes</Button>
      </div>

      {/* Control Tower Split Layout */}
      <div className="flex-1 overflow-y-auto pt-6 pb-20 scrollbar-hide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-7xl mx-auto">
          
          {/* Left Column: Physical Attributes (70%) */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="bg-zinc-950 border-zinc-800">
              <CardHeader><CardTitle className="text-base">Core Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Product Title</Label>
                  <Input defaultValue="Clerix Hardware Security Key" className="bg-zinc-900 border-zinc-800 font-medium text-lg" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  {/* Fake WYSIWYG */}
                  <div className="w-full h-40 bg-zinc-900 border border-zinc-800 rounded-md p-3 text-zinc-400 text-sm">
                    Physical FIDO2 compliance key providing air-gapped protection for your Zero-Knowledge Vault.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-950 border-zinc-800">
              <CardHeader><CardTitle className="text-base">Media Elements</CardTitle></CardHeader>
              <CardContent>
                {/* Drag Drop Zone */}
                <div className="w-full border-2 border-dashed border-zinc-800 hover:border-primary/50 bg-zinc-900/50 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                    <UploadCloud className="w-6 h-6 text-zinc-400" />
                  </div>
                  <h4 className="font-semibold">Drag & Drop product media</h4>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG, or WEBP up to 10MB.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-950 border-zinc-800">
              <CardHeader><CardTitle className="text-base">Variant Matrix</CardTitle></CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-left text-sm border-t border-zinc-800">
                  <thead className="bg-zinc-900 text-zinc-400 text-xs">
                    <tr><th className="p-3 font-semibold">Variant</th><th className="p-3 font-semibold">Price</th><th className="p-3 font-semibold">SKU</th><th className="p-3 font-semibold text-right">Stock</th></tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    <tr className="hover:bg-zinc-900/50">
                      <td className="p-3 font-medium">USB-C / Matte Black</td>
                      <td className="p-3"><Input defaultValue="120.00" className="w-24 h-8 bg-zinc-950 border-zinc-800" /></td>
                      <td className="p-3"><Input defaultValue="CLRX-HW-01-C" className="w-32 h-8 bg-zinc-950 border-zinc-800  text-xs" /></td>
                      <td className="p-3 text-right"><Input defaultValue="450" className="w-16 h-8 bg-zinc-950 border-zinc-800 text-right ml-auto" /></td>
                    </tr>
                    <tr className="hover:bg-zinc-900/50">
                      <td className="p-3 font-medium">USB-A / Matte Black</td>
                      <td className="p-3"><Input defaultValue="120.00" className="w-24 h-8 bg-zinc-950 border-zinc-800" /></td>
                      <td className="p-3"><Input defaultValue="CLRX-HW-01-A" className="w-32 h-8 bg-zinc-950 border-zinc-800  text-xs" /></td>
                      <td className="p-3 text-right"><Input defaultValue="0" className="w-16 h-8 border-red-500/50 text-red-500 bg-red-500/10 text-right ml-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Sticky Metadata (30%) */}
          <div className="lg:col-span-4 space-y-6 relative">
            <div className="sticky top-0 space-y-6">
              
              <Card className="bg-zinc-950 border-zinc-800">
                <CardHeader><CardTitle className="text-base flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> Publishing</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select defaultValue="active">
                      <SelectTrigger className="bg-zinc-900 border-zinc-800"><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="draft">Draft</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Sales Channels</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="bg-zinc-900 border-zinc-700">Online Store</Badge>
                      <Badge variant="outline" className="bg-zinc-900 border-zinc-700">B2B Portal</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-950 border-zinc-800">
                <CardHeader><CardTitle className="text-base flex items-center gap-2"><Tag className="w-4 h-4 text-primary" /> Organization</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input defaultValue="Hardware Security" className="bg-zinc-900 border-zinc-800" />
                  </div>
                  <div className="space-y-2">
                    <Label>Vendor</Label>
                    <Input defaultValue="Clerix Internal" className="bg-zinc-900 border-zinc-800" />
                  </div>
                </CardContent>
              </Card>

              {/* SEO Real-time Preview */}
              <Card className="bg-zinc-950 border-zinc-800">
                <CardHeader><CardTitle className="text-base">Search Engine Listing</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <h4 className="text-blue-400 text-sm hover:underline cursor-pointer">Clerix Hardware Security Key | Zero-Knowledge</h4>
                    <p className="text-green-500 text-xs">https://store.clerix.com/products/hardware-key</p>
                    <p className="text-zinc-400 text-xs line-clamp-2">Physical FIDO2 compliance key providing air-gapped protection for your Zero-Knowledge Vault. Protect your identity.</p>
                  </div>
                </CardContent>
              </Card>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}