'use client'
import { useCallback } from 'react'
// Using loadSlim should be fine for the 'connect' mode
import { loadSlim } from "tsparticles-slim"
import Particles from "react-tsparticles"

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    try {
      await loadSlim(engine)
    } catch (error) {
      console.error("Failed to initialize particles:", error)
    }
  }, [])

  return (
    <Particles
      id="tsparticles"
      // Added -z-10 to ensure it's behind other content
      className="pointer-events-none w-full h-full fixed inset-0 -z-10"
      init={particlesInit}
      options={{
        fullScreen: false,
        fpsLimit: 60,
        particles: {
          number: {
            value: 80, // Kept the number, adjust if too dense/sparse
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#06b6d4" // Cyan color
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: { min: 0.1, max: 0.4 }, // Slightly reduced max opacity
            random: true,
          },
          size: {
            value: { min: 1, max: 2 }, // Made particles tinier
            random: true
          },
          links: {
            enable: true, // Links are enabled for the base state
            distance: 150,
            color: "#ffffff", // Use white or a light cyan for links
            opacity: 0.1, // Reduced base link opacity
            width: 1
          },
          move: {
            enable: true,
            speed: 1, // Kept speed simple
            direction: "none",
            random: true, // Random movement looks more natural
            straight: false,
            outModes: {
              default: "out" // Particles drift off screen
            }
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab" // Changed mode to grab
            },
            // Removed onClick interactivity for simplicity, add back if needed
            // onClick: {
            //   enable: true,
            //   mode: "push"
            // }
          },
          modes: {
            // Add grab configuration
            grab: {
              distance: 140, // Distance cursor needs to be to grab particles
              links: {
                opacity: 0.2 // Opacity of the lines created by grab
              }
            },
            // Removed connect configuration
            // connect: {
            //   distance: 100,
            //   links: {
            //     opacity: 0.6
            //   },
            //   radius: 150
            // }
            // Removed push mode settings
            // push: {
            //   quantity: 4
            // }
          }
        },
        detectRetina: true
      }}
    />
  )
}