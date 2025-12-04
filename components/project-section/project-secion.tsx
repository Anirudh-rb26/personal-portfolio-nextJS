"use client"

import Folder from "./folder"
import { ShootingStars } from "../ui/shooting-stars"
import { StarsBackground } from "../ui/stars-background"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const projects = [
    {
        name: "Canvas",
        description:
            "Built a live React component editor enabling users to paste component snippets (with local state management via useState), render components in isolated iFrames, and edit visually via element selection. Live code generation with syntax updates.",
        techstack: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Node.js", "Framer Motion", "Supabase"],
        github: "https://canvas-dun-one.vercel.app/",
        deployment: "https://canvas-dun-one.vercel.app/",
    },
    {
        name: "Qpi Ai Pro",
        description: "Qpi AI Pro's landing site.",
        techstack: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Node.js", "Framer Motion"],
        link: "https://qpiai-pro.tech",
    },
    {
        name: "Review Co-Pilot",
        description: "AI-powered review analytics platform using FastAPI and Next.js — leveraging NLTK sentiment analysis, TF-IDF similarity search, and Gemini LLM responses.",
        techstack: ["Next.js", "Tailwind CSS", "TypeScript", "React", "FastAPI", "Scikit", "NLTK", "Gemini"],
        link: "https://review-copilot-frontend.vercel.app/",
    },
    {
        name: "Convoflow",
        description: "Real-time AI chat system that combines LiveKit's real-time communication capabilities with memory-enhanced contextual conversations using Mem0.",
        techstack: ["Next.js", "Tailwind CSS", "TypeScript", "React", "FastAPI", "LiveKit", "Mem0", "Gemini"],
        link: "https://github.com/Anirudh-rb26/ConvoFlow",
    },
    {
        name: "AI Interview Bot",
        description: "An intelligent interviewing platform that conducts automated interviews based on resumes and job descriptions.",
        techstack: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Node.js", "Google AI Studio", "Supabase"],
        link: "https://github.com/Anirudh-rb26/ai-interviewer",
    },
    {
        name: "Interview Question Generator",
        description: "AI-powered tool that generates customized interview questions based on job role, description, and experience level",
        techstack: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Node.js", "Google AI Studio"],
        link: "https://interview-question-generator-five.vercel.app/",
    },
    {
        name: "DepthText",
        description: "Computer vision app that adds text behind subjects in images using Mobile-SAM for segmentation",
        techstack: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Node.js", "Mobile-SAM", "ONNX"],
        link: "In Progress",
    },
    {
        name: "Airbnb Clone",
        description: "Full-stack Airbnb clone with property listings, booking, and user authentication",
        techstack: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Node.js", "Supabase", "Prisma", "Kinde"],
        link: "https://airbnb-clone-3h68.vercel.app/",
    },
    {
        name: "Zoom Clone",
        description: "Video conferencing application with real-time communication features",
        techstack: ["React", "WebRTC", "Socket.io"],
        link: "https://zoom-clone-ike9.vercel.app/",
    },
]

const pageVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
        },
    },
    exit: (direction: number) => ({
        x: direction > 0 ? "-100%" : "100%",
        opacity: 0,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
        },
    }),
}

export default function ProjectGrid() {
    const [page, setPage] = useState(0)
    const [direction, setDirection] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(6)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setItemsPerPage(4)
            } else {
                setItemsPerPage(6)
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const totalPages = Math.ceil(projects.length / itemsPerPage)

    const goToPage = (newPage: number, dir: number) => {
        setDirection(dir)
        const wrapped = ((newPage % totalPages) + totalPages) % totalPages
        setPage(wrapped)
    }

    const handleNext = () => goToPage(page + 1, 1)
    const handlePrev = () => goToPage(page - 1, -1)

    const startIndex = page * itemsPerPage
    const currentSlice = projects.slice(startIndex, startIndex + itemsPerPage)

    const currentPageItems =
        currentSlice.length === itemsPerPage
            ? currentSlice
            : [...currentSlice, ...Array(itemsPerPage - currentSlice.length).fill(null)]

    useEffect(() => {
        setPage(0)
    }, [itemsPerPage])

    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 lg:px-16 xl:px-24 py-20">
            <div className="absolute inset-0 -z-10 bg-black">
                <StarsBackground />
                <ShootingStars />
            </div>

            <motion.div
                className="text-center relative z-10 mb-12 lg:mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white font-array">
                    Project
                    <span className="text-[#ec48a0] font-melodrama italic"> Showcase</span>
                </h2>
            </motion.div>

            <div className="w-full max-w-[1800px] relative z-10">
                <div className="relative w-full h-[600px] sm:h-[700px] lg:h-[520px]">
                    {/* Left Navigation - Overlay Style */}
                    <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20">
                        <NavButton onClick={handlePrev} icon="←" />
                    </div>

                    {/* Right Navigation - Overlay Style */}
                    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20">
                        <NavButton onClick={handleNext} icon="→" />
                    </div>

                    {/* Bottom Center Indicators - Overlay Style */}
                    <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 items-center gap-3 px-6 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <motion.button
                                key={i}
                                onClick={() => {
                                    setDirection(i > page ? 1 : -1)
                                    setPage(i)
                                }}
                                className="h-2 rounded-full transition-colors hover:bg-white/40"
                                animate={{
                                    width: page === i ? 32 : 8,
                                    backgroundColor: page === i ? "#ec48a0" : "rgba(255,255,255,0.3)",
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            />
                        ))}
                    </div>

                    {/* Grid */}
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={page}
                            custom={direction}
                            variants={pageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute inset-0"
                        >
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 h-full">
                                {currentPageItems.map((project, index) => {
                                    if (!project) {
                                        return <div key={`empty-${index}`} className="invisible" />
                                    }
                                    return (
                                        <motion.div
                                            key={project.name}
                                            className="w-full h-full"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            style={{ zIndex: 1 }}
                                            whileHover={{ zIndex: 10 }}
                                        >
                                            <Folder
                                                name={project.name}
                                                description={project.description}
                                                techstack={project.techstack}
                                                github={project.github || project.link}
                                                deployment={project.deployment || project.link}
                                            />
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Mobile Navigation - Below Grid */}
                <div className="lg:hidden flex items-center justify-between w-full mt-8">
                    <NavButton onClick={handlePrev} icon="←" />

                    <div className="flex items-center gap-3">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <motion.button
                                key={i}
                                onClick={() => {
                                    setDirection(i > page ? 1 : -1)
                                    setPage(i)
                                }}
                                className="h-2 rounded-full transition-colors hover:bg-white/40"
                                animate={{
                                    width: page === i ? 24 : 6,
                                    backgroundColor: page === i ? "#ec48a0" : "rgba(255,255,255,0.2)",
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            />
                        ))}
                    </div>

                    <NavButton onClick={handleNext} icon="→" />
                </div>
            </div>
        </section>
    )
}

function NavButton({ onClick, icon }: { onClick: () => void; icon: string }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="h-14 w-14 rounded-full bg-white/10 border border-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-colors flex items-center justify-center text-xl shadow-lg shadow-black/20"
        >
            {icon}
        </motion.button>
    )
}