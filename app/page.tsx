import Hero from "@/components/hero/hero";
import ContactPage from "@/components/contact/page";
import ProjectGrid from "@/components/project-section/project-section";

const BlurEdge = () => (
  <div className="absolute -top-24 left-0 z-20 h-24 w-full pointer-events-none select-none overflow-hidden">
    {/* The Glass Effect: Blurs whatever is underneath (the previous section) */}
    <div className="absolute inset-0 backdrop-blur-xl mask-image-linear-gradient"
      style={{ maskImage: "linear-gradient(to bottom, transparent, black 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 100%)" }}
    />
    {/* The Fade: Smooths the color transition */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-950" />
  </div>
);

export default function Home() {
  return (
    // 1. Fix Padding/Width: Use w-full, remove flex-col centering, enforce dark bg
    <main className="relative w-full bg-neutral-950 overflow-x-hidden text-white">

      {/* SECTION 1: HERO */}
      <section id="home" className="sticky top-0 z-0 w-full min-h-screen">
        {/* Content */}
        <Hero />
      </section>

      {/* SECTION 2: PROJECTS */}
      <section id="projects" className="relative z-10 w-full bg-neutral-950">
        <BlurEdge />
        {/* Content */}
        <div className="relative w-full py-20">
          <ProjectGrid />
        </div>
      </section>

      {/* SECTION 3: CONTACT */}
      <section id="contact" className="relative z-20 w-full bg-neutral-950 pb-20">
        <BlurEdge />
        {/* Content */}
        <div className="min-h-[80vh] flex items-center justify-center">
          <ContactPage />
        </div>
      </section>

    </main>
  );
};
