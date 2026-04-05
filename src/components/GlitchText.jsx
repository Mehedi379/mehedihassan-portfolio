import { motion } from 'framer-motion';

export default function GlitchText({ text, className = '' }) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main text */}
      <motion.span
        className="relative z-10"
        animate={{
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.span>
      
      {/* Glitch layer 1 - cyan */}
      <motion.span
        className="absolute top-0 left-0 -z-10 text-cyan-400 opacity-70"
        animate={{
          x: [-2, 2, -1, 0],
          y: [1, -1, 0, 0],
          opacity: [0.7, 0, 0.7, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
        style={{
          clipPath: 'inset(20% 0 40% 0)',
        }}
      >
        {text}
      </motion.span>
      
      {/* Glitch layer 2 - magenta */}
      <motion.span
        className="absolute top-0 left-0 -z-10 text-pink-500 opacity-70"
        animate={{
          x: [2, -2, 1, 0],
          y: [-1, 1, 0, 0],
          opacity: [0.7, 0, 0.7, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 2.5,
          ease: "easeInOut",
        }}
        style={{
          clipPath: 'inset(50% 0 10% 0)',
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}
