"use client"


import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';

const TiltCard = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const cardRef = useRef<HTMLDivElement>(null);

    // Reduced rotation from 5 to 2 degrees
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), {
        stiffness: 150,
        damping: 30
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), {
        stiffness: 150,
        damping: 30
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = (e.clientX - centerX) / rect.width;
        const y = (e.clientY - centerY) / rect.height;

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };
    return (
        <motion.div
            ref={cardRef}
            className="w-full max-w-full relative group z-10"
            style={{
                perspective: 1000,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* BackgroundGradient wrapper */}
            <div className="relative p-[4px] group w-full max-w-full">
                <motion.div
                    className="absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform"
                    style={{
                        background: "radial-gradient(circle farthest-side at 0 100%, #9d4edd, transparent), radial-gradient(circle farthest-side at 100% 0, #c77dff, transparent), radial-gradient(circle farthest-side at 100% 100%, #e0aaff, transparent), radial-gradient(circle farthest-side at 0 0, #7209b7, #141316)",
                        backgroundSize: "400% 400%",
                    }}
                    animate={{
                        backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
                <motion.div
                    className="absolute inset-0 rounded-3xl z-[1] will-change-transform"
                    style={{
                        background: "radial-gradient(circle farthest-side at 0 100%, #9d4edd, transparent), radial-gradient(circle farthest-side at 100% 0, #c77dff, transparent), radial-gradient(circle farthest-side at 100% 100%, #e0aaff, transparent), radial-gradient(circle farthest-side at 0 0, #7209b7, #141316)",
                        backgroundSize: "400% 400%",
                    }}
                    animate={{
                        backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />

                <motion.div
                    className="relative z-10 w-full max-w-full overflow-hidden bg-black rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12"
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                >
                    <div className="overflow-x-auto">
                        <pre className="text-white leading-relaxed text-xs sm:text-sm md:text-base whitespace-pre">
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
                                    <Link
                                        href="mailto:anirudhjayakumar.business@gmail.com"
                                        className="relative inline-block group/link"
                                    >
                                        <motion.span
                                            className="absolute -inset-1 bg-[#72009C] opacity-0 group-hover/link:opacity-20 blur-lg rounded"
                                        />
                                        <motion.span
                                            className="relative text-[#F97316] group-hover/link:text-white transition-colors duration-300"
                                            whileHover={{ x: 2 }}
                                        >
                                            &quot;anirudhjayakumar.business@gmail.com&quot;
                                        </motion.span>
                                        <motion.span
                                            className="absolute bottom-0 left-0 h-[1px] bg-[#72009C] origin-left"
                                            initial={{ scaleX: 0 }}
                                            whileHover={{ scaleX: 1 }}
                                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                            style={{ width: '100%' }}
                                        />
                                    </Link>
                                </span>
                                <br />
                                <br />
                                <span className="text-[#6B7280]">{"// Github page"}</span>
                                <br />
                                <span className="text-[#00CED1]">const</span> githubLink ={" "}
                                <span className="text-[#F97316]">
                                    <Link
                                        href={"https://github.com/Anirudh-rb26"}
                                        className="relative inline-block group/link"
                                    >
                                        <motion.span
                                            className="absolute -inset-1 bg-[#72009C] opacity-0 group-hover/link:opacity-20 blur-lg rounded"
                                        />
                                        <motion.span
                                            className="relative text-[#F97316] group-hover/link:text-white transition-colors duration-300"
                                            whileHover={{ x: 2 }}
                                        >
                                            &quot;https://github.com/Anirudh-rb26&quot;
                                        </motion.span>
                                        <motion.span
                                            className="absolute bottom-0 left-0 h-[1px] bg-[#72009C] origin-left"
                                            initial={{ scaleX: 0 }}
                                            whileHover={{ scaleX: 1 }}
                                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                            style={{ width: '100%' }}
                                        />
                                    </Link>
                                </span>;
                                <br />
                                <br />
                                <span className="text-[#6B7280]">{"// X"}</span>
                                <br />
                                <span className="text-[#00CED1]">const</span> XPage ={" "}
                                <span className="text-[#F97316]">
                                    <Link
                                        href={"https://x.com/anirudh_rb26"}
                                        className="relative group/link"
                                    >
                                        <motion.span
                                            className="absolute -inset-1 bg-[#72009C] opacity-0 group-hover/link:opacity-20 blur-lg rounded"
                                        />
                                        <motion.span
                                            className="relative text-[#F97316] group-hover/link:text-white transition-colors duration-300"
                                            whileHover={{ x: 2 }}
                                        >
                                            &quot;https://x.com/anirudh_rb26&quot;
                                        </motion.span>
                                        <motion.span
                                            className="absolute bottom-0 left-0 h-[1px] bg-[#72009C] origin-left"
                                            initial={{ scaleX: 0 }}
                                            whileHover={{ scaleX: 1 }}
                                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                            style={{ width: '100%' }}
                                        />
                                    </Link>
                                </span>;
                            </code>
                        </pre>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default TiltCard