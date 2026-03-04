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
      className="fixed inset-0 z-[100] bg-trust flex items-center justify-center px-6"
    >
      <AnimatePresence mode="wait">
        <motion.h2
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-serif text-white text-center max-w-3xl leading-tight"
        >
          {messages[index]}
        </motion.h2>
      </AnimatePresence>
    </motion.div>
  );
};
