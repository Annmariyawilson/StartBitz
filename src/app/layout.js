'use client'

import './globals.css'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import { FaArrowUp } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import CursorTrail from '@/components/CursorTrail'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from '@/components/LoadingScreen'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Achievements from '@/components/Achievements'

export default function RootLayout({ children }) {
  const [showButton, setShowButton] = useState(false)
  const [loading, setLoading] = useState(true)

  // Add scroll event listener to show/hide button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle loading screen
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited')
    if (hasVisited) {
      setLoading(false)
    }
  }, [])

  const finishLoading = () => {
    setLoading(false)
    localStorage.setItem('hasVisited', 'true')
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <html lang="en" className="scroll-smooth">
      <body>
        
        <CursorTrail />
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingScreen finishLoading={finishLoading} key="loading" />
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full relative"
            >
              {/* Single Navbar */}
              <Navbar />
              
              {/* Main content without extra padding */}
              <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Achievements />
              </main>

              <AnimatePresence>
                {showButton && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-cyan-400 text-black p-3 rounded-full shadow-lg hover:bg-cyan-500 transition-all duration-300 focus:outline-none z-50"
                    aria-label="Scroll to top"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaArrowUp className="text-xl" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </body>
    </html>
  );
}