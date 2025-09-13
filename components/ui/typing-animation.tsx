"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
  cursorClassName?: string;
  onComplete?: () => void;
}

export function TypingAnimation({
  text,
  duration = 200,
  className,
  cursorClassName,
  onComplete,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    // Reset when text changes
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
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [duration, i, text, onComplete]);

  // Split the displayed text into characters for individual animation
  const characters = displayedText.split("").map((char, index) => (
    <motion.span
      key={`char-${index}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.1,
        ease: "easeInOut"
      }}
      className={cn("dark:text-white text-black", className)}
    >
      {char}
    </motion.span>
  ));

  return (
    <div
      className={"text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center"}
    >
      <span className="">
        {characters}
      </span>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[2px] h-2 md:h-4 lg:h-6 bg-[#3B82F6] ml-1",
          cursorClassName
        )}
      />
    </div>
  );
}