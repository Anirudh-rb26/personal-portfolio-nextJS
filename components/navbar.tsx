"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <nav className="top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="text-white font-mono text-lg font-bold relative group"
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
                            onClick={closeMenu}
                        >
                            ~/anirudh
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
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

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-300 hover:text-white focus:outline-none focus:text-white transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className={`h-6 w-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen
                        ? 'max-h-48 opacity-100'
                        : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-sm rounded-b-lg border-t border-gray-800">
                        <Link
                            href="/"
                            className="text-gray-300 hover:text-[#72009C] block px-3 py-2 text-base font-mono transition-colors"
                            onClick={closeMenu}
                        >
                            hello()
                        </Link>
                        <Link
                            href="/about"
                            className="text-gray-300 hover:text-[#72009C] block px-3 py-2 text-base font-mono transition-colors"
                            onClick={closeMenu}
                        >
                            info.me()
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-300 hover:text-[#72009C] block px-3 py-2 text-base font-mono transition-colors"
                            onClick={closeMenu}
                        >
                            contact.me()
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}