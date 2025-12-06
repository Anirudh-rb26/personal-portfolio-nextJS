"use client"

import { createPortal } from 'react-dom'
import { motion, Variants } from 'framer-motion'
import { LinkPreview } from '../ui/link-preview'
import { ArrowUpRight, Github, X } from 'lucide-react'
import React, { SetStateAction, useEffect, useState } from 'react'
import { Button } from '../ui/button'

interface ExpandedCardProps {
    name: string;
    index: string;
    github?: string;
    deployment?: string;
    techstack: string[];
    description: string;
    projectType: string;
    expandedCardVariants: Variants;
    techStackItemVariants?: Variants;
    techStackContainerVariants?: Variants;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

const ExpandedCard = ({
    name,
    index,
    github,
    techstack,
    setIsOpen,
    deployment,
    projectType,
    description,
    expandedCardVariants,
}: ExpandedCardProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 sm:px-8">

            {/* --- Dark Cinematic Backdrop --- */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-[#050505]/80 backdrop-blur-md"
            />

            <motion.div
                variants={expandedCardVariants}
                initial="closed"
                animate="open"
                exit="closed"

                className="group relative w-full max-w-4xl overflow-hidden bg-[#111] text-[#f0f0f0] shadow-2xl"
                style={{
                    borderRadius: '32px',
                    border: '1px solid rgba(255,255,255,0.08)'
                }}
            >

                {/* --- Ambient Glow Effect --- */}
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-dark-amethyst/20 blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-baltic-blue/50 blur-[80px] pointer-events-none" />
                <Button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full border border-white/10 hover:bg-white text-white hover:text-black transition-colors duration-300 z-50">
                    <X size={20} />
                </Button>

                {/* --- Content Wrapper --- */}
                <div className="relative z-10 flex flex-col md:flex-row h-auto md:h-[600px]">

                    {/* Left Col: Title & Texture */}
                    <div className="relative w-full md:w-5/12 p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">

                        {/* Meta Header */}
                        <div className="flex items-center space-x-2 opacity-50">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-[10px] font-mono uppercase tracking-widest">Project Details</span>
                        </div>

                        {/* Massive Title */}
                        <div className="mt-8 md:mt-0">
                            <h2 className="text-5xl md:text-7xl font-serif italic font-light tracking-tight leading-[0.9] text-white/90">
                                {name}
                            </h2>
                        </div>

                        {/* Tech Stack - Vertical List for Style */}
                        <div className="hidden md:block">
                            <p className="text-[10px] font-mono uppercase tracking-widest opacity-40 mb-4">Technologies</p>
                            <div className="flex flex-wrap gap-2">
                                {techstack.slice(0, 5).map((tech) => (
                                    <span key={tech} className="text-xs border border-white/10 px-3 py-1 rounded-full text-white/60 font-clash">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Description & Actions */}
                    <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col relative">

                        <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
                            {/* Mobile Tech Stack (Visible only on small screens) */}
                            <div className="md:hidden flex flex-wrap gap-2 mb-8">
                                {techstack.map((tech) => (
                                    <span key={tech} className="text-[10px] uppercase tracking-wider border border-white/10 px-2 py-1 rounded-sm text-white/60">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <p className="text-lg md:text-xl font-light leading-relaxed text-white/80 font-satoshi">
                                {description}
                            </p>

                            <div className="mt-12 space-y-6">
                                {deployment && (
                                    <LinkPreview url={deployment} className="block group/link">
                                        <div className="flex items-center justify-between border-b border-white/10 pb-4 hover:border-white/40 transition-colors duration-500">
                                            <span className="text-2xl font-melodrama italic text-white/90 group-hover/link:translate-x-2 transition-transform duration-500">
                                                Live Deployment
                                            </span>
                                            <ArrowUpRight className="text-white/40 group-hover/link:rotate-45 transition-transform duration-500" />
                                        </div>
                                    </LinkPreview>
                                )}

                                {github && (
                                    <LinkPreview url={github} className="block group/link">
                                        <div className="flex items-center justify-between border-b border-white/10 pb-4 hover:border-white/40 transition-colors duration-500">
                                            <span className="text-2xl font-melodrama italic text-white/90 group-hover/link:translate-x-2 transition-transform duration-500">
                                                Github Repository
                                            </span>
                                            <Github className="text-white/40 group-hover/link:text-white transition-colors duration-500" />
                                        </div>
                                    </LinkPreview>
                                )}
                            </div>
                        </div>

                        {/* Footer Numbering decoration */}
                        <div className="mt-auto pt-8 flex justify-between items-end opacity-20">
                            <div className="font-jetbrains text-xs">{projectType}</div>
                            <div className="text-6xl font-clash font-bold leading-none tracking-tighter">{index}</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>,
        document.body
    )
}

export default ExpandedCard