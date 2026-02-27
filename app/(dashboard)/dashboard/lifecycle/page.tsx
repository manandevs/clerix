"use client"

import React, { useState } from "react"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"
import { 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  Building, 
  Gavel, 
  GripVertical,
  Mail,
  AlertTriangle,
  History
} from "lucide-react"

// --- Types & Mock Data ---

type Severity = "High" | "Medium" | "Low"

interface RemovalTask {
  id: string
  broker: string
  severity: Severity
  daysLeft?: number
  lastUpdated: string
}

type BoardState = {
  [key: string]: RemovalTask[]
}

const INITIAL_BOARD: BoardState = {
  discovered:[
    { id: "t1", broker: "Spokeo", severity: "High", lastUpdated: "2 hrs ago" },
    { id: "t2", broker: "Whitepages", severity: "Medium", lastUpdated: "5 hrs ago" },
  ],
  request_sent:[
    { id: "t3", broker: "Acxiom", severity: "High", daysLeft: 14, lastUpdated: "10 days ago" },
    { id: "t4", broker: "Intelius", severity: "Low", daysLeft: 5, lastUpdated: "25 days ago" },
    { id: "t8", broker: "ZoomInfo", severity: "Medium", daysLeft: 21, lastUpdated: "9 days ago" },
  ],
  escalated:[
    { id: "t5", broker: "PeopleFinders", severity: "High", daysLeft: 2, lastUpdated: "Yesterday" },
  ],
  removed:[
    { id: "t6", broker: "BeenVerified", severity: "High", lastUpdated: "1 month ago" },
    { id: "t7", broker: "Radaris", severity: "Medium", lastUpdated: "2 months ago" },
  ],
}

const COLUMNS =[
  { id: "discovered", title: "Discovered", icon: ShieldAlert, color: "text-red-500" },
  { id: "request_sent", title: "Legal Request Sent", icon: Mail, color: "text-blue-500" },
  { id: "escalated", title: "Escalated to DPA", icon: Gavel, color: "text-orange-500" },
  { id: "removed", title: "Verified Removed", icon: CheckCircle2, color: "text-green-500" },
]

// --- Components ---

function TaskCard({ task, isDragging }: { task: RemovalTask; isDragging?: boolean }) {
  const isMobile = useIsMobile()
  
  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <Card 
        className={`relative group bg-card/50 backdrop-blur border-border/50 transition-all ${
          isDragging ? "opacity-50 scale-105 border-primary shadow-xl" : "hover:border-primary/50 hover:shadow-md"
        }`}
      >
        <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-primary/10">
              <Building className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold leading-none">{task.broker}</h4>
              <p className="text-xs text-muted-foreground mt-1">Updated {task.lastUpdated}</p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`text-[10px] px-1.5 ${
              task.severity === "High" ? "border-red-500/30 text-red-500" : 
              task.severity === "Medium" ? "border-orange-500/30 text-orange-500" : 
              "border-zinc-500/30 text-zinc-400"
            }`}
          >
            {task.severity}
          </Badge>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          {task.daysLeft !== undefined && (
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-orange-400 bg-orange-500/10 w-fit px-2 py-1 rounded-sm border border-orange-500/20">
              <Clock className="w-3.5 h-3.5" />
              {task.daysLeft} days until escalation
            </div>
          )}
          
          <div className="mt-4 flex items-center justify-between">
            <DrawerTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 text-xs px-2 text-muted-foreground hover:text-primary">
                <History className="w-3.5 h-3.5 mr-1" />
                History
              </Button>
            </DrawerTrigger>
            
            {/* The drag handle is explicitly separated from the Drawer trigger */}
            <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-500 cursor-grab active:cursor-grabbing drawer-ignore">
              <GripVertical className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Slide-out correspondence history */}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2 text-xl">
            <Building className="w-5 h-5 text-primary" />
            {task.broker} Removal Pipeline
          </DrawerTitle>
          <DrawerDescription>
            Audit log of all automated legal correspondence and status changes.
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-6 py-4 overflow-y-auto">
          <div className="relative border-l-2 border-primary/20 ml-3 space-y-8 pb-4">
            
            <div className="relative pl-6">
              <span className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </span>
              <h4 className="font-semibold text-sm">Threat Discovered</h4>
              <p className="text-xs text-muted-foreground mt-1">Found highly sensitive PII exposed on public search directory.</p>
              <span className="text-[10px] text-zinc-500  mt-2 block">OCT 24, 2025 • 14:32</span>
            </div>

            <div className="relative pl-6">
              <span className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-background border-2 border-blue-500 flex items-center justify-center">
                <Mail className="w-2.5 h-2.5 text-blue-500" />
              </span>
              <h4 className="font-semibold text-sm">Legal Request Dispatched</h4>
              <p className="text-xs text-muted-foreground mt-1">Automated GDPR Article 17 (Right to Erasure) request delivered via certified API.</p>
              <span className="text-[10px] text-zinc-500  mt-2 block">OCT 24, 2025 • 14:35</span>
            </div>

            {task.daysLeft !== undefined && (
              <div className="relative pl-6">
                <span className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-background border-2 border-orange-500 flex items-center justify-center">
                  <Clock className="w-2.5 h-2.5 text-orange-500" />
                </span>
                <h4 className="font-semibold text-sm">Awaiting Compliance</h4>
                <p className="text-xs text-muted-foreground mt-1">Broker has 30 days to legally comply before automatic DPA escalation.</p>
                <Badge variant="outline" className="mt-2 text-[10px] text-orange-500 border-orange-500/30">
                  {task.daysLeft} Days Remaining
                </Badge>
              </div>
            )}

            {task.severity === "High" && !task.daysLeft && (
              <div className="relative pl-6">
                <span className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-background border-2 border-green-500 flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                </span>
                <h4 className="font-semibold text-sm">Verified Removed</h4>
                <p className="text-xs text-muted-foreground mt-1">Clerix AI scanned the database and confirmed the record no longer exists.</p>
                <span className="text-[10px] text-zinc-500  mt-2 block">NOV 12, 2025 • 09:15</span>
              </div>
            )}

          </div>
        </div>

        <DrawerFooter className="border-t border-border/50 mt-auto">
          <Button variant="destructive" className="w-full sm:w-auto">Escalate Manually</Button>
          <DrawerClose asChild>
            <Button variant="outline">Close Audit Log</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function SortableTask({ task }: { task: RemovalTask }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { type: "Task", task } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} isDragging={isDragging} />
    </div>
  )
}

// --- Main Page Component ---

export default function LifecyclePage() {
  const [board, setBoard] = useState<BoardState>(INITIAL_BOARD)
  const[activeTask, setActiveTask] = useState<RemovalTask | null>(null)

  // Calculate Progress
  const totalTasks = Object.values(board).flat().length
  const removedTasks = board.removed.length
  const progressPercentage = totalTasks === 0 ? 0 : Math.round((removedTasks / totalTasks) * 100)

  // Dnd Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  // Dnd Handlers
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const task = active.data.current?.task
    if (task) setActiveTask(task)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const activeContainer = findContainer(activeId)
    const overContainer = findContainer(overId) || over.id

    if (!activeContainer || !overContainer || activeContainer === overContainer) return

    setBoard((prev) => {
      const activeItems = prev[activeContainer]
      const overItems = prev[overContainer as string]
      const activeIndex = activeItems.findIndex((t) => t.id === activeId)
      const overIndex = overItems.findIndex((t) => t.id === overId)

      const newIndex = overIndex >= 0 ? overIndex : overItems.length

      return {
        ...prev,[activeContainer]: activeItems.filter((t) => t.id !== activeId),[overContainer as string]: [
          ...overItems.slice(0, newIndex),
          activeItems[activeIndex],
          ...overItems.slice(newIndex),
        ],
      }
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)
    
    if (!over) return

    const activeContainer = findContainer(active.id)
    const overContainer = findContainer(over.id)

    if (activeContainer && overContainer && activeContainer === overContainer) {
      const activeIndex = board[activeContainer].findIndex((t) => t.id === active.id)
      const overIndex = board[overContainer].findIndex((t) => t.id === over.id)

      if (activeIndex !== overIndex) {
        setBoard((prev) => ({
          ...prev,
          [activeContainer]: arrayMove(prev[activeContainer], activeIndex, overIndex),
        }))
      }
    }
  }

  const findContainer = (id: string | number) => {
    if (id in board) return id as string
    return Object.keys(board).find((key) => board[key].some((task) => task.id === id))
  }

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] overflow-hidden">
      
      {/* Header & Global Progress */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 shrink-0 px-4 lg:px-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Removal Lifecycle</h1>
          <p className="text-muted-foreground text-sm max-w-xl">
            Visualize the end-to-end legal journey of your data. Drag items manually if out-of-band communication occurs, or let Clerix AI automate the pipeline.
          </p>
        </div>
        
        <div className="w-full md:w-80 bg-zinc-900/50 p-4 rounded-xl border border-border/50">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="font-medium text-muted-foreground">Global Cleanse Progress</span>
            <span className="text-primary font-bold">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Kanban Board Container (Horizontal Scroll) */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden px-4 lg:px-6 pb-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex h-full gap-6 items-start min-w-max">
            {COLUMNS.map((col) => (
              <div 
                key={col.id} 
                className="w-80 flex flex-col h-full max-h-full rounded-xl bg-muted/20 border border-border/50"
              >
                {/* Column Header */}
                <div className="p-4 border-b border-border/50 flex items-center justify-between bg-zinc-900/40 rounded-t-xl shrink-0">
                  <div className="flex items-center gap-2">
                    <col.icon className={`w-5 h-5 ${col.color}`} />
                    <h3 className="font-semibold text-sm">{col.title}</h3>
                  </div>
                  <Badge variant="secondary" className="bg-background text-xs">
                    {board[col.id].length}
                  </Badge>
                </div>

                {/* Column Droppable Area */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide">
                  <SortableContext id={col.id} items={board[col.id].map(t => t.id)} strategy={verticalListSortingStrategy}>
                    {board[col.id].map((task) => (
                      <SortableTask key={task.id} task={task} />
                    ))}
                    {board[col.id].length === 0 && (
                      <div className="h-24 rounded-lg border-2 border-dashed border-border/50 flex items-center justify-center text-xs text-muted-foreground">
                        Drop requests here
                      </div>
                    )}
                  </SortableContext>
                </div>
              </div>
            ))}
          </div>

          {/* Drag Overlay for smooth animations */}
          <DragOverlay dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.4' } } }) }}>
            {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}