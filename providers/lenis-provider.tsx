"use client";

import { ReactLenis, useLenis } from "lenis/react";
import Snap from "lenis/snap";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";

const reducedMotion = "(prefers-reduced-motion: reduce)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(reducedMotion);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function getSnapshot() { return window.matchMedia(reducedMotion).matches; }
function getServerSnapshot() { return false; }

function SoftSnap() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    const snap = new Snap(lenis, { type: "proximity", distanceThreshold: 70, debounce: 350, duration: 0.65 });
    snap.addElements(Array.from(document.querySelectorAll<HTMLElement>("[data-snap-anchor]")), { align: "start" });
    return () => snap.destroy();
  }, [lenis]);
  return null;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const reduceMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (reduceMotion) return <>{children}</>;
  return <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, anchors: true }}><SoftSnap />{children}</ReactLenis>;
}
