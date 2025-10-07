"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function TypingAnimation({ text, onComplete }: { text: string, onComplete: () => void }) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    setDisplayedText("");
    setI(0);
  }, [text]);

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        setI(i + 1);
      } else {
        clearInterval(typingEffect);
        if (onComplete) {
          onComplete();
        }
      }
    }, 100);

    return () => {
      clearInterval(typingEffect);
    };
  }, [i, text, onComplete]);

  return (
    <div className="relative">
      {/* Subtle glow effect behind text */}
      <motion.div
        className="absolute inset-0 blur-xl opacity-30"
        animate={{
          background: [
            "radial-gradient(circle, #72009C00 0%, #72009C00 100%)",
            "radial-gradient(circle, #72009C60 0%, #72009C00 70%)",
            "radial-gradient(circle, #72009C00 0%, #72009C00 100%)",
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold relative z-10">
        {displayedText.split("").map((char, index) => (
          <motion.span
            key={`${text}-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="text-[#72009C]"
          >
            {char}
          </motion.span>
        ))}

        {/* Cursor */}
        <motion.span
          className="relative inline-block ml-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <span className="relative inline-block w-[2px] h-4 sm:h-5 md:h-6 lg:h-7 bg-[#72009C]" />
        </motion.span>
      </div>
    </div>
  );
}