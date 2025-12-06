import Hero from "@/components/hero/hero";
import ProjectGrid from "@/components/project-section/project-secion";


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
        <div className="h-screen w-screen flex items-center justify-center bg-baltic-blue">Contact Section</div>
      </div>
    </div>
  );
};