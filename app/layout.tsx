import "./globals.css"
import type React from "react"
import type { Metadata } from "next"
import Navbar from "@/components/navbar";
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
        <Navbar />
        <div className="relative z-10 h-full overflow-auto mt-10 pt-6">
          {children}
        </div>
      </body>
    </html >
  )
}
