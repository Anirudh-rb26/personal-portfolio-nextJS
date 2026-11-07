import "lenis/dist/lenis.css";
import "./globals.css";
import type { Metadata } from "next";
import { array, clashDisplay, melodrama, satoshi } from "@/utils/font-loader";
import { LenisProvider } from "@/providers/lenis-provider";

export const metadata: Metadata = {
  title: "Anirudh Jayakumar — Founding Engineer & Product Builder",
  description: "Selected work and projects by Anirudh Jayakumar, founding engineer at terraledge.",
  icons: { icon: "/33.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${satoshi.variable} ${clashDisplay.variable} ${melodrama.variable} ${array.variable}`}><a href="#work" className="skip-link">Skip to work</a><LenisProvider>{children}</LenisProvider></body></html>;
}
