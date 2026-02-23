"use client"

import React from "react"
import {
  CreditCard,
  Check,
  Shield,
  Zap,
  AlertCircle,
  Download,
  Building2,
  Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { PricingTable } from "@clerk/nextjs"
import { Protect, useAuth } from "@clerk/nextjs"

const ActualBillingFeatures = () => {
  const { has } = useAuth()
  
  const hasIndividualPlan = has ? has({ plan: 'individual' }) : false

  // Determine current plan details
  const currentPlan = hasIndividualPlan ? 'Individual' : 'Free'
  const currentPrice = hasIndividualPlan ? '$15' : '$0'
  const trialEndsDate = 'Feb 25'

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-10 w-full">
      {/* Current Plan Details */}
      <Card className="lg:col-span-4 relative bg-card/50 border-border/50 shadow-lg">
        <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
          Active
        </div>

        <CardHeader>
          <CardTitle className="text-2xl font-bold">Current Plan</CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage your subscription and billing details
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800">
            <div className="flex items-center gap-5">
              <div className="p-3 rounded-full bg-zinc-700">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-xl text-primary-foreground">{currentPlan}</p>
                {hasIndividualPlan && (
                  <p className="text-sm text-muted-foreground">Trial ends {trialEndsDate}</p>
                )}
                {!hasIndividualPlan && (
                  <p className="text-sm text-muted-foreground">Always free</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold text-primary-foreground">{currentPrice}</p>
              <p className="text-sm text-muted-foreground">/ month</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
              <span>{hasIndividualPlan ? 'Data Broker Coverage' : 'Basic Data Scan'}</span>
              <span className="text-primary-foreground font-semibold">
                {hasIndividualPlan ? 'Active' : 'Limited'}
              </span>
            </div>
            
            {hasIndividualPlan && (
              <div className="space-y-2 pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Personal Account</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Monthly Privacy Reports</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Basic Removal Requests</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Standard Customer Support</span>
                </div>
              </div>
            )}

            {!hasIndividualPlan && (
              <div className="space-y-2 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4" />
                  <span>Limited Account Access</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4" />
                  <span>14-Day Trial Support</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4" />
                  <span>Monthly Privacy Summary</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4" />
                  <span>Community Help</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t border-border">
          {hasIndividualPlan && (
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-primary-foreground transition-colors"
            >
              Cancel Subscription
            </Button>
          )}
          <Button variant="outline" className="border-border hover:border-primary transition-colors">
            {hasIndividualPlan ? 'Update Payment Method' : 'Upgrade to Individual'}
          </Button>
        </CardFooter>
      </Card>

      {/* Payment Method & History */}
      <Card className="lg:col-span-3 bg-card/50 border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Payment Method</CardTitle>
          <CardDescription className="text-muted-foreground">
            {hasIndividualPlan ? 'Default payment for next invoice' : 'No payment method on file'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {hasIndividualPlan ? (
            <>
              <div className="flex items-center gap-5 p-4 rounded-lg bg-zinc-800">
                <CreditCard className="w-7 h-7 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-lg font-semibold text-primary-foreground">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expiry 12/2028</p>
                </div>
                <Badge variant="secondary" className="text-xs px-2 py-1 rounded">
                  Default
                </Badge>
              </div>

              <div>
                <h4 className="mb-5 text-sm font-semibold text-muted-foreground">Billing History</h4>
                <div className="space-y-4">
                  {[
                    { date: "Feb 01, 2026", status: "Paid", amount: "$15.00" },
                    { date: "Jan 01, 2026", status: "Paid", amount: "$15.00" },
                  ].map((invoice, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-sm text-muted-foreground"
                    >
                      <span>{invoice.date}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-primary-foreground font-semibold">{invoice.amount}</span>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CreditCard className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">
                Upgrade to Individual plan to add a payment method
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

const UpgradeBillingCards = () => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-6">Available Plans</h3>
      <div className="w-full">
        <PricingTable />
      </div>
    </div>
  )
}

const BillingPage = () => {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-0 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing & Subscription</h1>
          <p className="text-muted-foreground">
            Manage your Clerix plan, payment methods, and invoices.
          </p>
        </div>
        <Protect
          condition={(has) => has({ plan: "individual" })}
          fallback={null}
        >
          <div className="hidden md:flex items-center gap-2 p-2 bg-yellow-500/10 text-yellow-500 rounded-md text-sm border border-yellow-500/20">
            <AlertCircle className="w-4 h-4" />
            <span>Your trial ends Feb 25</span>
          </div>
        </Protect>
      </div>

      <Separator className="bg-zinc-800" />

      <Protect
        condition={(has) => {
          return has({ plan: "individual" }) || has({ plan: "free" })
        }}
        fallback={<UpgradeBillingCards />}
      >
        <ActualBillingFeatures />
      </Protect>
      
      <UpgradeBillingCards />
    </div>
  )
}

export default BillingPage