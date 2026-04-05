import { motion } from 'framer-motion';
import { Gamepad2, Zap, Star } from 'lucide-react';

export default function GamingAvatar() {
  return (
    <motion.div
      className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96"
      animate={{
        y: [0, -20, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Outer rotating hexagon frame */}
      <motion.div
        className="absolute inset-0 border-4 border-cyan-500/50 rounded-3xl"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      {/* Middle rotating square */}
      <motion.div
        className="absolute inset-4 border-4 border-purple-500/40 rounded-2xl"
        animate={{
          rotate: -360,
          scale: [1.05, 1, 1.05],
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
        }}
      />

      {/* Inner glowing circle */}
      <motion.div
        className="absolute inset-8 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main avatar container */}
      <motion.div
        className="absolute inset-12 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl overflow-hidden border-4 border-cyan-400 shadow-2xl"
        style={{
          boxShadow: '0 0 40px rgba(6, 182, 212, 0.6), inset 0 0 40px rgba(6, 182, 212, 0.2)'
        }}
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.5 }
        }}
      >
        {/* Animated background grid */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            animation: 'gridMove 10s linear infinite',
          }}
        />

        {/* Central gaming icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 8, repeat: Infinity, ease: "linear" }
            }}
          >
            <Gamepad2 size={80} className="text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-[120px] lg:h-[120px]" />
          </motion.div>
        </div>

        {/* Energy waves */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border-2 border-cyan-400/30 rounded-2xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Scanning line effect */}
        <motion.div
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{
            top: ['0%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-cyan-400" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-purple-400" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-pink-400" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-cyan-400" />
      </motion.div>

      {/* Floating icons around avatar */}
      <motion.div
        className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full shadow-lg"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 360],
        }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 4, repeat: Infinity, ease: "linear" }
        }}
      >
        <Star size={24} className="text-white" fill="white" />
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 bg-gradient-to-r from-cyan-400 to-blue-500 p-3 rounded-full shadow-lg"
        animate={{
          y: [0, 10, 0],
          rotate: [360, 0],
        }}
        transition={{
          y: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
          rotate: { duration: 5, repeat: Infinity, ease: "linear" }
        }}
      >
        <Zap size={24} className="text-white" fill="white" />
      </motion.div>

      {/* Orbiting particles */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 160;
        return (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-cyan-400 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)',
            }}
            animate={{
              x: [Math.cos(angle) * radius, Math.cos(angle + Math.PI * 2) * radius],
              y: [Math.sin(angle) * radius, Math.sin(angle + Math.PI * 2) * radius],
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 0.75,
              ease: "linear"
            }}
          />
        );
      })}

      {/* Lightning bolts */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`lightning-${i}`}
          className="absolute w-1 bg-gradient-to-b from-cyan-400 to-transparent"
          style={{
            height: Math.random() * 40 + 20,
            left: `${Math.random() * 100}%`,
            top: '-20px',
          }}
          animate={{
            y: [0, 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Level badge */}
      <motion.div
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 rounded-full text-white font-bold text-sm shadow-lg"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        LVL 99
      </motion.div>
    </motion.div>
  );
}
