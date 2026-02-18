"use client";
import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Lock, Eye, RefreshCw, Globe, FileSearch, Database, Link, Twitter, Instagram, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";

// export const metadata: Metadata = {
//   title: "Features | Clerix Dashboard",
//   description: "Explore the powerful AI capabilities of the Clerix Privacy Dashboard. From real-time scanning to automated data removal.",
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

export default function FeaturesPage() {
  const features = [
    {
      icon: Eye,
      title: "Deep Web Scanning",
      description: "Clerix doesn't just check Google. Our AI trawls the deep web, data broker databases, and pastebins to find exposed credentials and personal info.",
      badge: "AI Powered"
    },
    {
      icon: RefreshCw,
      title: "Continuous Monitoring",
      description: "Privacy isn't a one-time fix. The Clerix Dashboard updates every 4 hours, ensuring new threats are caught the moment they appear.",
      badge: "24/7"
    },
    {
      icon: Shield,
      title: "The Clerix Score",
      description: "Gamify your privacy. Our proprietary algorithm calculates a real-time safety score (0-100) based on your exposure level and active protections.",
      badge: "Exclusive"
    },
    {
      icon: Lock,
      title: "Auto-Removal Engine",
      description: "We don't just find data; we kill it. Clerix automatically generates and sends legal removal requests (GDPR/CCPA) to over 200 data brokers.",
      badge: "Automated"
    },
    {
      icon: Globe,
      title: "Tracker Blocking",
      description: "The Clerix browser extension integrates with your dashboard to stop invasive ads and cookies before they can collect your data.",
      badge: "Extension"
    },
    {
      icon: Database,
      title: "Breach Alerts",
      description: "If your email or password appears in a known corporate data breach, your Dashboard will alert you instantly with steps to secure your accounts.",
      badge: "Real-time"
    }
  ];

  return (
    <main className="min-h-screen bg-background pt-20">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 border-primary/20 text-primary">
            System Capabilities
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The Engine Behind <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Total Privacy
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what makes the Clerix Dashboard the most advanced personal data removal tool on the market.
          </p>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  {feature.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Detail Section */}
      <section className="py-20 bg-muted/20 border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Bank-Grade Encryption</h2>
              <p className="text-lg text-muted-foreground">
                We believe your privacy data should be private even from us. 
                The Clerix Dashboard is built with zero-knowledge architecture.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>AES-256 bit encryption for all stored data</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Two-Factor Authentication (2FA) enforced</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>GDPR & CCPA Compliant Processing</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-md aspect-square bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-50" />
              <FileSearch className="absolute w-64 h-64 text-primary/80 drop-shadow-[0_0_50px_rgba(var(--primary),0.5)]" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}