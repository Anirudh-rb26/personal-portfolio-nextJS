"use client"

import React, { SetStateAction, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, Variants } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link';

interface ExpandedCardProps {
    name: string;
    github?: string;
    deployment?: string;
    techstack: string[];
    description: string;
    expandedCardVariants: Variants;
    techStackContainerVariants: Variants;
    techStackItemVariants: Variants;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

const ExpandedCard = ({
    name,
    github,
    deployment,
    techstack,
    description,
    expandedCardVariants,
    techStackContainerVariants,
    techStackItemVariants,
    setIsOpen
}: ExpandedCardProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // You can move the body scroll lock here if you prefer, 
        // but keeping it in Folder.tsx is also fine.
    }, []);

    // Don't render anything on the server or before mounting
    if (!mounted) return null;

    // Portal moves this HTML to the <body> tag, outside the grid's stacking context
    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">

            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
                variants={expandedCardVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="relative w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl bg-[#0a0a0a] border border-frosted-mint/20 rounded-2xl shadow-2xl overflow-hidden z-10"
            >
                {/* Mac Header */}
                <div className="h-8 sm:h-10 bg-[#1a1a1a] border-b border-white/5 flex items-center px-3 sm:px-4 space-x-2">
                    <div onClick={() => setIsOpen(false)} className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56] cursor-pointer hover:brightness-110" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F]" />
                    <div className="ml-auto text-[9px] sm:text-[10px] text-white/30 font-mono truncate max-w-[120px] sm:max-w-none">{name} ~ project-view</div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 md:p-8 max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] overflow-y-auto">
                    <h2 className="text-xl sm:text-2xl font-clash font-bold text-white mb-2">{name}</h2>
                    <p className="text-sm sm:text-base text-white/70 font-satoshi leading-relaxed mb-4 sm:mb-6">{description}</p>

                    {/* Tech Stack */}
                    <div className="mb-4 sm:mb-6">
                        <h4 className="text-[10px] sm:text-xs font-mono text-frosted-mint mb-2 sm:mb-3 uppercase tracking-wider">Tech Stack</h4>
                        <motion.div
                            variants={techStackContainerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-wrap gap-1.5 sm:gap-2"
                        >
                            {techstack.map((tech) => (
                                <motion.span
                                    key={tech}
                                    variants={techStackItemVariants}
                                    className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs text-white/80 font-array"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-white/5">
                        {github && (
                            <Link href={github} target="_blank" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                                <Github size={14} className="sm:w-4 sm:h-4" /> Code
                            </Link>
                        )}
                        {deployment && (
                            <Link href={deployment} target="_blank" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-frosted-mint/80 hover:text-frosted-mint transition-colors">
                                <ExternalLink size={14} className="sm:w-4 sm:h-4" /> Live Demo
                            </Link>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>,
        document.body // Target container
    )
}

export default ExpandedCard
