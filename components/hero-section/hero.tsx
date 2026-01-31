"use client"

import React from "react"
import { Button } from "../ui/button"
import ColorBends from "../ColorBends"
import { useLenis } from "lenis/react"
import { useAnimation } from "framer-motion"
import { Blend } from "../animated-icons/blend"
import { Rocket } from "../animated-icons/rocket"

const heroLabels = [
    "V 3.0",
    "#72009C",
    "speed · 0.2",
    "Anirudh 2025 ©",
]



const Hero = () => {
    const rocketAnimationControls = useAnimation()
    const blendAnimationControls = useAnimation()

    const lenis = useLenis();
    const handleScroll = (e: React.MouseEvent, targetId: string, locationName: string | null) => {
        e.preventDefault();
        // setFileLocation(locationName);

        if (locationName === null) {
            lenis?.scrollTo(0, { duration: 1.5 });
        } else {
            lenis?.scrollTo(targetId, { offset: -20, duration: 1.5 })
        }

        // closeMenu();
    }


    return (
        <section className="relative w-screen min-h-[100vh] md:min-h-[100vh] flex items-center justify-center px-4 overflow-hidden">

            {/* CHANGED: h-screen -> h-full. 
               This ensures the background matches the section height exactly on all devices. 
               (On desktop, this equals 90vh, creating the same visual effect as your original code). */}
            <div className="absolute inset-0 w-screen h-screen z-0 overflow-hidden">
                <ColorBends
                    className="z-[-1] w-screen h-full"
                    // colors={["#72009c", "#456990", "#f45b69"]}
                    colors={["#456990", "#72009c"]}
                    rotation={0}
                    speed={0.2}
                    scale={0.5}
                    frequency={1}
                    warpStrength={0}
                    mouseInfluence={0}
                    parallax={0.9}
                    noise={0.01}
                    transparent />
            </div>

            <div className="hidden sm:block z-10">
                <p className="pointer-events-none select-none absolute top-6 left-6 text-[9px] sm:text-[10px] font-melodrama uppercase tracking-[0.2em] text-white/30">
                    {heroLabels[0]}
                </p>

                <p className="pointer-events-none select-none absolute top-1/3 right-4 sm:right-16 text-[11px] sm:text-xs font-melodrama text-white/45">
                    {heroLabels[1]}
                </p>

                <p className="pointer-events-none select-none absolute bottom-14 left-1/4 text-[10px] sm:text-xs font-melodrama text-white/40">
                    {heroLabels[2]}
                </p>

                <p className="pointer-events-none select-none hidden md:block absolute bottom-8 right-8 text-[9px] sm:text-[10px] font-melodrama text-white/30 tracking-[0.25em]">
                    {heroLabels[3]}
                </p>
            </div>

            {/* main hero */}
            <div className="max-w-3xl text-center flex flex-col items-center justify-center z-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                    <span className="font-melodrama italic">Turning ideas into</span>{" "}
                    <span className="font-clash">products</span>{" "}
                    <span className="font-satoshi font-light">that</span>{" "}
                    <span className="font-clash font-semibold">don&apos;t</span>{" "}
                    <span className="font-satoshi">
                        <span className="font-melodrama italic text-[var(--color-bubblegum-pink)] whitespace-nowrap">
                            piss users off
                        </span>
                        .
                    </span>
                </h1>

                <div className="mt-3 rounded-2xl bg-black/30 backdrop-blur-sm px-4 py-3">
                    <p className="text-xs sm:text-sm md:text-base text-white/70 max-w-xl font-satoshi">
                        If you care about how it feels to use, not just how it looks, you&apos;ll probably like my work.
                    </p>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button
                        className="group px-5 py-2.5 rounded-full border border-frosted-mint/30 text-white text-xs sm:text-sm hover:bg-white/80 hover:text-bubblegum-pink transition font-array"
                        variant="ghost"
                        onMouseEnter={() => rocketAnimationControls.start("animate")}
                        onMouseLeave={() => rocketAnimationControls.start("normal")}
                        onClick={(e) => handleScroll(e, '#projects', 'projects')}
                    >
                        Check my builds
                        <Rocket controls={rocketAnimationControls} />
                    </Button>
                    <Button
                        className="group px-5 py-2.5 rounded-full bg-white text-bubblegum-pink font-melodrama font-bold tracking-wider text-xs sm:text-sm hover:bg-bubblegum-pink hover:text-white transition"
                        onMouseEnter={() => blendAnimationControls.start("animate")}
                        onMouseLeave={() => blendAnimationControls.start("normal")}
                        onClick={(e) => handleScroll(e, '#contact', 'contact')}
                    >
                        Collaborate!
                        <Blend controls={blendAnimationControls} />
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Hero
