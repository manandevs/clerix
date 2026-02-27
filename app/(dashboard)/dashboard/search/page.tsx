"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Search as SearchIcon, 
  Terminal, 
  LayoutDashboard, 
  Settings, 
  Users, 
  FileText, 
  ShieldAlert, 
  Download, 
  Trash2, 
  CreditCard,
  Building,
  Mail,
  ArrowRight,
  Database
} from "lucide-react"
import { toast } from "sonner"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

// --- Main Component ---

export default function SearchPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Ensure hydration matches for keyboard shortcuts rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  const runCommand = (command: () => void) => {
    command()
    // In a real global Cmd+K dialog, we would close it here.
    // Since this is a dedicated page, we just execute the action.
  }

  const navigateTo = (path: string) => {
    toast.success(`Navigating to ${path}`)
    router.push(path)
  }

  const performAction = (actionName: string) => {
    toast.success(`Action triggered: ${actionName}`)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] overflow-hidden relative group">
      
      {/* Heavy Backdrop Overlay - creates the "modal" feel on a dedicated page */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md z-0 pointer-events-none transition-all duration-1000" />
      
      {/* Subtle Crimson Glow behind the palette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Centralized Command Palette */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl animate-in fade-in zoom-in-95 duration-300">
          
          <div className="mb-4 text-center">
            <Badge variant="outline" className="border-border/50 text-muted-foreground bg-background/50 backdrop-blur font-mono text-[10px] tracking-widest uppercase mb-4">
              Global Command Center
            </Badge>
          </div>

          <Command className="rounded-xl border border-border/50 bg-zinc-950/90 shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Massive Search Input */}
            <div className="flex items-center border-b border-border/50 px-4">
              <SearchIcon className="mr-3 h-6 w-6 text-primary animate-pulse" />
              <CommandInput 
                placeholder="Type a command or search for brokers, settings, or data..." 
                className="h-16 text-lg bg-transparent border-0 focus:ring-0 w-full placeholder:text-muted-foreground/50"
                autoFocus
              />
              <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground font-mono bg-zinc-900 px-2 py-1 rounded border border-border/50">
                <span>ESC</span> to clear
              </div>
            </div>

            <CommandList className="max-h-[50vh] overflow-y-auto p-2 scrollbar-hide">
              <CommandEmpty className="py-12 text-center text-sm">
                <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                  <Terminal className="w-8 h-8 opacity-20" />
                  <p>No results found. Try a different keyword.</p>
                </div>
              </CommandEmpty>

              {/* Suggestions / Quick Actions */}
              <CommandGroup heading="Quick Actions" className="text-muted-foreground text-xs [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground/70">
                <CommandItem 
                  onSelect={() => runCommand(() => performAction("Generate Compliance Report"))}
                  className="px-4 py-3 cursor-pointer data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary rounded-lg transition-colors"
                >
                  <FileText className="mr-3 h-4 w-4" />
                  <span className="font-medium">Generate Compliance Report</span>
                  <CommandShortcut className="text-muted-foreground/50">⌘G</CommandShortcut>
                </CommandItem>
                <CommandItem 
                  onSelect={() => runCommand(() => performAction("Export Raw Exposure CSV"))}
                  className="px-4 py-3 cursor-pointer data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary rounded-lg transition-colors"
                >
                  <Download className="mr-3 h-4 w-4" />
                  <span className="font-medium">Export Raw Exposure CSV</span>
                  <CommandShortcut className="text-muted-foreground/50">⌘E</CommandShortcut>
                </CommandItem>
                <CommandItem 
                  onSelect={() => runCommand(() => performAction("Invite Team Member"))}
                  className="px-4 py-3 cursor-pointer data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary rounded-lg transition-colors"
                >
                  <Users className="mr-3 h-4 w-4" />
                  <span className="font-medium">Invite Team Member</span>
                  <CommandShortcut className="text-muted-foreground/50">⌘I</CommandShortcut>
                </CommandItem>
              </CommandGroup>

              <CommandSeparator className="bg-border/50 my-2" />

              {/* Pages & Navigation */}
              <CommandGroup heading="Navigation" className="text-muted-foreground text-xs [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground/70">
                <CommandItem 
                  onSelect={() => runCommand(() => navigateTo("/dashboard"))}
                  className="px-4 py-3 cursor-pointer data-[selected=true]:bg-zinc-800 data-[selected=true]:text-foreground rounded-lg transition-colors"
                >
                  <LayoutDashboard className="mr-3 h-4 w-4 text-zinc-400" />
                  <span className="font-medium">Go to Dashboard</span>
                </CommandItem>
                <CommandItem 
                  onSelect={() => runCommand(() => navigateTo("/dashboard/lifecycle"))}
                  className="px-4 py-3 cursor-pointer data-[selected=true]:bg-zinc-800 data-[selected=true]:text-foreground rounded-lg transition-colors"
                >
                  <ShieldAlert className="mr-3 h-4 w-4 text-zinc-400" />
                  <span className="font-medium">Go to Lifecycle</span>
                </CommandItem>
                <CommandItem 
                  onSelect={() => runCommand(() => navigateTo("/dashboard/data-library"))}
                  className="px-4 py-3 cursor-pointer data-[selected=true]:bg-zinc-800 data-[selected=true]:text-foreground rounded-lg transition-colors"
                >
                  <Database className="mr-3 h-4 w-4 text-zinc-400" />
                  <span className="font-medium">Go to Data Library</span>
                </CommandItem>
              </CommandGroup>

              <CommandSeparator className="bg-border/50 my-2" />

              {/* Data Brokers (Deep Links) */}
              <CommandGroup heading="Data Brokers" className="text-muted-foreground text-xs [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground/70">
                <CommandItem 
                  onSelect={() => runCommand(() => navigateTo("/dashboard/lifecycle?broker=acxiom"))}
                  className="px-4 py-3 cursor-pointer data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary rounded-lg transition-colors"
                >
                  <Building className="mr-3 h-4 w-4 text-primary/70" />
                  <span className="font-medium text-foreground">Acxiom</span>
                  <span className="ml-2 text-xs text-muted-foreground">Legal Request Pending</span>
                  <ArrowRight className="ml-auto h-4 w-4 opacity-50" />
                </CommandItem>
                <CommandItem 
                  onSelect={() => runCommand(() => navigateTo("/dashboard/lifecycle?broker=spokeo"))}
                  className="px-4 py-3 cursor-pointer data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary rounded-lg transition-colors"
                >
                  <Building className="mr-3 h-4 w-4 text-primary/70" />
                  <span className="font-medium text-foreground">Spokeo</span>
                  <span className="ml-2 text-xs text-muted-foreground">Verified Removed</span>
                  <ArrowRight className="ml-auto h-4 w-4 opacity-50" />
                </CommandItem>
                <CommandItem 
                  onSelect={() => runCommand(() => navigateTo("/dashboard/lifecycle?broker=whitepages"))}
                  className="px-4 py-3 cursor-pointer data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary rounded-lg transition-colors"
                >
                  <Building className="mr-3 h-4 w-4 text-primary/70" />
                  <span className="font-medium text-foreground">Whitepages</span>
                  <span className="ml-2 text-xs text-red-500">High Severity Exposure</span>
                  <ArrowRight className="ml-auto h-4 w-4 opacity-50" />
                </CommandItem>
              </CommandGroup>

              <CommandSeparator className="bg-border/50 my-2" />

              {/* Settings Jump Links */}
              <CommandGroup heading="Settings & Preferences" className="text-muted-foreground text-xs [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground/70">
                <CommandItem 
                  onSelect={() => runCommand(() => navigateTo("/dashboard/settings?tab=security"))}
                  className="px-4 py-3 cursor-pointer data-[selected=true]:bg-zinc-800 data-[selected=true]:text-foreground rounded-lg transition-colors"
                >
                  <Settings className="mr-3 h-4 w-4 text-zinc-400" />
                  <span className="font-medium">Manage Two-Factor Auth (2FA)</span>
                </CommandItem>
                <CommandItem 
                  onSelect={() => runCommand(() => navigateTo("/dashboard/settings?tab=api"))}
                  className="px-4 py-3 cursor-pointer data-[selected=true]:bg-zinc-800 data-[selected=true]:text-foreground rounded-lg transition-colors"
                >
                  <Terminal className="mr-3 h-4 w-4 text-zinc-400" />
                  <span className="font-medium">Generate API Keys</span>
                </CommandItem>
                <CommandItem 
                  onSelect={() => runCommand(() => navigateTo("/dashboard/settings?tab=account"))}
                  className="px-4 py-3 cursor-pointer data-[selected=true]:bg-red-500/10 data-[selected=true]:text-red-500 rounded-lg transition-colors text-red-500"
                >
                  <Trash2 className="mr-3 h-4 w-4" />
                  <span className="font-medium">Delete Account & Data</span>
                </CommandItem>
              </CommandGroup>

            </CommandList>
            
            {/* Footer hint */}
            <div className="border-t border-border/50 p-3 bg-zinc-950 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>Navigate with</span>
                <kbd className="bg-zinc-900 border border-border/50 rounded px-1.5 py-0.5  font-medium text-[10px]">↑</kbd>
                <kbd className="bg-zinc-900 border border-border/50 rounded px-1.5 py-0.5  font-medium text-[10px]">↓</kbd>
              </div>
              <div className="flex items-center gap-2">
                <span>Select with</span>
                <kbd className="bg-zinc-900 border border-border/50 rounded px-1.5 py-0.5  font-medium text-[10px]">↵ Enter</kbd>
              </div>
            </div>
          </Command>
        </div>
      </div>
      
      {/* Stand-in for background app layout so the overlay visually makes sense */}
      <div className="absolute top-0 left-0 w-full h-full p-6 grid grid-cols-3 gap-6 opacity-20 pointer-events-none -z-10 blur-sm">
         <div className="col-span-3 h-24 bg-zinc-900 rounded-xl border border-zinc-800" />
         <div className="col-span-2 h-[400px] bg-zinc-900 rounded-xl border border-zinc-800" />
         <div className="col-span-1 h-[400px] bg-zinc-900 rounded-xl border border-zinc-800" />
      </div>

    </div>
  )
}

function Badge({ children, className, variant = "default" }: any) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  )
}