
import React from 'react'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FileItem = ({ name, isActive, onClick }: any) => {
    return (
        <motion.div
            className={`flex items-center px-2 py-1 cursor-pointer relative overflow-hidden group ${isActive ? "bg-[#37373D]" : "hover:bg-[#2A2D2E]"
                }`}
            onClick={onClick}
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
        >
            {isActive && (
                <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#72009C]"
                    layoutId="activeFile"
                />
            )}
            <motion.div
                className="absolute inset-0 bg-[#72009C] opacity-0 group-hover:opacity-5"
            />
            <FileText size={16} className="text-[#75BEFF] mr-1 relative z-10" />
            <span className="text-[#CCCCCC] relative z-10">{name}</span>
        </motion.div>
    )
}

export default FileItem