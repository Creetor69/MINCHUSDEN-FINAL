import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [index, setIndex] = useState(0);
  const messages = [
    "Looking for a place for your pet to stay?",
    "Is your pet too aggressive?",
    "You've come to the right place.",
    "Welcome to Minchu's Den."
  ];

  useEffect(() => {
    if (index < messages.length) {
      const timer = setTimeout(() => {
        setIndex(index + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [index, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-trust flex items-center justify-center px-6 overflow-hidden"
    >
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1] 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-premium rounded-full blur-[150px]" 
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.h2
          key={index}
          initial={{ opacity: 0, y: 20, filter: 'blur(20px)', scale: 0.9 }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(20px)', scale: 1.1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-7xl font-serif text-white text-center max-w-5xl leading-tight tracking-tight drop-shadow-[0_0_40px_rgba(197,160,89,0.5)]"
        >
          {messages[index]}
        </motion.h2>
      </AnimatePresence>
    </motion.div>
  );
};
