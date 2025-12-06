import Hero from "@/components/hero/hero";
import ContactPage from "@/components/contact/page";
import ProjectGrid from "@/components/project-section/project-section";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div id="home">
        <Hero />
      </div>

      <div id="projects">
        <ProjectGrid />
      </div>

      <div id="contact">
        <ContactPage />
      </div>
    </div>
  );
};