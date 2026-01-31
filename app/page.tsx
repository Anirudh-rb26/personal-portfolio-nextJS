import Hero from "@/components/hero-section/hero";
import ContactPage from "@/components/contact-section/page";
import ProjectGrid from "@/components/project-section/project-section";
import AboutSection from "@/components/about-section/page";

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
        <div className="relative w-full">
          <ProjectGrid />
        </div>
      </section>

      {/* SECTION 3: ABOUT */}
      <section id="gallery" className="relative z-10 w-full bg-neutral-950">
        <div className="relative w-full">
          <AboutSection />
        </div>
      </section>

      {/* SECTION 3: CONTACT */}
      <section id="contact" className="relative z-20 w-full">
        <div className="min-h-[80vh] flex items-center justify-center">
          <ContactPage />
        </div>
      </section>

    </main>
  );
};
