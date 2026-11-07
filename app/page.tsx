import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ContactPage from "@/components/contact-section/page";
import HeroBackground from "@/components/hero-background";
import PhotoViewer from "@/components/photo-viewer";

const experiments = [
  {
    number: "01",
    name: "Review Co-Pilot",
    type: "REVIEW ANALYTICS",
    description: "A tool for exploring customer feedback through sentiment, topics and AI-assisted responses.",
    link: "https://github.com/Anirudh-rb26/review-copilot-frontend",
    linkText: "View source",
  },
  {
    number: "02",
    name: "WhisperFlow",
    type: "VIDEO CAPTIONING",
    description: "An experiment in generating and styling captions for video.",
    link: "mailto:anirudhjayakumar.business@gmail.com?subject=WhisperFlow",
    linkText: "Ask about WhisperFlow",
  },
];

export default function Home() {
  return (
    <main id="top">
      <div className="site-atmosphere" aria-hidden="true"><HeroBackground /></div>
      <header className="nav shell">
        <a href="#top" className="terminal-mark" aria-label="Anirudh, back to top">
          <span>~/</span><span className="terminal-mark__name">anirudh</span>
          <span className="terminal-mark__cursor" aria-hidden="true" />
        </a>
      </header>

      <section className="hero shell" data-snap-anchor>
        <div className="hero__ambient" aria-hidden="true" />
        <div className="hero__content">
          <p className="eyebrow"><span className="live-dot" /> FOUNDING ENGINEER AT TERRALEDGE</p>
          <h1>Turning ideas into products that <em>don’t piss users off.</em></h1>
          <div className="hero__detail">
            <p>If you care about how it feels to use, not just how it looks, you’ll probably like my work.</p>
            <a href="#work" className="hero__scroll" aria-label="Explore selected work"><ArrowDown size={21} /></a>
          </div>
        </div>
        <div className="hero__bottom"><span>SOFTWARE ENGINEER &amp; PRODUCT BUILDER</span><span>SELECTED WORK ↓</span></div>
      </section>

      <section className="work shell" id="work">
        <div className="section-title">
          <span className="eyebrow">01 / SELECTED WORK</span>
          <p>A selection of work, from a company platform to personal experiments.</p>
        </div>

        <article className="feature feature--terra" data-snap-anchor>
          <div className="feature__top"><span>01 / CURRENT WORK</span><span>FOUNDING ENGINEER</span></div>
          <div className="terra__layout">
            <div className="terra__art">
              <div className="terra__art-frame">
                <Image src="/assets/projects/terraledge-clean.png" alt="terraledge: Solving equity management for AI-first startups and scale-ups" width={1149} height={1368} sizes="(max-width: 800px) 100vw, 50vw" />
              </div>
            </div>
            <div className="terra__copy">
              <span className="eyebrow">EQUITY MANAGEMENT / FINTECH</span>
              <h2 className="terra__name">terraledge<span>.</span></h2>
              <h3>Equity, made easier to manage.</h3>
              <p>terraledge is working on equity management for AI-first startups and scale-ups, bringing cap tables, equity grants and related workflows together. As founding engineer, I designed, built and deployed the platform as its sole engineer.</p>
              <p>The work spans the product itself: translating complex equity workflows into software people can use.</p>
              <a className="project-cta" href="https://www.terraledge.com/" target="_blank" rel="noopener noreferrer">Visit terraledge.com <ArrowUpRight size={17} /></a>
            </div>
          </div>
          <div className="feature__bottom"><span>PRODUCT / ENGINEERING / EXPERIENCE</span><span>TERRALEDGE.COM</span></div>
        </article>

        <article className="feature feature--plateau" data-snap-anchor>
          <div className="feature__top"><span>02 / IN PROGRESS</span><span>INDEPENDENT PROJECT</span></div>
          <div className="plateau__layout">
            <div className="plateau__identity">
              <div className="plateau__logo" aria-hidden="true"><Image src="/assets/projects/plateau/Ivory.svg" alt="" width={1600} height={1000} /></div>
              <p>A WORK IN PROGRESS<br />BUILT WITH FLUTTER</p>
            </div>
            <div className="plateau__copy">
              <span className="eyebrow">MOBILE / FITNESS</span>
              <h2>Plateau<span>.</span></h2>
              <p className="plateau__tagline">The last fitness app<br /><em>you’ll ever need.</em></p>
              <p>That’s the ambition, anyway. Plateau is an independent fitness app I’m building—still early, with plenty left to figure out.</p>
              <span className="status"><span className="live-dot" /> IN DEVELOPMENT</span>
              <a className="project-cta project-cta--secondary" href="mailto:anirudhjayakumar.business@gmail.com?subject=Plateau">Ask me about Plateau <ArrowUpRight size={17} /></a>
            </div>
          </div>
          <div className="feature__bottom"><span>AN IDEA TAKING SHAPE</span><span>NOT YET RELEASED</span></div>
        </article>

        <div className="experiments">
          <div className="experiments__heading">
            <div><p className="eyebrow">03 / OTHER BUILDS</p><h2>A few more<br /><em>experiments.</em></h2></div>
            <p>Two earlier projects. The code for Review Co-Pilot is available on GitHub.</p>
          </div>
          <div className="experiments__list">
            {experiments.map((item) => (
              <article className="experiment" key={item.number}>
                <span className="experiment__number">{item.number}</span>
                <div><span className="eyebrow">{item.type}</span><h3>{item.name}</h3><p>{item.description}</p></div>
                <a className="experiment__action" href={item.link} target={item.link.startsWith("mailto:") ? undefined : "_blank"} rel={item.link.startsWith("mailto:") ? undefined : "noopener noreferrer"}>{item.linkText} <ArrowUpRight size={16} /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactPage />
      <section className="afterword shell" id="about" data-snap-anchor>
        <div className="afterword__intro">
          <p className="eyebrow">ONE MORE THING / ABOUT ME</p>
          <h2>There’s life<br /><em>outside the screen.</em></h2>
          <p>Previously a frontend engineering intern at QpiAI. Outside work, I’m into photography, music, cars and Formula 1—and curious about how things work, even when they have nothing to do with software.</p>
        </div>
        <PhotoViewer />
        <div className="page-end"><span>ANIRUDH JAYAKUMAR © {new Date().getFullYear()}</span><a href="#top">BACK TO TOP ↑</a></div>
      </section>
    </main>
  );
}
