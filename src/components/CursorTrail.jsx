'use client'
import { useEffect, useRef } from 'react'

// Number of particles in the trail
const TRAIL_LENGTH = 20 // Increased length slightly

export default function CursorTrail() {
  const trailRef = useRef([])

  useEffect(() => {
    // Create trail elements
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const el = document.createElement('div')
      el.className = 'cursor-trail-dot'
      el.style.position = 'fixed'
      el.style.pointerEvents = 'none'
      el.style.zIndex = 9999
      // Start slightly larger and decrease size more noticeably
      const size = Math.max(1, 4 - i * 0.2)
      el.style.width = `${size}px`
      el.style.height = `${size}px`
      el.style.borderRadius = '50%'
      // Vibrant cyan/magenta glow effect
      el.style.backgroundColor = 'rgba(255, 255, 255, 0.8)' // Core white dot - CHANGE THIS
      el.style.boxShadow = `
        0 0 8px 3px rgba(0, 255, 255, 0.7),  // CHANGE THIS (e.g., 'rgba(255, 215, 0, 0.7)' for gold)
        0 0 12px 5px rgba(255, 0, 255, 0.5)   // CHANGE THIS (e.g., 'rgba(255, 165, 0, 0.5)' for orange)
      `
      // Smooth transitions for position and opacity
      el.style.transition = `transform 0.1s linear, opacity 0.2s linear`
      // Adjust opacity falloff
      el.style.opacity = `${1 - i / (TRAIL_LENGTH + 5)}`
      el.style.transform = 'translate(-50%, -50%)'
      document.body.appendChild(el)
      trailRef.current.push(el)
    }


    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    let positions = Array.from({ length: TRAIL_LENGTH }, () => ({ ...mouse }))

    const move = (e) => {
      mouse = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      positions.unshift({ ...mouse })
      positions = positions.slice(0, TRAIL_LENGTH)
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const { x, y } = positions[i]
        const el = trailRef.current[i]
        if (el) {
          // Apply a slight delay based on index for smoother follow
          const delay = i * 0.005 // Small delay in seconds
          el.style.transitionDelay = `${delay}s`
          el.style.left = `${x}px`
          el.style.top = `${y}px`
        }
      }
      requestAnimationFrame(animate)
    }

    document.body.style.cursor = 'none'
    window.addEventListener('mousemove', move)
    animate()

    return () => {
      window.removeEventListener('mousemove', move)
      document.body.style.cursor = 'auto'
      trailRef.current.forEach((el) => document.body.removeChild(el))
      trailRef.current = []
    }
  }, [])

  return null
}
