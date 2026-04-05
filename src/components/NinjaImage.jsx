import { motion } from 'framer-motion';

export default function NinjaImage({ src, alt = 'Profile' }) {
  return (
    <motion.div
      className="relative w-64 h-64 md:w-80 md:h-80"
      animate={{
        // Ninja jumping movement - up and down with rotation
        y: [0, -30, 0, -20, 0],
        rotate: [0, 5, -5, 3, 0],
        scale: [1, 1.05, 1, 1.03, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1]
      }}
    >
      {/* Glowing aura effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-xl opacity-50"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Spinning shuriken rings */}
      <motion.div
        className="absolute -inset-4 border-2 border-cyan-400/30 rounded-full"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      <motion.div
        className="absolute -inset-8 border-2 border-purple-400/20 rounded-full"
        animate={{
          rotate: -360,
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          rotate: { duration: 12, repeat: Infinity, ease: "linear" },
          scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
        }}
      />

      {/* Main image container with ninja mask effect */}
      <motion.div
        className="relative w-full h-full rounded-full overflow-hidden border-4 border-cyan-400 shadow-2xl"
        style={{
          boxShadow: '0 0 30px rgba(6, 182, 212, 0.5), inset 0 0 30px rgba(6, 182, 212, 0.2)'
        }}
        whileHover={{
          scale: 1.1,
          rotate: 360,
          transition: { duration: 0.8 }
        }}
      >
        {/* Energy wave effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent"
          animate={{
            y: ['100%', '-100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover relative z-10"
        />

        {/* Overlay for ninja aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none z-20" />
      </motion.div>

      {/* Floating particles around the image */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Speed lines effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 1,
        }}
      >
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        <div className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
        <div className="absolute top-2/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
      </motion.div>
    </motion.div>
  );
}
