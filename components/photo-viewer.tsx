"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useLenis } from "lenis/react";

const photos = [
  { src: "/shotbyanirudh/aeroshow-26.jpg", alt: "A fighter jet flying at an airshow", title: "Aeroshow" },
  { src: "/shotbyanirudh/Haldi-67.jpg", alt: "A peacock on a rooftop in Rajasthan", title: "Rajasthan" },
  { src: "/shotbyanirudh/port-3.jpg", alt: "Aircraft on an airport apron at night", title: "Airport" },
  { src: "/shotbyanirudh/aeroshow-8.jpg", alt: "Aircraft at an airshow", title: "Aeroshow" },
  { src: "/shotbyanirudh/aeroshow-34.jpg", alt: "Aircraft at an airshow", title: "Aeroshow" },
  { src: "/shotbyanirudh/port-4.jpg", alt: "A nighttime airport scene", title: "Night ops" },
  { src: "/shotbyanirudh/Hemi 392-11.jpg", alt: "HEMI 392 car", title: "HEMI 392" },
  { src: "/shotbyanirudh/Aromal last day-68.jpg", alt: "Nissan Patrol", title: "Nissan Patrol" },
  { src: "/shotbyanirudh/aeroshow-38.jpg", alt: "Aircraft at an airshow", title: "Aeroshow" },
  { src: "/shotbyanirudh/aeroshow-39.jpg", alt: "Aircraft at an airshow", title: "Aeroshow" },
  { src: "/shotbyanirudh/aeroshow-42.jpg", alt: "Aircraft at an airshow", title: "Aeroshow" },
  { src: "/shotbyanirudh/anirudh(1).jpg", alt: "Ducati Panigale motorcycle", title: "Ducati Panigale" },
  { src: "/shotbyanirudh/anirudh.cr2-20251130-0002.jpg", alt: "BMW S1000 RR motorcycle", title: "BMW S1000 RR" },
  { src: "/shotbyanirudh/anirudh.cr2-20251130-0007.jpg", alt: "A view of BLVD City", title: "BLVD City" },
  { src: "/shotbyanirudh/anirudh.cr2-20251130-0014.jpg", alt: "A photograph from the gallery", title: "Through the lens" },
];

export default function PhotoViewer() {
  const [selected, setSelected] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();
  const isOpen = selected !== null;
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const wasStopped = lenis?.isStopped ?? false;
    lenis?.stop();
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previousOverflow;
      if (!wasStopped) lenis?.start();
    };
  }, [isOpen, lenis]);
  useEffect(() => {
    if (selected !== null && dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
  }, [selected]);
  useEffect(() => {
    if (selected === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setSelected(index => index === null ? null : (index + 1) % photos.length);
      if (event.key === "ArrowLeft") setSelected(index => index === null ? null : (index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);
  return <div className="photo-preview"><div className="photo-preview__grid">{photos.slice(0, 3).map((photo, index) => <button key={photo.src} className={`photo-preview__item photo-preview__item--${index+1}`} onClick={() => setSelected(index)} aria-label={`Open photo: ${photo.title}`}><Image src={photo.src} alt="" fill sizes="(max-width: 600px) 50vw, 33vw"/><span>{photo.title} <ArrowUpRight size={15}/></span></button>)}</div><button className="photo-preview__all" onClick={() => setSelected(0)}>View all {photos.length} photos <ArrowRight size={17}/></button><dialog ref={dialogRef} className="photo-dialog" data-lenis-prevent aria-label="Photo gallery" onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}><div className="photo-dialog__inner">{selected !== null && <><div className="photo-dialog__top"><span>PHOTOGRAPHY / {String(selected+1).padStart(2,"0")} OF {String(photos.length).padStart(2,"0")}</span><button onClick={() => dialogRef.current?.close()} aria-label="Close photo gallery"><X size={21}/></button></div><div className="photo-dialog__image"><Image src={photos[selected].src} alt={photos[selected].alt} fill sizes="100vw"/></div><div className="photo-dialog__bottom"><div aria-live="polite"><strong>{photos[selected].title}</strong><span>Use arrow keys to navigate</span></div><div className="photo-dialog__controls"><button onClick={() => setSelected((selected-1+photos.length)%photos.length)} aria-label="Previous photo"><ArrowLeft size={21}/></button><button onClick={() => setSelected((selected+1)%photos.length)} aria-label="Next photo"><ArrowRight size={21}/></button></div></div></>}</div></dialog></div>;
}
