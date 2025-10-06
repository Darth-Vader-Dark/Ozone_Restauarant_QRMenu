import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Taste of East Africa - Rwandan Restaurant in Kigali",
  description:
    "Authentic Rwandan, Sudanese & South Sudanese cuisine in Kigali, Rwanda. Experience traditional East African flavors.",
  keywords:
    "Rwandan restaurant, Kigali restaurant, East African food, Sudanese food, South Sudanese food, traditional cuisine",
  authors: [{ name: "Taste of East Africa" }],
  openGraph: {
    title: "Taste of East Africa - Rwandan Restaurant",
    description: "Authentic East African cuisine in Kigali",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
