"use client";

import FlowingMenu, { MenuItemProps } from "../FlowingMenu";
import CloudBackgroundLayer from "./cloud-background";
import { Mail } from "lucide-react";
import { Instagram, Linkedin, Github } from "../social-icons";

const links: MenuItemProps[] = [
  { link: "mailto:anirudhjayakumar.business@gmail.com", text: "Email", icon: Mail, brand: "gmail" },
  { link: "https://www.instagram.com/anirudh.cr2/", text: "Instagram", icon: Instagram, brand: "instagram" },
  { link: "https://www.linkedin.com/in/anirudhjayakumar/", text: "LinkedIn", icon: Linkedin, brand: "linkedin" },
  { link: "https://github.com/Anirudh-rb26", text: "Github", icon: Github, brand: "github" },
];

export default function ContactPage() {
  return <section id="contact" className="contact-panel" data-snap-anchor><div className="contact-clouds" aria-hidden="true"><CloudBackgroundLayer className="w-full h-full" cloudCount={8}/></div><div className="contact-content"><div className="contact-heading"><p className="eyebrow">04 / GET IN TOUCH</p><h2>Let’s <em>talk.</em></h2><p>Have something in mind? My inbox is open.</p></div><FlowingMenu items={links}/></div></section>;
}
