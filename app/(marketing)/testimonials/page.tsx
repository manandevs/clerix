"use client";
// import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Star, Quote, Linkedin, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// export const metadata: Metadata = {
//   title: "Testimonials | Clerix",
//   description: "See how Clerix has helped thousands of individuals and businesses regain control of their digital privacy.",
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

const reviews = [
  {
    name: "Sarah Jenkins",
    role: "Freelance Journalist",
    content: "As a journalist, keeping my home address private is a safety requirement, not a luxury. Clerix found my info on 12 sites I didn't know existed and removed them in 48 hours.",
    stars: 5,
  },
  {
    name: "Marcus Thorne",
    role: "CTO, FinTech Startups",
    content: "We use the Clerix Business Dashboard for our executive team. The automated reporting saves our security team hours of manual work every week.",
    stars: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Small Business Owner",
    content: "I started getting spam calls non-stop. I signed up for Clerix, and within a week, the calls stopped. The dashboard showed exactly who sold my data.",
    stars: 5,
  },
  {
    name: "David Kim",
    role: "Software Engineer",
    content: "The UI is incredible. Most privacy tools are clunky, but Clerix feels like a modern command center. The 'Privacy Score' is genuinely addictive to optimize.",
    stars: 4,
  },
  {
    name: "The Miller Family",
    role: "Family Plan Users",
    content: "Protecting my kids online is hard. Clerix's family dashboard lets me see our collective exposure at a glance. Peace of mind is worth every penny.",
    stars: 5,
  },
  {
    name: "James Wilson",
    role: "Real Estate Agent",
    content: "I need to be public for work, but I don't want my personal cell on the dark web. Clerix helps me separate my public persona from my private life.",
    stars: 5,
  },
];

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <Header />
      
      <section className="py-20 text-center container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Trusted by Privacy <br />
          <span className="text-primary">Advocates Worldwide</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Don't just take our word for it. Here is what the Clerix community has to say about taking back control.
        </p>
      </section>

      <section className="pb-24 container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <Card key={idx} className="p-8 bg-zinc-900/50 border-zinc-800 backdrop-blur hover:border-primary/30 transition-colors flex flex-col gap-4">
              <div className="flex gap-1 text-yellow-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < review.stars ? "fill-current" : "text-zinc-700 fill-zinc-700"}`} />
                ))}
              </div>
              <Quote className="w-8 h-8 text-primary/20" />
              <p className="text-zinc-300 flex-grow text-lg leading-relaxed">"{review.content}"</p>
              <div className="mt-4 pt-4 border-t border-zinc-800">
                <div className="font-bold text-zinc-100">{review.name}</div>
                <div className="text-sm text-primary">{review.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">2M+</div>
              <div className="text-sm text-muted-foreground">Records Removed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">50k+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">200+</div>
              <div className="text-sm text-muted-foreground">Data Brokers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}