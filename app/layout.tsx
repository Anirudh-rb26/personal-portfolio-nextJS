import "./globals.css"
import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google";
import { LenisProvider } from "@/providers/lenis-provider";
import { array, clashDisplay, melodrama, satoshi } from "@/utils/font-loader";
import Navbar from "@/components/navbar";

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
        className={`${jetbrainsMono.variable} ${satoshi.variable} ${clashDisplay.variable} ${melodrama.variable} ${array.variable} antialiased bg-black font-mono text-base leading-relaxed relative`}
      >
        <LenisProvider>
          <div className="relative z-10 h-full w-full flex items-center justify-center overflow-auto">
            <Navbar />
            {children}
          </div>
        </LenisProvider>
      </body>
    </html >
  )
}
