import { motion, useSpring } from 'framer-motion';
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MouseBlob = ({ cursorX, cursorY }: { cursorX: any, cursorY: any }) => {
    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(cursorX, springConfig);
    const y = useSpring(cursorY, springConfig);
    return (
        <motion.div
            className="pointer-events-none fixed w-96 h-96 rounded-full opacity-20 blur-3xl z-0"
            style={{
                left: x,
                top: y,
                x: '-50%',
                y: '-50%',
                background: 'radial-gradient(circle, #72009C 0%, transparent 70%)',
            }}
        />
    )
}

export default MouseBlob