"use client"

import { TypingAnimation } from "@/components/ui/typing-animation";
import { useEffect, useState, useRef } from "react";

const typingText = [
  'Full Stack Engineer',
  'Front‑end Developer',
  'Flutter Developer',
  'AI Engineer (in progress)',
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset typing state when text changes
  useEffect(() => {
    setIsTypingComplete(false);
  }, [index]);

  // Move to next text after current one completes
  useEffect(() => {
    if (isTypingComplete) {
      // Wait for 1.5 seconds after typing completes before changing
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
    <div className="flex flex-col min-h-screen font-mono text-base leading-relaxed">
      {/* Main content */}
      <main className="flex-1 flex flex-col items-start justify-center px-4 md:px-8 lg:px-16">
        {/* Hero section */}
        <div className="text-start mb-8 md:mb-16 w-full">
          <p className="text-[#9CA3AF] text-sm mb-2">Hello World. I am</p>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-2">Anirudh</h1>
          <div className="flex text-[#3B82F6] text-lg md:text-xl text-start">
            <span>&gt; </span>
            <TypingAnimation
              className="text-[#3B82F6] text-lg md:text-xl text-start"
              text={typingText[index]}
              onComplete={() => setIsTypingComplete(true)}
            />
          </div>
        </div>

        {/* Code-style info block */}
        <div className="w-full text-left overflow-x-auto">
          <pre className="text-white leading-relaxed text-sm md:text-base">
            <code>
              <span className="text-[#6B7280]">{"// User Description"}</span>
              <br />
              <span className="text-white">
                {"<p>I'm Anirudh — a software engineer who builds clean, efficient systems with a focus on real-world impact.</p>"}
                <br />
                {"<p>I care about design, performance, and solving the right problems — not chasing hype.</p>"}
                <br />
                {"<p>Currently exploring better ways to build, learn, and grow through code.</p>"}
              </span>
              <br />
              <br />
              <span className="text-[#6B7280]">{"// e-mail"}</span>
              <br />
              <span className="text-[#10B981]">const</span> email ={" "}
              <span className="text-[#F97316]">&quot;anirudhjayakumar.business@gmail.com&quot;</span>;
              <br />
              <br />
              <span className="text-[#6B7280]">{"// Github page"}</span>
              <br />
              <span className="text-[#10B981]">const</span> githubLink ={" "}
              <span className="text-[#F97316]">&quot;https://github.com/Anirudh-rb26&quot;</span>;
              <br />
              <br />
              <span className="text-[#6B7280]">{"// X"}</span>
              <br />
              <span className="text-[#10B981]">const</span> XPage ={" "}
              <span className="text-[#F97316]">&quot;https://x.com/anirudh_rb26&quot;</span>;
            </code>
          </pre>
        </div>
      </main>
    </div>
  );
}
