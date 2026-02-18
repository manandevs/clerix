"use client";
// import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, HelpCircle, Instagram, Linkedin, Twitter } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

// export const metadata: Metadata = {
//   title: "Pricing | Clerix",
//   description: "Transparent pricing for your digital safety. Choose from Individual, Family, or Business plans.",
// };

function Header() {
  const navLinks = [
    { href: "/features", label: "Features" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/pricing", label: "Pricing" },
  ]
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-4">
      <nav className="max-w-5xl mx-auto flex items-center justify-between h-12 px-2 rounded-full bg-zinc-900 border border-zinc-800 backdrop-blur-md">
        <Link href="/" className="font-display text-lg font-semibold text-zinc-100 flex items-center gap-2">
          <div className="w-10 h-6 bg-white rounded-full"></div>
          Clerix
        </Link>
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-1.5 text-sm rounded-full transition-colors text-zinc-400 hover:text-zinc-100"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="ml-2 px-4 py-1.5 text-sm rounded-full bg-zinc-100 text-zinc-900 font-medium hover:bg-zinc-200 transition-colors"
          >
            Open Dashboard
          </Link>
        </div>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          {/* Supported By */}
          <div className="w-full flex flex-col items-center gap-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Supported By</h3>
            <div className="relative w-full max-w-4xl overflow-hidden">
              <div className="flex gap-12 animate-marquee whitespace-nowrap">
                <img
                  src="/images/img-2536.jpeg"
                  alt="Startup Incubator Berlin"
                  className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
                <img
                  src="/images/img-2537.png"
                  alt="Constructor Group"
                  className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
                <img
                  src="/images/start-global.png"
                  alt="START GLOBAL INCUBATOR"
                  className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
                <img
                  src="/images/img-2536.jpeg"
                  alt="Startup Incubator Berlin"
                  className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
                <img
                  src="/images/img-2537.png"
                  alt="Constructor Group"
                  className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
                <img
                  src="/images/start-global.png"
                  alt="START GLOBAL INCUBATOR"
                  className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex gap-6 items-center">
            <Link
              href="https://www.linkedin.com/company/viitechnologies/"
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              href="https://www.instagram.com/viiecotechnologies"
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </Link>
            <Link
              href="https://x.com/viitechnologies?s=21"
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter className="h-6 w-6" />
            </Link>
            <Link
              href="https://www.tiktok.com/@viitechnologies"
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="TikTok"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            {"© 2025 VII Technologies. All rights reserved."}
          </div>
        </div>
      </div>
    </footer>
  )
}

const faqs = [
  {
    question: "How does the free trial work?",
    answer: "You get full access to the Clerix Dashboard for 14 days. We scan your data, generate your privacy score, and even perform initial removals. No charges until the trial ends."
  },
  {
    question: "Is my data safe with Clerix?",
    answer: "Absolutely. We use bank-grade 256-bit encryption. We only use your data to find it on the web and remove it. We never sell or share your data with third parties."
  },
  {
    question: "How long does removal take?",
    answer: "Scanning is instant. Automated removal requests are sent within 24 hours. Data brokers typically comply within 7-45 days depending on their legal jurisdiction."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. You can cancel your subscription directly from your dashboard settings with one click. You will retain access until the end of your billing cycle."
  }
];

const plans = [
  {
    name: "Individual",
    price: "€18",
    period: "/mo",
    description: "Ideal for personal protection.",
    features: ["1 Protected Individual", "Dashboard Access", "200+ Data Brokers", "Monthly Reports"],
    buttonVariant: "outline" as const,
  },
  {
    name: "Family",
    price: "€30",
    period: "/mo",
    description: "Best value for households.",
    features: ["5 Protected Accounts", "Unified Family Dashboard", "Priority Support", "Dark Web Alerts"],
    popular: true,
    buttonVariant: "default" as const,
  },
  {
    name: "Business",
    price: "Custom",
    period: "",
    description: "For teams and executives.",
    features: ["Unlimited Employees", "API Access", "Dedicated Account Manager", "Audit Logs"],
    buttonVariant: "outline" as const,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <Header />

      <section className="py-20 text-center container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Invest in Your <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Digital Safety</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Privacy is a right, but enforcing it requires tools. Choose the plan that fits your needs.
        </p>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24">
          {plans.map((plan, idx) => (
            <Card key={idx} className={`p-8 flex flex-col relative ${plan.popular ? 'border-primary shadow-2xl shadow-primary/20 scale-105 z-10' : 'bg-card/50 border-border/50'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-4 text-left">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <div className="mb-6 text-left">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 text-left flex-grow">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={plan.buttonVariant} asChild>
                <Link href={plan.name === "Business" ? "mailto:sales@viitechnologies.eu" : "https://app.zencal.io/u/gerhardt-lutterodt-1762422435/vii-technologies-demo"}>
                  {plan.name === "Business" ? "Contact Sales" : "Get Started"}
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about Clerix subscriptions.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-lg hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </main>
  );
}