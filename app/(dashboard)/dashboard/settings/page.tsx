"use client"

import React, { useState } from "react"
import { 
  User, 
  Shield, 
  Key, 
  Settings as SettingsIcon,
  AlertTriangle,
  Trash2,
  Save,
  Copy,
  CheckCircle2,
  Smartphone,
  Globe
} from "lucide-react"
import { toast } from "sonner"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from "@/hooks/use-mobile"

// --- Main Component ---

export default function SettingsPage() {
  const isMobile = useIsMobile()
  const [isSaving, setIsSaving] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState("")
  
  // Toggles
  const [twoFactor, setTwoFactor] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [weeklyReports, setWeeklyReports] = useState(true)

  // API Key copy state
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Simulate API Call
    toast.promise(new Promise(resolve => setTimeout(resolve, 1000)), {
      loading: "Saving preferences...",
      success: () => {
        setIsSaving(false)
        return "Settings saved successfully."
      },
      error: "Failed to save settings."
    })
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(id)
    toast.success("API Key copied to clipboard")
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] overflow-hidden px-4 lg:px-6 pb-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Settings & Preferences</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Manage your account settings, security configurations, and API access keys.
          </p>
        </div>
      </div>

      {/* Vertical Tabs Layout */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="general" className="flex flex-col md:flex-row gap-6 h-full">
          
          {/* Sidebar Navigation */}
          <TabsList className="flex flex-row md:flex-col h-auto justify-start bg-transparent space-x-2 md:space-x-0 md:space-y-2 w-full md:w-64 shrink-0 overflow-x-auto border-b md:border-b-0 md:border-r border-border/50 pb-4 md:pb-0 md:pr-4 rounded-none p-0">
            <TabsTrigger 
              value="general" 
              className="justify-start gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-4 py-2.5 w-full rounded-lg"
            >
              <User className="w-4 h-4" />
              General
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="justify-start gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-4 py-2.5 w-full rounded-lg"
            >
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger 
              value="api" 
              className="justify-start gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-4 py-2.5 w-full rounded-lg"
            >
              <Key className="w-4 h-4" />
              API Keys
            </TabsTrigger>
            <TabsTrigger 
              value="account" 
              className="justify-start gap-2 data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 px-4 py-2.5 w-full rounded-lg"
            >
              <SettingsIcon className="w-4 h-4" />
              Account
            </TabsTrigger>
          </TabsList>

          {/* Tab Content Area */}
          <div className="flex-1 overflow-y-auto pr-2 pb-6 scrollbar-hide">
            
            {/* GENERAL TAB */}
            <TabsContent value="general" className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <form onSubmit={handleSave}>
                <Card className="bg-card/50 backdrop-blur border-border/50 shadow-sm">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details and localization preferences.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Gerhardt" className="bg-background/50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Lutterodt" className="bg-background/50" />
                      </div>
                    </div>
                    
                    <div className="space-y-2 max-w-md">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" defaultValue="gerhardt@viitechnologies.eu" disabled className="bg-muted/50 cursor-not-allowed text-muted-foreground" />
                      <p className="text-[11px] text-muted-foreground">Email addresses are permanently linked to your authentication provider.</p>
                    </div>

                    <Separator className="bg-border/50" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Timezone</Label>
                        <Select defaultValue="utc">
                          <SelectTrigger className="bg-background/50">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                            <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                            <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                            <SelectItem value="cet">CET (Central European Time)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger className="bg-background/50">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English (US)</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-border/50 bg-muted/10 mt-6 pt-6">
                    <Button type="submit" disabled={isSaving} className="gap-2">
                      <Save className="w-4 h-4" />
                      {isSaving ? "Saving..." : "Save Preferences"}
                    </Button>
                  </CardFooter>
                </Card>
              </form>

              <Card className="bg-card/50 backdrop-blur border-border/50 shadow-sm">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Manage how Clerix communicates with you regarding threats.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/30">
                    <div className="space-y-0.5">
                      <Label className="text-base">Instant Threat Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive an email immediately when high-severity data is exposed.</p>
                    </div>
                    <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/30">
                    <div className="space-y-0.5">
                      <Label className="text-base">Weekly Summary Report</Label>
                      <p className="text-sm text-muted-foreground">A curated digest of the week's automated removal actions.</p>
                    </div>
                    <Switch checked={weeklyReports} onCheckedChange={setWeeklyReports} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SECURITY TAB */}
            <TabsContent value="security" className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="bg-card/50 backdrop-blur border-border/50 shadow-sm">
                <CardHeader>
                  <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
                  <CardDescription>Add an extra layer of security to your zero-knowledge vault.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-primary/20 bg-primary/5 gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-full mt-1">
                        <Smartphone className="w-5 h-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-base font-semibold text-foreground">Authenticator App</Label>
                        <p className="text-sm text-muted-foreground max-w-md">
                          Use an authenticator app (like Google Authenticator or Authy) to generate one-time security codes.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge variant="outline" className="border-green-500/30 text-green-500 bg-green-500/10">Active</Badge>
                      <Switch checked={twoFactor} onCheckedChange={(val) => {
                        setTwoFactor(val)
                        if(!val) toast.warning("2FA has been disabled.")
                        else toast.success("2FA has been enabled.")
                      }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-border/50 shadow-sm">
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>Manage devices currently logged into your Clerix account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border/50">
                    <div className="flex items-center gap-4">
                      <Globe className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Mac OS • Safari</p>
                        <p className="text-xs text-muted-foreground">Berlin, Germany • 192.168.1.1</p>
                      </div>
                    </div>
                    <Badge className="bg-primary/20 text-primary hover:bg-primary/20 border-primary/30">Current Session</Badge>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-4">
                      <Smartphone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">iOS • Clerix Mobile App</p>
                        <p className="text-xs text-muted-foreground">Berlin, Germany • Active 2 hours ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-8">Revoke</Button>
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t border-border/50 bg-muted/10">
                  <Button variant="destructive" className="w-full sm:w-auto">Sign Out All Other Sessions</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* API KEYS TAB */}
            <TabsContent value="api" className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="bg-card/50 backdrop-blur border-border/50 shadow-sm">
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle>API Access Keys</CardTitle>
                    <CardDescription>Manage keys used to authenticate with the Clerix REST API.</CardDescription>
                  </div>
                  <Button onClick={() => toast.success("New API Key generated.")} className="gap-2">
                    <Key className="w-4 h-4" />
                    Generate New Key
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border border-border/50 overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-3 bg-muted/40 text-xs font-semibold text-muted-foreground border-b border-border/50">
                      <div className="col-span-4">NAME</div>
                      <div className="col-span-4">KEY (PARTIAL)</div>
                      <div className="col-span-2">CREATED</div>
                      <div className="col-span-2 text-right">ACTIONS</div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 p-4 items-center border-b border-border/50 bg-background/30 hover:bg-muted/10 transition-colors">
                      <div className="col-span-4 font-medium text-sm">Production Workflow</div>
                      <div className="col-span-4  text-xs text-muted-foreground flex items-center gap-2">
                        clrx_live_••••••••8f92
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => handleCopy("clrx_live_mockkey123458f92", "key1")}
                        >
                          {copiedKey === "key1" ? <CheckCircle2 className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                        </Button>
                      </div>
                      <div className="col-span-2 text-xs text-muted-foreground">Oct 24, 2025</div>
                      <div className="col-span-2 text-right">
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-500/10 h-8">Revoke</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 p-4 items-center bg-background/30 hover:bg-muted/10 transition-colors">
                      <div className="col-span-4 font-medium text-sm">Zapier Integration</div>
                      <div className="col-span-4  text-xs text-muted-foreground flex items-center gap-2">
                        clrx_test_••••••••3a1b
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => handleCopy("clrx_test_mockkey987653a1b", "key2")}
                        >
                          {copiedKey === "key2" ? <CheckCircle2 className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                        </Button>
                      </div>
                      <div className="col-span-2 text-xs text-muted-foreground">Nov 12, 2025</div>
                      <div className="col-span-2 text-right">
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-500/10 h-8">Revoke</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ACCOUNT / DANGER ZONE TAB */}
            <TabsContent value="account" className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="bg-card/50 backdrop-blur border-border/50 shadow-sm">
                <CardHeader>
                  <CardTitle>Subscription Plan</CardTitle>
                  <CardDescription>You are currently on the <span className="font-bold text-foreground">Clerix Executive</span> plan.</CardDescription>
                </CardHeader>
                <CardFooter className="pt-4 border-t border-border/50 bg-muted/10">
                  <Button variant="outline" onClick={() => window.location.href = '/dashboard/billing'}>Manage Billing</Button>
                </CardFooter>
              </Card>

              {/* DANGER ZONE */}
              <Card className="border-red-500/50 bg-red-500/5 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                <CardHeader>
                  <CardTitle className="text-red-500 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription className="text-red-500/80">
                    Irreversible and destructive actions concerning your account data.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2 border-b border-red-500/20">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Delete Audit Logs</Label>
                      <p className="text-sm text-muted-foreground">Permanently erase all historical removal request logs.</p>
                    </div>
                    <Button variant="outline" className="border-red-500/50 text-red-500 hover:bg-red-500/10 shrink-0">Clear Logs</Button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
                    <div className="space-y-1">
                      <Label className="text-base font-medium text-foreground">Delete Account</Label>
                      <p className="text-sm text-muted-foreground max-w-lg">
                        Permanently delete your account, purge all associated personal data from the Clerix vault, and cancel any active automated removal pipelines immediately.
                      </p>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" className="shrink-0 gap-2">
                          <Trash2 className="w-4 h-4" />
                          Delete Account
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] border-red-500/50 bg-zinc-950">
                        <DialogHeader>
                          <DialogTitle className="text-red-500 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            Delete Account
                          </DialogTitle>
                          <DialogDescription className="text-zinc-400">
                            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="confirm" className="text-zinc-300">
                              Please type <span className="font-bold text-red-400 select-all">DELETE</span> to confirm.
                            </Label>
                            <Input 
                              id="confirm" 
                              value={deleteConfirmText}
                              onChange={(e) => setDeleteConfirmText(e.target.value)}
                              className="bg-zinc-900 border-zinc-800"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button 
                            variant="destructive" 
                            disabled={deleteConfirmText !== "DELETE"}
                            onClick={() => {
                              toast.error("Account scheduled for deletion.")
                              setDeleteConfirmText("")
                            }}
                            className="w-full sm:w-auto"
                          >
                            I understand the consequences, delete my account
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </div>
        </Tabs>
      </div>
    </div>
  )
}