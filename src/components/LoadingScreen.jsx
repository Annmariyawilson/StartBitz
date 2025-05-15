'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCode } from 'react-icons/fa'

export default function LoadingScreen({ finishLoading }) {
  const [counter, setCounter] = useState(0)
  const [iconPositions, setIconPositions] = useState([])

  useEffect(() => {
    // Precompute random positions for the floating icons
    const positions = Array.from({ length: 15 }, () => ({
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200,
    }))
    setIconPositions(positions)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => finishLoading(), 2500)
    return () => clearTimeout(timer)
  }, [finishLoading])

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevCounter + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.8, ease: 'easeInOut' },
      }}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-5xl sm:text-7xl font-bold relative text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="text-[#b28b64]">Start</span>
          <motion.span
            className="text-cyan-400"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Bitz
          </motion.span>
        </motion.div>

        <div className="w-64 h-3 bg-gray-800 rounded-full mt-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${counter}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>

        <motion.div
          className="mt-3 text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {counter}% loaded
        </motion.div>

        {/* Floating code particles */}
        <div className="absolute inset-0 -z-10">
          {iconPositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute text-cyan-400/30"
              initial={{
                x: pos.x,
                y: pos.y,
                opacity: 0,
              }}
              animate={{
                x: 0,
                y: 0,
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <FaCode className="w-4 h-4" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}