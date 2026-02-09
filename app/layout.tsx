import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _apercuPro = localFont({
  src: "../public/fonts/ApercuPro.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
})
const _apercuMonoPro = localFont({
  src: "../public/fonts/ApercuMonoProRegular.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
})
const _moulay = localFont({
  src: "../public/fonts/Moulay-Bold.ttf",
  weight: "700",
  style: "normal",
  display: "swap",
})

export const metadata: Metadata = {
  title: "MOLT | Bespoke e-Learning",
  description:
    "Shed the forgettable. MOLT delivers bespoke, practitioner-designed e-learning — engaging, outcome-driven, and ready to launch at speed.",
  keywords: [
    "e-learning",
    "bespoke learning",
    "corporate training",
    "AI-powered learning",
    "video-led training",
    "learning design",
    "MOLT",
  ],
  authors: [{ name: "MOLT" }],
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "apple-mobile-web-app-title": "MOLT",
  },
  openGraph: {
    title: "MOLT | Bespoke e-Learning",
    description:
      "Shed the forgettable. MOLT delivers bespoke, practitioner-designed e-learning — engaging, outcome-driven, and ready to launch at speed.",
    url: "https://justmolt.com",
    siteName: "MOLT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MOLT | Bespoke e-Learning",
    description:
      "Shed the forgettable. MOLT delivers bespoke, practitioner-designed e-learning — engaging, outcome-driven, and ready to launch at speed.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
