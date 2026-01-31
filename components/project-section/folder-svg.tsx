import React, { SetStateAction } from "react"
import { motion, type Variants } from "framer-motion"

interface FolderSVGProps {
    name: string;
    type: string;
    isOpen: boolean;
    privacy: string;
    version: string;
    paperVariants: Variants;
    containerVariants: Variants;
    frontFolderVariants: Variants;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const FolderSVG = ({
    name,
    type,
    isOpen,
    version,
    privacy,
    setIsOpen,
    paperVariants,
    containerVariants,
    frontFolderVariants,
}: FolderSVGProps) => {
    return (
        <motion.div
            className="relative w-full h-full cursor-pointer group"
            style={{ perspective: "1000px" }}
            initial="closed"
            whileHover="hover"
            animate={isOpen ? "open" : "closed"}
            onClick={() => setIsOpen(!isOpen)}
            variants={containerVariants}
        >

            {/* =======================================
          BACK PLATE (The darker back part)
      ======================================== */}
            <motion.svg
                viewBox="0 0 100 85"
                className="absolute inset-0 w-full h-full drop-shadow-2xl"
                preserveAspectRatio="none"
            >
                <path
                    d="M 5 20 L 55 20 L 60 15 C 62 12 65 10 70 10 L 92 10 C 97 10 100 13 100 18 L 100 80 C 100 82.5 97.5 85 92 85 L 8 85 C 2.5 85 0 82.5 0 80 L 0 25 C 0 22.5 2.5 20 5 20 Z"
                    fill="url(#folderGradient)"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="0.5"
                />
            </motion.svg>

            {/* =======================================
          PAPER INSERT (The "Holographic" Card)
      ======================================== */}
            <motion.div
                variants={paperVariants}
                className="absolute left-[8%] top-[25%] w-[84%] h-[60%] rounded-md border border-white/20 overflow-hidden flex flex-col items-start justify-start p-3 shadow-[0_0_15px_rgba(114,0,156,0.3)] bg-black/80"
            >
                {/* Holographic Mesh Gradient */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_#72009c_0%,_transparent_70%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-shine" />

                {/* Pseudo-Code Lines */}
                <div className="w-12 h-1 bg-white/20 rounded-full mb-2" />
                <div className="space-y-1.5 w-full opacity-60">
                    <div className="w-full h-[2px] bg-gradient-to-r from-purple-500/50 to-transparent" />
                    <div className="w-3/4 h-[2px] bg-gradient-to-r from-purple-500/30 to-transparent" />
                    <div className="w-1/2 h-[2px] bg-gradient-to-r from-purple-500/20 to-transparent" />
                </div>

                {/* Tiny Project Badge */}
                <div className="mt-auto self-end px-1.5 py-0.5 border border-white/10 rounded text-[6px] text-white/40 font-mono tracking-widest uppercase">
                    {privacy}
                </div>
            </motion.div>

            {/* =======================================
          FRONT PLATE (The flap that opens)
      ======================================== */}
            <motion.div
                className="absolute inset-x-0 bottom-0 h-[68%] origin-bottom z-20 bg-black/80"
                variants={frontFolderVariants}
                style={{ transformStyle: "preserve-3d" }}
            >
                <svg
                    viewBox="0 0 100 56"
                    className="w-full h-full drop-shadow-lg"
                    preserveAspectRatio="none"
                >
                    {/* Main Shape */}
                    <path
                        d="M 0 0 L 100 0 L 100 50 C 100 53 97 56 92 56 L 8 56 C 3 56 0 53 0 50 Z"
                        fill="url(#folderGradient)"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="0.5"
                    />
                    {/* Noise Overlay */}

                    {/* Top Edge Highlight (Rim Light) */}
                    <path d="M 0 0 L 100 0" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                </svg>

                {/* =======================================
            LABEL / CONTENT ON FRONT
        ======================================== */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    {/* Decorative decorative industrial lines */}
                    <div className="absolute top-3 w-full flex justify-between px-4 opacity-30">
                        <span className="text-[6px] font-mono text-white tracking-widest">+ {version}</span>
                        <span className="text-[6px] font-mono text-white tracking-widest">{type}</span>
                    </div>

                    <motion.h3
                        className="text-white text-center font-bold tracking-tight relative z-10 mix-blend-overlay font-clash "
                        style={{
                            fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
                            textShadow: "0 4px 12px rgba(0,0,0,0.5)",
                        }}
                        layoutId={`title-${name}`}
                    >
                        {name}
                    </motion.h3>

                    {/* Animated Underline */}
                    <motion.div
                        className="mt-2 h-[2px] bg-gradient-to-r from-transparent via-[#ec48a0] to-transparent w-0"
                        whileHover={{ width: "50%" }}
                        transition={{ duration: 0.4 }}
                    />
                </div>
            </motion.div>
        </motion.div>
    )
}

export default FolderSVG