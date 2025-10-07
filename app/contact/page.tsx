"use client"

import React from 'react'
import { motion } from "framer-motion"
import SocialCard from '@/components/social-card';
import { TypingAnimation } from '@/components/ui/typing-animation'

export interface Link {
    name: string;
    handle: string;
    url: string;
    color: string;
}

const ContactPage = () => {
    const links: Link[] = [
        {
            name: "Email",
            handle: "anirudhjayakumar.business@gmail.com",
            url: "mailto:anirudhjayakumar.business@gmail.com",
            color: "#F97316",
        },
        {
            name: "Github",
            handle: "@Anirudh-rb26",
            url: "https://github.com/Anirudh-rb26",
            color: "#ffffff",
        },
        {
            name: "X",
            handle: "@anirudh_rb26",
            url: "https://x.com/anirudh_rb26",
            color: "#1DA1F2",
        },
        {
            name: "LinkedIn",
            handle: "@anirudhjayakumar",
            url: "https://linkedin.com/in/anirudhjayakumar",
            color: "#0A66C2",
        },
        {
            name: "Instagram",
            handle: "@anirudh.cr2",
            url: "https://instagram.com/anirudh.cr2",
            color: "#E1306C",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
        >
            <div className="flex flex-col min-h-screen font-mono bg-black text-white overflow-hidden">
                <main className="flex-1 flex flex-col items-start justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-12">
                    <motion.div
                        className='mb-16 w-full max-w-4xl'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <div className="text-start mb-8 sm:mb-16 w-full">
                                <div className="flex">
                                    <TypingAnimation
                                        text="> Let's Connect!"
                                        onComplete={() => { }}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <div className='w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                            {links.map((link, index) => (
                                <SocialCard
                                    key={link.name}
                                    link={link}
                                    index={index}
                                />
                            ))}
                        </div>
                    </motion.div>
                </main>
            </div>
        </motion.div>
    )
}

export default ContactPage