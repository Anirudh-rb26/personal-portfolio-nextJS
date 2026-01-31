import localFont from "next/font/local";

/* ---------------------------------- */
/*            SATOSHI FONT            */
/* ---------------------------------- */
export const satoshi = localFont({
  src: [
    { path: "../fonts/satoshi/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/satoshi/Satoshi-LightItalic.woff2", weight: "300", style: "italic" },

    { path: "../fonts/satoshi/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/satoshi/Satoshi-Italic.woff2", weight: "400", style: "italic" },

    { path: "../fonts/satoshi/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/satoshi/Satoshi-MediumItalic.woff2", weight: "500", style: "italic" },

    { path: "../fonts/satoshi/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/satoshi/Satoshi-BoldItalic.woff2", weight: "700", style: "italic" },

    { path: "../fonts/satoshi/Satoshi-Black.woff2", weight: "900", style: "normal" },
    { path: "../fonts/satoshi/Satoshi-BlackItalic.woff2", weight: "900", style: "italic" },
  ],
  variable: "--font-satoshi",
});

/* ---------------------------------- */
/*         CLASH DISPLAY FONT         */
/* ---------------------------------- */
export const clashDisplay = localFont({
  src: [
    {
      path: "../fonts/clash-display/ClashDisplay-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    { path: "../fonts/clash-display/ClashDisplay-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/clash-display/ClashDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/clash-display/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/clash-display/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/clash-display/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash",
});

/* ---------------------------------- */
/*           MELODRAMA FONT           */
/* ---------------------------------- */
export const melodrama = localFont({
  src: [
    { path: "../fonts/melodrama/Melodrama-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/melodrama/Melodrama-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/melodrama/Melodrama-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/melodrama/Melodrama-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/melodrama/Melodrama-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-melodrama",
});

/* ---------------------------------- */
/*           ARRAY FONT           */
/* ---------------------------------- */
export const array = localFont({
  src: [
    { path: "../fonts/array/Array-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/array/Array-Wide.woff2", weight: "400", style: "normal" },

    { path: "../fonts/array/Array-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/array/Array-SemiboldWide.woff2", weight: "600", style: "normal" },

    { path: "../fonts/array/Array-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/array/Array-BoldWide.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-array",
});
