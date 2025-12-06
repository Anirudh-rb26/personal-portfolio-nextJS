"use client"

import React from 'react';
import FlowingMenu, { MenuItemProps } from '../FlowingMenu';
import CloudBackgroundLayer from './cloud-background';
import { motion } from 'framer-motion';
import { Mail, Instagram, Linkedin, Github } from 'lucide-react';

const demoItems: MenuItemProps[] = [
    {
        link: '#',
        text: 'Gmail',
        icon: Mail,
        brand: 'gmail',
    },
    {
        link: '#',
        text: 'Instagram',
        icon: Instagram,
        brand: 'instagram',
    },
    {
        link: '#',
        text: 'LinkedIn',
        icon: Linkedin,
        brand: 'linkedin',
    },
    {
        link: '#',
        text: 'Github',
        icon: Github,
        brand: 'github',
    },
];

const MyHeroSection = () => {
    return (
        <section className="relative w-screen min-h-screen flex flex-col items-center justify-start py-10 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 overflow-hidden">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
                <CloudBackgroundLayer className="w-full h-full -z-1" cloudCount={8} />
            </div>

            <div className="relative z-10 text-white text-center w-full pt-[clamp(3rem,10vh,8rem)] pb-[clamp(2rem,6vh,5rem)] px-4">
                <motion.div
                    className="text-center relative z-10"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-[clamp(3rem,12vw,12rem)] font-bold text-white font-clash leading-[0.9] tracking-tighter">
                        Social
                        <span className="text-[#ec48a0] font-melodrama italic font-normal">&apos;s</span>
                    </h2>
                </motion.div>
            </div>

            <motion.div
                className="relative z-10 w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
            >
                <div className="font-array">
                    <FlowingMenu items={demoItems} />
                </div>
            </motion.div>
        </section>
    );
};

export default MyHeroSection;
