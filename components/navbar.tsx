"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"

export default function Navbar() {
    const measureRef = useRef<HTMLDivElement>(null)
    const [navWidth, setNavWidth] = useState("auto")
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [displayedName, setDisplayedName] = useState("")
    const [displayedPath, setDisplayedPath] = useState("")
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [fileLocation, setFileLocation] = useState<string | null>(null)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const closeMenu = () => setIsMenuOpen(false)

    const nameText = "Anirudh"

    // Animate the name typing on mount
    useEffect(() => {
        const timeouts: NodeJS.Timeout[] = []
        nameText.split("").forEach((_, idx) => {
            const timeout = setTimeout(() => {
                setDisplayedName(nameText.slice(0, idx + 1))
            }, idx * 80)
            timeouts.push(timeout)
        })
        const finalTimeout = setTimeout(() => {
            setIsInitialLoad(false)
        }, nameText.length * 80 + 200)
        timeouts.push(finalTimeout)

        return () => timeouts.forEach(t => clearTimeout(t))
    }, [])

    // Animate path typing character by character
    useEffect(() => {
        if (!fileLocation) {
            setDisplayedPath("")
            return
        }

        setDisplayedPath("")
        const timeouts: NodeJS.Timeout[] = []
        fileLocation.split("").forEach((_, idx) => {
            const timeout = setTimeout(() => {
                setDisplayedPath(fileLocation.slice(0, idx + 1))
            }, idx * 50)
            timeouts.push(timeout)
        })

        return () => timeouts.forEach(t => clearTimeout(t))
    }, [fileLocation])

    // Measure and update width only when displayedPath changes
    useEffect(() => {
        if (measureRef.current) {
            const width = measureRef.current.offsetWidth
            setNavWidth(`${width}px`)
        }
    }, [displayedPath, displayedName])

    return (
        <motion.nav
            className="fixed top-4 z-10"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Hidden measurement div */}
            <div
                ref={measureRef}
                className="font-array backdrop-blur-2xl bg-black/30 border border-white/20 rounded-full px-4 sm:px-6 py-2 flex items-center gap-6 absolute opacity-0 pointer-events-none"
                style={{
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
                }}
            >
                <div className="flex items-center text-xs sm:text-sm md:text-base font-array">
                    <span className="text-white/40">~/ </span>
                    <span className="text-white font-semibold">{nameText}</span>
                    {displayedPath && (
                        <>
                            <span className="text-white/40"> / </span>
                            <span className="text-white/70">{displayedPath}</span>
                        </>
                    )}
                    <span className="ml-1 inline-block h-4 w-2 bg-white" />
                </div>
                <div className="hidden md:flex items-center gap-2 text-xs sm:text-sm">
                    <div className="px-3 py-1.5 rounded-full">home()</div>
                    <div className="px-3 py-1.5 rounded-full">info.me()</div>
                    <div className="px-3 py-1.5 rounded-full">contact.me()</div>
                </div>
                <div className="md:hidden ml-auto">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
            </div>

            {/* Floating container - iOS-style glassmorphism */}
            <motion.div
                className="font-array backdrop-blur-2xl bg-black/30 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-full px-4 sm:px-6 py-2 flex items-center justify-between gap-6"
                style={{
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
                }}
                animate={{
                    width: navWidth
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeOut"
                }}
            >
                <div className="flex items-center text-xs sm:text-sm md:text-base font-array whitespace-nowrap">
                    <span className="text-white/40">~/ </span>

                    {/* Typing animation for "Anirudh" on initial load, clickable after */}
                    {isInitialLoad ? (
                        <div className="inline-flex">
                            {displayedName.split("").map((char, idx) => (
                                <span
                                    key={`name-${idx}`}
                                    className="text-dark-amethyst font-semibold"
                                    style={{
                                        opacity: 0,
                                        animation: `fadeIn 0.1s ease-out ${idx * 0.08}s forwards`
                                    }}
                                >
                                    {char}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <Link
                            href="/"
                            className="text-dark-amethyst font-semibold hover:text-frosted-mint transition-colors cursor-pointer"
                            onClick={() => setFileLocation(null)}
                        >
                            {nameText}
                        </Link>
                    )}

                    {displayedPath && displayedName === nameText && (
                        <span className="text-frosted-mint/70"> / </span>
                    )}

                    {/* Character-by-character typed path */}
                    {displayedName === nameText && displayedPath && (
                        <span className="text-frosted-mint/70">
                            {displayedPath}
                        </span>
                    )}

                    {/* Blinking cursor - only show after name is done */}
                    {displayedName && (
                        <span className="ml-1 inline-block h-4 w-2 bg-white animate-blink" />
                    )}
                </div>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap">
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.4 }}
                    >
                        <Link
                            href="#about"
                            className="px-3 py-1.5 rounded-full text-gray-300 hover:text-white hover:bg-frosted-mint/20 transition-colors"
                            onClick={() => setFileLocation("information")}
                        >
                            /information
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                    >
                        <Link
                            href="#contact"
                            className="px-3 py-1.5 rounded-full text-gray-300 hover:text-white hover:bg-frosted-mint/20 transition-colors"
                            onClick={() => setFileLocation("contact")}
                        >
                            /contact
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile menu button */}
                <motion.button
                    className="md:hidden ml-auto text-gray-300 hover:text-white transition-colors"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                >
                    <svg
                        className={`h-5 w-5 transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""
                            }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </motion.button>
            </motion.div>

            {/* Mobile dropdown under pill - iOS-style glassmorphism */}
            <motion.div
                className="md:hidden mt-2 overflow-hidden font-array items-center justify-center flex"
                initial={false}
                animate={{
                    height: isMenuOpen ? "auto" : 0,
                    opacity: isMenuOpen ? 1 : 0,
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
            >
                <div
                    className="px-3 py-2 backdrop-blur-2xl bg-black/30 rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] space-y-1"
                    style={{
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <Link
                        href="/"
                        className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-sm"
                        onClick={() => {
                            setFileLocation(null)
                            closeMenu()
                        }}
                    >
                        home()
                    </Link>
                    <Link
                        href="#about"
                        className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-sm"
                        onClick={() => {
                            setFileLocation("information")
                            closeMenu()
                        }}
                    >
                        info.me()
                    </Link>
                    <Link
                        href="#contact"
                        className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-sm"
                        onClick={() => {
                            setFileLocation("contact")
                            closeMenu()
                        }}
                    >
                        contact.me()
                    </Link>
                </div>
            </motion.div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </motion.nav>
    )
}