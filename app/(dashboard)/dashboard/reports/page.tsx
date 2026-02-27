"use client"

import React, { useState } from "react"
import { 
  IconDownload, 
  IconShare3, 
  IconPrinter, 
  IconFileText, 
  IconPlus, 
  IconFileSpreadsheet,
  IconCalendar,
  IconSearch,
  IconEye,
  IconChevronRight,
  IconChevronLeft,
  IconCheck
} from "@tabler/icons-react"

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

// --- Mock Data & Types ---

type ReportFormat = "PDF" | "CSV"
type ReportType = "Compliance Audit" | "Removal Summary" | "Exposure Assessment"

interface Report {
  id: string
  title: string
  date: string
  type: ReportType
  format: ReportFormat
  size: string
  colorClass: string
}

const mockReports: Report[] =[
  {
    id: "rep_1",
    title: "Q4 2025 Privacy Compliance Audit",
    date: "Jan 05, 2026",
    type: "Compliance Audit",
    format: "PDF",
    size: "2.4 MB",
    colorClass: "bg-blue-500",
  },
  {
    id: "rep_2",
    title: "Annual Data Removal Summary",
    date: "Dec 31, 2025",
    type: "Removal Summary",
    format: "PDF",
    size: "4.1 MB",
    colorClass: "bg-green-500",
  },
  {
    id: "rep_3",
    title: "Raw Exposure Export - December",
    date: "Dec 01, 2025",
    type: "Exposure Assessment",
    format: "CSV",
    size: "845 KB",
    colorClass: "bg-orange-500",
  },
  {
    id: "rep_4",
    title: "Executive Profile Scrub Log",
    date: "Nov 15, 2025",
    type: "Removal Summary",
    format: "CSV",
    size: "1.2 MB",
    colorClass: "bg-green-500",
  },
  {
    id: "rep_5",
    title: "CCPA Request Verification",
    date: "Oct 22, 2025",
    type: "Compliance Audit",
    format: "PDF",
    size: "1.8 MB",
    colorClass: "bg-blue-500",
  },
  {
    id: "rep_6",
    title: "Initial Baseline Exposure",
    date: "Aug 10, 2025",
    type: "Exposure Assessment",
    format: "PDF",
    size: "5.6 MB",
    colorClass: "bg-orange-500",
  },
]

// --- Stylized Thumbnail Component ---

const DocumentThumbnail = ({ type, format, colorClass }: { type: string, format: string, colorClass: string }) => {
  if (format === "CSV") {
    return (
      <div className="w-full h-full bg-zinc-900/80 p-4 flex flex-col gap-2 rounded-t-lg relative overflow-hidden group-hover:bg-zinc-900 transition-colors">
        <div className={`absolute top-0 left-0 w-full h-1 ${colorClass}`} />
        <div className="flex items-center justify-between mb-2 opacity-50">
          <IconFileSpreadsheet className="w-6 h-6" />
          <span className="text-xs ">.CSV</span>
        </div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex gap-2">
            <div className="h-1.5 w-1/4 bg-zinc-700 rounded-full" />
            <div className="h-1.5 w-1/2 bg-zinc-700 rounded-full" />
            <div className="h-1.5 w-1/4 bg-zinc-700 rounded-full" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-zinc-200 p-4 flex flex-col gap-3 rounded-t-lg relative overflow-hidden group-hover:bg-zinc-300 transition-colors">
      <div className={`absolute top-0 left-0 w-full h-1.5 ${colorClass}`} />
      
      {/* Mock Document Header */}
      <div className="flex justify-between items-start mb-2">
        <div className="w-8 h-3 bg-zinc-400 rounded-sm" />
        <div className="w-12 h-3 bg-zinc-300 rounded-sm" />
      </div>
      
      {/* Mock Document Title */}
      <div className="w-3/4 h-5 bg-zinc-400 rounded-sm" />
      <div className="w-1/2 h-5 bg-zinc-400 rounded-sm mb-2" />
      
      {/* Mock Document Content Blocks */}
      <div className="space-y-1.5">
        <div className="w-full h-2 bg-zinc-300 rounded-full" />
        <div className="w-full h-2 bg-zinc-300 rounded-full" />
        <div className="w-5/6 h-2 bg-zinc-300 rounded-full" />
      </div>

      {type === "Exposure Assessment" && (
        <div className="mt-2 w-full h-12 bg-zinc-300 rounded-md border border-zinc-400 flex items-end p-1 gap-1">
          <div className="w-1/4 h-1/2 bg-zinc-400 rounded-t-sm" />
          <div className="w-1/4 h-full bg-zinc-400 rounded-t-sm" />
          <div className="w-1/4 h-3/4 bg-zinc-400 rounded-t-sm" />
          <div className="w-1/4 h-1/4 bg-zinc-400 rounded-t-sm" />
        </div>
      )}
      
      {type === "Compliance Audit" && (
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-zinc-400" /><div className="w-1/2 h-2 bg-zinc-300 rounded-full" /></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-zinc-400" /><div className="w-1/3 h-2 bg-zinc-300 rounded-full" /></div>
        </div>
      )}
    </div>
  )
}

// --- Main Page Component ---

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const[previewReport, setPreviewReport] = useState<Report | null>(null)
  
  // Wizard State
  const[wizardStep, setWizardStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)

  const filteredReports = mockReports.filter(report => 
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    report.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setWizardStep(1) // Reset after pseudo-generation
    }, 2000)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] overflow-hidden px-4 lg:px-6 pb-6">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Reports & Archives</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Access, download, and share your historical privacy audits and data removal compliance reports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search reports..." 
              className="pl-9 bg-background/50 border-border/50 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="gap-2 shrink-0">
                <IconPlus className="w-4 h-4" />
                Generate Report
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md border-l-border/50 bg-background/95 backdrop-blur flex flex-col">
              <SheetHeader className="shrink-0">
                <SheetTitle>Generate Custom Report</SheetTitle>
                <SheetDescription>
                  Configure parameters to generate a new compliance or exposure document.
                </SheetDescription>
              </SheetHeader>

              {/* Wizard Content */}
              <div className="flex-1 overflow-y-auto py-6">
                {wizardStep === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    <div className="space-y-3">
                      <Label>Report Type</Label>
                      <Select defaultValue="Removal Summary">
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Compliance Audit">Compliance Audit</SelectItem>
                          <SelectItem value="Removal Summary">Removal Summary</SelectItem>
                          <SelectItem value="Exposure Assessment">Exposure Assessment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Date Range</Label>
                      <Select defaultValue="last_30">
                        <SelectTrigger className="bg-background/50">
                          <IconCalendar className="w-4 h-4 mr-2 text-muted-foreground" />
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last_7">Last 7 Days</SelectItem>
                          <SelectItem value="last_30">Last 30 Days</SelectItem>
                          <SelectItem value="last_90">Last 90 Days</SelectItem>
                          <SelectItem value="ytd">Year to Date</SelectItem>
                          <SelectItem value="custom">Custom Range...</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Output Format</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-primary bg-primary/5 gap-2 transition-all">
                          <IconFileText className="w-8 h-8 text-primary" />
                          <span className="font-semibold text-sm">PDF Document</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-border/50 hover:border-primary/50 hover:bg-muted/50 gap-2 transition-all text-muted-foreground hover:text-foreground">
                          <IconFileSpreadsheet className="w-8 h-8" />
                          <span className="font-semibold text-sm">CSV Data</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {wizardStep === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    <div className="p-4 bg-muted/30 rounded-xl border border-border/50 space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <IconCheck className="w-5 h-5 text-green-500" />
                        Ready to Generate
                      </h4>
                      <Separator className="bg-border/50" />
                      <div className="grid grid-cols-2 gap-y-2 text-sm">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium text-right">Removal Summary</span>
                        
                        <span className="text-muted-foreground">Range:</span>
                        <span className="font-medium text-right">Last 30 Days</span>
                        
                        <span className="text-muted-foreground">Format:</span>
                        <span className="font-medium text-right">PDF</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Wizard Footer */}
              <SheetFooter className="shrink-0 mt-auto pt-4 border-t border-border/50">
                {wizardStep === 1 ? (
                  <Button className="w-full gap-2" onClick={() => setWizardStep(2)}>
                    Next Step <IconChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <div className="flex gap-3 w-full">
                    <Button variant="outline" className="w-full" onClick={() => setWizardStep(1)} disabled={isGenerating}>
                      <IconChevronLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <Button className="w-full" onClick={handleGenerate} disabled={isGenerating}>
                      {isGenerating ? "Compiling..." : "Generate & Save"}
                    </Button>
                  </div>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Grid Layout (Document Repository Aesthetic) */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
          {filteredReports.map((report) => (
            <Card 
              key={report.id} 
              className="group flex flex-col bg-card/40 backdrop-blur border-border/50 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
            >
              {/* Thumbnail Area (Aspect Ratio representing a document) */}
              <div 
                className="w-full aspect-[1/1.2] p-4 bg-muted/20 relative cursor-pointer"
                onClick={() => setPreviewReport(report)}
              >
                <div className="w-full h-full rounded-lg shadow-sm overflow-hidden border border-border/50 group-hover:shadow-md transition-shadow">
                  <DocumentThumbnail type={report.type} format={report.format} colorClass={report.colorClass} />
                </div>
                
                {/* Hover Overlay Actions */}
                <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <Button size="icon" variant="secondary" className="rounded-full shadow-lg" onClick={(e) => { e.stopPropagation(); setPreviewReport(report); }}>
                    <IconEye className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full shadow-lg" onClick={(e) => e.stopPropagation()}>
                    <IconDownload className="w-4 h-4" />
                  </Button>
                </div>

                <Badge variant="secondary" className="absolute top-6 left-6 text-[10px] font-bold shadow-sm">
                  {report.format}
                </Badge>
              </div>

              {/* Document Metadata Footer */}
              <CardFooter className="flex flex-col items-start p-4 gap-2 bg-card/80 border-t border-border/50">
                <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors" title={report.title}>
                  {report.title}
                </h3>
                
                <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                  <span>{report.date}</span>
                  <span>{report.size}</span>
                </div>
                
                <div className="flex items-center justify-between w-full mt-2">
                  <span className="text-[11px] font-medium text-zinc-500">{report.type}</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary">
                      <IconShare3 className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary">
                      <IconPrinter className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Document Preview Modal */}
      <Dialog open={!!previewReport} onOpenChange={(open) => !open && setPreviewReport(null)}>
        <DialogContent className="sm:max-w-3xl h-[80vh] flex flex-col bg-zinc-950 border-zinc-800 p-0 overflow-hidden">
          {previewReport && (
            <>
              {/* Fake PDF Toolbar */}
              <DialogHeader className="p-4 border-b border-zinc-800 bg-zinc-900 shrink-0 flex flex-row items-center justify-between">
                <div>
                  <DialogTitle className="text-base text-zinc-200">{previewReport.title}</DialogTitle>
                  <p className="text-xs text-zinc-500 mt-1">{previewReport.date} • {previewReport.size}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 border-zinc-700 hover:bg-zinc-800">
                    <IconPrinter className="w-4 h-4 mr-2" /> Print
                  </Button>
                  <Button size="sm" className="h-8 bg-primary hover:bg-primary/90">
                    <IconDownload className="w-4 h-4 mr-2" /> Download
                  </Button>
                </div>
              </DialogHeader>
              
              {/* Document Preview Area */}
              <div className="flex-1 bg-zinc-950 p-6 overflow-y-auto flex justify-center">
                {previewReport.format === "PDF" ? (
                  <div className="w-full max-w-2xl bg-zinc-100 min-h-full rounded-sm shadow-2xl p-12 space-y-6">
                    {/* Simulated PDF Document Content */}
                    <div className="flex justify-between items-start border-b border-zinc-300 pb-6 mb-8">
                      <div className="w-32 h-8 bg-zinc-300 rounded" />
                      <div className="text-right">
                        <div className="text-zinc-800 font-bold text-lg">{previewReport.type}</div>
                        <div className="text-zinc-500 text-sm">{previewReport.date}</div>
                      </div>
                    </div>
                    <div className="w-3/4 h-8 bg-zinc-400 rounded" />
                    <div className="w-full h-3 bg-zinc-300 rounded mt-4" />
                    <div className="w-full h-3 bg-zinc-300 rounded" />
                    <div className="w-5/6 h-3 bg-zinc-300 rounded" />
                    
                    <div className="mt-8 grid grid-cols-2 gap-6">
                      <div className="w-full aspect-square bg-zinc-200 rounded flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border-8 border-zinc-400 border-t-zinc-500" />
                      </div>
                      <div className="space-y-3">
                        <div className="w-full h-4 bg-zinc-400 rounded" />
                        <div className="w-full h-3 bg-zinc-300 rounded" />
                        <div className="w-full h-3 bg-zinc-300 rounded" />
                        <div className="w-3/4 h-3 bg-zinc-300 rounded" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full border border-zinc-800 rounded-lg bg-zinc-900/50 p-4">
                     {/* Simulated CSV Data */}
                     <div className="flex items-center gap-4 border-b border-zinc-800 pb-4 mb-4 opacity-50">
                        <IconFileSpreadsheet className="w-8 h-8" />
                        <div>
                          <p className=" text-sm">id,broker,status,date_found,severity</p>
                          <p className=" text-sm">1,Spokeo,removed,2025-10-12,high</p>
                          <p className=" text-sm">2,Acxiom,pending,2025-11-04,medium</p>
                          <p className=" text-sm">3,ZoomInfo,removed,2025-11-15,high</p>
                        </div>
                     </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}