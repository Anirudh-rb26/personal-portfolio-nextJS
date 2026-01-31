"use client";

import Image from "next/image";
import { ShootingStars } from "../ui/shooting-stars";
import { motion, AnimatePresence } from "framer-motion";
import { StarsBackground } from "../ui/stars-background";
import { useState, useRef, useEffect, useCallback, memo } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

// --- TYPE DEFINITIONS ---
interface PhotoMeta {
    cam: string | null;
    lens: string | null;
    f: string | null;
    ss: string | null;
    iso: string | null;
    fl: string | null;
}

interface GalleryPhoto {
    id: number;
    src: string;
    title: string;
    size: string;
    meta: PhotoMeta;
}

// --- DATA STRUCTURE (RESPONSIVE CLASSES ADDED) ---
const GALLERY_DATA: readonly GalleryPhoto[] = [
    // ROW 1
    {
        id: 1,
        src: "/shotbyanirudh/aeroshow-26.jpg",
        title: "Aersoshow-26",
        size: "col-span-2 row-span-2",
        meta: { cam: "Canon 70D", lens: "55-250mm", f: "f/5.0", ss: "1/4000s", iso: "250", fl: "100mm" },
    },
    {
        id: 2,
        src: "/shotbyanirudh/Haldi-67.jpg",
        title: "Peacock in Rajasthan",
        size: "col-span-1 row-span-1",
        meta: { cam: "Canon 1300D", lens: "55-250mm", f: "f/5.6", ss: "1/160s", iso: "400", fl: "250mm" },
    },
    {
        id: 3,
        src: "/shotbyanirudh/aeroshow-8.jpg",
        title: "Aersoshow-8",
        size: "col-span-1 row-span-1",
        meta: { cam: "Canon 70D", lens: "55-250mm", f: "f/8.0", ss: "1/1000s", iso: "100", fl: "100mm" },
    },

    // ROW 2
    {
        id: 4,
        src: "/shotbyanirudh/aeroshow-34.jpg",
        title: "Aeroshow-34",
        size: "col-span-1 row-span-1",
        meta: { cam: "Canon 70D", lens: "55-250mm", f: "f/5", ss: "1/3200s", iso: "250", fl: "124mm" },
    },
    {
        id: 6,
        src: "/shotbyanirudh/port-4.jpg",
        title: "NIGHT_OPS",
        size: "col-span-1 row-span-1",
        meta: { cam: "Canon 1300D", lens: "55-250mm", f: "f/4", ss: "1/50s", iso: "400", fl: "55mm" },
    },

    // ROW 3
    {
        id: 7,
        src: "/shotbyanirudh/port-3.jpg",
        title: "Airport",
        size: "col-span-2 row-span-1",
        meta: { cam: "Canon 1300D", lens: "55-250mm", f: "f/5.6", ss: "1/50s", iso: "1600", fl: "55mm" },
    },
    {
        id: 8,
        src: "/shotbyanirudh/Hemi 392-11.jpg",
        title: "HEMI_392",
        size: "col-span-1 row-span-1",
        meta: { cam: "Canon 1300D", lens: "18-55mm", f: "f/9.5", ss: "1/60s", iso: "100", fl: "18mm" },
    },
    {
        id: 9,
        src: "/shotbyanirudh/Aromal last day-68.jpg",
        title: "Nissan Patrol",
        size: "col-span-1 row-span-1",
        meta: { cam: "Canon 1300D", lens: "70-300mm", f: "f/5", ss: "1/1600s", iso: "200", fl: "140mm" },
    },

    // ROW 4
    {
        id: 11,
        src: "/shotbyanirudh/aeroshow-38.jpg",
        title: "Aersoshow-38",
        size: "col-span-1 row-span-1",
        meta: { cam: "Canon 70D", lens: "55-250mm", f: "f/4", ss: "1/3200s", iso: "250", fl: "55mm" },
    },
    {
        id: 12,
        src: "/shotbyanirudh/aeroshow-39.jpg",
        title: "Aersoshow-39",
        size: "col-span-1 row-span-1",
        meta: { cam: "Canon 70D", lens: "55-250mm", f: "f/4.5", ss: "1/3200s", iso: "250", fl: "89mm" },
    },
    {
        id: 13,
        src: "/shotbyanirudh/aeroshow-42.jpg",
        title: "Aersoshow-42",
        size: "col-span-2 row-span-1",
        meta: { cam: "Canon 70D", lens: "55-250mm", f: "f/4", ss: "1/3200s", iso: "250", fl: "55mm" },
    },

    // ROW 5
    {
        id: 10,
        src: "/shotbyanirudh/anirudh(1).jpg",
        title: "Ducati Panigale",
        size: "col-span-1 row-span-1",
        meta: { cam: null, lens: null, f: null, ss: null, iso: null, fl: null },
    },
    {
        id: 14,
        src: "/shotbyanirudh/anirudh.cr2-20251130-0002.jpg",
        title: "BMW S1000 RR",
        size: "col-span-1 row-span-1",
        meta: { cam: null, lens: null, f: null, ss: null, iso: null, fl: null },
    },
    {
        id: 15,
        src: "/shotbyanirudh/anirudh.cr2-20251130-0007.jpg",
        title: "BLVD City",
        size: "col-span-1 row-span-1",
        meta: { cam: null, lens: null, f: null, ss: null, iso: null, fl: null },
    },
    {
        id: 17,
        src: "/shotbyanirudh/anirudh.cr2-20251130-0014.jpg",
        title: "Aeroshow-15",
        size: "col-span-1 row-span-1",
        meta: { cam: "Canon 70D", lens: "55-250mm", f: "f/4", ss: "1/3200s", iso: "250", fl: "150mm" },
    },
] as const;

export default function ProofOfTaste() {
    const containerRef = useRef<HTMLElement>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const selectedImage = GALLERY_DATA.find((item) => item.id === selectedId);

    const nextImage = useCallback(() => {
        if (!selectedId) return;
        const currentIndex = GALLERY_DATA.findIndex((item) => item.id === selectedId);
        const nextIndex = (currentIndex + 1) % GALLERY_DATA.length;
        setSelectedId(GALLERY_DATA[nextIndex].id);
    }, [selectedId]);

    const prevImage = useCallback(() => {
        if (!selectedId) return;
        const currentIndex = GALLERY_DATA.findIndex((item) => item.id === selectedId);
        const prevIndex = (currentIndex - 1 + GALLERY_DATA.length) % GALLERY_DATA.length;
        setSelectedId(GALLERY_DATA[prevIndex].id);
    }, [selectedId]);

    // Keyboard Nav
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedId === null) return;
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "Escape") setSelectedId(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedId, nextImage, prevImage]);

    const handleModalClick = useCallback(() => {
        setSelectedId(null);
    }, []);

    const handleImageClick = useCallback((id: number) => {
        setSelectedId(id);
    }, []);

    return (
        <section ref={containerRef} className="relative w-full py-16 md:py-24 px-4 bg-black text-white overflow-hidden min-h-screen">

            {/* --- ATMOSPHERE --- */}
            <div className="absolute inset-0 -z-10">
                <StarsBackground />
                <ShootingStars />
            </div>

            {/* Grain Overlay - Optimized */}
            <div
                className="absolute inset-0 opacity-[0.15] pointer-events-none -z-5"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    willChange: "transform", // GPU acceleration hint
                }}
            />

            <div className="max-w-[1400px] mx-auto z-10 relative">
                {/* HEADER - RESPONSIVE */}
                <div className="flex flex-row items-center justify-center mb-16 md:mb-24 gap-4 md:gap-6 relative">
                    <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white font-array">
                        Proof Of
                        <span className="text-[#ec48a0] font-melodrama italic"> Creativity</span>
                    </h2>
                </div>

                {/* BENTO GRID - OPTIMIZED */}
                <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[280px] gap-2 md:gap-4">
                    {GALLERY_DATA.map((photo) => (
                        <BentoItem
                            key={photo.id}
                            photo={photo}
                            onClick={handleImageClick}
                        />
                    ))}
                </div>
            </div>

            {/* --- OPTIMIZED MODAL INTERFACE --- */}
            <AnimatePresence>
                {selectedId && selectedImage && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-8 bg-black/90 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleModalClick}
                    >
                        {/* WRAPPER */}
                        <div className="w-full max-w-7xl h-[100dvh] md:h-[85vh] flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-center relative overflow-hidden md:overflow-visible">

                            {/* 1. DETAILS CARD - Reduced blur */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="w-full md:w-[380px] shrink-0 
                                h-[45%] md:h-full 
                                overflow-y-auto 
                                bg-zinc-900/90 md:bg-zinc-900/70
                                backdrop-blur-md
                                border-t md:border border-white/10 
                                shadow-2xl
                                rounded-t-3xl md:rounded-2xl 
                                p-6 md:p-8 flex flex-col order-2 md:order-1 relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Mobile Pull Indicator */}
                                <div className="md:hidden w-12 h-1 bg-white/20 rounded-full mx-auto mb-6 shrink-0" />

                                {/* Glossy Highlight */}
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                                <div className="flex flex-col h-full">
                                    {/* Top: ID */}
                                    <div className="mb-4 md:mb-6 relative z-10 flex justify-between items-center">
                                        <span className="font-mono text-[10px] text-[#72009C] uppercase tracking-widest border border-[#72009C]/30 px-2 py-1 rounded-full bg-[#72009C]/5">
                                            0{selectedImage.id}
                                        </span>
                                        {/* Mobile Close Button */}
                                        <button
                                            onClick={handleModalClick}
                                            className="md:hidden p-2 text-white/50 hover:text-white"
                                            aria-label="Close modal"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>

                                    {/* Middle: Title */}
                                    <div className="mb-6 md:mb-8 relative z-10">
                                        <h3 className="text-2xl md:text-4xl font-bold font-array text-white uppercase leading-none mb-2 md:mb-4 tracking-tighter">
                                            {selectedImage.title}
                                        </h3>
                                        <p className="font-satoshi text-zinc-400 text-xs md:text-sm leading-relaxed line-clamp-3 md:line-clamp-none">
                                            {selectedImage.title} Captured via {selectedImage.meta.cam || 'Unknown Source'} using high-fidelity extraction.
                                        </p>
                                    </div>

                                    <div className="flex-1" />

                                    {/* Bottom: Tech Specs */}
                                    {hasMeta(selectedImage.meta) && (
                                        <div className="grid grid-cols-2 md:grid-cols-2 gap-y-3 gap-x-4 border-t border-white/10 pt-6 relative z-10">
                                            <DetailBlock label="Camera" value={selectedImage.meta.cam} />
                                            <DetailBlock label="Lens" value={selectedImage.meta.lens} />
                                            <DetailBlock label="Aperture" value={selectedImage.meta.f} />
                                            <DetailBlock label="ISO" value={selectedImage.meta.iso} />
                                            <DetailBlock label="Shutter" value={selectedImage.meta.ss} />
                                            <DetailBlock label="Focal Len" value={selectedImage.meta.fl} />
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* 2. IMAGE CONTAINER - Reduced blur */}
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                transition={{ type: "spring", damping: 30, stiffness: 300, delay: 0.05 }}
                                className="flex-1 w-full relative 
                                h-[55%] md:h-full 
                                bg-black md:bg-zinc-900/50
                                backdrop-blur-sm
                                border-b md:border border-white/10 
                                md:rounded-2xl overflow-hidden group 
                                order-1 md:order-2 flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Desktop Close Button */}
                                <button
                                    onClick={handleModalClick}
                                    className="hidden md:block absolute top-4 right-4 z-50 p-2 rounded-full bg-black/60 text-white/70 hover:bg-black/80 hover:text-white transition-all border border-white/10"
                                    aria-label="Close modal"
                                >
                                    <X size={20} />
                                </button>

                                {/* Nav Buttons */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                    className="absolute left-2 md:left-4 z-20 p-4 md:p-3 rounded-full md:bg-black/40 text-white/70 hover:bg-black/60 hover:text-white transition-all md:opacity-0 group-hover:opacity-100"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                    className="absolute right-2 md:right-4 z-20 p-4 md:p-3 rounded-full md:bg-black/40 text-white/70 hover:bg-black/60 hover:text-white transition-all md:opacity-0 group-hover:opacity-100"
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={24} />
                                </button>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedImage.id}
                                        className="relative w-full h-full p-0 md:p-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Image
                                            src={selectedImage.src}
                                            alt={selectedImage.title}
                                            fill
                                            className="object-contain drop-shadow-2xl"
                                            sizes="(max-width: 768px) 100vw, 80vw"
                                            priority
                                            quality={90}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section >
    );
}

// --- UTILS ---

function hasMeta(meta: PhotoMeta): boolean {
    return Object.values(meta).some(val => val !== null && val !== "Unknown" && !String(val).includes("--"));
}

// --- SUB-COMPONENTS ---

interface DetailBlockProps {
    label: string;
    value: string | null;
}

const DetailBlock = memo(function DetailBlock({ label, value }: DetailBlockProps) {
    if (!value || value === "Unknown" || value.includes("--")) return null;
    return (
        <div className="flex flex-col gap-0.5 md:gap-1">
            <span className="text-[8px] md:text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{label}</span>
            <span className="text-xs md:text-sm font-mono text-zinc-200">{value}</span>
        </div>
    );
});

interface BentoItemProps {
    photo: GalleryPhoto;
    onClick: (id: number) => void;
}

const BentoItem = memo(function BentoItem({ photo, onClick }: BentoItemProps) {
    const handleClick = useCallback(() => {
        onClick(photo.id);
    }, [onClick, photo.id]);

    return (
        <motion.div
            onClick={handleClick}
            className={`relative group overflow-hidden rounded-lg md:rounded-xl cursor-pointer bg-zinc-900 border border-white/5 ${photo.size}`}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 to-transparent opacity-60 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Zoom Icon */}
            <div className="absolute top-2 right-2 md:top-3 md:right-3 z-30 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/40 backdrop-blur-sm p-1.5 md:p-2 rounded-full text-white border border-white/10">
                    <Maximize2 size={12} className="md:w-[14px] md:h-[14px]" />
                </div>
            </div>

            {/* Title */}
            <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 z-30 translate-y-0 md:translate-y-4 group-hover:translate-y-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                <span className="text-[10px] md:text-xs font-bold font-mono text-white uppercase tracking-wider drop-shadow-md">{photo.title}</span>
            </div>

            {/* Next.js Image with priority for above-the-fold images */}
            <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 350px"
                className="object-cover grayscale brightness-[0.85] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 ease-out group-hover:scale-105"
                priority={photo.id <= 4} // Priority load first 4 images
                quality={75}
            />
        </motion.div>
    );
});