"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaMedal } from "react-icons/fa";

const achievements = [
  {
    title: "Client-Acclaimed Projects – 2025",
    description: "Delivered high-quality web applications that impressed clients with performance, design, and reliability.",
    images: ["/achive.jpg", "/achive2.jpg", "/achive3.jpg"],
  },
  // Add more achievements if you want!
];

const cardVariants = {
  initial: { opacity: 0, y: 40, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -40,
    scale: 0.96,
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

export default function Achievements() {
  // Carousel logic
  const [imgIdx, setImgIdx] = useState(0);
  const images = achievements[0].images;
  useEffect(() => {
    const timer = setTimeout(() => {
      setImgIdx((prev) => (prev + 1) % images.length);
    }, 2600);
    return () => clearTimeout(timer);
  }, [imgIdx, images.length]);

  return (
    <motion.section
      id="achievements"
      className="relative flex flex-col items-center justify-center min-h-screen px-6 sm:px-8 lg:px-12 py-20 scroll-mt-24 bg-gradient-to-br from-black via-gray-900 to-black"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
      >
        <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
          Achievements
        </span>
      </motion.h2>

      <motion.div
        className="relative w-full max-w-xl mx-auto"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div
          className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-transparent group mx-auto"
          style={{
            background:
              "linear-gradient(120deg, rgba(6,182,212,0.14) 0%, rgba(255,255,255,0.06) 100%)",
            backdropFilter: "blur(18px)",
          }}
        >
          {/* Animated border overlay */}
          <span
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl border-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{
              boxShadow: "0 0 24px 0 #22d3ee88, 0 0 0 4px #22d3ee22",
              borderImage: "linear-gradient(100deg, #06b6d4 0%, #fff 100%) 1",
            }}
          />

          {/* Carousel Image */}
          <div className="relative h-64 w-full bg-black/40 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={images[imgIdx]}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <Image
                  src={images[imgIdx]}
                  alt="Achievement"
                  fill
                  className="object-cover object-center"
                  quality={90}
                  style={{ borderRadius: "1rem" }}
                  priority
                />
                {/* Optional overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </motion.div>
            </AnimatePresence>
            {/* Carousel dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border border-cyan-400/60 ${
                    i === imgIdx ? "bg-cyan-400" : "bg-white/20"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="relative z-20 p-7 flex flex-col items-center text-center bg-gradient-to-t from-black/60 via-black/30 to-transparent">
            <motion.div
              whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="mb-4"
            >
              <FaMedal className="text-4xl text-yellow-400 drop-shadow-glow" />
            </motion.div>
            <h3 className="text-[#b28b64] text-sm mb-3 line-clamp-2 font-bold">
              {achievements[0].title}
            </h3>
            <p className="text-white text-sm mb-3 line-clamp-2">
              {achievements[0].description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Custom drop-shadow for medal */}
      <style jsx global>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px #22d3ee) drop-shadow(0 0 2px #06b6d4);
        }
      `}</style>
    </motion.section>
  );
}
