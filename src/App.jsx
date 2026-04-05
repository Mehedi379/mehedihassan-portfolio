import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sun, Mail, Phone, MapPin, 
  ExternalLink, BookOpen, FolderGit2,
  Download, Send, ChevronDown, Menu, X, Globe, UserRound, Gamepad2, Trophy, Target
} from 'lucide-react';
import ParticlesBackground from './components/ParticlesBackground';
import Scanlines from './components/Scanlines';
import LoadingScreen from './components/LoadingScreen';
import Spotlight from './components/Spotlight';
import CursorTrail from './components/CursorTrail';
import MagneticButton from './components/MagneticButton';
import MorphingShapes from './components/MorphingShapes';
import Typewriter from './components/Typewriter';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Toast from './components/Toast';
import AnimatedName from './components/AnimatedName';
import GamingAvatar from './components/GamingAvatar';
import GamingSkillCard from './components/GamingSkillCard';
import AutoTypingCode from './components/AutoTypingCode';
import usePerformanceCheck from './hooks/usePerformanceCheck';
import emailjs from '@emailjs/browser';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Premium text reveal animation
const textReveal = {
  hidden: { 
    opacity: 0,
    y: 100,
    rotateX: -90,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    }
  })
};

// Navbar Component
const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-darker/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.a
            href="#home"
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            style={{
              fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
              textShadow: '0 0 20px rgba(6, 182, 212, 0.5)',
            }}
            whileHover={{ scale: 1.05 }}
          >
            Mehedi
          </motion.a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-darker/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                
                return (
                  <button
                    key={link.name}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      const element = document.querySelector(link.href);
                      if (element) {
                        // Close menu first, then scroll after a small delay
                        setTimeout(() => {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                      }
                    }}
                    className={`w-full text-left px-3 py-3 rounded-md transition-colors font-medium min-h-[44px] flex items-center cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500/20 dark:bg-cyan-500/30 text-cyan-600 dark:text-cyan-400 border-l-4 border-cyan-500'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {isActive && (
                      <span className="mr-2">▶</span>
                    )}
                    {link.name}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Hero Section
const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-16">
      {/* Animated grid background with parallax */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        animate={{
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
        }}
        transition={{ type: "spring", damping: 30 }}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite',
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="z-10"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-block px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-cyan-500/20 dark:bg-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-medium border border-cyan-500/50 pulse-glow"
                style={{
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                }}>
                <Gamepad2 className="inline mr-1 sm:mr-2" size={14} />
                Welcome to my portfolio
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
              Hi, I'm{' '}
              <AnimatedName 
                text="Mehedi Hassan"
              />
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-3 md:mb-4 font-mono">
              <span className="text-cyan-400">&gt;</span>{' '}
              <Typewriter 
                texts={[
                  'CSE Student | Problem Solver | Developer',
                  'Building efficient solutions',
                  'Passionate about algorithms',
                  'Creating innovative apps',
                ]}
                speed={80}
                deleteSpeed={50}
                delay={2500}
              />
            </motion.p>

            <motion.p variants={fadeInUp} className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mb-6 md:mb-8">
              I build simple & efficient solutions. Passionate about coding, algorithms, and creating innovative applications.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <MagneticButton
                className="px-6 py-3 sm:px-8 sm:py-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all text-center relative overflow-hidden group cursor-pointer"
                style={{
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
                }}
              >
                <a href="#projects" className="relative z-10 flex items-center justify-center gap-2">
                  <Trophy size={18} className="sm:w-5 sm:h-5" />
                  View Projects
                </a>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </MagneticButton>
              
              <MagneticButton
                className="px-6 py-3 sm:px-8 sm:py-3 border-2 border-cyan-500 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-500 hover:text-white transition-all text-center relative overflow-hidden cursor-pointer"
                style={{
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                }}
              >
                <a href="#contact" className="flex items-center justify-center gap-2">
                  Contact Me
                </a>
              </MagneticButton>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex items-center justify-center"
            animate={{
              x: mousePosition.x * -1,
              y: mousePosition.y * -1,
            }}
            transition={{ type: "spring", damping: 30 }}
          >
            <GamingAvatar />
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown size={32} className="text-cyan-400" style={{ filter: 'drop-shadow(0 0 10px cyan)' }} />
      </motion.div>
    </section>
  );
};

// About Section
const About = () => {
  return (
    <section id="about" className="py-12 md:py-20 bg-gray-50 dark:bg-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <ParticlesBackground />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              <span className="text-gray-900 dark:text-white">About </span>
              <AnimatedName text="Me" />
            </h2>
            <div className="space-y-3 md:space-y-4 text-gray-600 dark:text-gray-400">
              <p className="text-base md:text-lg leading-relaxed">
                I'm Mehedi Hassan, a dedicated Computer Science and Engineering student at 
                American International University-Bangladesh (AIUB). My journey in programming 
                started with curiosity and has evolved into a passion for problem-solving.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                I specialize in C and C++ programming, with a strong focus on competitive 
                programming and algorithm optimization. I enjoy tackling complex problems 
                and finding elegant solutions through clean, efficient code.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Beyond coding, I'm constantly learning new technologies and expanding my 
                skill set to build meaningful solutions.
              </p>
            </div>
            
            <motion.div
              variants={fadeInUp}
              className="mt-6 md:mt-8 grid grid-cols-2 gap-3 md:gap-4"
            >
              <div className="bg-white dark:bg-darker p-4 md:p-6 rounded-xl shadow-lg border-2 border-cyan-500/30 relative overflow-hidden group"
                style={{
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
                }}>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Trophy className="text-cyan-400 mb-2" size={20} />
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-1">10+</h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-mono">Projects Completed</p>
              </div>
              <div className="bg-white dark:bg-darker p-4 md:p-6 rounded-xl shadow-lg border-2 border-purple-500/30 relative overflow-hidden group"
                style={{
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)',
                }}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Target className="text-purple-400 mb-2" size={20} />
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-1">100+</h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-mono">Problems Solved</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp} className="relative">
            <AutoTypingCode />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Skills Section
const Skills = () => {
  const skillsWithBars = [
    { name: 'C Programming', level: 90, color: 'cyan' },
    { name: 'C++ Programming', level: 85, color: 'purple' },
    { name: 'Problem Solving', level: 88, color: 'pink' },
    { name: 'Data Structures', level: 80, color: 'blue' },
    { name: 'Algorithms', level: 78, color: 'cyan' },
    { name: 'React', level: 75, color: 'purple' },
    { name: 'JavaScript', level: 70, color: 'pink' },
    { name: 'HTML/CSS', level: 72, color: 'blue' },
  ];

  return (
    <section id="skills" className="py-12 md:py-20 bg-gray-50 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
              My <AnimatedName text="Skills" />
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-mono">
              <span className="text-cyan-400">&gt;</span> Character stats and abilities
            </p>
          </motion.div>

          {/* Gaming Skill Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
            {skillsWithBars.map((skill, index) => (
              <GamingSkillCard
                key={skill.name}
                skill={skill.name}
                level={skill.level}
                color={skill.color}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Projects Section with 3D Tilt Cards
const Projects = () => {
  const projects = [
    {
      title: 'Algorithm Visualizer',
      description: 'Interactive web app that visualizes sorting and searching algorithms in real-time.',
      tech: ['JavaScript', 'HTML/CSS', 'Algorithms'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Student Management System',
      description: 'C++ console application for managing student records and generating reports.',
      tech: ['C++', 'File Handling', 'OOP'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Competitive Programming Solutions',
      description: 'Curated collection of optimized solutions from multiple online judges.',
      tech: ['C', 'C++', 'Data Structures'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Personal Portfolio Website',
      description: 'Modern portfolio with React, Tailwind CSS, and 3D animations.',
      tech: ['React', 'Tailwind', 'Three.js'],
      liveUrl: '#',
      githubUrl: '#',
    },
  ];

  return (
    <section id="projects" className="py-12 md:py-20 bg-gray-50 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
              <span className="text-gray-900 dark:text-white">Featured </span>
              <AnimatedName text="Projects" />
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-mono">
              <span className="text-cyan-400">&gt;</span> Some of my recent work and personal projects
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                className="bg-white dark:bg-darker rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group"
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98, y: -5 }}
                style={{ 
                  transformStyle: 'preserve-3d', 
                  perspective: '1000px',
                  border: '2px solid transparent',
                }}
              >
                {/* RGB border effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity"
                  style={{
                    background: 'linear-gradient(90deg, #00ffff, #ff00ff, #ffff00, #00ffff)',
                    backgroundSize: '400% 400%',
                    animation: 'rgbShift 3s ease infinite',
                    padding: '2px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />
                
                <div className="h-40 sm:h-48 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <FolderGit2 size={56} className="text-cyan-400 opacity-50 pulse-glow sm:w-16 sm:h-16" />
                </div>
                
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{project.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm rounded-full bg-cyan-500/20 dark:bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 font-mono"
                        style={{
                          boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 sm:gap-4">
                    <motion.a
                      href={project.liveUrl}
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white rounded-lg text-center font-medium hover:shadow-lg active:shadow-lg transition-all flex items-center justify-center gap-2 relative overflow-hidden group text-sm sm:text-base"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
                        Live Demo
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity" />
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-2 border-2 border-cyan-500 text-cyan-400 rounded-lg text-center font-medium hover:border-purple-500 hover:text-purple-400 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)',
                      }}
                    >
                      <Globe size={16} className="sm:w-[18px] sm:h-[18px]" />
                      GitHub
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // EmailJS configuration
    const serviceID = 'service_wjv3kai';
    const templateID = 'template_26ces1h';
    const publicKey = '_zyswTod6C45Pm8JW';

    emailjs
      .sendForm(serviceID, templateID, formRef.current, publicKey)
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          setShowToast(true);
          setFormData({ name: '', email: '', message: '' });
          setIsSubmitting(false);
        },
        (error) => {
          console.error('Failed to send email:', error.text);
          alert('Failed to send message. Please try again or email me directly.');
          setIsSubmitting(false);
        }
      );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    { icon: Phone, text: '+880 01917399263', label: 'Phone' },
    { icon: Mail, text: 'hassanmehedi379@gmail.com', label: 'Email' },
    { icon: MapPin, text: 'Bangladesh', label: 'Location' },
  ];

  return (
    <section id="contact" className="py-12 md:py-20 bg-gray-50 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
              <span className="text-gray-900 dark:text-white">Get In </span>
              <AnimatedName text="Touch" />
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Let's build something together
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div variants={fadeInUp} className="space-y-4 md:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6">Contact Information</h3>
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  className="bg-white dark:bg-darker p-3 sm:p-4 rounded-xl shadow-lg flex items-center gap-3 sm:gap-4"
                  whileHover={{ x: 10, scale: 1.02 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <info.icon size={20} className="text-white sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{info.label}</p>
                    <p className="font-semibold text-sm sm:text-base">{info.text}</p>
                  </div>
                </motion.div>
              ))}

              <div className="pt-4 md:pt-6">
                <h4 className="text-base sm:text-lg font-semibold mb-3 md:mb-4">Follow Me</h4>
                <div className="flex gap-3 sm:gap-4">
                  <motion.a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-blue-600 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                    whileHover={{ scale: 1.2, y: -5 }}
                    aria-label="GitHub profile"
                  >
                    <Globe size={20} className="sm:w-6 sm:h-6" />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-blue-600 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                    whileHover={{ scale: 1.2, y: -5 }}
                    aria-label="LinkedIn profile"
                  >
                    <UserRound size={20} className="sm:w-6 sm:h-6" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <form ref={formRef} onSubmit={handleSubmit} className="bg-white dark:bg-darker p-5 sm:p-8 rounded-xl shadow-lg space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="from_name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-base"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="from_email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-base"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all resize-none text-base"
                    placeholder="Your message here..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Toast Notification */}
      {showToast && (
        <Toast 
          message="Message sent successfully! I'll get back to you soon." 
          onClose={() => setShowToast(false)}
        />
      )}
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="py-6 md:py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 text-center md:text-left">
            © 2026 Mehedi Hassan. All rights reserved.
          </p>
          
          <div className="flex gap-4 md:gap-6">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              whileHover={{ scale: 1.2 }}
              aria-label="GitHub profile"
            >
              <Globe size={20} className="md:w-6 md:h-6" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              whileHover={{ scale: 1.2 }}
              aria-label="LinkedIn profile"
            >
              <UserRound size={20} className="md:w-6 md:h-6" />
            </motion.a>
            <motion.a
              href="mailto:hassanmehedi379@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              whileHover={{ scale: 1.2 }}
              aria-label="Email contact"
            >
              <Mail size={20} className="md:w-6 md:h-6" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });
  
  const [loading, setLoading] = useState(true);
  const isLowPerformance = usePerformanceCheck();

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      {/* Loading Screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      {/* Premium Effects - Disable heavy effects on low-performance devices */}
      <ScrollProgress />
      {!isLowPerformance && <Spotlight />}
      {!isLowPerformance && <CursorTrail />}
      {!isLowPerformance && <MorphingShapes />}
      
      {/* Scanlines Effect */}
      <Scanlines />
      
      <div className="min-h-screen bg-white dark:bg-darker relative">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}

export default App;
