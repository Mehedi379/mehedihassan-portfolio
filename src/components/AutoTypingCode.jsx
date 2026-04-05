import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const codeSnippets = [
  `#include <stdio.h>

int main() {
    printf("Hello, World!");
    return 0;
}`,
  `#include <iostream>
using namespace std;

int main() {
    cout << "C++ Rocks!" << endl;
    return 0;
}`,
  `public class Main {
    public static void main(String[] args) {
        System.out.println("Java Power!");
    }
}`,
  `def solve_problem():
    print("Python is awesome!")
    return True`,
];

export default function AutoTypingCode() {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentCode = codeSnippets[currentSnippetIndex];
    
    const typeSpeed = isDeleting ? 30 : 50;
    const deleteSpeed = 20;
    const pauseTime = 3000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayedText.length < currentCode.length) {
          setDisplayedText(currentCode.substring(0, displayedText.length + 1));
        } else {
          // Finished typing, pause then delete
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.substring(0, displayedText.length - 1));
        } else {
          // Finished deleting, move to next snippet
          setIsDeleting(false);
          setCurrentSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentSnippetIndex]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorTimer);
  }, []);

  // Syntax highlighting helper
  const highlightSyntax = (code) => {
    const keywords = ['include', 'int', 'main', 'return', 'printf', 'cout', 'endl', 
                      'public', 'class', 'static', 'void', 'String', 'args', 'System',
                      'out', 'println', 'def', 'print', 'True', 'False', 'using',
                      'namespace', 'std', 'iostream', 'stdio.h'];
    
    const strings = /".*?"/g;
    const numbers = /\b\d+\b/g;
    
    let highlighted = code;
    
    // Highlight strings
    highlighted = highlighted.replace(strings, '<span class="text-green-400">$&</span>');
    
    // Highlight numbers
    highlighted = highlighted.replace(numbers, '<span class="text-orange-400">$&</span>');
    
    // Highlight keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span class="text-purple-400">${keyword}</span>`);
    });
    
    // Highlight comments
    highlighted = highlighted.replace(/\/\/.*/g, '<span class="text-gray-500">$&</span>');
    highlighted = highlighted.replace(/#.*/g, '<span class="text-gray-500">$&</span>');
    
    return highlighted;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative bg-gray-900 rounded-xl overflow-hidden border-2 border-cyan-500/50 shadow-2xl"
      style={{
        boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
        minHeight: '350px',
      }}
    >
      {/* Terminal Header */}
      <div className="bg-gray-800 px-3 py-2 sm:px-4 sm:py-2 flex items-center gap-2 border-b border-gray-700">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-[10px] sm:text-xs text-gray-400 font-mono truncate">code_editor.cpp</span>
      </div>

      {/* Code Content */}
      <div className="p-3 sm:p-4 md:p-6 font-mono text-xs sm:text-sm md:text-base overflow-x-auto min-h-[300px] sm:min-h-[350px]">
        <pre className="text-gray-300 leading-relaxed whitespace-pre-wrap break-words min-h-[250px] sm:min-h-[300px]">
          <code 
            dangerouslySetInnerHTML={{ 
              __html: highlightSyntax(displayedText) 
            }} 
          />
          {/* Blinking Cursor */}
          <span 
            className={`inline-block w-1.5 h-4 sm:w-2 sm:h-5 bg-cyan-400 ml-1 ${
              showCursor ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              verticalAlign: 'middle',
              boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)',
            }}
          />
        </pre>
      </div>

      {/* Scanning line effect */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none"
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-l-2 border-cyan-400" />
      <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-r-2 border-cyan-400" />
    </motion.div>
  );
}
