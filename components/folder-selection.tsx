import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight, Folder } from "lucide-react"

import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FolderSection = ({ title, isExpanded, onToggle, children }: any) => {
    return (
        <div className="py-1">
            <motion.div
                className="flex items-center px-2 py-1 cursor-pointer hover:bg-[#2A2D2E] relative overflow-hidden group"
                onClick={onToggle}
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                <motion.div
                    className="absolute inset-0 bg-[#72009C] opacity-0 group-hover:opacity-5"
                />
                <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <ChevronRight size={16} className="text-[#CCCCCC] mr-1" />
                </motion.div>
                <Folder size={16} className="text-[#E8AB53] mr-1" />
                <span className="text-[#CCCCCC] relative z-10">{title}</span>
            </motion.div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="ml-4 overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default FolderSection