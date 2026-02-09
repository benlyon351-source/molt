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
  title: "Shaders Landing Page",
  description: "Created with v0",
  generator: "v0.app",
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
