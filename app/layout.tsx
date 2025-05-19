import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { JetBrains_Mono } from "next/font/google"
import Navbar from "@/components/navbar";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Anirudh Jayakumar",
  description: "Fullstack Engineer | Flutter Developer",
  icons: {
    icon: "/favicon.ico",
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
        className={`${jetbrainsMono.variable} antialiased bg-[#0b0f1c] font-mono text-base leading-relaxed relative`}
      >
        <Navbar></Navbar>
        <div className="relative z-10 h-full overflow-auto">{children}</div>
      </body>
    </html>
  )
}
