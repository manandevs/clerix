// app/layout.tsx

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"; // 1. Import SpeedInsights

const helvetica = localFont({
  src: "../public/fonts/helvetica.ttf",
  variable: "--font-helvetica",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#18181b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://clerix.viitechnologies.eu"),
  title: {
    default: "Clerix | AI Personal Data Privacy Dashboard",
    template: "%s | Clerix Privacy Command Center",
  },
  description: "Take control of your digital footprint with Clerix. The all-in-one privacy dashboard that finds, hides, and removes your sensitive personal data from the internet using advanced AI monitoring.",
  applicationName: "Clerix",
  keywords: [
    "personal data removal",
    "privacy dashboard",
    "Clerix",
    "VII Technologies",
    "data broker removal",
    "online privacy protection",
    "digital footprint cleaner",
    "AI privacy monitor",
    "identity theft protection",
    "GDPR compliance tool",
    "remove info from google"
  ],
  authors: [{ name: "VII Technologies", url: "https://viitechnologies.eu" }],
  creator: "VII Technologies",
  publisher: "VII Technologies",
  openGraph: {
    title: "Clerix - Your AI Privacy Command Center",
    description: "Actively hunt down and eliminate your exposed personal information. Real-time monitoring, instant alerts, and automated data removal.",
    siteName: "Clerix",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Clerix Privacy Dashboard Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clerix | AI Personal Data Privacy Dashboard",
    description: "Secure your digital life. Clerix scans the web to find and remove your leaked data.",
    site: "@viitechnologies",
    creator: "@viitechnologies",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${helvetica.variable} antialiased font-helvetica bg-background text-foreground`}
      >
        <ClerkProvider>
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </ClerkProvider>
        
        {/* Vercel Analytics & Speed Insights */}
        <Analytics />
        <SpeedInsights /> 
      </body>
    </html>
  );
}