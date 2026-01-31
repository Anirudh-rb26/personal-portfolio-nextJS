"use client"

import { createPortal } from 'react-dom'
import { motion, Variants } from 'framer-motion'
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
        // Optional: Lock body scroll when modal is open
        if (typeof document !== 'undefined') {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            if (typeof document !== 'undefined') {
                document.body.style.overflow = 'unset';
            }
        };
    }, []);

    if (!mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 h-[100dvh] w-screen">

            {/* --- Dark Cinematic Backdrop --- */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-[#050505]/80 backdrop-blur-md cursor-pointer"
            />

            <motion.div
                variants={expandedCardVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
                className="group relative w-full max-w-4xl overflow-hidden bg-[#111] text-[#f0f0f0] shadow-2xl flex flex-col md:flex-row"
                style={{
                    borderRadius: '32px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    // Mobile: 85% of dynamic viewport height to avoid address bar issues
                    // Desktop: Fixed height for the cinematic look
                    height: 'var(--height-mobile, 85dvh)',
                }}
            >
                {/* CSS Variable injection for responsive height handling in Tailwind arbitrary values */}
                <style jsx>{`
                    @media (min-width: 768px) {
                        .group { --height-mobile: 600px; }
                    }
                `}</style>

                {/* --- Ambient Glow Effect --- */}
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-900/20 blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-900/50 blur-[80px] pointer-events-none" />

                {/* --- Close Button --- */}
                <Button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full border border-white/10 bg-black/20 hover:bg-white text-white hover:text-black transition-colors duration-300 z-50 backdrop-blur-sm cursor-pointer"
                >
                    <X size={20} />
                </Button>

                {/* --- Content Wrapper --- */}
                <div className="relative z-10 flex flex-col md:flex-row w-full h-full">

                    {/* Left Col: Title & Texture */}
                    {/* On mobile, this is the top header. flex-shrink-0 ensures it doesn't collapse. */}
                    <div className="relative w-full md:w-5/12 p-6 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent flex-shrink-0">

                        {/* Top Meta & Title */}
                        <div>
                            {/* Meta Header */}
                            <div className="flex items-center space-x-2 opacity-50 mb-4 md:mb-0">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-[10px] font-mono uppercase tracking-widest">Project Details</span>
                            </div>

                            {/* Massive Title */}
                            {/* Added pr-12 on mobile to prevent overlap with Close button */}
                            <div className="mt-2 md:mt-8 pr-12 md:pr-0">
                                <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif italic font-light tracking-tight leading-[0.95] md:leading-[0.9] text-white/90 break-words">
                                    {name}
                                </h2>
                            </div>
                        </div>

                        {/* Tech Stack - Vertical List (Desktop Only) */}
                        <div className="hidden md:block mt-auto">
                            <p className="text-[10px] font-mono uppercase tracking-widest opacity-40 mb-4">Technologies</p>
                            <div className="flex flex-wrap gap-2">
                                {techstack.slice(0, 5).map((tech) => (
                                    <span key={tech} className="text-xs border border-white/10 px-3 py-1 rounded-full text-white/60 font-sans">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Description & Actions */}
                    {/* On mobile, this takes remaining height and scrolls internally */}
                    <div className="w-full md:w-7/12 flex flex-col relative h-full min-h-0">

                        {/* Scrollable Container */}
                        <div className="flex-grow overflow-y-auto custom-scrollbar p-6 md:p-10">

                            {/* Mobile Tech Stack (Visible only on small screens) */}
                            <div className="md:hidden flex flex-wrap gap-2 mb-6">
                                {techstack.map((tech) => (
                                    <span key={tech} className="text-[10px] uppercase tracking-wider border border-white/10 px-2 py-1 rounded-sm text-white/60">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <p className="text-base md:text-xl font-light leading-relaxed text-white/80 font-sans">
                                {description}
                            </p>

                            <div className="mt-8 md:mt-12 space-y-4 md:space-y-6 pb-8">
                                {deployment && (
                                    <a
                                        href={deployment}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block group/link"
                                    >
                                        <div className="flex items-center justify-between border-b border-white/10 pb-4 hover:border-white/40 transition-colors duration-500">
                                            <span className="text-xl md:text-2xl font-serif italic text-white/90 group-hover/link:translate-x-2 transition-transform duration-500">
                                                Live Deployment
                                            </span>
                                            <ArrowUpRight className="text-white/40 group-hover/link:rotate-45 transition-transform duration-500" />
                                        </div>
                                    </a>
                                )}

                                {github && (
                                    <a
                                        href={github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block group/link"
                                    >
                                        <div className="flex items-center justify-between border-b border-white/10 pb-4 hover:border-white/40 transition-colors duration-500">
                                            <span className="text-xl md:text-2xl font-serif italic text-white/90 group-hover/link:translate-x-2 transition-transform duration-500">
                                                Github Repository
                                            </span>
                                            <Github className="text-white/40 group-hover/link:text-white transition-colors duration-500" />
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Footer Numbering decoration (Fixed at bottom right of container) */}
                        <div className="p-6 md:p-10 pt-0 mt-auto flex justify-between items-end opacity-20 flex-shrink-0">
                            <div className="font-mono text-xs">{projectType}</div>
                            <div className="text-5xl md:text-6xl font-sans font-bold leading-none tracking-tighter">{index}</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>,
        document.body
    )
}

export default ExpandedCard