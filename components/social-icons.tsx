import { createLucideIcon } from "lucide-react";

// Lucide 1.x no longer includes brand icons. Keep these local to avoid a new dependency.
export const Instagram = createLucideIcon("Instagram", [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "frame" }],
  ["path", { d: "M16 11.37a4 4 0 1 1-3.37-3.37A4 4 0 0 1 16 11.37z", key: "lens" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "flash" }],
]);

export const Linkedin = createLucideIcon("Linkedin", [
  ["path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z", key: "letters" }],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "stem" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "dot" }],
]);

export const Github = createLucideIcon("Github", [
  ["path", { d: "M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22", key: "mark" }],
]);
