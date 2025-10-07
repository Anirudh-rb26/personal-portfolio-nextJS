"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_0_rgba(114,0,156,0.1)]"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <Link
                            href="/"
                            className="text-white font-mono text-lg font-bold relative group"
                            style={{
                                background: "linear-gradient(90deg, #72009C 0%, #72009C 50%, white 50%, white 100%)",
                                backgroundSize: "200% 100%",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                transition: "background-position 0.5s ease-out",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundPosition = "0% 0"
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundPosition = "100% 0"
                            }}
                            onClick={closeMenu}
                        >
                            ~/anirudh
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <Link
                                    href="/"
                                    className="text-gray-300 hover:text-[#72009C] px-3 py-2 text-sm font-mono transition-all duration-300 hover:bg-white/5 rounded-lg backdrop-blur-sm"
                                >
                                    hello()
                                </Link>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <Link
                                    href="/about"
                                    className="text-gray-300 hover:text-[#72009C] px-3 py-2 text-sm font-mono transition-all duration-300 hover:bg-white/5 rounded-lg backdrop-blur-sm"
                                >
                                    info.me()
                                </Link>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <Link
                                    href="/contact"
                                    className="text-gray-300 hover:text-[#72009C] px-3 py-2 text-sm font-mono transition-all duration-300 hover:bg-white/5 rounded-lg backdrop-blur-sm"
                                >
                                    contact.me()
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <motion.div
                        className="md:hidden"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <button
                            onClick={toggleMenu}
                            className="text-gray-300 hover:text-white focus:outline-none focus:text-white transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className={`h-6 w-6 transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""}`}
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
                    </motion.div>
                </div>

                {/* Mobile Navigation */}
                <motion.div
                    className="md:hidden overflow-hidden"
                    initial={false}
                    animate={{
                        height: isMenuOpen ? "auto" : 0,
                        opacity: isMenuOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-black/40 backdrop-blur-xl rounded-b-lg border-t border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                        <Link
                            href="/"
                            className="text-gray-300 hover:text-[#72009C] block px-3 py-2 text-base font-mono transition-all duration-300 hover:bg-white/5 rounded-lg"
                            onClick={closeMenu}
                        >
                            hello()
                        </Link>
                        <Link
                            href="/about"
                            className="text-gray-300 hover:text-[#72009C] block px-3 py-2 text-base font-mono transition-all duration-300 hover:bg-white/5 rounded-lg"
                            onClick={closeMenu}
                        >
                            info.me()
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-300 hover:text-[#72009C] block px-3 py-2 text-base font-mono transition-all duration-300 hover:bg-white/5 rounded-lg"
                            onClick={closeMenu}
                        >
                            contact.me()
                        </Link>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    )
}
