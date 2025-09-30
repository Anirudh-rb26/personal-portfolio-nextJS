import "./globals.css"
import type React from "react"
import Navbar from "@/components/navbar";

import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Anirudh Jayakumar",
  description: "Fullstack Engineer/Developer",
  icons: {
    icon: "/33.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} antialiased bg-black font-mono text-base leading-relaxed relative`}
        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
      >
        <Navbar></Navbar>
        <div className="relative z-10 h-full overflow-auto">{children}</div>
      </body>
    </html>
  )
}
