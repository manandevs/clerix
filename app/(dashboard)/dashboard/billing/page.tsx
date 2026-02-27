"use client"

import React, { useState } from "react"
import { 
  Check, 
  CreditCard, 
  Download, 
  AlertTriangle, 
  FileText, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  MoreVertical,
  Calendar,
  Sparkles
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { PricingTable } from "@clerk/nextjs"

// --- Mock Data ---

const INVOICES = [
  { id: "inv_1", date: "Oct 01, 2025", amount: "$199.00", status: "Paid", pdf: "INV-2025-10.pdf" },
  { id: "inv_2", date: "Sep 01, 2025", amount: "$199.00", status: "Paid", pdf: "INV-2025-09.pdf" },
  { id: "inv_3", date: "Aug 01, 2025", amount: "$199.00", status: "Paid", pdf: "INV-2025-08.pdf" },
  { id: "inv_4", date: "Jul 01, 2025", amount: "$199.00", status: "Paid", pdf: "INV-2025-07.pdf" },
]

const PLANS = [
  {
    name: "Clerix Basic",
    price: "$49",
    period: "/mo",
    description: "Essential privacy protection for individuals.",
    features: [
      "Automated scanning of 50+ major brokers",
      "Standard legal removal requests (GDPR/CCPA)",
      "Monthly progress reports",
      "1 User Account"
    ],
    isCurrent: false,
    cta: "Downgrade",
  },
  {
    name: "Clerix Executive",
    price: "$199",
    period: "/mo",
    description: "Advanced protection for high-profile individuals.",
    features: [
      "Continuous scanning of 200+ global brokers",
      "Priority legal escalations & DPA reporting",
      "Dark web identity monitoring",
      "Dedicated Privacy Concierge",
      "Up to 5 Team/Family Members"
    ],
    isCurrent: true,
    cta: "Current Plan",
  },
  {
    name: "Clerix Enterprise",
    price: "Custom",
    period: "",
    description: "Organization-wide employee footprint erasure.",
    features: [
      "Unlimited automated broker coverage",
      "API Access & Custom Webhooks",
      "White-labeled reporting",
      "SAML / SSO Authentication",
      "Unlimited Team Members"
    ],
    isCurrent: false,
    cta: "Contact Sales",
  }
]

// --- Main Component ---

export default function BillingPage() {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)

  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Billing & Subscription</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Manage your subscription tier, payment methods, and view your invoice history.
          </p>
        </div>
      </div>

      {/* Asymmetrical Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left/Main Column: Current Plan & Upgrades (Spans 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Current Plan Card */}
          <Card className="bg-card/50 backdrop-blur border-primary/20 shadow-xl shadow-primary/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
            
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl">Clerix Executive</CardTitle>
                    <Badge className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20">Active</Badge>
                  </div>
                  <CardDescription className="text-base">
                    Your subscription renews on <span className="font-semibold text-foreground">November 1, 2026</span>
                  </CardDescription>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold">$199</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Usage Progress Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl border border-border/50 bg-background/30">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-muted-foreground">Active Automated Removals</span>
                    <span className="font-bold">145 / 200</span>
                  </div>
                  <Progress value={72.5} className="h-2 bg-muted [&>div]:bg-primary" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-muted-foreground">Team Member Seats</span>
                    <span className="font-bold">4 / 5</span>
                  </div>
                  <Progress value={80} className="h-2 bg-muted [&>div]:bg-primary" />
                </div>
              </div>

              {/* Feature Checklist */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Included in your plan</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                  {PLANS[1].features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="mt-0.5 rounded-full bg-primary/10 p-0.5 shrink-0">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-4 border-t border-border/50 bg-muted/10 flex flex-wrap items-center justify-between gap-4">
              <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                    Cancel Subscription
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] border-border/50 bg-zinc-950">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      Cancel Subscription?
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400 pt-2">
                      If you cancel, Clerix will stop sending automated legal requests to data brokers. Previously removed data may begin repopulating on public search sites.
                    </DialogDescription>
                  </DialogHeader>
                  
                  {/* Retention Offer */}
                  <div className="my-4 p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-3">
                    <h4 className="font-bold text-foreground flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Wait! Get 2 Months Free
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Switch to annual billing today and save $398. Your privacy is an ongoing process, don't leave it unprotected.
                    </p>
                    <Button className="w-full bg-primary hover:bg-primary/90 mt-2 text-primary-foreground font-semibold">
                      Claim 2 Months Free
                    </Button>
                  </div>

                  <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => setIsCancelModalOpen(false)} className="w-full sm:w-auto">Keep Subscription</Button>
                    <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-500/10 w-full sm:w-auto">Confirm Cancellation</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          {/* Pricing / Upgrades Section */}
          <div className="pt-6">
            <h3 className="text-xl font-bold mb-4">Available Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PLANS.map((plan) => (
                <Card key={plan.name} className={`flex flex-col bg-card/40 backdrop-blur transition-all ${plan.isCurrent ? 'border-primary shadow-lg shadow-primary/5 ring-1 ring-primary/20' : 'border-border/50 hover:border-border'}`}>
                  <CardHeader className="pb-4">
                    {plan.isCurrent && (
                      <Badge className="w-fit mb-2 bg-primary/20 text-primary border-primary/30">Current Plan</Badge>
                    )}
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-2xl font-bold">{plan.price}</span>
                      <span className="text-xs text-muted-foreground">{plan.period}</span>
                    </div>
                    <CardDescription className="text-xs mt-2 min-h-[32px]">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-4">
                    <Separator className="mb-4 bg-border/50" />
                    <ul className="space-y-3">
                      {plan.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      variant={plan.isCurrent ? "secondary" : (plan.price === "Custom" ? "outline" : "default")} 
                      className="w-full"
                      disabled={plan.isCurrent}
                    >
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <PricingTable />
        </div>

        {/* Right/Secondary Column: Payment & Invoices (Spans 1 column) */}
        <div className="space-y-6">
          
          {/* Payment Method UI */}
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Payment Method</CardTitle>
              <CardDescription>Default card for your recurring subscription.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-xl border border-border/50 bg-gradient-to-br from-zinc-900 to-zinc-950 relative overflow-hidden shadow-inner group">
                {/* Decorative Credit Card Elements */}
                <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/5 blur-2xl group-hover:bg-primary/10 transition-colors" />
                <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full bg-white/5 blur-2xl group-hover:bg-primary/10 transition-colors" />
                
                <div className="relative z-10 flex justify-between items-start mb-6">
                  {/* Custom Mastercard SVG Graphic */}
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full bg-red-500/80 mix-blend-screen" />
                    <div className="w-8 h-8 rounded-full bg-orange-500/80 -ml-3 mix-blend-screen" />
                  </div>
                  <Badge variant="outline" className="bg-background/50 backdrop-blur text-[10px] border-zinc-700 text-zinc-300">Default</Badge>
                </div>
                
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-4 text-lg  tracking-widest text-zinc-300">
                    <span>••••</span>
                    <span>••••</span>
                    <span>••••</span>
                    <span className="text-white font-bold">4242</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                    <span>Gerhardt Lutterodt</span>
                    <span>Exp 12/28</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" className="w-full gap-2">
                <CreditCard className="w-4 h-4" />
                Update Payment Method
              </Button>
            </CardFooter>
          </Card>

          {/* Minimal Invoice History List */}
          <Card className="bg-card/50 backdrop-blur border-border/50 flex flex-col h-[calc(100%-theme(spacing.6)-268px)]">
            <CardHeader>
              <CardTitle className="text-lg">Billing History</CardTitle>
              <CardDescription>Recent invoices and receipts.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 px-0">
              <div className="flex flex-col divide-y divide-border/50">
                {INVOICES.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between px-6 py-3 hover:bg-muted/30 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-muted/50 text-muted-foreground group-hover:text-primary transition-colors">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{invoice.amount}</p>
                        <p className="text-xs text-muted-foreground">{invoice.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-500 border-green-500/20 hidden sm:inline-flex">
                        {invoice.status}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t border-border/50 bg-muted/10">
              <Button variant="ghost" className="w-full text-sm">View All Invoices <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </CardFooter>
          </Card>

        </div>
      </div>
    </div>
  )
}