"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'

const Navbar = () => {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navbarRef = useRef<HTMLDivElement>(null)

    // Helper function to determine if a path is active
    const isActive = (path: string) => pathname === path

    // Handle clicks outside the navbar
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // Close menu when pathname changes (link clicked)
    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname])

    return (
        <div className='flex flex-row justify-between w-full relative' ref={navbarRef}>
            {/* Logo - always visible */}
            <div className='pb-3 pt-3 pr-10 pl-3 border-r border-b text-white'>anirudh_jayakumar</div>

            {/* Desktop Navigation */}
            <div className='hidden md:flex flex-row items-center'>
                <NavItem path="/" label="_hello.tsx" isActive={isActive('/')} />
                <NavItem path="/about" label="_about.ts" isActive={isActive('/about')} />
                <NavItem path="/contact" label="_contact.tsx" isActive={isActive('/contact')} />
            </div>

            {/* Mobile Menu Button */}
            <button
                className='md:hidden p-3 text-white border-l border-b'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? '✕' : '☰'}
            </button>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden absolute top-full left-0 right-0 bg-[#0b0f1c] border-b z-50 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className='flex flex-col'>
                    <MobileNavItem path="/" label="_hello.tsx" isActive={isActive('/')} />
                    <MobileNavItem path="/about" label="_about.ts" isActive={isActive('/about')} />
                    <MobileNavItem path="/contact" label="_contact.tsx" isActive={isActive('/contact')} />
                </div>
            </div>

            {/* Middle section with just bottom border */}
            <div className='hidden md:block flex-grow border-b'></div>
        </div>
    )
}

// NavItem component for consistent styling and behavior
const NavItem = ({ path, label, isActive, className = "" }: { path: string, label: string, isActive: boolean, className?: string }) => {
    return (
        <div className={`p-3 text-white border-l border-r ${isActive ? 'border-b-2 border-b-orange-500' : 'border-b'} ${className}`}>
            <Link href={path}>{label}</Link>
        </div>
    )
}

// Mobile NavItem component with different styling
const MobileNavItem = ({ path, label, isActive }: { path: string, label: string, isActive: boolean }) => {
    return (
        <div className={`p-4 text-white border-b ${isActive ? 'bg-[#1a1f2e]' : ''}`}>
            <Link href={path} className="block">{label}</Link>
        </div>
    )
}

export default Navbar