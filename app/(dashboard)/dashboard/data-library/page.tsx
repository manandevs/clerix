"use client"

import React, { useState } from "react"
import { 
  FolderLock,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  ShieldAlert,
  CreditCard,
  MapPin,
  KeyRound,
  Mail,
  Trash2,
  AlertTriangle,
  Fingerprint
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useIsMobile } from "@/hooks/use-mobile"

// --- Mock Data & Types ---

type Category = "All" | "Passwords" | "Financial" | "Physical Addresses" | "Emails"

interface VaultItem {
  id: string
  category: Category
  type: string
  value: string
  redacted: string
  source: string
  dateFound: string
  icon: React.ElementType
}

const vaultData: VaultItem[] =[
  { 
    id: "v1", 
    category: "Passwords", 
    type: "Cleartext Password", 
    value: "Hunter2!_secure", 
    redacted: "•••••••••••••••", 
    source: "LinkedIn Breach (2012)", 
    dateFound: "Oct 12, 2025",
    icon: KeyRound
  },
  { 
    id: "v2", 
    category: "Financial", 
    type: "Credit Card (Visa)", 
    value: "4532 1123 9087 4242", 
    redacted: "•••• •••• •••• 4242", 
    source: "Ticketmaster Leak", 
    dateFound: "Nov 04, 2025",
    icon: CreditCard
  },
  { 
    id: "v3", 
    category: "Physical Addresses", 
    type: "Primary Residence", 
    value: "142 Privacy Lane, Austin, TX 78701", 
    redacted: "••• P•••••• Lane, A•••••, TX •••••", 
    source: "Whitepages / Spokeo", 
    dateFound: "Jan 22, 2026",
    icon: MapPin
  },
  { 
    id: "v4", 
    category: "Emails", 
    type: "Personal Account", 
    value: "j.doe.private@gmail.com", 
    redacted: "j.•••.p••••••@g••••.com", 
    source: "Apollo.io Scrape", 
    dateFound: "Feb 10, 2026",
    icon: Mail
  },
  { 
    id: "v5", 
    category: "Financial", 
    type: "Bank Routing (ACH)", 
    value: "021000021", 
    redacted: "••••••021", 
    source: "Equifax (Historical)", 
    dateFound: "Aug 15, 2025",
    icon: CreditCard
  },
  { 
    id: "v6", 
    category: "Passwords", 
    type: "Hashed Password (SHA-1)", 
    value: "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8", 
    redacted: "••••••••••••••••••••••••••••••••••••••••", 
    source: "Canva Breach", 
    dateFound: "Dec 01, 2025",
    icon: KeyRound
  },
]

const categories: { name: Category, icon: React.ElementType, count: number }[] =[
  { name: "All", icon: FolderLock, count: 6 },
  { name: "Passwords", icon: KeyRound, count: 2 },
  { name: "Financial", icon: CreditCard, count: 2 },
  { name: "Physical Addresses", icon: MapPin, count: 1 },
  { name: "Emails", icon: Mail, count: 1 },
]

// --- Main Component ---

export default function DataLibraryPage() {
  const isMobile = useIsMobile()
  const [selectedCategory, setSelectedCategory] = useState<Category>("All")
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const[revealedItems, setRevealedItems] = useState<Set<string>>(new Set())
  
  // Re-Auth Modal State
  const [authOpen, setAuthOpen] = useState(false)
  const[itemToReveal, setItemToReveal] = useState<string | null>(null)
  const [authPassword, setAuthPassword] = useState("")
  const [authError, setAuthError] = useState(false)

  const filteredData = selectedCategory === "All" 
    ? vaultData 
    : vaultData.filter(item => item.category === selectedCategory)

  // Handlers
  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedItems)
    if (newSet.has(id)) newSet.delete(id)
    else newSet.add(id)
    setSelectedItems(newSet)
  }

  const toggleSelectAll = () => {
    if (selectedItems.size === filteredData.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(filteredData.map(item => item.id)))
    }
  }

  const handleRevealClick = (id: string) => {
    if (revealedItems.has(id)) {
      // Conceal immediately without auth
      const newRevealed = new Set(revealedItems)
      newRevealed.delete(id)
      setRevealedItems(newRevealed)
    } else {
      // Trigger Re-Auth to reveal
      setItemToReveal(id)
      setAuthPassword("")
      setAuthError(false)
      setAuthOpen(true)
    }
  }

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate validation (accepts anything for this demo)
    if (authPassword.length < 4) {
      setAuthError(true)
      return
    }
    
    if (itemToReveal) {
      const newRevealed = new Set(revealedItems)
      newRevealed.add(itemToReveal)
      setRevealedItems(newRevealed)
    }
    setAuthOpen(false)
    setItemToReveal(null)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] overflow-hidden px-4 lg:px-6 pb-6 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 hidden sm:block">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">Zero-Knowledge Data Vault</h1>
            <p className="text-muted-foreground text-sm max-w-2xl">
              Securely view the exact plaintext data Clerix has discovered online. Data is heavily redacted and requires strict re-authentication to reveal.
            </p>
          </div>
        </div>
      </div>

      {/* Main Explorer Layout */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden border border-border/50 rounded-xl bg-card/20 backdrop-blur shadow-sm">
        
        {/* Left Pane: Categories Tree */}
        <div className={`w-full md:w-64 flex flex-col border-b md:border-b-0 md:border-r border-border/50 bg-background/30 shrink-0 ${isMobile ? 'h-auto max-h-48 overflow-y-auto' : ''}`}>
          <div className="p-4 border-b border-border/50 bg-zinc-900/40">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Vault Categories</h3>
          </div>
          <div className="p-2 space-y-1 overflow-y-auto">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg text-sm transition-all ${
                  selectedCategory === cat.name 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <cat.icon className="w-4 h-4" />
                  {cat.name}
                </div>
                <Badge variant="secondary" className={`text-[10px] px-1.5 h-5 ${selectedCategory === cat.name ? 'bg-primary/20 text-primary' : 'bg-background'}`}>
                  {cat.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Right Pane: Data Cards */}
        <div className="flex-1 flex flex-col overflow-hidden bg-card/10 relative">
          
          {/* Top Action Bar */}
          <div className="p-4 border-b border-border/50 bg-background/20 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <Checkbox 
                checked={filteredData.length > 0 && selectedItems.size === filteredData.length}
                onCheckedChange={toggleSelectAll}
                id="select-all"
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                Select All
              </label>
              <span className="text-xs text-muted-foreground ml-2 hidden sm:inline-block">
                Showing {filteredData.length} exposed records
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">Export Encrypted CSV</Button>
            </div>
          </div>

          {/* Scrollable Data List */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {filteredData.map((item) => {
              const isRevealed = revealedItems.has(item.id)
              const isSelected = selectedItems.has(item.id)

              return (
                <Card 
                  key={item.id} 
                  className={`transition-all duration-300 border ${
                    isSelected ? "border-primary/50 bg-primary/5 shadow-md" : "border-border/50 bg-card/50 hover:border-zinc-700"
                  }`}
                >
                  <CardHeader className="p-4 flex flex-row items-start space-y-0 gap-4">
                    <div className="pt-1">
                      <Checkbox 
                        checked={isSelected}
                        onCheckedChange={() => toggleSelection(item.id)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-md ${isRevealed ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
                            {isRevealed ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                          </div>
                          <h3 className="font-semibold text-sm sm:text-base truncate">{item.type}</h3>
                        </div>
                        <Badge variant="outline" className="w-fit text-[10px] border-zinc-700 text-zinc-400">
                          Found {item.dateFound}
                        </Badge>
                      </div>

                      {/* The Data Vault Input Simulation */}
                      <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-lg p-3 group">
                        <item.icon className={`w-5 h-5 shrink-0 ${isRevealed ? 'text-red-500' : 'text-zinc-600'}`} />
                        
                        <div className="flex-1 min-w-0 overflow-hidden">
                          {isRevealed ? (
                            <span className="font-mono text-sm sm:text-base text-red-400 break-all select-all animate-in fade-in duration-300">
                              {item.value}
                            </span>
                          ) : (
                            <span className="font-mono text-sm sm:text-base text-zinc-400 tracking-widest select-none blur-[2px] transition-all group-hover:blur-[1px]">
                              {item.redacted}
                            </span>
                          )}
                        </div>

                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={`shrink-0 hover:bg-zinc-800 ${isRevealed ? 'text-red-500 hover:text-red-400' : 'text-zinc-500 hover:text-primary'}`}
                          onClick={() => handleRevealClick(item.id)}
                        >
                          {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <ShieldAlert className="w-3.5 h-3.5 text-orange-500" />
                        Source: <span className="font-medium text-foreground">{item.source}</span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
            
            {filteredData.length === 0 && (
              <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                <FolderLock className="w-12 h-12 mb-4 opacity-20" />
                <p>No exposed data found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedItems.size > 0 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-zinc-900 border border-primary/30 shadow-2xl shadow-primary/20 rounded-full px-6 py-3 flex items-center gap-4 animate-in slide-in-from-bottom-10 fade-in duration-300 z-50">
          <Badge className="bg-primary text-primary-foreground font-bold">
            {selectedItems.size} Selected
          </Badge>
          <span className="text-sm font-medium text-zinc-200 hidden sm:inline-block">
            Ready for legal removal escalation
          </span>
          <div className="w-px h-6 bg-zinc-700 mx-2" />
          <Button variant="destructive" size="sm" className="rounded-full gap-2">
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Request Removal</span>
            <span className="sm:hidden">Remove</span>
          </Button>
        </div>
      )}

      {/* Re-Authentication Modal */}
      <Dialog open={authOpen} onOpenChange={setAuthOpen}>
        <DialogContent className="sm:max-w-[400px] bg-zinc-950 border-zinc-800">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
              <Fingerprint className="w-6 h-6 text-red-500" />
            </div>
            <DialogTitle className="text-center text-xl">Verification Required</DialogTitle>
            <DialogDescription className="text-center mt-2">
              You are attempting to view highly sensitive plaintext personal data. Please verify your identity to proceed.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAuthSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Master Password</label>
              <Input 
                type="password" 
                placeholder="Enter your password" 
                className="bg-zinc-900 border-zinc-800 focus-visible:ring-primary"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                autoFocus
              />
              {authError && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertTriangle className="w-3 h-3" /> Invalid credentials. Please try again.
                </p>
              )}
            </div>
            
            <DialogFooter className="sm:justify-between mt-6">
              <Button type="button" variant="ghost" onClick={() => setAuthOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Unlock Data
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}