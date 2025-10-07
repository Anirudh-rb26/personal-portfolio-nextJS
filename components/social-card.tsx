import { useRef } from "react"
import { Link } from "@/app/contact/page"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

const SocialCard = ({ link, index }: { link: Link, index: number }) => {
    const cardRef = useRef<HTMLAnchorElement>(null)

    // Mouse position tracking
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth spring animations
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
        stiffness: 200,
        damping: 30
    })
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
        stiffness: 200,
        damping: 30
    })

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Normalize to -0.5 to 0.5
        const x = (e.clientX - centerX) / rect.width
        const y = (e.clientY - centerY) / rect.height

        mouseX.set(x)
        mouseY.set(y)
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <motion.a
            ref={cardRef}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block"
            style={{
                perspective: 1000
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.5 + index * 0.1,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="relative p-6 sm:p-8 rounded-2xl border border-gray-800 bg-black overflow-hidden"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
            >
                {/* Animated gradient background */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, ${link.color}15, transparent 70%)`
                    }}
                />

                {/* Glow effect on hover */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, ${link.color}30, transparent 70%)`
                    }}
                />

                {/* Content */}
                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                        <motion.div
                            initial={{ opacity: 0.6 }}
                            whileHover={{ opacity: 1 }}
                        >
                            <h3
                                className="text-2xl sm:text-3xl font-bold mb-1 transition-colors duration-300"
                                style={{
                                    color: link.color
                                }}
                            >
                                {link.name}
                            </h3>
                            <p className="text-gray-500 text-sm font-mono">
                                {link.handle}
                            </p>
                        </motion.div>

                        {/* Arrow icon with magnetic effect */}
                        <motion.div
                            className="text-gray-600 group-hover:text-white transition-colors duration-300"
                            initial={{ x: 0, y: 0 }}
                            whileHover={{ x: 4, y: -4 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </motion.div>
                    </div>

                    {/* Animated underline */}
                    <motion.div
                        className="h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{
                            scaleX: 1,
                            background: `linear-gradient(to right, transparent, ${link.color}50, transparent)`
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>

                {/* Corner accent */}
                <motion.div
                    className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle at 100% 100%, ${link.color}20, transparent 70%)`
                    }}
                />
            </motion.div>
        </motion.a>
    )
}

export default SocialCard;