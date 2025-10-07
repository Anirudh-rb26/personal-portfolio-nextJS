
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import React, { useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SkillCard = ({ title, subtitle, items }: any) => {

    const cardRef = useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
        stiffness: 200,
        damping: 30
    })
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
        stiffness: 200,
        damping: 30
    })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const x = (e.clientX - centerX) / rect.width
        const y = (e.clientY - centerY) / rect.height

        mouseX.set(x)
        mouseY.set(y)
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
    }
    return (
        <motion.div
            ref={cardRef}
            className="rounded-xl border border-[#374151] p-4 relative overflow-hidden group"
            style={{
                perspective: 1000,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02 }}
        >
            {/* Internal glow */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: "radial-gradient(circle at 50% 50%, #72009C15, transparent 70%)"
                }}
            />

            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                style={{
                    background: "radial-gradient(circle at 50% 50%, #72009C30, transparent 70%)"
                }}
            />

            <div className="relative z-10">
                <div className="flex items-start justify-start text-start mb-4">
                    <span className="text-white text-start">{title}</span>
                </div>
                <h3 className="text-[#6B7280] mb-3">{subtitle}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {items?.map((item: string, index: number) => (
                        <motion.div
                            key={index}
                            className="flex items-center justify-center sm:justify-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                            <Check size={16} className="text-[#10B981] mr-2 flex-shrink-0" />
                            <span className="text-[#10B981]">{item}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default SkillCard