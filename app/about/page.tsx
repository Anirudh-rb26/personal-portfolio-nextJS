"use client"

import { AnimatePresence, motion } from "framer-motion"
import React, { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import FolderSection from "@/components/folder-selection"
import FileItem from "@/components/file-item"
import ContentPanel from "@/components/content-panel"
import CodeBlock from "@/components/code-block"
import SkillCard from "@/components/skill-card"
import ProjectCard from "@/components/project-card"

type Section = "personal-info" | "work-experience" | "projects"

const personalInfo = [
    {
        name: "Anirudh Jayakumar",
        age: 23,
        location: "Bangalore, India",
        education: "B.Tech in Computer Science and Engineering",
        certification: ["Diploma in Photography"],
        interests: [
            "Web Development",
            "Mobile Development",
            "Machine Learning",
            "Artificial Intelligence",
            "Photography",
            "F1",
            "Technology",
            "Gaming",
        ],
        highSchool: "International Indian School, Al-Jubail, Saudi Arabia",
        university: "NIT Rourkela",
    },
]

const workExperience = [
    {
        company: "Qpi Ai",
        position: "Software Engineer",
        duration: "2024 - 2025",
        description: [
            "Spearheaded development of the patent‐pending Fewshot Annotation feature using API streams and Hatchet, delivering enterprise‐grade stability and performance optimization.",
            "Engineered critical ML infrastructure by implementing hyperparameter integration for model training pipelines and architecting LLM deployment workflows.",
            "Conducted systematic debugging and performance optimization across platform components while developing responsive landing sites to enhance product visibility and user acquisition.",
        ],
        skills: ["Next.js", "React", "TypeScript", "Node.js", "API Integration", "Hatchet", "Flyte"],
    },
]

const projects = [
    {
        name: "Qpi Ai Pro",
        description: "Qpi AI Pro's landing site.",
        techstack: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Node.js", "Framer Motion"],
        link: "https://qpiai-pro.tech",
    },
    {
        name: "Reveiw Co-Pilot",
        description: "AI-powered review analytics platform using FastAPI and Next.js — leveraging NLTK sentiment analysis, TF-IDF similarity search, and Gemini LLM responses with a SQLite backend.",
        techstack: ["Next.js", "Tailwind CSS", "TypeScript", "React", "FastAPI", "Scikit", "NLTK", "Gemini", "Python"],
        link: "https://review-copilot-frontend.vercel.app/"
    },
    {
        name: "Convoflow",
        description: "Real-time AI chat system that combines LiveKit's real-time communication capabilities with memory-enhanced contextual conversations using Mem0 and Google's Gemini AI.",
        techstack: ["Next.js", "Tailwind CSS", "TypeScript", "React", "FastAPI", "LiveKit", "Mem0", "Gemini"],
        link: "https://github.com/Anirudh-rb26/ConvoFlow"
    },
    {
        name: "AI Interview Bot",
        description:
            "An intelligent interviewing platform that conducts automated interviews based on resumes and job descriptions, providing comprehensive feedback and candidate evaluation.",
        techstack: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Node.js", "Google AI Studio", "Supabase"],
        link: "https://github.com/Anirudh-rb26/ai-interviewer",
    },
    {
        name: "Interview Question Generator",
        description:
            "AI-powered tool that generates customized interview questions based on job role, description, and experience level",
        techstack: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Node.js", "Google AI Studio"],
        link: "https://interview-question-generator-five.vercel.app/",
    },
    {
        name: "DepthText",
        description: "Computer vision app that adds text behind subjects in images using Mobile-SAM for segmentation",
        techstack: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Node.js", "Mobile-SAM", "ONNX"],
        link: "In Progress",
    },
    {
        name: "Airbnb Clone",
        description: "Full-stack Airbnb clone with property listings, booking, and user authentication",
        techstack: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Node.js", "Supabase", "Prisma", "Kinde"],
        link: "https://airbnb-clone-3h68.vercel.app/",
    },
    {
        name: "Zoom Clone",
        description: "Video conferencing application with real-time communication features",
        techstack: ["React", "WebRTC", "Socket.io"],
        link: "https://zoom-clone-ike9.vercel.app/",
    },
]

const AboutPage = () => {
    const [activeItem, setActiveItem] = useState(0);
    const [activeSection, setActiveSection] = useState<Section>("personal-info");
    const [isMounted, setIsMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Record<Section, boolean>>({
        "personal-info": true,
        "work-experience": false,
        projects: false,
    });

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Add click outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (isMobileMenuOpen && !target.closest("aside") && !target.closest("button")) {
                setIsMobileMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isMobileMenuOpen])

    const toggleSection = (section: Section) => {
        setExpandedSections({
            ...expandedSections,
            [section]: !expandedSections[section],
        })
        setActiveSection(section)
        setActiveItem(0)
    }

    const handleFileClick = (section: Section, index: number) => {
        setActiveSection(section)
        setActiveItem(index)
        // Close mobile menu only when clicking files
        setIsMobileMenuOpen(false)
    }

    if (!isMounted) {
        return null
    }

    return (
        <motion.div
            className="mt-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
        >
            <div className="flex flex-col min-h-screen font-mono text-base leading-relaxed relative overflow-hidden">
                {/* Main content - Responsive layout */}
                <main className="flex-1 flex flex-col lg:flex-row overflow-auto">
                    {/* Mobile Menu Toggle - Embedded in content */}
                    <div className="lg:hidden p-4 border-b border-gray-800">
                        <motion.button
                            className="mobile-toggle flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-md hover:bg-[#2A2D2E] transition-colors text-[#CCCCCC]"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <motion.div className="absolute inset-0 bg-[#72009C] opacity-0 group-hover:opacity-10 transition-opacity" />
                            <motion.div
                                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <ChevronRight size={20} />
                            </motion.div>
                            <span>Explorer</span>
                        </motion.button>
                    </div>

                    {/* Mobile Menu Backdrop */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Left Sidebar - File Explorer */}
                    {/* ${isMobileMenuOpen ? "top-0" : "top-0"} */}
                    <motion.aside
                        className={`fixed lg:static inset-y-0 left-0 z-40 w-[250px] p-0 border-r border-gray-800  flex flex-col text-sm transform transition-transform duration-200 ease-in-out 
                            ${isMobileMenuOpen ? "translate-x-0 bg-black" : "-translate-x-full lg:translate-x-0"} 
                            overflow-y-auto`}
                        style={{ transform: isMobileMenuOpen ? 'translateX(0)' : undefined }}
                    >
                        <div className="p-2 text-[#CCCCCC] uppercase text-xs border-b border-gray-800 font-semibold tracking-wide">
                            Explorer
                        </div>
                        <div className="">
                            <FolderSection
                                title="personal-info"
                                isExpanded={expandedSections["personal-info"]}
                                onToggle={() => toggleSection("personal-info")}
                            >
                                <FileItem
                                    name="profile.json"
                                    isActive={activeSection === "personal-info" && activeItem === 0}
                                    onClick={() => handleFileClick("personal-info", 0)}
                                />
                            </FolderSection>
                            <FolderSection
                                title="work-experience"
                                isExpanded={expandedSections["work-experience"]}
                                onToggle={() => toggleSection("work-experience")}
                            >
                                {workExperience.map((work, index) => (
                                    <FileItem
                                        key={index}
                                        name={`${work.company.toLowerCase()}.js`}
                                        isActive={activeSection === "work-experience" && activeItem === index}
                                        onClick={() => handleFileClick("work-experience", index)}
                                    />
                                ))}
                            </FolderSection>

                            <FolderSection
                                title="projects"
                                isExpanded={expandedSections["projects"]}
                                onToggle={() => toggleSection("projects")}
                            >
                                {projects.map((project, index) => (
                                    <FileItem
                                        key={index}
                                        name={`${project.name.toLowerCase().replace(/\s/g, "-")}.tsx`}
                                        isActive={activeSection === "projects" && activeItem === index}
                                        onClick={() => handleFileClick("projects", index)}
                                    />
                                ))}
                            </FolderSection>

                        </div>
                    </motion.aside>

                    {/* Content wrapper - Allows scrolling on mobile */}
                    <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto">
                        <section className="flex-1 p-4 lg:p-6">
                            <AnimatePresence mode="wait">
                                {activeSection === "personal-info" && (
                                    <ContentPanel key="personal-info">
                                        <CodeBlock>
                                            <span className="text-[#6B7280]">{"/**"}</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> * About {personalInfo[0].name}</span>
                                            <br />
                                            <span className="text-[#9CA3AF]">
                                                {" "}
                                                * Full-stack developer specializing in React, TypeScript, and Cloud Architecture
                                            </span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> *</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> * </span>
                                            <span className="text-[#3B82F6]">[Location]</span>
                                            <span className="text-[#9CA3AF]"> {personalInfo[0].location}</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> * </span>
                                            <span className="text-[#3B82F6]">[Education]</span>
                                            <span className="text-[#9CA3AF]"> {personalInfo[0].education}</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> * </span>
                                            <span className="text-[#3B82F6]">[Certifications]</span>
                                            <span className="text-[#9CA3AF]"> {personalInfo[0].certification.join(", ")}</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> * </span>
                                            <span className="text-[#3B82F6]">[University]</span>
                                            <span className="text-[#9CA3AF]"> {personalInfo[0].university}</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> * </span>
                                            <span className="text-[#3B82F6]">[High School]</span>
                                            <span className="text-[#9CA3AF]"> {personalInfo[0].highSchool}</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> * </span>
                                            <span className="text-[#3B82F6]">[Age]</span>
                                            <span className="text-[#9CA3AF]"> {personalInfo[0].age}</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> * </span>
                                            <span className="text-[#3B82F6]">[Interests]</span>
                                            <span className="text-[#9CA3AF]"> {personalInfo[0].interests.join(", ")}</span>
                                            <br />
                                            <span className="text-[#6B7280]"> */</span>
                                        </CodeBlock>
                                    </ContentPanel>
                                )}

                                {activeSection === "work-experience" && (
                                    <ContentPanel key={`work-${activeItem}`}>
                                        <CodeBlock>
                                            <span className="text-[#6B7280]">{"/**"}</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> * Work Experience: {workExperience[activeItem].company}</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> * Position: {workExperience[activeItem].position}</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> * Duration: {workExperience[activeItem].duration}</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> *</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> * Key Achievements:</span>
                                            <br />
                                            {workExperience[activeItem].description.map((desc, index) => (
                                                <React.Fragment key={index}>
                                                    <span className="text-[#9CA3AF]">
                                                        {" "}
                                                        * {index + 1}. {desc}
                                                    </span>
                                                    <br />
                                                </React.Fragment>
                                            ))}
                                            <span className="text-[#6B7280]"> */</span>
                                        </CodeBlock>
                                    </ContentPanel>
                                )}

                                {activeSection === "projects" && (
                                    <ContentPanel key={`project-${activeItem}`}>
                                        <CodeBlock>
                                            <span className="text-[#6B7280]">{"/**"}</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> * Project: {projects[activeItem].name}</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> *</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> * Description: {projects[activeItem].description}</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> *</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> * Tech Stack: {projects[activeItem].techstack?.join(", ")}</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> *</span>
                                            <br />
                                            <span className="text-[#9CA3AF]"> * Link: </span>
                                            <span className="text-[#3B82F6] hover:underline">
                                                <a href={projects[activeItem].link}>{projects[activeItem].link}</a>
                                            </span>
                                            <br />
                                            <span className="text-[#6B7280]"> */</span>
                                        </CodeBlock>
                                    </ContentPanel>
                                )}
                            </AnimatePresence>
                        </section>

                        {/* Right Panel - Skills & Details */}
                        <aside className="w-full lg:w-[350px] p-4 lg:p-6 border-t lg:border-t-0 lg:border-l border-gray-800 flex flex-col gap-6">
                            <AnimatePresence mode="wait">
                                {activeSection === "work-experience" && (
                                    <SkillCard
                                        key={`work-card-${activeItem}`}
                                        title={`@${workExperience[activeItem].company} • ${workExperience[activeItem].duration}`}
                                        subtitle="Technologies & Skills"
                                        items={workExperience[activeItem].skills}
                                    />
                                )}

                                {activeSection === "projects" && (
                                    <ProjectCard
                                        key={`project-card-${activeItem}`}
                                        project={projects[activeItem]}
                                    />
                                )}

                                {activeSection === "personal-info" && (
                                    <SkillCard
                                        key="personal-card"
                                        title={`@anirudh • ${personalInfo[0].location}`}
                                        subtitle="Interests"
                                        items={personalInfo[0].interests}
                                    />
                                )}
                            </AnimatePresence>
                        </aside>
                    </div>
                </main>
            </div>
        </motion.div >
    )
}

export default AboutPage
