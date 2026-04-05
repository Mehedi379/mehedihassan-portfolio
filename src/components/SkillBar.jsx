import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

function AnimatedCounter({ end, duration = 2 }) {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function SkillBar({ skill, level, color, delay = 0 }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const getColorClasses = () => {
    const colors = {
      cyan: 'from-cyan-500 to-cyan-400',
      purple: 'from-purple-500 to-purple-400',
      pink: 'from-pink-500 to-pink-400',
      blue: 'from-blue-500 to-blue-400',
    };
    return colors[color] || colors.cyan;
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            delay,
            duration: 0.6,
            ease: "easeOut",
          },
        },
      }}
      className="mb-6"
    >
      <div className="flex justify-between mb-2">
        <span className="text-gray-700 dark:text-gray-300 font-semibold">{skill}</span>
        <AnimatedCounter end={level} />
        <span className="text-gray-600 dark:text-gray-400">%</span>
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
        <motion.div
          className={`h-full bg-gradient-to-r ${getColorClasses()} rounded-full relative`}
          variants={{
            hidden: { width: 0 },
            visible: {
              width: `${level}%`,
              transition: {
                delay: delay + 0.3,
                duration: 1.2,
                ease: "easeOut",
              },
            },
          }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-white/30 animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  );
}
