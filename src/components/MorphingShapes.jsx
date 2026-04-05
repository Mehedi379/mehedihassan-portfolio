import { motion } from 'framer-motion';

export default function MorphingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Shape 1 - Top Left */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.5, 1.2, 1],
          x: [0, 100, -50, 0],
          y: [0, 50, 100, 0],
          rotate: [0, 90, 180, 360],
          borderRadius: ["30%", "50%", "40%", "30%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Shape 2 - Bottom Right */}
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1.6, 1],
          x: [0, -80, 50, 0],
          y: [0, -100, -50, 0],
          rotate: [360, 270, 180, 0],
          borderRadius: ["40%", "30%", "50%", "40%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Shape 3 - Center */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-pink-500/10 to-cyan-500/10 blur-3xl"
        animate={{
          scale: [1, 1.4, 1.1, 1],
          rotate: [0, 180, 360],
          borderRadius: ["50%", "30%", "40%", "50%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Shape 4 - Top Right */}
      <motion.div
        className="absolute top-40 right-40 w-64 h-64 bg-gradient-to-br from-yellow-500/15 to-orange-500/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.6, 1.3, 1],
          x: [0, -120, -60, 0],
          y: [0, 80, 40, 0],
          rotate: [0, -90, -180, -360],
          borderRadius: ["35%", "45%", "55%", "35%"],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Shape 5 - Bottom Left */}
      <motion.div
        className="absolute bottom-40 left-40 w-80 h-80 bg-gradient-to-br from-blue-500/15 to-indigo-500/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1.5, 1],
          x: [0, 90, 45, 0],
          y: [0, -70, -35, 0],
          rotate: [360, 180, 90, 0],
          borderRadius: ["45%", "55%", "35%", "45%"],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
