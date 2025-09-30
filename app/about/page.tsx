"use client"

import { motion } from "framer-motion"
import { Check, ChevronRight, ChevronDown, FileText, Folder } from "lucide-react"
import React, { useState, useEffect } from "react"

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
    const [activeSection, setActiveSection] = useState<Section>("personal-info")
    const [activeItem, setActiveItem] = useState(0)
    const [expandedSections, setExpandedSections] = useState<Record<Section, boolean>>({
        "personal-info": true,
        "work-experience": false,
        projects: false,
    })
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

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
                        <button
                            className="flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-md hover:bg-[#2A2D2E] transition-colors text-[#CCCCCC]"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <ChevronRight size={20} className={`transition-transform ${isMobileMenuOpen ? "rotate-90" : ""}`} />
                            <span>Explorer</span>
                        </button>
                    </div>

                    {/* Left Sidebar - File Explorer */}
                    <aside
                        className={`
                    fixed lg:static inset-y-0 left-0 z-40
                    w-[250px] p-0 border-r border-gray-800 
                    flex flex-col text-sm 
                    transform transition-transform duration-200 ease-in-out
                    ${isMobileMenuOpen ? "translate-x-0 bg-black" : "-translate-x-full lg:translate-x-0"}
                    ${isMobileMenuOpen ? "top-0" : "top-0"}
                    overflow-y-auto
                `}
                    >
                        <div className="p-2 text-[#CCCCCC] uppercase text-xs border-b border-gray-800 font-semibold tracking-wide">
                            Explorer
                        </div>
                        <div className="">
                            {/* Personal Info Section */}
                            <div className="py-1">
                                <div
                                    className="flex items-center px-2 py-1 cursor-pointer hover:bg-[#2A2D2E]"
                                    onClick={() => toggleSection("personal-info")}
                                >
                                    {expandedSections["personal-info"] ? (
                                        <ChevronDown size={16} className="text-[#CCCCCC] mr-1" />
                                    ) : (
                                        <ChevronRight size={16} className="text-[#CCCCCC] mr-1" />
                                    )}
                                    <Folder size={16} className="text-[#E8AB53] mr-1" />
                                    <span className="text-[#CCCCCC]">personal-info</span>
                                </div>

                                {expandedSections["personal-info"] && (
                                    <div className="ml-4">
                                        <div
                                            className={`flex items-center px-2 py-1 cursor-pointer ${activeSection === "personal-info" && activeItem === 0 ? "bg-[#37373D]" : "hover:bg-[#2A2D2E]"}`}
                                            onClick={() => handleFileClick("personal-info", 0)}
                                        >
                                            <FileText size={16} className="text-[#75BEFF] mr-1" />
                                            <span className="text-[#CCCCCC]">profile.json</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Work Experience Section */}
                            <div className="py-1">
                                <div
                                    className="flex items-center px-2 py-1 cursor-pointer hover:bg-[#2A2D2E]"
                                    onClick={() => toggleSection("work-experience")}
                                >
                                    {expandedSections["work-experience"] ? (
                                        <ChevronDown size={16} className="text-[#CCCCCC] mr-1" />
                                    ) : (
                                        <ChevronRight size={16} className="text-[#CCCCCC] mr-1" />
                                    )}
                                    <Folder size={16} className="text-[#E8AB53] mr-1" />
                                    <span className="text-[#CCCCCC]">work-experience</span>
                                </div>

                                {expandedSections["work-experience"] && (
                                    <div className="ml-4">
                                        {workExperience.map((work, index) => (
                                            <div
                                                key={index}
                                                className={`flex items-center px-2 py-1 cursor-pointer ${activeSection === "work-experience" && activeItem === index ? "bg-[#37373D]" : "hover:bg-[#2A2D2E]"}`}
                                                onClick={() => handleFileClick("work-experience", index)}
                                            >
                                                <FileText size={16} className="text-[#75BEFF] mr-1" />
                                                <span className="text-[#CCCCCC]">{work.company.toLowerCase()}.js</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Projects Section */}
                            <div className="py-1">
                                <div
                                    className="flex items-center px-2 py-1 cursor-pointer hover:bg-[#2A2D2E]"
                                    onClick={() => toggleSection("projects")}
                                >
                                    {expandedSections["projects"] ? (
                                        <ChevronDown size={16} className="text-[#CCCCCC] mr-1" />
                                    ) : (
                                        <ChevronRight size={16} className="text-[#CCCCCC] mr-1" />
                                    )}
                                    <Folder size={16} className="text-[#E8AB53] mr-1" />
                                    <span className="text-[#CCCCCC]">projects</span>
                                </div>

                                {expandedSections["projects"] && (
                                    <div className="ml-4">
                                        {projects.map((project, index) => (
                                            <div
                                                key={index}
                                                className={`flex items-center px-2 py-1 cursor-pointer ${activeSection === "projects" && activeItem === index ? "bg-[#37373D]" : "hover:bg-[#2A2D2E]"}`}
                                                onClick={() => handleFileClick("projects", index)}
                                            >
                                                <FileText size={16} className="text-[#75BEFF] mr-1" />
                                                <span className="text-[#CCCCCC]">{project.name.toLowerCase().replace(/\s/g, "-")}.tsx</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>

                    {/* Content wrapper - Allows scrolling on mobile */}
                    <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto">
                        {/* Center Panel - Dynamic Content */}
                        <section className="flex-1 p-4 lg:p-6">
                            {activeSection === "personal-info" && (
                                <pre className="text-base leading-relaxed whitespace-pre-wrap">
                                    <code>
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
                                    </code>
                                </pre>
                            )}

                            {activeSection === "work-experience" && (
                                <pre className="text-base leading-relaxed whitespace-pre-wrap">
                                    <code>
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
                                    </code>
                                </pre>
                            )}

                            {activeSection === "projects" && (
                                <pre className="text-base leading-relaxed whitespace-pre-wrap">
                                    <code>
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
                                    </code>
                                </pre>
                            )}
                        </section>

                        {/* Right Panel - Skills & Details */}
                        <aside className="w-full lg:w-[350px] p-4 lg:p-6 border-t lg:border-t-0 lg:border-l border-gray-800 flex flex-col gap-6">
                            {/* First Card - Skills/Technologies */}
                            {activeSection === "work-experience" && (
                                <div className="rounded-xl border border-[#374151] p-4">
                                    <div className="flex items-start justify-start text-start mb-4">
                                        <span className="text-white text-start">
                                            @{workExperience[activeItem].company} • {workExperience[activeItem].duration}
                                        </span>
                                    </div>
                                    <h3 className="text-[#6B7280] mb-3">Technologies & Skills</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {workExperience[activeItem].skills?.map((skill, index) => (
                                            <div key={index} className="flex items-center justify-center sm:justify-start">
                                                <Check size={16} className="text-[#10B981] mr-2 flex-shrink-0" />
                                                <span className="text-[#10B981]">{skill}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeSection === "projects" && (
                                <div className="rounded-xl border border-[#374151] p-4">
                                    <div className="flex items-start justify-start mb-4">
                                        <span className="text-white">{projects[activeItem].name}</span>
                                    </div>
                                    <h3 className="text-[#6B7280] mb-3">Technologies Used</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {projects[activeItem].techstack?.map((tech, index) => (
                                            <div key={index} className="flex items-center justify-center sm:justify-start">
                                                <Check size={16} className="text-[#10B981] mr-2 flex-shrink-0" />
                                                <span className="text-[#10B981]">{tech}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {projects[activeItem].link !== "NA" && (
                                        <div className="mt-4">
                                            <a
                                                href={projects[activeItem].link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#3B82F6] hover:underline"
                                                style={{
                                                    background: "linear-gradient(90deg, #72009C 0%, #72009C 50%, white 50%, white 100%)",
                                                    backgroundSize: "200% 100%",
                                                    WebkitBackgroundClip: "text",
                                                    backgroundClip: "text",
                                                    WebkitTextFillColor: "transparent",
                                                    transition: "background-position 0.5s ease-out"
                                                }}
                                                onMouseEnter={(e) => { e.currentTarget.style.backgroundPosition = "0% 0" }}
                                                onMouseLeave={(e) => { e.currentTarget.style.backgroundPosition = "100% 0" }}
                                            >
                                                View Project →
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeSection === "personal-info" && (
                                <div className="rounded-xl border border-[#374151] p-4">
                                    <div className="flex items-center mb-4">
                                        <span className="text-white mr-2">@anirudh</span>
                                        <span className="text-white text-xs ml-auto">• {personalInfo[0].location}</span>
                                    </div>
                                    <h3 className="text-[#6B7280] mb-3">Interests</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {personalInfo[0].interests.map((interest, index) => (
                                            <div key={index} className="flex items-center justify-center sm:justify-start">
                                                <Check size={16} className="text-[#10B981] mr-2 flex-shrink-0" />
                                                <span className="text-[#10B981]">{interest}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                </main>
            </div>
        </motion.div>
    )
}

export default AboutPage
