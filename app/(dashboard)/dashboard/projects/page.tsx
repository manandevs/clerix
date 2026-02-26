"use client"

import React from "react"
import { 
  Plus, 
  FolderLock, 
  ShieldCheck, 
  Search, 
  GlobeLock, 
  MoreVertical,
  Calendar,
  Clock
} from "lucide-react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// --- Custom Circular Progress Component ---
const CircularProgress = ({ value, colorClass = "text-primary" }: { value: number, colorClass?: string }) => {
  const radius = 24
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90 w-16 h-16">
        <circle 
          cx="32" 
          cy="32" 
          r={radius} 
          stroke="currentColor" 
          strokeWidth="4" 
          fill="transparent" 
          className="text-muted/50" 
        />
        <circle 
          cx="32" 
          cy="32" 
          r={radius} 
          stroke="currentColor" 
          strokeWidth="4" 
          fill="transparent" 
          strokeDasharray={circumference} 
          strokeDashoffset={strokeDashoffset} 
          strokeLinecap="round"
          className={`${colorClass} transition-all duration-1000 ease-out`} 
        />
      </svg>
      <span className="absolute text-sm font-bold">{value}%</span>
    </div>
  )
}

// --- Mock Data ---

type ProjectStatus = "Active" | "Pending" | "Completed"

interface Project {
  id: string
  title: string
  description: string
  status: ProjectStatus
  progress: number
  dueDate: string
  icon: React.ElementType
  members: { name: string, avatar: string, fallback: string }[]
}

const projects: Project[] =[
  {
    id: "p1",
    title: "Executive Profile Scrub",
    description: "Comprehensive removal of C-suite data from 200+ major data brokers and people search sites.",
    status: "Active",
    progress: 68,
    dueDate: "Nov 15, 2026",
    icon: ShieldCheck,
    members:[
      { name: "Eddie Lake", avatar: "", fallback: "EL" },
      { name: "Sarah Jenkins", avatar: "", fallback: "SJ" },
      { name: "Marcus Thorne", avatar: "", fallback: "MT" },
    ]
  },
  {
    id: "p2",
    title: "Home Purchase Privacy Lock",
    description: "Pre-emptive obfuscation of property records, moving addresses, and new utility registrations.",
    status: "Active",
    progress: 34,
    dueDate: "Dec 01, 2026",
    icon: FolderLock,
    members:[
      { name: "Eddie Lake", avatar: "", fallback: "EL" },
      { name: "David Kim", avatar: "", fallback: "DK" },
    ]
  },
  {
    id: "p3",
    title: "Dark Web Identity Monitor",
    description: "Continuous surveillance setup for compromised credentials and leaked financial identifiers.",
    status: "Pending",
    progress: 12,
    dueDate: "Oct 30, 2026",
    icon: GlobeLock,
    members:[
      { name: "System Auto", avatar: "", fallback: "AI" },
    ]
  },
  {
    id: "p4",
    title: "Social Media Footprint Erasure",
    description: "Deletion of legacy accounts, forgotten posts, and associated metadata across social platforms.",
    status: "Completed",
    progress: 100,
    dueDate: "Aug 12, 2026",
    icon: Search,
    members:[
      { name: "Eddie Lake", avatar: "", fallback: "EL" },
      { name: "Elena Rodriguez", avatar: "", fallback: "ER" },
      { name: "Sarah Jenkins", avatar: "", fallback: "SJ" },
      { name: "Marcus Thorne", avatar: "", fallback: "MT" },
    ]
  }
]

// --- Main Component ---

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6 pb-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Privacy Initiatives</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Group your removal tasks and monitoring efforts into organized projects. Track progress across specific privacy goals like moving, job changes, or executive protection.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9">Filter</Button>
          <Button className="h-9 gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Fluid Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Create New Project Card (Dashed) */}
        <button className="group flex flex-col items-center justify-center h-full min-h-[280px] rounded-xl border-2 border-dashed border-border/60 bg-transparent hover:bg-primary/5 hover:border-primary/50 transition-all duration-300">
          <div className="p-4 rounded-full bg-muted/50 group-hover:bg-primary/10 transition-colors mb-4">
            <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors">Create New Project</h3>
          <p className="text-sm text-muted-foreground/70 mt-2 max-w-[200px] text-center">Start a new isolated privacy initiative</p>
        </button>

        {/* Project Folders */}
        {projects.map((project) => (
          <Card 
            key={project.id} 
            className="group relative flex flex-col h-full min-h-[280px] bg-card/50 backdrop-blur border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/40 cursor-pointer overflow-hidden"
          >
            {/* Subtle Folder "Tab" aesthetic line at top */}
            <div className={`absolute top-0 left-0 w-1/3 h-1 rounded-br-full ${
              project.status === 'Completed' ? 'bg-green-500/50' : 
              project.status === 'Pending' ? 'bg-orange-500/50' : 
              'bg-primary'
            }`} />

            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg ${
                  project.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                  project.status === 'Pending' ? 'bg-orange-500/10 text-orange-500' :
                  'bg-primary/10 text-primary'
                }`}>
                  <project.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{project.title}</h3>
                  <Badge 
                    variant="outline" 
                    className={`mt-1.5 text-xs font-medium px-2 py-0 h-5 ${
                      project.status === 'Completed' ? 'border-green-500/30 text-green-500' : 
                      project.status === 'Pending' ? 'border-orange-500/30 text-orange-500' : 
                      'border-primary/30 text-primary'
                    }`}
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </CardHeader>

            <CardContent className="flex-1 pb-4">
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-6">
                {project.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <CircularProgress 
                  value={project.progress} 
                  colorClass={
                    project.status === 'Completed' ? 'text-green-500' : 
                    project.status === 'Pending' ? 'text-orange-500' : 
                    'text-primary'
                  } 
                />
                
                <div className="text-right">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground justify-end mb-1">
                    {project.status === 'Completed' ? <Calendar className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    {project.status === 'Completed' ? 'Finished on' : 'Due by'}
                  </div>
                  <span className="text-sm font-medium">{project.dueDate}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-4 border-t border-border/50 bg-muted/10 flex items-center justify-between">
              <div className="flex items-center -space-x-2">
                {project.members.slice(0, 3).map((member, i) => (
                  <Avatar key={i} className="h-8 w-8 border-2 border-background shadow-sm hover:z-10 transition-transform hover:scale-110">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-muted text-xs font-medium text-foreground">{member.fallback}</AvatarFallback>
                  </Avatar>
                ))}
                {project.members.length > 3 && (
                  <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground z-10 shadow-sm">
                    +{project.members.length - 3}
                  </div>
                )}
              </div>
              
              <span className="text-xs text-muted-foreground font-medium">
                {project.members.length} {project.members.length === 1 ? 'Assignee' : 'Assignees'}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}