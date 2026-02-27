"use client"

import React, { useState } from "react"
import { 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Trash2, 
  Archive, 
  CheckCheck,
  ArrowRight,
  ShieldAlert,
  Clock,
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

// --- Types & Mock Data ---

type NotificationType = "breach_high" | "breach_medium" | "removal_success" | "system_update"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  type: NotificationType
  read: boolean
  link: string
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "notif_1",
    title: "High Severity Breach Detected",
    message: "Your social security number and home address were found in the 'National Public Data' breach. Automated removal pipelines have been initiated.",
    timestamp: "10 mins ago",
    type: "breach_high",
    read: false,
    link: "/dashboard/analytics"
  },
  {
    id: "notif_2",
    title: "Data Successfully Removed",
    message: "Spokeo has complied with our Article 17 erasure request. 14 records containing your PII have been permanently deleted from their database.",
    timestamp: "2 hours ago",
    type: "removal_success",
    read: false,
    link: "/dashboard/lifecycle?broker=spokeo"
  },
  {
    id: "notif_3",
    title: "Legal Escalation Required",
    message: "Acxiom has failed to respond within the 30-day compliance window. Click here to authorize manual DPA escalation.",
    timestamp: "5 hours ago",
    type: "breach_medium",
    read: false,
    link: "/dashboard/lifecycle?broker=acxiom"
  },
  {
    id: "notif_4",
    title: "Weekly Privacy Report Generated",
    message: "Your privacy score increased by 4 points this week. View your updated exposure metrics and removal summaries.",
    timestamp: "Yesterday, 09:00 AM",
    type: "system_update",
    read: true,
    link: "/dashboard/reports"
  },
  {
    id: "notif_5",
    title: "Data Successfully Removed",
    message: "Whitepages confirmed the deletion of your historical address records. This node has been marked as verified clean.",
    timestamp: "Oct 24, 2025",
    type: "removal_success",
    read: true,
    link: "/dashboard/lifecycle?broker=whitepages"
  },
  {
    id: "notif_6",
    title: "New Login Detected",
    message: "A new session was initiated from Mac OS (Safari) in Berlin, Germany. If this wasn't you, revoke access immediately.",
    timestamp: "Oct 22, 2025",
    type: "system_update",
    read: true,
    link: "/dashboard/settings?tab=security"
  }
]

// --- Helper Functions ---

const getIconForType = (type: NotificationType) => {
  switch (type) {
    case "breach_high": return <ShieldAlert className="w-4 h-4" />
    case "breach_medium": return <AlertTriangle className="w-4 h-4" />
    case "removal_success": return <CheckCircle2 className="w-4 h-4" />
    case "system_update": return <Info className="w-4 h-4" />
  }
}

const getColorClassesForType = (type: NotificationType) => {
  switch (type) {
    case "breach_high": 
      return "bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
    case "breach_medium": 
      return "bg-orange-500/10 text-orange-500 border-orange-500/20"
    case "removal_success": 
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "system_update": 
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
  }
}

// --- Main Component ---

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const removeNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] overflow-hidden px-4 lg:px-6 pb-6 max-w-5xl mx-auto w-full">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold tracking-tight">Activity Feed</h1>
            {unreadCount > 0 && (
              <Badge className="bg-primary text-primary-foreground hover:bg-primary border-transparent rounded-full px-2 py-0.5 text-xs font-bold">
                {unreadCount} New
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Chronological timeline of breach alerts, successful data removals, and system activity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <Settings className="w-4 h-4" />
            Preferences
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            className="h-9 gap-2"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </Button>
        </div>
      </div>

      {/* Chronological Timeline Feed */}
      <Card className="flex-1 bg-card/40 backdrop-blur border-border/50 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide relative">
          
          {/* Continuous Vertical Timeline Line */}
          <div className="absolute left-8 md:left-12 top-8 bottom-8 w-px bg-border/60 z-0" />

          <div className="space-y-6 relative z-10">
            {notifications.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 mb-4 opacity-20" />
                <p>You're all caught up!</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className="group flex gap-4 md:gap-6 relative items-start cursor-pointer"
                  onClick={() => markAsRead(notification.id)}
                >
                  {/* Timeline Node Icon */}
                  <div className="relative shrink-0 mt-1">
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-4 border-background ${getColorClassesForType(notification.type)} transition-transform duration-300 group-hover:scale-110`}>
                      {getIconForType(notification.type)}
                    </div>
                  </div>

                  {/* Notification Content Card */}
                  <div className={`flex-1 rounded-xl border p-4 transition-all duration-300 ${
                    !notification.read 
                      ? "bg-primary/5 border-primary/20 shadow-sm" 
                      : "bg-background/40 border-border/50 hover:bg-muted/30 hover:border-border"
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-1">
                      <h3 className={`font-semibold text-base ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0 mt-1 sm:mt-0">
                        <Clock className="w-3.5 h-3.5" />
                        {notification.timestamp}
                      </div>
                    </div>
                    
                    <p className={`text-sm leading-relaxed mb-4 ${!notification.read ? "text-muted-foreground" : "text-muted-foreground/70"}`}>
                      {notification.message}
                    </p>

                    {/* Footer Actions (Hover Revealed on Desktop) */}
                    <div className="flex items-center justify-between sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-xs text-muted-foreground hover:text-foreground bg-background/50"
                          onClick={(e) => { e.stopPropagation(); markAsRead(notification.id); }}
                        >
                          <Archive className="w-3.5 h-3.5 mr-1.5" /> Archive
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10 bg-background/50"
                          onClick={(e) => removeNotification(notification.id, e)}
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
                        </Button>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-xs text-primary hover:text-primary hover:bg-primary/10"
                        onClick={(e) => { e.stopPropagation(); window.location.href = notification.link; }}
                      >
                        View Details <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </div>

                    {/* Unread Indicator Dot */}
                    {!notification.read && (
                      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-pulse sm:hidden" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}