"use client"

import React, { useState } from "react"
import { AlertTriangle, Lock, Phone, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function CrisisPage() {
  const [confirmText, setConfirmText] = useState("")

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 flex flex-col p-6">
      {/* Heavy Red Pulsing Border */}
      <div className="absolute inset-2 border-4 border-red-500/50 rounded-2xl pointer-events-none animate-pulse shadow-[inset_0_0_50px_rgba(239,68,68,0.2)]" />
      
      <div className="relative z-10 max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 mb-6">
            <AlertTriangle className="w-10 h-10 text-red-500 animate-bounce" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Emergency Lockdown</h1>
          <p className="text-red-400 font-medium">Active identity theft or critical financial breach protocol.</p>
        </div>

        {/* Stepper Checklist */}
        <div className="space-y-4 mb-10">
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2"><Phone className="w-4 h-4 text-red-500" /> Contact Credit Bureaus</h3>
              <p className="text-zinc-400 text-sm mt-1">Place an immediate fraud alert on your credit file. Equifax: 1-800-525-6285.</p>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2"><FileText className="w-4 h-4 text-red-500" /> Generate Freeze Letters</h3>
              <p className="text-zinc-400 text-sm mt-1">Clerix will instantly generate legally binding credit freeze requests for all 3 bureaus.</p>
            </div>
          </div>
        </div>

        {/* Massive Action Button with Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="w-full h-16 text-lg bg-red-600 hover:bg-red-700 text-white font-bold gap-3 shadow-[0_0_40px_rgba(220,38,38,0.4)]">
              <Lock className="w-6 h-6" /> Initiate Full System Lockdown
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-950 border-red-500/50 sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-red-500 text-xl font-bold flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" /> Confirm Lockdown
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-zinc-400 text-sm mb-4">This will immediately freeze all connected API integrations and generate legal dispute letters. Type <strong>LOCKDOWN</strong> to confirm.</p>
              <Input 
                value={confirmText} onChange={(e) => setConfirmText(e.target.value)} 
                className="bg-zinc-900 border-zinc-800 text-center text-lg font-mono tracking-widest uppercase"
                placeholder="TYPE HERE"
              />
            </div>
            <Button disabled={confirmText !== "LOCKDOWN"} variant="destructive" className="w-full font-bold">EXECUTE</Button>
          </DialogContent>
        </Dialog>
        
        <Button variant="ghost" className="mt-6 text-zinc-500 hover:text-white mx-auto block" onClick={() => window.history.back()}>
          Cancel & Return to Dashboard
        </Button>
      </div>
    </div>
  )
}