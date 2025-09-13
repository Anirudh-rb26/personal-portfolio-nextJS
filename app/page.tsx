"use client"

import { BackgroundGradient } from "@/components/ui/background-gradient";
import { TypingAnimation } from "@/components/ui/typing-animation";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

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
          <p className="text-white text-sm mb-2">Hello world! I am</p>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-2">Anirudh</h1>
          <div className="flex text-[#3B82F6] text-lg md:text-xl text-start items-center align-middle">
            <TypingAnimation
              className="text-[#72009C] text-xl md:text-2xl text-start items-center align-middle"
              text={typingText[index]}
              onComplete={() => setIsTypingComplete(true)}
            />
          </div>
        </div>

        {/* Code-style info block */}
        <BackgroundGradient className="w-full text-left overflow-x-auto p-14 rounded-xl bg-black">
          <pre className="text-white leading-relaxed text-sm md:text-base">
            <code>
              <span className="text-[#6B7280]">{"// User Description"}</span>
              <br />
              <span className="text-white">
                {"<p>I'm Anirudh Jayakumar — a software engineer who builds clean, efficient systems with a focus on real-world impact.</p>"}
                <br />
                {"<p>I care about design, performance, and solving the right problems — not chasing hype.</p>"}
                <br />
                {"<p>Currently exploring better ways to build, learn, and grow through code.</p>"}
              </span>
              <br />
              <br />
              <span className="text-[#6B7280]">{"// e-mail"}</span>
              <br />
              <span className="text-[#00CED1]">const</span> email ={" "}
              <span className="text-[#F97316]">
                <Link href="mailto:anirudhjayakumar.business@gmail.com">
                  &quot;anirudhjayakumar.business@gmail.com&quot;
                </Link>
              </span>
              <br />
              <br />
              <span className="text-[#6B7280]">{"// Github page"}</span>
              <br />
              <span className="text-[#00CED1]">const</span> githubLink ={" "}
              <span className="text-[#F97316]">
                <Link href={"https://github.com/Anirudh-rb26"}>&quot;https://github.com/Anirudh-rb26&quot;</Link>
              </span>;
              <br />
              <br />
              <span className="text-[#6B7280]">{"// X"}</span>
              <br />
              <span className="text-[#00CED1]">const</span> XPage ={" "}
              <span className="text-[#F97316]">
                <Link href={"https://x.com/anirudh_rb26"}>
                  &quot;https://x.com/anirudh_rb26&quot;
                </Link>
              </span>;
            </code>
          </pre>
        </BackgroundGradient>
      </main>
    </div>
  );
}
