"use client"

import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-white font-mono text-lg font-bold relative group" 
                        style={{
                            background: "linear-gradient(90deg, #72009C 0%, #72009C 50%, white 50%, white 100%)",
                            backgroundSize: "200% 100%",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            transition: "background-position 0.5s ease-out"
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundPosition = "0% 0" }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundPosition = "100% 0" }}
                        >
                            ~/anirudh
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link
                                href="/"
                                className="text-gray-300 hover:text-[#72009C] px-3 py-2 text-sm font-mono transition-colors"
                            >
                                hello()
                            </Link>
                            <Link
                                href="/about"
                                className="text-gray-300 hover:text-[#72009C] px-3 py-2 text-sm font-mono transition-colors"
                            >
                                info.me()
                            </Link>
                            <Link
                                href="/contact"
                                className="text-gray-300 hover:text-[#72009C] px-3 py-2 text-sm font-mono transition-colors"
                            >
                                contact.me()
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
