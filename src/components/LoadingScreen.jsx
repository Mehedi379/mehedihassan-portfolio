import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
    >
      <div className="text-center">
        {/* Gaming-style loading bar */}
        <div className="mb-8">
          <motion.div
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{
              fontFamily: 'monospace',
              textShadow: '0 0 20px #00ffff, 0 0 40px #00ffff',
              color: '#00ffff',
            }}
            animate={{
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
            }}
          >
            LOADING
          </motion.div>
          
          {/* Progress bar */}
          <div className="w-64 md:w-96 h-2 bg-gray-800 rounded-full overflow-hidden border border-cyan-500/30">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
              }}
            />
          </div>
        </div>
        
        {/* Animated dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-cyan-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{
                boxShadow: '0 0 10px #00ffff',
              }}
            />
          ))}
        </div>
        
        {/* Binary code effect */}
        <motion.div
          className="mt-8 text-xs text-cyan-500/50 font-mono"
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        >
          INITIALIZING SYSTEM...
        </motion.div>
      </div>
    </motion.div>
  );
}
