"use client"

import React, { useState } from "react"
import { 
  Search, 
  MessageCircle, 
  ShieldCheck, 
  CreditCard, 
  Trash2, 
  FileText, 
  Settings, 
  ArrowRight,
  LifeBuoy,
  BookOpen
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// --- Mock Data ---

const helpCategories =[
  {
    title: "Data Removals",
    description: "Learn how the automated and manual removal pipelines operate.",
    icon: Trash2,
    articles: 12,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    title: "Account & Security",
    description: "Manage 2FA, API keys, and secure your zero-knowledge vault.",
    icon: ShieldCheck,
    articles: 8,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Billing & Plans",
    description: "Upgrade, downgrade, invoices, and payment method management.",
    icon: CreditCard,
    articles: 5,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Word Assistant",
    description: "Tips for prompting the AI to draft effective legal privacy requests.",
    icon: FileText,
    articles: 6,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Team & Access",
    description: "Configuring Role-Based Access Control for family or employees.",
    icon: Settings,
    articles: 4,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Privacy Score",
    description: "Understand how your Clerix Privacy Score is calculated.",
    icon: LifeBuoy,
    articles: 3,
    color: "text-primary",
    bgColor: "bg-primary/10",
  }
]

const faqs =[
  {
    question: "How long does automated data removal take?",
    answer: "Scanning is instantaneous, and initial legal requests are dispatched within minutes. However, data brokers legally have between 15 to 45 days to comply depending on your jurisdiction (e.g., CCPA vs GDPR). You can track individual broker countdowns on the Lifecycle page."
  },
  {
    question: "What happens if a broker refuses to remove my data?",
    answer: "If a broker exceeds their legal compliance window or explicitly refuses, Clerix automatically escalates the request to the relevant Data Protection Authority (DPA) or generates a formal secondary warning depending on your subscription tier."
  },
  {
    question: "How is my Privacy Score calculated?",
    answer: "Your Privacy Score (0-100) is a weighted metric based on the volume of exposed records, the severity of those records (e.g., a leaked password hurts your score more than a leaked zip code), and the percentage of successful removal confirmations."
  },
  {
    question: "Can I add family members to my plan?",
    answer: "Yes! If you are on the Family or Executive plan, you can invite members via the 'Team' page. You can grant them individual vaults while retaining administrative control over billing."
  },
  {
    question: "Why do I have to enter my password to view the Data Library?",
    answer: "The Data Library contains the actual, unredacted personal information we've found exposed on the internet. We employ a Zero-Knowledge architecture, meaning we enforce re-authentication to ensure that if your dashboard is left open, bad actors cannot scrape your sensitive data."
  }
]

const searchSuggestions =[
  "How to upgrade to Executive plan",
  "Generate an API key",
  "Delete my account",
  "GDPR Article 17 template",
  "Missing data broker"
]

// --- Main Component ---

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] overflow-y-auto overflow-x-hidden relative pb-20 scrollbar-hide">
      
      {/* Floating Action Button (Live Support) */}
      <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-4 zoom-in duration-500 delay-300">
        <Button size="lg" className="rounded-full shadow-2xl shadow-primary/20 gap-2 h-14 px-6 bg-primary hover:bg-primary/90 hover:scale-105 transition-all">
          <MessageCircle className="w-5 h-5" />
          <span className="font-semibold text-base">Contact Support</span>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="w-full flex flex-col items-center justify-center text-center px-4 pt-12 pb-8 md:pt-20 md:pb-16 relative">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/5 px-3 py-1">
          Support Center
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          How can we help you today?
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-10">
          Search our knowledge base, browse common topics, or contact our privacy experts for hands-on assistance.
        </p>

        {/* Massive Search Bar */}
        <div className="relative w-full max-w-2xl mx-auto z-10 group">
          <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />
          <div className="relative flex items-center bg-card border-2 border-border/50 rounded-2xl overflow-hidden focus-within:border-primary/50 transition-colors shadow-lg">
            <Search className="absolute left-6 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search for articles, guides, or features..." 
              className="w-full pl-16 pr-6 py-8 text-lg bg-transparent border-0 focus-visible:ring-0 placeholder:text-muted-foreground/50 h-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />
            {searchQuery && (
              <Button variant="ghost" size="sm" className="absolute right-4 text-muted-foreground hover:text-foreground" onClick={() => setSearchQuery("")}>
                Clear
              </Button>
            )}
          </div>

          {/* Type-ahead Suggestions Dropdown */}
          {isFocused && !searchQuery && (
            <div className="absolute top-full left-0 w-full mt-2 bg-card border border-border/50 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="p-3 bg-muted/20 border-b border-border/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Suggested Searches
              </div>
              <div className="p-2 flex flex-col">
                {searchSuggestions.map((suggestion, idx) => (
                  <button 
                    key={idx}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-muted/30 rounded-lg transition-colors text-sm"
                    onClick={() => {
                      setSearchQuery(suggestion)
                      setIsFocused(false)
                    }}
                  >
                    <Search className="w-4 h-4 text-muted-foreground opacity-50" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Categorized Grid */}
      <div className="max-w-6xl mx-auto w-full px-4 lg:px-6 mb-16 relative z-0">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Browse by Topic
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {helpCategories.map((category, idx) => (
            <Card key={idx} className="group bg-card/40 backdrop-blur border-border/50 hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${category.bgColor} ${category.color}`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className="bg-background text-xs text-muted-foreground">
                    {category.articles} Articles
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {category.title}
                </CardTitle>
                <CardDescription className="mt-2 text-sm leading-relaxed">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <div className="text-sm font-medium text-primary flex items-center gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  View articles <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQs Accordion */}
      <div className="max-w-3xl mx-auto w-full px-4 lg:px-6 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-sm">
            Quick answers to the most common inquiries.
          </p>
        </div>

        <Card className="bg-card/30 backdrop-blur border-border/50">
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-border/50 px-6">
                  <AccordionTrigger className="text-left text-base font-semibold hover:text-primary hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* Outro CTA */}
      <div className="max-w-2xl mx-auto w-full px-4 text-center mt-8">
        <p className="text-sm text-muted-foreground">
          Still can't find what you're looking for? <br className="sm:hidden" />
          Send an email directly to <a href="mailto:support@viitechnologies.eu" className="text-primary hover:underline font-medium">support@viitechnologies.eu</a>
        </p>
      </div>

    </div>
  )
}