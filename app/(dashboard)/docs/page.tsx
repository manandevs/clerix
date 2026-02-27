"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Terminal,
  Copy,
  CheckCircle2,
  Info,
  ExternalLink,
  Code2,
  FileCode2,
  Layers,
  ShieldAlert,
  ShoppingCart,
  LayoutDashboard,
  Settings
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

// --- Types & Documentation Data ---

type RouteCategory = "Core Privacy" | "E-Commerce" | "Enterprise Security" | "Workspace" | "Settings & Overlays"

interface RouteDoc {
  id: string
  title: string
  url: string
  filePath: string
  description: string
  category: RouteCategory
  badges: string[]
  dependencies: string[]
}

const ROUTE_DOCS: RouteDoc[] = [
  // Core Privacy
  { id: "r1", title: "Main Dashboard", url: "/dashboard", filePath: "app/(dashboard)/dashboard/page.tsx", description: "Macro-level command center with top-tier metrics and interactive charts.", category: "Core Privacy", badges: ["Interactive", "Data-Heavy"], dependencies: ["recharts", "@tanstack/react-table", "lucide-react"] },
  { id: "r2", title: "Privacy Score", url: "/dashboard/score", filePath: "app/(dashboard)/dashboard/score/page.tsx", description: "Gamified 0-100 privacy health metric utilizing a massive glowing radial gauge.", category: "Core Privacy", badges: ["Visual", "Custom SVG"], dependencies: ["recharts", "lucide-react"] },
  { id: "r3", title: "Broker Network", url: "/dashboard/brokers", filePath: "app/(dashboard)/dashboard/brokers/page.tsx", description: "A highly dense, searchable directory of 200+ data brokers with A-Z filtering.", category: "Core Privacy", badges: ["Directory", "Searchable"], dependencies: ["lucide-react"] },
  { id: "r4", title: "Threat Radar (Dark Web)", url: "/dashboard/dark-web", filePath: "app/(dashboard)/dashboard/dark-web/page.tsx", description: "Forensics-focused split view with glowing scatter plots and redacted credential UI.", category: "Core Privacy", badges: ["Forensics", "Interactive"], dependencies: ["recharts", "lucide-react"] },
  { id: "r5", title: "Removal Lifecycle", url: "/dashboard/lifecycle", filePath: "app/(dashboard)/dashboard/lifecycle/page.tsx", description: "Horizontal Kanban board visualizing the end-to-end legal journey of data removal.", category: "Core Privacy", badges: ["Drag & Drop", "Kanban"], dependencies: ["@dnd-kit/core", "@dnd-kit/sortable", "lucide-react"] },
  { id: "r6", title: "Deep Analytics", url: "/dashboard/analytics", filePath: "app/(dashboard)/dashboard/analytics/page.tsx", description: "Dense masonry grid heavily reliant on complex Recharts (Radar, Scatter, Stacked).", category: "Core Privacy", badges: ["Analytics", "Data-Heavy"], dependencies: ["recharts", "lucide-react"] },

  // E-Commerce
  { id: "r7", title: "Product Catalog", url: "/dashboard/products", filePath: "app/(dashboard)/dashboard/products/page.tsx", description: "List/Grid toggle view treating physical/digital goods like high-end assets.", category: "E-Commerce", badges: ["Toggle View", "Data Table"], dependencies: ["lucide-react"] },
  { id: "r8", title: "Product Editor", url: "/dashboard/products/id", filePath: "app/(dashboard)/dashboard/products/id/page.tsx", description: "Complex 70/30 split form for managing media, variants, and SEO metadata.", category: "E-Commerce", badges: ["Form", "Complex Layout"], dependencies: ["lucide-react"] },
  { id: "r9", title: "Inventory Overview", url: "/dashboard/inventory", filePath: "app/(dashboard)/dashboard/inventory/page.tsx", description: "Radar system highlighting depletion velocities and critical stock anomalies.", category: "E-Commerce", badges: ["Metrics", "Alerts"], dependencies: ["recharts", "lucide-react"] },
  { id: "r10", title: "Stock Adjustments", url: "/dashboard/inventory/adjustments", filePath: "app/(dashboard)/dashboard/inventory/adjustments/page.tsx", description: "Rapid-entry, POS-style terminal for logging physical inventory deltas.", category: "E-Commerce", badges: ["Keyboard First", "Ledger"], dependencies: ["lucide-react"] },
  { id: "r11", title: "Order Management", url: "/dashboard/orders", filePath: "app/(dashboard)/dashboard/orders/page.tsx", description: "Triage-based Kanban queue emphasizing 'Time in Unfulfilled State'.", category: "E-Commerce", badges: ["Kanban", "Triage"], dependencies: ["lucide-react"] },
  { id: "r12", title: "Order Detail", url: "/dashboard/orders/id", filePath: "app/(dashboard)/dashboard/orders/id/page.tsx", description: "3-column Dossier separating physical goods, customer data, and temporal history.", category: "E-Commerce", badges: ["Dossier", "Timeline"], dependencies: ["lucide-react"] },

  // Enterprise Security
  { id: "r13", title: "Team & Access Control", url: "/dashboard/team", filePath: "app/(dashboard)/dashboard/team/page.tsx", description: "Split-pane directory and granular Role-Based Access Control matrix.", category: "Enterprise Security", badges: ["RBAC", "Settings"], dependencies: ["lucide-react"] },
  { id: "r14", title: "Enterprise Audit Logs", url: "/dashboard/audit", filePath: "app/(dashboard)/dashboard/audit/page.tsx", description: "Edge-to-edge, maximum-density log viewer optimized for compliance auditing.", category: "Enterprise Security", badges: ["High Density", "Table"], dependencies: ["lucide-react"] },
  { id: "r15", title: "Extension Sync", url: "/dashboard/extension", filePath: "app/(dashboard)/dashboard/extension/page.tsx", description: "Live, streaming telemetry and hardware-firewall style configuration panel.", category: "Enterprise Security", badges: ["Streaming", "Networking"], dependencies: ["recharts", "lucide-react"] },
  { id: "r16", title: "Crisis Mode", url: "/dashboard/crisis", filePath: "app/(dashboard)/dashboard/crisis/page.tsx", description: "High-urgency lockdown interface requiring explicit typed confirmation to execute.", category: "Enterprise Security", badges: ["Focus Mode", "Urgent"], dependencies: ["lucide-react"] },

  // Workspace
  { id: "r17", title: "Projects", url: "/dashboard/projects", filePath: "app/(dashboard)/dashboard/projects/page.tsx", description: "Fluid grid folder/binder aesthetic with circular progress and avatars.", category: "Workspace", badges: ["Grid", "Visual"], dependencies: ["lucide-react"] },
  { id: "r18", title: "Data Library", url: "/dashboard/data-library", filePath: "app/(dashboard)/dashboard/data-library/page.tsx", description: "Zero-Knowledge Vault file-explorer with simulated re-authentication flows.", category: "Workspace", badges: ["File Explorer"], dependencies: ["lucide-react"] },
  { id: "r19", title: "Reports & Archives", url: "/dashboard/reports", filePath: "app/(dashboard)/dashboard/reports/page.tsx", description: "Document-centric repository with stylized CSS thumbnails and a generation wizard.", category: "Workspace", badges: ["Documents", "Wizard"], dependencies: ["lucide-react"] },
  { id: "r20", title: "Word Assistant", url: "/dashboard/word-assistant", filePath: "app/(dashboard)/dashboard/word-assistant/page.tsx", description: "Split IDE/Word Processor interface featuring conversational AI and a WYSIWYG editor.", category: "Workspace", badges: ["AI Chat", "Editor"], dependencies: ["lucide-react"] },

  // Settings & Overlays
  { id: "r21", title: "Global Search (Cmd+K)", url: "/dashboard/search", filePath: "app/(dashboard)/dashboard/search/page.tsx", description: "Full-screen overlay darkening the app to focus entirely on a centralized Command Palette.", category: "Settings & Overlays", badges: ["Overlay", "Keyboard"], dependencies: ["cmdk", "lucide-react"] },
  { id: "r22", title: "Onboarding Scan", url: "/dashboard/onboarding", filePath: "app/(dashboard)/dashboard/onboarding/page.tsx", description: "Distraction-free hacker-terminal funnel mapping user exposure data.", category: "Settings & Overlays", badges: ["Funnel", "Animated"], dependencies: ["lucide-react"] },
  { id: "r23", title: "Settings & Preferences", url: "/dashboard/settings", filePath: "app/(dashboard)/dashboard/settings/page.tsx", description: "Vertical tab layout covering General, Security (2FA), API Keys, and the Danger Zone.", category: "Settings & Overlays", badges: ["Forms", "Tabs"], dependencies: ["lucide-react"] },
  { id: "r24", title: "Billing", url: "/dashboard/billing", filePath: "app/(dashboard)/dashboard/billing/page.tsx", description: "Asymmetrical grid showing current plan dominance alongside invoices and cards.", category: "Settings & Overlays", badges: ["Financial", "Pricing"], dependencies: ["lucide-react"] },
]

const CATEGORIES = Array.from(new Set(ROUTE_DOCS.map(doc => doc.category)))

const CategoryIcons: Record<RouteCategory, React.ReactNode> = {
  "Core Privacy": <ShieldAlert className="w-4 h-4" />,
  "E-Commerce": <ShoppingCart className="w-4 h-4" />,
  "Enterprise Security": <Layers className="w-4 h-4" />,
  "Workspace": <LayoutDashboard className="w-4 h-4" />,
  "Settings & Overlays": <Settings className="w-4 h-4" />,
}

// --- Main Component ---

export default function DeveloperDocsPage() {
  const [showHero, setShowHero] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string>(CATEGORIES[0])

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const scrollToSection = (category: string) => {
    setActiveSection(category)
    const element = document.getElementById(category.replace(/\s+/g, '-').toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] px-4 lg:px-8 pb-8 overflow-y-scroll">

      {/* 4th-Wall Breaking Hero Terminal */}
      {showHero && (
        <div className="mb-8 shrink-0 relative animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-transparent blur-lg opacity-50 pointer-events-none" />
          <div className="relative bg-zinc-950 border-y border-r border-zinc-800 border-l-4 border-l-primary rounded-r-xl p-6 md:p-8 shadow-2xl flex flex-col md:flex-row gap-8 items-start justify-between">

            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3 text-primary  text-sm uppercase tracking-widest font-bold">
                <Terminal className="w-5 h-5" />
                Template Initialization Guide
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug max-w-2xl">
                This is a comprehensive UI template. Explore the routes below, extract the components you need, and safely delete the rest.
              </h1>
              <p className="text-zinc-400 max-w-xl text-sm leading-relaxed">
                Every page in this repository is designed to be fully modular and isolated. You can copy a specific page's `.tsx` file directly into your own Next.js `app` directory without breaking global dependencies.
              </p>

              <Button
                onClick={() => setShowHero(false)}
                className="mt-4 bg-white text-zinc-950 hover:bg-zinc-200 rounded-full font-bold px-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all"
              >
                Acknowledge & Start Building
              </Button>
            </div>

            <div className="w-full md:w-[400px] shrink-0 bg-zinc-900 border border-zinc-800 rounded-lg p-4  text-xs text-zinc-300 shadow-inner">
              <div className="flex items-center gap-2 mb-3 text-zinc-500 border-b border-zinc-800 pb-2">
                <Code2 className="w-4 h-4" /> Quick Start
              </div>
              <p className="text-zinc-400 mb-1"># 1. Find the page you want below</p>
              <p className="text-zinc-400 mb-1"># 2. Copy the file path (Cmd+C)</p>
              <p className="text-zinc-400 mb-3"># 3. Open in VS Code (Cmd+P)</p>
              <p><span className="text-primary">cd</span> your-project</p>
              <p><span className="text-primary">npm</span> run dev</p>
            </div>

          </div>
        </div>
      )}

      {/* Split Pane Layout */}
      <div className="flex flex-1 gap-8">

        {/* Left: Sticky Scrollspy Sidebar (20%) */}
        <div className="hidden lg:flex flex-col w-64 h-auto max-h-[500px] bg-zinc-950/50 border border-border/50 rounded-xl p-4">
          <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-500 mb-4 px-2">Modules</h3>
          <nav className="flex flex-col gap-1">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => scrollToSection(category)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left ${activeSection === category
                    ? "bg-primary/10 text-primary font-bold border border-primary/20"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-transparent"
                  }`}
              >
                {CategoryIcons[category]}
                {category}
              </button>
            ))}
          </nav>
        </div>

        {/* Right: Bento/Masonry Route Grid (80%) */}
        <div className="flex-1 scrollbar-hide pr-2 pb-20 scroll-smooth">
          <div className="space-y-12">
            {CATEGORIES.map((category) => (
              <section key={category} id={category.replace(/\s+/g, '-').toLowerCase()} className="scroll-mt-6">

                <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-2">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg border border-primary/20">
                    {CategoryIcons[category]}
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">{category}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                  {ROUTE_DOCS.filter(doc => doc.category === category).map((route) => (
                    <Card
                      key={route.id}
                      className="group bg-zinc-950/80 backdrop-blur border-border/50 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(220,38,38,0.1)] transition-all duration-300 flex flex-col"
                    >
                      <CardHeader className="p-5 pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <CardTitle className="text-lg font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
                              {route.title}
                            </CardTitle>
                            <CardDescription className="text-xs text-primary  mt-1">
                              {route.url}
                            </CardDescription>
                          </div>

                          <div className="flex items-center gap-2">
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-500 hover:text-white bg-zinc-900 border border-zinc-800">
                                  <Info className="w-3.5 h-3.5" />
                                </Button>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-80 bg-zinc-950 border-zinc-800 shadow-2xl">
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold flex items-center gap-2 text-white">
                                    <Layers className="w-4 h-4 text-primary" /> UI Dependencies
                                  </h4>
                                  <p className="text-xs text-zinc-400">This page relies on the following external or internal components:</p>
                                  <div className="flex flex-wrap gap-2 pt-2">
                                    {route.dependencies.map(dep => (
                                      <Badge key={dep} variant="secondary" className="bg-zinc-900 text-zinc-300  text-[10px] border-zinc-700">
                                        {dep}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>

                            <Link href={route.url} target="_blank">
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-500 hover:text-white bg-zinc-900 border border-zinc-800">
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="p-5 pt-0 flex flex-col flex-1">
                        <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                          {route.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {route.badges.map(badge => (
                            <Badge key={badge} variant="outline" className="rounded-full text-[10px] px-2.5 py-0 border-zinc-700 text-zinc-400 bg-zinc-900/50">
                              {badge}
                            </Badge>
                          ))}
                        </div>

                        {/* Monospace VS Code Path Copier */}
                        <div className="mt-auto flex items-center justify-between bg-zinc-900/80 border border-zinc-800 rounded-lg p-1.5 pl-3 group/code hover:border-zinc-700 transition-colors">
                          <div className="flex items-center gap-2">
                            <FileCode2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                            <code className="text-[11px]  text-zinc-400 truncate select-all">
                              {route.filePath}
                            </code>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-7 w-7 shrink-0 transition-colors ${copiedId === route.id ? 'bg-green-500/10 text-green-500' : 'text-zinc-500 hover:text-white'}`}
                            onClick={() => copyToClipboard(route.filePath, route.id)}
                            title="Copy to clipboard"
                          >
                            {copiedId === route.id ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

              </section>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}