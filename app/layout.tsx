import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kodluyo Siber - Geleceğin Siber Güvenlik Platformu",
  description: "Ethical hacking, penetration testing, OSINT ve CTF challenges için kapsamlı siber güvenlik platformu",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.className} bg-black text-green-400`}>
        <Navigation />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  )
}
