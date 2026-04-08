import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const apercuPro = localFont({
  src: "../public/fonts/ApercuPro.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-apercu-pro",
})
const apercuMonoPro = localFont({
  src: "../public/fonts/ApercuMonoProRegular.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-apercu-mono",
})
const moulay = localFont({
  src: "../public/fonts/Moulay-Bold.ttf",
  weight: "700",
  style: "normal",
  display: "swap",
  variable: "--font-moulay",
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
      <body className={`${apercuPro.variable} ${apercuMonoPro.variable} ${moulay.variable} font-sans antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VFS95882TK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VFS95882TK');
          `}
        </Script>
        <Script id="dealfront-leadfeeder" strategy="afterInteractive">
          {`
            (function(ss,ex){
              window.ldfdr = window.ldfdr || function(){(ldfdr._q = ldfdr._q || []).push([].slice.call(arguments));};
              (function(d,s){
                var fs = d.getElementsByTagName(s)[0];
                function ce(src){
                  var cs = d.createElement(s);
                  cs.src = src;
                  cs.async = 1;
                  fs.parentNode.insertBefore(cs, fs);
                }
                ce('https://sc.lfeeder.com/lftracker_v1_' + ss + (ex ? '_' + ex : '') + '.js');
              })(document, 'script');
            })('p1e024BE0JZ7GB6d');
          `}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
