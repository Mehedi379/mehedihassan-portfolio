import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Globe, Terminal, Zap } from 'lucide-react';

const skillIcons = {
  'C Programming': Terminal,
  'C++ Programming': Cpu,
  'Java': Code2,
  'Python': Globe,
  'JavaScript': Zap,
  'React': Database,
  'Problem Solving': Code2,
  'Data Structures': Database,
};

const skillRanks = {
  90: 'S+',
  85: 'S',
  80: 'A+',
  75: 'A',
  70: 'B+',
};

export default function GamingSkillCard({ skill, level, color, delay = 0 }) {
  const Icon = skillIcons[skill] || Code2;
  const rank = skillRanks[level] || 'B';
  
  const getColorClasses = () => {
    const colors = {
      cyan: {
        bar: 'from-cyan-500 to-cyan-400',
        glow: 'shadow-cyan-500/50',
        border: 'border-cyan-400',
        bg: 'bg-cyan-500/10',
        text: 'text-cyan-400',
      },
      purple: {
        bar: 'from-purple-500 to-purple-400',
        glow: 'shadow-purple-500/50',
        border: 'border-purple-400',
        bg: 'bg-purple-500/10',
        text: 'text-purple-400',
      },
      pink: {
        bar: 'from-pink-500 to-pink-400',
        glow: 'shadow-pink-500/50',
        border: 'border-pink-400',
        bg: 'bg-pink-500/10',
        text: 'text-pink-400',
      },
      blue: {
        bar: 'from-blue-500 to-blue-400',
        glow: 'shadow-blue-500/50',
        border: 'border-blue-400',
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
      },
    };
    return colors[color] || colors.cyan;
  };

  const colors = getColorClasses();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay, 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        z: 50,
        transition: { duration: 0.3 }
      }}
      className={`relative p-6 rounded-xl ${colors.bg} border-2 ${colors.border} backdrop-blur-sm`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Rank Badge */}
      <motion.div
        className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <span className="text-white font-bold text-sm">{rank}</span>
      </motion.div>

      {/* Skill Icon and Name */}
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Icon size={32} className={colors.text} />
        </motion.div>
        <div>
          <h3 className={`font-bold text-lg ${colors.text}`}>{skill}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Skill Level</p>
        </div>
      </div>

      {/* XP Bar Container */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">XP Progress</span>
          <span className={`text-sm font-bold ${colors.text}`}>{level}/100</span>
        </div>
        
        {/* XP Bar Background */}
        <div className="h-4 bg-gray-700 rounded-full overflow-hidden relative border border-gray-600">
          {/* Animated XP Fill */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ 
              delay: delay + 0.3, 
              duration: 1.5,
              ease: "easeOut"
            }}
            className={`h-full bg-gradient-to-r ${colors.bar} relative`}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.3) 50%)',
              backgroundSize: '10px 100%',
            }}
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className={`${colors.bg} rounded-lg p-2 border ${colors.border}`}>
          <p className="text-xs text-gray-500 dark:text-gray-400">Power</p>
          <p className={`font-bold ${colors.text}`}>{Math.floor(level * 0.9)}</p>
        </div>
        <div className={`${colors.bg} rounded-lg p-2 border ${colors.border}`}>
          <p className="text-xs text-gray-500 dark:text-gray-400">Speed</p>
          <p className={`font-bold ${colors.text}`}>{Math.floor(level * 0.85)}</p>
        </div>
        <div className={`${colors.bg} rounded-lg p-2 border ${colors.border}`}>
          <p className="text-xs text-gray-500 dark:text-gray-400">Mastery</p>
          <p className={`font-bold ${colors.text}`}>{rank}</p>
        </div>
      </div>

      {/* Corner decorations */}
      <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${colors.border}`} />
      <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${colors.border}`} />
      <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${colors.border}`} />
      <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${colors.border}`} />
    </motion.div>
  );
}
