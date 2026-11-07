"use client";

import { useSyncExternalStore } from "react";
import ColorBends from "./ColorBends";

const query = "(prefers-reduced-motion: reduce)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function snapshot() { return window.matchMedia(query).matches; }
function serverSnapshot() { return true; }

export default function HeroBackground() {
  const reducedMotion = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  return <div className="landing__background" aria-hidden="true">{!reducedMotion && <ColorBends className="landing__shader" colors={["#304d77", "#294264"]} rotation={0} speed={0.2} scale={0.5} frequency={1} warpStrength={0} mouseInfluence={0.3} parallax={0.35} noise={0.01} transparent />}</div>;
}
