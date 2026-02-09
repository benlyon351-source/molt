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
  openGraph: {
    title: "MOLT | Bespoke e-Learning",
    description:
      "Shed the forgettable. MOLT delivers bespoke, practitioner-designed e-learning — engaging, outcome-driven, and ready to launch at speed.",
    url: "https://molt.com",
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
