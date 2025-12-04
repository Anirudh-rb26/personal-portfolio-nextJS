import React, { SetStateAction } from 'react'
import { motion, type Variants } from 'framer-motion'

interface FolderSVGProps {
    name: string;
    isOpen: boolean;
    paperVariants: Variants;
    containerVariants: Variants;
    frontFolderVariants: Variants;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const FolderSVG = ({ name, isOpen, paperVariants, containerVariants, frontFolderVariants, setIsOpen }: FolderSVGProps) => {
    return (
        <motion.div
            className="relative w-48 h-36 sm:w-56 sm:h-42 md:w-64 md:h-48 cursor-pointer"
            style={{ perspective: "1200px" }}
            initial="closed"
            whileHover="hover"
            animate={isOpen ? "open" : "closed"}
            onClick={() => setIsOpen(!isOpen)}
            variants={containerVariants}
        >
            {/* BACK PLATE - Tab on RIGHT */}
            <svg
                viewBox="0 0 100 85"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
                style={{ filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5))" }}
            >
                <defs>
                    <linearGradient id="backGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1e1e1e" />
                        <stop offset="100%" stopColor="#2a2a2a" />
                    </linearGradient>
                </defs>

                {/* Main body with tab on RIGHT side */}
                <path
                    d="M 5 20 L 55 20 L 60 15 C 62 12 65 10 70 10 L 92 10 C 97 10 100 13 100 18 L 100 80 C 100 82.5 97.5 85 92 85 L 8 85 C 2.5 85 0 82.5 0 80 L 0 25 C 0 22.5 2.5 20 5 20 Z"
                    fill="url(#backGrad)"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="0.5"
                />
            </svg>

            {/* PAPER INSERT */}
            <motion.div
                variants={paperVariants}
                className="absolute left-[10%] top-[28%] w-[80%] h-[58%] bg-white rounded shadow-lg flex flex-col p-2 sm:p-3 overflow-hidden"
            >
                <div className="w-4/5 h-0.5 bg-gray-300 rounded-full mb-1.5 sm:mb-2"></div>
                <div className="w-3/5 h-0.5 bg-gray-300 rounded-full mb-1.5 sm:mb-2"></div>
                <div className="w-full h-0.5 bg-gray-300 rounded-full mb-1.5 sm:mb-2"></div>
                <div className="w-2/3 h-0.5 bg-gray-300 rounded-full"></div>
            </motion.div>

            {/* FRONT PLATE */}
            <motion.div
                className="absolute inset-x-0 bottom-0 h-[68%] origin-bottom z-10"
                variants={frontFolderVariants}
                style={{ transformStyle: "preserve-3d" }}
            >
                <svg
                    viewBox="0 0 100 56"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                    style={{ filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))" }}
                >
                    <defs>
                        <linearGradient id="frontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3a3a3a" />
                            <stop offset="100%" stopColor="#2d2d2d" />
                        </linearGradient>
                    </defs>

                    <path
                        d="M 0 0 L 100 0 L 100 50 C 100 53 97 56 92 56 L 8 56 C 3 56 0 53 0 50 Z"
                        fill="url(#frontGrad)"
                        stroke="rgba(255, 255, 255, 0.15)"
                        strokeWidth="0.5"
                    />

                    {/* Top edge highlight */}
                    <path
                        d="M 0 0 L 100 0 L 100 1.5 L 0 1.5 Z"
                        fill="rgba(255, 255, 255, 0.2)"
                    />
                </svg>

                {/* Label */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.h3
                        className="text-white font-medium tracking-wide text-xs sm:text-sm select-none"
                        style={{
                            textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
                            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                        }}
                        initial={{ y: 8 }}
                        whileHover={{ y: 6 }}
                    >
                        {name}
                    </motion.h3>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default FolderSVG