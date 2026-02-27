"use client"

import React from "react"
import { UserProfile } from "@clerk/nextjs"
import { ShieldCheck } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.24))] py-10 px-4 overflow-y-auto scrollbar-hide">
      
      {/* Background Ambience - creating the isolated, modal-like focus */}
      <div className="absolute inset-0 bg-background/50 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Page Context Header (Optional visual anchor above the Clerk component) */}
      <div className="relative z-10 flex flex-col items-center text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 mb-4 shadow-lg shadow-primary/5">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Identity & Security</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-md">
          Manage your core authentication methods, connected accounts, and profile details within your secure vault.
        </p>
      </div>

      {/* Centered Clerk Component with Custom Appearance overrides */}
      <div className="relative z-10 w-full flex justify-center animate-in fade-in zoom-in-95 duration-500 delay-150">
        <UserProfile 
          appearance={{
            variables: {
              // Enforcing the Helvetica typography
              fontFamily: "Helvetica, Arial, sans-serif",
              // Crimson Primary Accent (Approximate fallback for oklch crimson)
              colorPrimary: "#dc2626", 
              // Deep Zinc Backgrounds
              colorBackground: "#09090b", // zinc-950
              colorInputBackground: "#18181b", // zinc-900
              colorInputText: "#fafafa",
              colorText: "#fafafa",
              colorTextSecondary: "#a1a1aa", // zinc-400
              colorDanger: "#ef4444",
              colorSuccess: "#22c55e",
              borderRadius: "0.75rem",
            },
            elements: {
              // Forcing Clerk elements to adopt Shadcn/Clerix structural classes
              rootBox: "mx-auto w-full max-w-4xl",
              card: "bg-card/50 backdrop-blur border border-border/50 shadow-2xl rounded-xl w-full",
              navbar: "border-r border-border/50 hidden md:block",
              navbarMobileMenuRow: "border-b border-border/50 md:hidden",
              headerTitle: "font-bold text-xl",
              headerSubtitle: "text-muted-foreground",
              profileSectionTitleText: "font-bold border-b border-border/50 pb-2 mb-4",
              profileSectionContent: "space-y-4",
              profilePage: "px-6 py-8 md:p-10",
              
              // Button Overrides
              formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all rounded-full px-4 font-medium",
              formButtonReset: "text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors",
              profileSectionPrimaryButton: "text-primary hover:bg-primary/10 transition-colors font-medium rounded-md px-3 py-1.5",
              
              // Form Inputs
              formFieldInput: "bg-background/50 border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-foreground rounded-lg transition-all",
              formFieldLabel: "text-foreground font-medium",
              formFieldWarningText: "text-orange-500 text-xs",
              formFieldErrorText: "text-red-500 text-xs",
              
              // Badges & Accents
              badge: "bg-primary/10 text-primary border border-primary/20 font-medium",
              dividerLine: "bg-border/50",
              dividerText: "text-muted-foreground bg-background px-2",
              
              // Profile specific layout fixes
              avatarImageActionsUpload: "text-primary hover:text-primary/80",
              breadcrumbsItem: "text-muted-foreground hover:text-foreground",
              breadcrumbsItemDivider: "text-border",
              
              // Security Section overrides
              activeDeviceIcon: "text-primary",
              userPreviewSecondaryIdentifier: "text-muted-foreground text-xs",
              accordionTriggerButton: "hover:bg-muted/30 rounded-lg px-2 transition-colors",
            }
          }}
        />
      </div>

    </div>
  )
}