"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaCode,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const navLinks = ["Home", "About", "Skills", "Projects", "Achievements"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetElement = document.querySelector(`#${targetId}`);
    if (targetElement) {
      // Add offset for fixed navbar height
      const headerOffset = 20; // Adjust based on your navbar height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const linkVariants = {
    initial: { y: 0 },
    hover: { y: -2 },
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: 5 },
  };

  return (
    <header className="navbar-fixed pt-4">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 relative">
        {/* Modernized Glassmorphism Background */}
        <div className="absolute inset-0 mx-2 sm:mx-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 shadow-lg" />
          {/* Subtle animated border */}
          <div className="absolute inset-0 rounded-xl p-[1px] overflow-hidden">
             <motion.div
               className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
               initial={{ x: "-100%" }}
               animate={{ x: "100%" }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             />
          </div>
        </div>

        {/* Updated Logo */}
        <motion.div
          className="relative z-10 flex items-baseline space-x-1 cursor-pointer select-none group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover="hover"
        >
          <motion.span
            className="text-3xl font-bold text-cyan-400 group-hover:text-white transition-colors duration-300"
            variants={linkVariants}
          >
            Start
          </motion.span>
          <motion.span
            className="text-xl font-light text-gray-300 group-hover:text-cyan-300 transition-colors duration-300 tracking-wider"
            variants={linkVariants}
            transition={{ delay: 0.05 }}
          >
            Bitz
          </motion.span>
        </motion.div>

        {/* Updated Navigation Links */}
        <ul className="hidden md:flex items-center space-x-6 relative z-10">
          {navLinks.map((link) => (
            <li key={link} className="relative group">
              <motion.a
                href={`#${link.toLowerCase()}`}
                onClick={(e) => handleSmoothScroll(e, link.toLowerCase())}
                className="px-3 py-2 text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-white relative"
                whileHover="hover"
                initial="initial"
                variants={linkVariants}
              >
                {link}
                {/* Underline Hover Effect */}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400"
                  initial={{ scaleX: 0 }}
                  variants={{ hover: { scaleX: 1 } }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0.5 }} // Center the origin for scaling
                />
              </motion.a>
            </li>
          ))}
        </ul>

        {/* Updated Social Links */}
        <div className="hidden md:flex items-center space-x-4 relative z-10">
          {[
            { href: "https://www.linkedin.com", icon: FaLinkedin, label: "LinkedIn" },
            { href: "https://github.com", icon: FaGithub, label: "GitHub" },
            { href: "https://mail.google.com/mail/?view=cm&fs=1&to=startbitz408@gmail.com", icon: FaEnvelope, label: "Email" },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              aria-label={social.label}
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
            >
              <social.icon className="text-xl" />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden relative z-10 p-2 text-gray-300 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </motion.button>

        {/* Updated Mobile Menu */}
        <motion.div
          className="md:hidden fixed inset-0 bg-black/90 backdrop-blur-sm z-40 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: menuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ pointerEvents: menuOpen ? "auto" : "none" }}
        >
          <motion.div
            className="w-64 bg-gray-900/80 backdrop-blur-lg h-full p-6 shadow-xl border-l border-white/10"
            initial={{ x: "100%" }}
            animate={{ x: menuOpen ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              className="absolute top-6 right-6 text-gray-400 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes size={24} />
            </button>
            <ul className="mt-16 space-y-6">
              {navLinks.map((link) => (
                <li key={link}>
                  <motion.a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => handleSmoothScroll(e, link.toLowerCase())}
                    className="block px-4 py-2 text-lg text-gray-300 font-medium rounded-md transition-colors duration-300 hover:text-cyan-400 hover:bg-white/5"
                    whileTap={{ scale: 0.95 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
              {/* Mobile Social Links */}
              <li className="pt-6 border-t border-white/10">
                <div className="flex justify-center space-x-6">
                 {[
                    { href: "https://www.linkedin.com", icon: FaLinkedin, label: "LinkedIn" },
                    { href: "https://github.com", icon: FaGithub, label: "GitHub" },
                    { href: "https://mail.google.com/mail/?view=cm&fs=1&to=startbitz408@gmail.com", icon: FaEnvelope, label: "Email" },
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                      aria-label={social.label}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon className="text-2xl" />
                    </motion.a>
                  ))}
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </nav>
    </header>
  );
}
