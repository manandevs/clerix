"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Shield,
  Zap,
  Bell,
  Lock,
  Eye,
  AlertTriangle,
  Check,
  Building2,
  Mail,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-react"

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

function Hero() {
  const title = "Clerix Finds and Hides Your Sensitive Data From Criminals"
  const words = title.split(" ")

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center animate-in fade-in-0 duration-1000 delay-300">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight animate-in slide-in-from-bottom-6 duration-1000">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-3 sm:mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <span
                    key={`${wordIndex}-${letterIndex}`}
                    className="inline-block animate-in fade-in-0 slide-in-from-bottom-4"
                    style={{
                      animationDelay: `${wordIndex * 100 + letterIndex * 30}ms`,
                      background: "linear-gradient(to right, oklch(0.65 0.25 300), oklch(0.7 0.22 330))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor:
                        word === "Your" || word === "Sensitive" || word === "Data" || word === "Clerix" ? "transparent" : "inherit",
                      backgroundClip: "text",
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto text-pretty leading-relaxed animate-in fade-in-0 slide-in-from-bottom-4 duration-800 delay-1500">
            Meet <strong>Clerix</strong>, your central privacy command center. Our AI-powered dashboard actively hunts down your personal information across the internet and eliminates it before it can be exploited. Monitor threats, view your privacy score, and activate emergency response instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in-0 slide-in-from-bottom-4 duration-800 delay-1800">
            <div className="inline-block group relative bg-gradient-to-b from-primary/20 to-primary/10 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Button
                size="lg"
                className="rounded-[1.15rem] px-8 py-6 text-base sm:text-lg font-semibold backdrop-blur-md bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 group-hover:-translate-y-0.5 border-0 hover:shadow-md"
                asChild
              >
                <Link href="/tool">
                  <span className="relative z-10">Try Clerix Free</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1.5 transition-all duration-300 relative z-10" />
                </Link>
              </Button>
            </div>

            <Button
              size="lg"
              variant="outline"
              className="rounded-2xl px-8 py-6 text-base sm:text-lg border-primary/20 hover:bg-primary/5 bg-transparent transition-all hover:scale-105 hover:border-primary/40 hover:shadow-lg"
              asChild
            >
              <a
                href="https://app.zencal.io/u/gerhardt-lutterodt-1762422435/vii-technologies-demo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Demo
              </a>
            </Button>
          </div>

          <div className="mt-16 sm:mt-20 grid grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto">
            {[
              { value: "24/7", label: "Dashboard Monitoring" },
              { value: "<15min", label: "Clerix Response Time" },
              { value: "99.9%", label: "Detection Rate" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-default animate-in fade-in-0 zoom-in-95 duration-500"
                style={{ animationDelay: `${2400 + index * 100}ms` }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 group-hover:text-secondary transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: Shield,
    title: "Immediate Protection",
    description:
      "The Clerix browser extension syncs with your dashboard to block trackers and prevent data exposure in real-time.",
  },
  {
    icon: Zap,
    title: "Clerix AI Guardian",
    description:
      "Our advanced AI scans the internet from the dashboard to detect and remove your exposed data before harm can exploit it.",
  },
  {
    icon: AlertTriangle,
    title: "Crisis Mode",
    description:
      "Emergency response activates via the dashboard when your privacy is breached. Clerix advises Crisis Mode and takes action.",
  },
  {
    icon: Bell,
    title: "Dashboard Alerts",
    description:
      "Receive instant notifications in your Clerix command center when data is found. Updates every 4 hours for continuous safety.",
  },
  {
    icon: Lock,
    title: "Automated Removal",
    description:
      "Track removal requests sent to data brokers directly from Clerix. Download weekly safety reports to stay informed.",
  },
  {
    icon: Eye,
    title: "Clerix Privacy Score",
    description: "Visualize your privacy health with our comprehensive scoring system. Watch your score improve in real-time.",
  },
]

function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
            Total Control via the{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Clerix Dashboard</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed mb-6">
            Clerix is more than a tool; it's an AI-powered privacy platform. Hunt down personal information, manage threats, and visualize your digital safety from one intuitive interface.
          </p>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto text-pretty leading-relaxed">
            Comprehensive protection powered by cutting-edge AI that works around the clock to keep your personal
            information safe, visible only to you on Clerix.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 group h-full">
                <div className="mb-4 relative">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="inline-flex p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"
                  >
                    <feature.icon className="h-6 w-6 text-primary group-hover:text-secondary transition-colors" />
                  </motion.div>
                  <div className="absolute inset-0 bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-full" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const steps = [
  {
    number: "01",
    title: "Connect to Clerix",
    description:
      "Create your account and install our extension. Clerix AI immediately scans the internet for your exposed personal data.",
  },
  {
    number: "02",
    title: "Visualize Threats",
    description:
      "Log in to the Clerix Dashboard to see exactly what the AI has found. Identify vulnerabilities before malicious actors exploit them.",
  },
  {
    number: "03",
    title: "Remove & Protect",
    description:
      "Watch as Clerix sends automated removal requests to data brokers. Continuous monitoring ensures your dashboard stays green.",
  },
  {
    number: "04",
    title: "Monitor Your Score",
    description:
      "Receive real-time alerts and weekly safety reports. Track your Clerix Privacy Score and see improvements over time.",
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">How Clerix Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to complete privacy mastery via your dashboard
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur border-border/50 relative overflow-hidden group hover:border-primary/50 transition-all"
            >
              <div className="absolute top-0 right-0 text-[120px] font-bold text-primary/5 leading-none group-hover:text-primary/10 transition-colors">
                {step.number}
              </div>
              <div className="relative">
                <div className="text-3xl font-bold text-primary mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const plans = [
  {
    name: "Individual",
    price: "\u20AC18",
    period: "/month",
    description: "Perfect for personal dashboard access",
    features: [
      "Full Clerix Dashboard access",
      "AI-powered data scanning",
      "Real-time privacy alerts",
      "Data removal requests",
      "Weekly safety reports",
      "Clerix Privacy Score tracking",
    ],
    cta: "Subscribe to Clerix",
    popular: false,
  },
  {
    name: "Family",
    price: "\u20AC30",
    period: "/month",
    description: "Protect up to 5 family members",
    features: [
      "Everything in Individual",
      "Up to 5 protected accounts",
      "Unified Family Dashboard",
      "Priority Clerix support",
      "Advanced threat detection",
      "Custom alert settings",
      "Monthly privacy audits",
    ],
    cta: "Subscribe to Clerix",
    popular: true,
  },
  {
    name: "Executive",
    price: "\u20AC100",
    period: "/month",
    description: "Maximum protection for professionals",
    features: [
      "Everything in Family",
      "Dedicated privacy assistant",
      "Crisis Mode priority response",
      "Dark web monitoring",
      "Professional reputation management",
      "Legal support resources",
      "White-glove service",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

const businessPlans = [
  {
    name: "Business Starter",
    description: "Essential privacy protection for small teams",
    features: [
      "Up to 10 employee accounts",
      "Company-wide Clerix Dashboard",
      "Data breach monitoring",
      "GDPR compliance toolkit",
      "Team privacy training",
      "Priority email support",
      "Quarterly privacy audits",
    ],
    popular: false,
  },
  {
    name: "Business Pro",
    description: "Comprehensive privacy for growing companies",
    features: [
      "Up to 50 employee accounts",
      "Advanced threat intelligence",
      "Custom privacy policies",
      "Data protection impact assessments",
      "Dedicated account manager",
      "24/7 priority support",
      "Monthly compliance reports",
      "Integration with security tools",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Complete privacy solutions for large organizations",
    features: [
      "Unlimited employee accounts",
      "White-label Clerix solutions",
      "Custom API integrations",
      "On-premise deployment options",
      "Dedicated security team",
      "Custom SLA agreements",
      "Advanced analytics & reporting",
      "Legal & compliance consultation",
    ],
    popular: false,
  },
]

function Pricing() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [visibleBusinessCards, setVisibleBusinessCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const businessRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            plans.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index])
              }, index * 150)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            businessPlans.forEach((_, index) => {
              setTimeout(() => {
                setVisibleBusinessCards((prev) => [...prev, index])
              }, index * 150)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    if (businessRef.current) {
      observer.observe(businessRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="pricing" className="py-24 relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Access Clerix Today</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your privacy needs. All plans include full access to the Clerix Dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`p-8 bg-card/50 backdrop-blur border-border/50 relative transition-all duration-700 hover:-translate-y-2 ${plan.popular
                ? "border-primary shadow-xl shadow-primary/30 scale-105 hover:shadow-2xl hover:shadow-primary/40"
                : "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
                } ${visibleCards.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-medium rounded-full shadow-lg animate-shimmer">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {plan.price}
                </span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <Button
                className={`w-full mb-6 transition-all hover:scale-105 ${plan.popular
                  ? "bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl hover:shadow-primary/50"
                  : "hover:border-primary/50"
                  }`}
                variant={plan.popular ? "default" : "outline"}
                asChild
              >
                <a
                  href="https://app.zencal.io/u/gerhardt-lutterodt-1762422435/vii-technologies-demo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.cta}
                </a>
              </Button>
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3 group/item">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              {plan.popular && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-lg pointer-events-none" />
              )}
            </Card>
          ))}
        </div>

        {/* Business Plans */}
        <div className="mt-32" ref={businessRef}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <Building2 className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Clerix for Business</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Privacy Command Center for Companies</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive privacy dashboards tailored for businesses of all sizes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {businessPlans.map((plan, index) => (
              <Card
                key={index}
                className={`p-8 bg-card/50 backdrop-blur border-border/50 relative transition-all duration-700 hover:-translate-y-2 ${plan.popular
                  ? "border-primary shadow-xl shadow-primary/30 scale-105 hover:shadow-2xl hover:shadow-primary/40"
                  : "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
                  } ${visibleBusinessCards.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-medium rounded-full shadow-lg animate-shimmer">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    Custom Pricing
                  </div>
                  <p className="text-sm text-muted-foreground">Tailored to your needs</p>
                </div>

                <div className="space-y-3 mb-6">
                  <Button
                    className={`w-full transition-all hover:scale-105 ${plan.popular
                      ? "bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl hover:shadow-primary/50"
                      : "hover:border-primary/50"
                      }`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <a
                      href="https://app.zencal.io/u/gerhardt-lutterodt-1762422435/vii-technologies-demo"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get a Quote
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full text-sm hover:bg-primary/5" asChild>
                    <a href="mailto:sales@viitechnologies.eu" className="flex items-center justify-center gap-2">
                      <Mail className="w-4 h-4" />
                      Contact Sales
                    </a>
                  </Button>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 group/item">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                      <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-lg pointer-events-none" />
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />

      <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
        <svg viewBox="0 0 600 600" className="w-full h-full">
          <defs>
            <linearGradient id="ctaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.65 0.25 300)" />
              <stop offset="100%" stopColor="oklch(0.70 0.22 330)" />
            </linearGradient>
          </defs>
          {Array.from({ length: 30 }).map((_, i) => (
            <circle
              key={i}
              cx={300 + Math.cos(i * 0.5) * 200}
              cy={300 + Math.sin(i * 0.5) * 200}
              r={100 + i * 5}
              stroke="url(#ctaGradient)"
              strokeWidth="1"
              fill="none"
              opacity={0.4 - i * 0.01}
            />
          ))}
        </svg>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
            Ready to Take Control with{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Clerix?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 text-pretty leading-relaxed">
            Join thousands of users who trust the Clerix Dashboard to protect their personal data. Start your free 14-day
            trial today--no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 group" asChild>
              <Link href="/tool">
                Get Clerix Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary/20 hover:bg-primary/5 bg-transparent"
              asChild
            >
              <a
                href="https://app.zencal.io/u/gerhardt-lutterodt-1762422435/vii-technologies-demo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule Demo
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
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
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              href="https://www.instagram.com/viiecotechnologies"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </Link>
            <Link
              href="https://x.com/viitechnologies?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter className="h-6 w-6" />
            </Link>
            <Link
              href="https://www.tiktok.com/@viitechnologies"
              target="_blank"
              rel="noopener noreferrer"
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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}