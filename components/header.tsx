"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white border-b border-gray-200 shadow-md" 
          : "bg-[#12261F]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="shrink-0">
            <div className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? "text-[#12261F]" : "text-white"
            }`}>
              SwitchYard
            </div>
            <div className="text-xs text-[#BD6908] font-medium">FX ADVISORY</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link 
              href="/" 
              className={`transition text-sm font-medium ${
                isScrolled 
                  ? "text-[#4A5A55] hover:text-[#12261F]" 
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`transition text-sm font-medium ${
                isScrolled 
                  ? "text-[#4A5A55] hover:text-[#12261F]" 
                  : "text-gray-300 hover:text-white"
              }`}
            >
              
              About
            </Link>
            <Link 
              href="/services" 
              className={`transition text-sm font-medium ${
                isScrolled 
                  ? "text-[#4A5A55] hover:text-[#12261F]" 
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Services
            </Link>
            <Link
              href="/market-commentary"
              className={`transition text-sm font-medium ${
                isScrolled 
                  ? "text-[#4A5A55] hover:text-[#12261F]" 
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Market Insights
            </Link>
            <Link 
              href="/contact" 
              className={`transition text-sm font-medium ${
                isScrolled 
                  ? "text-[#4A5A55] hover:text-[#12261F]" 
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex gap-4">
            <Link
              href="/login"
              className={`px-6 py-2 rounded-full transition text-sm font-medium border ${
                isScrolled
                  ? "text-[#12261F] hover:bg-[#F5F7F6] border-[#12261F]"
                  : "text-white hover:bg-white/10 border-white"
              }`}
            >
              Login
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2 rounded-full bg-[#BD6908] text-white hover:bg-opacity-90 transition text-sm font-medium"
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 ${isScrolled ? "text-[#12261F]" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link 
              href="/" 
              className={`block px-4 py-2 rounded text-sm ${
                isScrolled
                  ? "text-[#12261F] hover:bg-[#F5F7F6]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`block px-4 py-2 rounded text-sm ${
                isScrolled
                  ? "text-[#12261F] hover:bg-[#F5F7F6]"
                  : "text-white hover:bg-white/10"
              }`}
            >
             About
            </Link>
            <Link 
              href="/services" 
              className={`block px-4 py-2 rounded text-sm ${
                isScrolled
                  ? "text-[#12261F] hover:bg-[#F5F7F6]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Services
            </Link>
            <Link
              href="/market-commentary"
              className={`block px-4 py-2 rounded text-sm ${
                isScrolled
                  ? "text-[#12261F] hover:bg-[#F5F7F6]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Market Insights
            </Link>
            <Link 
              href="/contact" 
              className={`block px-4 py-2 rounded text-sm ${
                isScrolled
                  ? "text-[#12261F] hover:bg-[#F5F7F6]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="w-full mt-4 px-6 py-2 rounded-full bg-[#BD6908] text-white text-sm font-medium block text-center"
            >
              Book a Call
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}