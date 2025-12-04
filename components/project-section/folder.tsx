"use client"

import FolderSVG from "./folder-svg"
import React, { useEffect, useState } from "react"
import ExpandedCard from "./expanded-card"
import { motion, AnimatePresence, type Variants } from "framer-motion"

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================
interface FolderCardProps {
    name: string
    description: string
    techstack: string[]
    github?: string
    deployment?: string
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export const FolderCard: React.FC<FolderCardProps> = ({
    name,
    description,
    techstack,
    github,
    deployment,
}) => {
    const [isOpen, setIsOpen] = useState(false)

    // Notify parent carousel to pause when card is opened or hovered
    useEffect(() => {
        const handlePause = (e: Event) => e.stopPropagation()
        if (isOpen) {
            document.body.style.overflow = 'hidden' // Prevent background scroll
            window.addEventListener('wheel', handlePause, { passive: false })
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
            window.removeEventListener('wheel', handlePause)
        }
    }, [isOpen])

    // ========================================================================
    // ANIMATIONS
    // ========================================================================

    // The generic container for the folder
    const containerVariants: Variants = {
        closed: { scale: 1 },
        open: { scale: 1.1, opacity: 0, transition: { duration: 0.3 } }, // Fades out as card expands
    }

    // The "Front Cover" of the folder (the part that swings open)
    const frontFolderVariants: Variants = {
        closed: {
            rotateX: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        },
        hover: {
            rotateX: -15, // Slight peek on hover
            transition: { duration: 0.3 }
        },
        open: {
            rotateX: -120, // Swings wide open
            opacity: 0,
            transition: { duration: 0.4 }
        },
    }

    // The "Paper" inside the folder (slides up on hover)
    const paperVariants: Variants = {
        closed: { y: 0 },
        hover: { y: -15, transition: { duration: 0.3 } },
        open: { y: 0, opacity: 0, transition: { duration: 0.2 } },
    }

    // Expanded Card (MacOS Window)
    const expandedCardVariants: Variants = {
        closed: {
            opacity: 0,
            y: 40,
            scale: 0.95,
            transition: { duration: 0.2 },
        },
        open: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.4, ease: "easeOut", delay: 0.2 },
        },
    }

    // Staggered Tech Stack
    const techStackContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.2 },
        },
    }

    const techStackItemVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    }

    return (
        <div className="relative w-full max-w-[300px] h-[200px] mx-auto flex items-center justify-center">

            {/* ====================================================================
          SVG FOLDER ICON
          ==================================================================== */}
            <FolderSVG
                name={name}
                isOpen={isOpen}
                paperVariants={paperVariants}
                containerVariants={containerVariants}
                frontFolderVariants={frontFolderVariants}
                setIsOpen={setIsOpen}
            />
            {/* ====================================================================
          EXPANDED CARD (Same as before, slight tweaks)
          ==================================================================== */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />

                        {/* Card Container */}
                        <ExpandedCard
                            name={name}
                            github={github}
                            setIsOpen={setIsOpen}
                            techstack={techstack}
                            deployment={deployment}
                            description={description}
                            expandedCardVariants={expandedCardVariants}
                            techStackItemVariants={techStackItemVariants}
                            techStackContainerVariants={techStackContainerVariants}
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default FolderCard
