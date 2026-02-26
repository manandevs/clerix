"use client"

import React, { useState } from "react"
import { 
  Search, 
  Plus, 
  ShieldAlert, 
  ShieldCheck, 
  Mail, 
  UserCog, 
  CreditCard, 
  History,
  Trash2,
  Save,
  ChevronLeft
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
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useIsMobile } from "@/hooks/use-mobile"

// --- Mock Data & Types ---

type Role = "Owner" | "Admin" | "Member" | "Viewer"

interface Permissions {
  viewBilling: boolean
  manageBilling: boolean
  approveRemovals: boolean
  inviteMembers: boolean
  viewAuditLogs: boolean
  exportData: boolean
}

interface TeamMember {
  id: string
  name: string
  email: string
  role: Role
  avatar: string
  fallback: string
  joinedAt: string
  permissions: Permissions
}

const mockTeam: TeamMember[] =[
  {
    id: "u1",
    name: "Gerhardt Lutterodt",
    email: "gerhardt@viitechnologies.eu",
    role: "Owner",
    avatar: "/avatars/gerhardt.jpg",
    fallback: "GL",
    joinedAt: "Jan 12, 2025",
    permissions: {
      viewBilling: true, manageBilling: true, approveRemovals: true,
      inviteMembers: true, viewAuditLogs: true, exportData: true
    }
  },
  {
    id: "u2",
    name: "Sarah Jenkins",
    email: "sarah.j@viitechnologies.eu",
    role: "Admin",
    avatar: "",
    fallback: "SJ",
    joinedAt: "Mar 05, 2025",
    permissions: {
      viewBilling: true, manageBilling: false, approveRemovals: true,
      inviteMembers: true, viewAuditLogs: true, exportData: true
    }
  },
  {
    id: "u3",
    name: "Marcus Thorne",
    email: "m.thorne@viitechnologies.eu",
    role: "Member",
    avatar: "",
    fallback: "MT",
    joinedAt: "Jul 18, 2025",
    permissions: {
      viewBilling: false, manageBilling: false, approveRemovals: false,
      inviteMembers: false, viewAuditLogs: true, exportData: false
    }
  },
  {
    id: "u4",
    name: "Elena Rodriguez",
    email: "elena.r@viitechnologies.eu",
    role: "Viewer",
    avatar: "",
    fallback: "ER",
    joinedAt: "Sep 22, 2025",
    permissions: {
      viewBilling: false, manageBilling: false, approveRemovals: false,
      inviteMembers: false, viewAuditLogs: false, exportData: false
    }
  }
]

// --- Main Component ---

export default function TeamPage() {
  const[searchQuery, setSearchQuery] = useState("")
  const [selectedUserId, setSelectedUserId] = useState<string>(mockTeam[0].id)
  const [team, setTeam] = useState<TeamMember[]>(mockTeam)
  const isMobile = useIsMobile()

  const selectedUser = team.find(u => u.id === selectedUserId)

  const filteredTeam = team.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handlePermissionToggle = (key: keyof Permissions) => {
    if (!selectedUser) return
    setTeam(prev => prev.map(user => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          permissions: { ...user.permissions, [key]: !user.permissions[key] }
        }
      }
      return user
    }))
  }

  const roleColors: Record<Role, string> = {
    Owner: "border-primary/50 text-primary bg-primary/10",
    Admin: "border-blue-500/50 text-blue-500 bg-blue-500/10",
    Member: "border-zinc-500/50 text-zinc-300 bg-zinc-500/10",
    Viewer: "border-zinc-700/50 text-zinc-500 bg-zinc-800/50",
  }

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] overflow-hidden px-4 lg:px-6 pb-6">
      
      {/* Header & Invite Button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Team & Access Control</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Manage your organization's members and assign granular role-based access to the Clerix command center.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an email invitation to join your Clerix workspace.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">Email address</label>
                <Input id="email" placeholder="colleague@company.com" className="bg-background/50" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="role" className="text-sm font-medium">Assign Role</label>
                <Select defaultValue="Member">
                  <SelectTrigger id="role" className="bg-background/50">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Member">Member</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Split Pane Architecture */}
      <div className="flex flex-1 overflow-hidden border border-border/50 rounded-xl bg-card/20 backdrop-blur shadow-sm">
        
        {/* Left Pane: Directory List */}
        <div className={`w-full md:w-1/3 flex flex-col border-r border-border/50 bg-background/30 ${isMobile && selectedUser ? 'hidden' : 'flex'}`}>
          <div className="p-4 border-b border-border/50 shrink-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search team..." 
                className="pl-9 bg-background/50 border-border/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredTeam.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-all ${
                  selectedUserId === user.id 
                    ? "bg-primary/10 border border-primary/20 shadow-sm" 
                    : "hover:bg-muted/30 border border-transparent"
                }`}
              >
                <Avatar className="h-10 w-10 border border-border/50">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-muted text-xs">{user.fallback}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium truncate ${selectedUserId === user.id ? "text-primary" : "text-foreground"}`}>
                      {user.name}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <Badge variant="outline" className={`text-[10px] px-1.5 shrink-0 ${roleColors[user.role]}`}>
                  {user.role}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Right Pane: Settings Matrix */}
        <div className={`w-full md:w-2/3 flex flex-col bg-card/10 ${isMobile && !selectedUser ? 'hidden' : 'flex'}`}>
          {selectedUser ? (
            <>
              {/* Mobile Back Button */}
              {isMobile && (
                <div className="p-2 border-b border-border/50 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedUserId("")} className="gap-1">
                    <ChevronLeft className="w-4 h-4" /> Back to Directory
                  </Button>
                </div>
              )}

              {/* Right Pane Header */}
              <div className="p-6 border-b border-border/50 shrink-0 flex flex-col sm:flex-row sm:items-start justify-between gap-4 bg-background/20">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-background shadow-md">
                    <AvatarImage src={selectedUser.avatar} />
                    <AvatarFallback className="bg-muted text-lg">{selectedUser.fallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <Mail className="w-3.5 h-3.5" />
                      {selectedUser.email}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Joined {selectedUser.joinedAt}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <Button variant="outline" size="sm" className="border-border hover:border-primary">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="destructive" size="icon" className="h-9 w-9">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Scrollable Matrix Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                {/* Role Selection */}
                <section>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <UserCog className="w-5 h-5 text-primary" />
                    Base Role
                  </h3>
                  <div className="max-w-xs">
                    <Select defaultValue={selectedUser.role} disabled={selectedUser.role === "Owner"}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Member">Member</SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-2">
                      Base roles determine default permissions. You can override specific permissions below.
                    </p>
                  </div>
                </section>

                <Separator className="bg-border/50" />

                {/* Granular Permissions Matrix */}
                <section>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Permission Matrix
                  </h3>
                  
                  <div className="grid gap-6 max-w-2xl">
                    
                    {/* Legal/Removal Group */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> Data Operations
                      </h4>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/30 hover:bg-muted/10 transition-colors">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Approve Legal Escalations</label>
                          <p className="text-xs text-muted-foreground">Allow user to authorize sending legal GDPR/CCPA requests to data brokers.</p>
                        </div>
                        <Switch 
                          checked={selectedUser.permissions.approveRemovals} 
                          onCheckedChange={() => handlePermissionToggle("approveRemovals")}
                          disabled={selectedUser.role === "Owner"}
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/30 hover:bg-muted/10 transition-colors">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Export Privacy Data</label>
                          <p className="text-xs text-muted-foreground">Allow downloading raw exposure CSVs and audit logs.</p>
                        </div>
                        <Switch 
                          checked={selectedUser.permissions.exportData} 
                          onCheckedChange={() => handlePermissionToggle("exportData")}
                          disabled={selectedUser.role === "Owner"}
                        />
                      </div>
                    </div>

                    {/* Administrative Group */}
                    <div className="space-y-4 mt-4">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                        <History className="w-4 h-4" /> Administrative
                      </h4>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/30 hover:bg-muted/10 transition-colors">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Invite & Manage Members</label>
                          <p className="text-xs text-muted-foreground">Can invite new users and modify existing roles (except Owner).</p>
                        </div>
                        <Switch 
                          checked={selectedUser.permissions.inviteMembers} 
                          onCheckedChange={() => handlePermissionToggle("inviteMembers")}
                          disabled={selectedUser.role === "Owner"}
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/30 hover:bg-muted/10 transition-colors">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">View Audit Logs</label>
                          <p className="text-xs text-muted-foreground">Access the global organization activity history.</p>
                        </div>
                        <Switch 
                          checked={selectedUser.permissions.viewAuditLogs} 
                          onCheckedChange={() => handlePermissionToggle("viewAuditLogs")}
                          disabled={selectedUser.role === "Owner"}
                        />
                      </div>
                    </div>

                    {/* Billing Group */}
                    <div className="space-y-4 mt-4">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                        <CreditCard className="w-4 h-4" /> Billing & Subscription
                      </h4>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/30 hover:bg-muted/10 transition-colors">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">View Billing History</label>
                          <p className="text-xs text-muted-foreground">Access invoices and current plan details.</p>
                        </div>
                        <Switch 
                          checked={selectedUser.permissions.viewBilling} 
                          onCheckedChange={() => handlePermissionToggle("viewBilling")}
                          disabled={selectedUser.role === "Owner"}
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/30 hover:bg-muted/10 transition-colors">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Manage Subscription</label>
                          <p className="text-xs text-muted-foreground">Allow user to upgrade plans or change payment methods.</p>
                        </div>
                        <Switch 
                          checked={selectedUser.permissions.manageBilling} 
                          onCheckedChange={() => handlePermissionToggle("manageBilling")}
                          disabled={selectedUser.role === "Owner"}
                        />
                      </div>
                    </div>

                  </div>
                </section>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-6">
              <UserCog className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-medium">No Member Selected</p>
              <p className="text-sm text-center max-w-sm mt-2">
                Select a team member from the directory to view or modify their access controls and permissions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}