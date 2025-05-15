'use client'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaLaptopCode, FaSchool } from 'react-icons/fa'

const cards = [
  {
    icon: <FaGraduationCap />,
    title: 'Product Development',
    subtitle: 'Innovative Digital Solutions',
    details: 'Building scalable and user-centric products | Since 2025',
  },
  {
    icon: <FaLaptopCode />,
    title: 'Web Development',
    subtitle: 'Full-Stack Application Services',
    details: 'Modern, responsive websites & apps tailored to client needs',
  },
  {
    icon: <FaSchool />,
    title: 'Cutting-Edge Technologies',
    subtitle: 'Future-Ready Web Engineering',
    details: 'Utilizing latest tools and frameworks for high performance',
  },
]

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const cardVariants = {
  initial: { 
    scale: 1, 
    y: 0,
    boxShadow: "0 4px 24px 0 rgba(6,182,212,0.10)",
  },
  hover: {
    scale: 1.04,
    y: -8,
    transition: { duration: 0.33, ease: "easeOut" }
  },
  float: {
    y: [0, -6, 0, 6, 0],
    transition: {
      repeat: Infinity,
      duration: 5,
      ease: "easeInOut"
    }
  }
}

const iconVariants = {
  initial: { scale: 1, filter: 'drop-shadow(0 0 0 #22d3ee)' },
  hover: { 
    scale: 1.19, 
    filter: 'drop-shadow(0 0 12px #22d3ee)',
    transition: { duration: 0.38, ease: "easeInOut" }
  }
}

export default function About() {
  return (
    <motion.section
      id="about"
      className="relative flex flex-col items-center justify-center min-h-screen text-white px-6 sm:px-8 lg:px-12 pt-20 pb-24 scroll-mt-24 bg-gradient-to-br from-black via-gray-900 to-black"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6"
        variants={itemVariants}
      >
        About <span className="text-[#b28b64]">STARTBITZ</span>
      </motion.h2>

      <motion.p
        className="max-w-4xl text-center text-gray-300 text-lg sm:text-xl mb-16 font-light tracking-wide leading-relaxed"
        variants={itemVariants}
      >
      StartBitz is a dynamic tech company founded in 2025, driven by a passion for full-stack development, modern web technologies, and cutting-edge UI/UX design. We specialize in building scalable and efficient web applications, continuously adopting the latest tools and frameworks to deliver high-performance, future-ready digital solutions.      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-4xl"
        variants={itemVariants}
      >
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            className="relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-transparent px-7 py-8 flex flex-col items-center justify-center text-center transition-all duration-300 bg-gradient-to-br from-cyan-900/20 to-blue-900/10 backdrop-blur-xl"
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            animate="float"
          >
            {/* Glowing border overlay */}
            <span
              className="pointer-events-none absolute inset-0 z-10 rounded-2xl border-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: '0 0 24px 0 #22d3ee88, 0 0 0 4px #22d3ee22',
                borderImage: 'linear-gradient(100deg, #06b6d4 0%, #3b82f6 100%) 1'
              }}
            />
            {/* Shimmer overlay */}
            <span className="absolute inset-0 pointer-events-none z-0 animate-shimmer opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

            {/* Icon */}
            <motion.div
              variants={iconVariants}
              className="relative z-20 flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/20 shadow-lg group-hover:shadow-cyan-400/30 transition-all duration-300"
            >
              <span className="text-cyan-300 text-3xl group-hover:text-cyan-100 transition-all duration-300">
                {card.icon}
              </span>
            </motion.div>

            <h3 className="text-xl font-bold text-[#b28b64] mb-1 relative z-20 drop-shadow">
              {card.title}
            </h3>
            <p className="text-sm text-gray-300 mb-1.5 relative z-20 font-medium">
              {card.subtitle}
            </p>
            <p className="text-xs font-semibold text-cyan-400 relative z-20">
              {card.details}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Custom shimmer animation */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -450px 0 }
          100% { background-position: 450px 0 }
        }
        .animate-shimmer {
          background: linear-gradient(120deg, transparent 30%, rgba(6,182,212,0.22) 50%, transparent 70%);
          background-size: 900px 100%;
          animation: shimmer 2.2s linear infinite;
        }
      `}</style>
    </motion.section>
  )
}
