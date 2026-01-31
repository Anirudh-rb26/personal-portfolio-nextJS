'use client';

import React, { useEffect, useState, useId } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming cn utility is available

// Helper to generate random cloud properties
const generateClouds = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: i,
        // Position vertically between 5% and 40% of container height
        y: Math.random() * 35 + 5,
        scale: Math.random() * 0.4 + 0.8,
        opacity: Math.random() * 0.2 + 0.5,
        duration: Math.random() * 20 + 40,
        delay: Math.random() * -60,
    }));
};

// The individual cloud component remains the same
const Cloud = ({ duration, delay, y, scale, opacity, filterId }: any) => {
    return (
        <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100vw' }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: 'linear',
                delay: delay,
            }}
            className="absolute left-0 will-change-transform"
            style={{
                top: `${y}%`,
                opacity: opacity,
                transform: `scale(${scale})`,
            }}
        >
            <svg
                width="400"
                height="200"
                viewBox="0 0 400 200"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[300px] h-auto"
            >
                {/* The Cloud Shape */}
                <g filter={`url(#${filterId})`} fill="white">
                    <circle cx="100" cy="140" r="50" />
                    <circle cx="160" cy="110" r="60" />
                    <circle cx="240" cy="120" r="65" />
                    <circle cx="300" cy="150" r="50" />
                    <circle cx="200" cy="150" r="60" />
                </g>
            </svg>
        </motion.div>
    );
};

interface CloudBackgroundLayerProps {
    className?: string;
    cloudCount?: number;
}

// 💥 Key Modification: This component now ONLY renders the background layer (clouds/sun/filter)
export default function CloudBackgroundLayer({
    className,
    cloudCount = 6
}: CloudBackgroundLayerProps) {
    const [clouds, setClouds] = useState<any[]>([]);
    const filterId = useId();

    useEffect(() => {
        setClouds(generateClouds(cloudCount));
    }, [cloudCount]);

    return (
        // Apply the incoming className to the main wrapper
        // The default class names are removed (like gradient and w-full h-full) 
        // to be fully controlled by the parent component.
        <div className={cn("relative overflow-hidden pointer-events-none bg-gradient-to-b from-sky-300 to-sky-100", className)}>

            {/* 1. DEFINE FILTER ONCE GLOBALLY */}
            <svg className="invisible absolute w-0 h-0">
                <defs>
                    <filter id={filterId}>
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.012"
                            numOctaves="4"
                            result="noise"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale="25"
                            result="displaced"
                        />
                        <feGaussianBlur in="displaced" stdDeviation="2" />
                    </filter>
                </defs>
            </svg>

            {/* Sun */}
            {/* Note: If you want to control the sun position externally, you could wrap this too */}
            {/* <div className="absolute top-10 right-10 w-24 h-24 bg-yellow-200 rounded-full blur-3xl opacity-60" /> */}

            {/* Clouds */}
            {clouds.map((cloud) => (
                <Cloud key={cloud.id} {...cloud} filterId={filterId} />
            ))}
        </div>
    );
}