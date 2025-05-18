import { TypingAnimation } from '@/components/ui/typing-animation'
import React from 'react'

const ContactPage = () => {
    const links = {
        email: "mailto:anirudhjayakumar.business@gmail.com",
        github: "https://github.com/Anirudh-rb26",
        x: "https://x.com/anirudh_rb26",
        linkedin: "https://linkedin.com/in/anirudhjayakumar",
        instagram: "https://instagram.com/anirudh.cr2"
    };

    return (
        <div className="flex flex-col min-h-screen font-mono text-base leading-relaxed">
            {/* Main content */}
            <main className="flex-1 flex flex-col items-start justify-center px-4 sm:px-8 md:px-16 lg:px-55">
                {/* Hero section */}
                <div className="text-start mb-8 sm:mb-16 w-full">
                    <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-2">Check out</h1>
                    <div className="flex text-[#3B82F6] text-lg sm:text-xl text-start">
                        <span>&gt; </span>
                        <TypingAnimation
                            className="text-[#3B82F6] text-lg sm:text-xl text-start"
                            text=" My Socials"
                        />
                    </div>
                </div>

                {/* Code-style info block */}
                <div className="w-full text-left">
                    <pre className="text-white leading-relaxed text-sm sm:text-base whitespace-pre-wrap break-all">
                        <code>
                            <span className="text-[#6B7280]">{"// e-mail"}</span>
                            <br />
                            <span className="text-[#10B981]">const</span> email ={" "}
                            <a href={links.email} className="text-[#F97316] break-words hover:underline" target="_blank" rel="noopener noreferrer">
                                &quot;anirudhjayakumar.business@gmail.com&quot;
                            </a>;
                            <br />
                            <br />
                            <span className="text-[#6B7280]">{"// Github page"}</span>
                            <br />
                            <span className="text-[#10B981]">const</span> githubLink ={" "}
                            <a href={links.github} className="text-[#F97316] break-words hover:underline" target="_blank" rel="noopener noreferrer">
                                &quot;https://github.com/Anirudh-rb26&quot;
                            </a>;
                            <br />
                            <br />
                            <span className="text-[#6B7280]">{"// X"}</span>
                            <br />
                            <span className="text-[#10B981]">const</span> XPage ={" "}
                            <a href={links.x} className="text-[#F97316] break-words hover:underline" target="_blank" rel="noopener noreferrer">
                                &quot;https://x.com/anirudh_rb26&quot;
                            </a>;
                            <br />
                            <br />
                            <span className="text-[#6B7280]">{"// LinkedIn page"}</span>
                            <br />
                            <span className="text-[#10B981]">const</span> linkedinLink ={" "}
                            <a href={links.linkedin} className="text-[#F97316] break-words hover:underline" target="_blank" rel="noopener noreferrer">
                                &quot;https://linkedin.com/in/anirudhjayakumar&quot;
                            </a>;
                            <br />
                            <br />
                            <span className="text-[#6B7280]">{"// Instagram page"}</span>
                            <br />
                            <span className="text-[#10B981]">const</span> instagramLink ={" "}
                            <a href={links.instagram} className="text-[#F97316] break-words hover:underline" target="_blank" rel="noopener noreferrer">
                                &quot;https://instagram.com/anirudh.cr2&quot;
                            </a>;
                        </code>
                    </pre>
                </div>
            </main>
        </div>
    )
}

export default ContactPage