'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { SiMongodb, SiAngular, SiExpress, SiNodedotjs } from 'react-icons/si'
import { BsArrowUpRight } from 'react-icons/bs'

// --- Tech icons map ---
const technologies = {
  'Angular': { icon: <SiAngular className="text-[#DD0031]" />, name: 'Angular' },
  'NodeJS': { icon: <SiNodedotjs className="text-[#339933]" />, name: 'Node.js' },
  'MongoDB': { icon: <SiMongodb className="text-[#47A248]" />, name: 'MongoDB' },
  'Express': { icon: <SiExpress className="text-white" />, name: 'Express' },
}

// --- Single project ---
const projects = [
  {
    title: 'College Management System',
    description: 'Manages faculty, students, events, courses, and admin panel.',
    technologies: ['Angular', 'NodeJS', 'Express', 'MongoDB'],
    image: '/college.jpg', 
    live: 'https://holycrosscollege.co.in/',
    github: 'https://github.com/StartBitz/hccmat-front-end.git',
  },
]

const DURATION = 22

export default function Projects() {
  const allProjects = [...projects, ...projects] 

  return (
    <motion.section
      id="projects"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 py-16 bg-gradient-to-br from-black via-gray-900 to-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8">
        Our <span className="text-[#b28b64]">Projects</span>
      </h2>

      {/* Auto-scrolling carousel */}
      <div className="relative w-full max-w-6xl overflow-hidden py-8">
        <motion.div
          className="flex gap-8"
          style={{ width: 'max-content' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            duration: DURATION,
          }}
        >
          {allProjects.map((project, idx) => (
            <div
              key={project.title + idx}
              className="relative w-[280px] flex-shrink-0 bg-[#000000]/90 border-2 border-cyan-500/20 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-sm group transition-all duration-300 hover:scale-105 hover:border-cyan-400"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-[#b28b64] mb-2 flex items-center gap-2">
                  {project.title}
                  <motion.span
                    className="text-cyan-400"
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <BsArrowUpRight className="inline-block text-sm" />
                  </motion.span>
                </h3>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-1 bg-cyan-950/30 px-2 py-0.5 rounded-full border border-cyan-500/20"
                    >
                      <span className="text-base">{technologies[tech]?.icon}</span>
                      <span className="text-xs text-gray-300">{technologies[tech]?.name}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-300"
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt className="text-xs" />
                    Live
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full text-sm font-medium border border-white/10 transition-colors duration-300"
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub className="text-sm" />
                    Code
                  </motion.a>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black via-transparent to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black via-transparent to-transparent z-10" />
      </div>

      {/* Hint */}
      <div className="mt-6 flex gap-2 items-center text-cyan-400/60 text-sm font-medium">
        <motion.span animate={{ x: [-5, 0, -5] }} transition={{ duration: 1.5, repeat: Infinity }}>←</motion.span>
        Auto-scrolling carousel
        <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
      </div>
    </motion.section>
  )
}
