"use client"

import FolderSVG from "./folder-svg"
import ExpandedCard from "./expanded-card"
import React, { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, type Variants, useMotionValue } from "framer-motion"

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================
interface FolderCardProps {
    name: string;
    type: string;
    index: string;
    github?: string;
    privacy: string;
    version: string;
    description: string;
    techstack: string[];
    deployment?: string;
    projectType: string;
}

export const FolderCard: React.FC<FolderCardProps> = ({
    name,
    type,
    index,
    github,
    version,
    privacy,
    techstack,
    deployment,
    description,
    projectType,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // ========================================================================
    // 3D TILT LOGIC
    // ========================================================================
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    // ========================================================================
    // LOCK SCROLL ON OPEN
    // ========================================================================
    useEffect(() => {
        const handlePause = (e: Event) => e.stopPropagation()
        if (isOpen) {
            document.body.style.overflow = "hidden"
            window.addEventListener("wheel", handlePause, { passive: false })
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
            window.removeEventListener("wheel", handlePause)
        }
    }, [isOpen])

    // ========================================================================
    // ANIMATION VARIANTS
    // ========================================================================

    const containerVariants: Variants = {
        closed: { scale: 1, zIndex: 0 },
        hover: { scale: 1.05, zIndex: 10 },
        open: { scale: 1.2, opacity: 0, transition: { duration: 0.4 } },
    }

    const frontFolderVariants: Variants = {
        closed: { rotateX: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
        hover: { rotateX: -20, transition: { duration: 0.3 } },
        open: {
            rotateX: -140,
            opacity: 0,
            transition: { duration: 0.4, ease: "easeIn" }
        },
    }

    const paperVariants: Variants = {
        closed: { y: 0, scale: 1 },
        hover: { y: -30, scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 20 } },
        open: {
            y: -100,
            scale: 1.5,
            opacity: 0,
            transition: { duration: 0.4, ease: "easeIn" }
        },
    }

    // Expanded Card Animation (Pop up from bottom)
    const expandedCardVariants: Variants = {
        closed: { opacity: 0, scale: 0.8, y: 50, rotateX: 20 },
        open: {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            transition: { duration: 0.5, type: "spring", stiffness: 200, damping: 25 },
        },
        exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.3 } },
    }

    // Tech stack stagger
    const techStackContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
    }

    const techStackItemVariants: Variants = {
        hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4 } },
    }

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[300px] h-[200px] mx-auto flex items-center justify-center perspective-1000"
            style={{ perspective: "1000px" }}
        >
            <FolderSVG
                name={name}
                isOpen={isOpen}
                type={type}
                version={version}
                privacy={privacy}
                paperVariants={paperVariants}
                containerVariants={containerVariants}
                frontFolderVariants={frontFolderVariants}
                setIsOpen={setIsOpen}
            />

            {/* ====================================================================
          EXPANDED CARD OVERLAY
      ==================================================================== */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop with Blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
                            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                        />

                        {/* Card Container - Fixed to Viewport Center */}
                        <div className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none p-4 sm:p-8">
                            <div className="pointer-events-auto w-full max-w-2xl">
                                <ExpandedCard
                                    name={name}
                                    index={index}
                                    github={github}
                                    setIsOpen={setIsOpen}
                                    techstack={techstack}
                                    deployment={deployment}
                                    projectType={projectType}
                                    description={description}
                                    expandedCardVariants={expandedCardVariants}
                                    techStackItemVariants={techStackItemVariants}
                                    techStackContainerVariants={techStackContainerVariants}
                                />
                            </div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default FolderCard