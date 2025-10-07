"use client"

import TiltCard from "@/components/tilt-card";
import MouseBlob from "@/components/mouse-blob";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion"
import { TypingAnimation } from "@/components/ui/typing-animation";

const typingText = [
  '>A Full Stack Engineer',
  '>A Frontend Developer',
  '>A Flutter Developer',
  '>An AI Engineer (in progress)',
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mouse position for global cursor effect
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  // Reset typing state when text changes
  useEffect(() => {
    setIsTypingComplete(false);
  }, [index]);

  // Move to next text after current one completes
  useEffect(() => {
    if (isTypingComplete) {
      timeoutRef.current = setTimeout(() => {
        setIndex((i) => (i + 1) % typingText.length);
      }, 1500);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isTypingComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0 }}
    >
      {/* Global cursor blob */}
      <MouseBlob cursorX={cursorX} cursorY={cursorY} />

      <div className="flex flex-col min-h-screen w-full font-mono text-base leading-relaxed overflow-x-hidden">
        {/* Main content */}
        <main className="flex-1 flex flex-col items-start justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 w-full max-w-full">
          {/* Hero section */}
          <div className="text-start mb-6 sm:mb-8 md:mb-16 w-full">
            <motion.p
              className="text-white text-xs sm:text-sm mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hello world! I am
            </motion.p>

            <motion.h1
              className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Anirudh
            </motion.h1>

            <div className="flex text-base sm:text-lg md:text-xl lg:text-2xl text-start items-center align-middle">
              <TypingAnimation
                text={typingText[index]}
                onComplete={() => setIsTypingComplete(true)}
              />
            </div>
          </div>

          {/* Code-style info block with subtle parallax */}
          <TiltCard />
        </main>
      </div>
    </motion.div>
  );
};