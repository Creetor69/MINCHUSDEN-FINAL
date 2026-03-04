import React from 'react';
import { motion } from 'motion/react';
import { Quote, Award, BookOpen, Heart } from 'lucide-react';

export const MeetPurushotham = () => {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl aspect-[4/5]">
              <img 
                src="https://picsum.photos/seed/trainer-portrait/800/1000" 
                alt="Purushotham - Lead Behaviorist" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-premium font-bold uppercase tracking-widest text-xs">Founder & Lead Behaviorist</span>
            <h1 className="text-5xl md:text-7xl font-serif text-trust mt-4 mb-8">Meet <br /> <span className="italic">Purushotham</span></h1>
            
            <div className="space-y-6 text-trust/70 leading-relaxed text-lg">
              <p>
                With over 12 years of experience in canine behavior and psychology, Purushotham has dedicated his life to understanding the intricate language of dogs. His journey began with a simple passion for animals, which evolved into a scientific pursuit of excellence in pet care.
              </p>
              <p>
                At Minchu's Den, he implements science-based, force-free training methods that prioritize the emotional well-being of the dog. He believes that every behavioral issue is a communication gap that can be bridged with patience, consistency, and the right techniques.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-base rounded-2xl flex items-center justify-center">
                  <Award className="text-premium w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-trust">Certified</h4>
                  <p className="text-xs text-trust/40">Behavior Specialist</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-base rounded-2xl flex items-center justify-center">
                  <BookOpen className="text-premium w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-trust">12+ Years</h4>
                  <p className="text-xs text-trust/40">Field Experience</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-32">
          <div className="bg-trust text-white p-12 md:p-20 rounded-[60px] relative overflow-hidden">
            <Quote className="absolute -top-10 -left-10 w-40 h-40 text-white/5" />
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <h2 className="text-3xl md:text-5xl font-serif mb-12 leading-relaxed italic">
                "My mission is to create a world where every dog is understood, respected, and loved for who they are."
              </h2>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-premium rounded-full flex items-center justify-center mb-4">
                  <Heart className="text-trust w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold">Purushotham</h4>
                <p className="text-xs uppercase tracking-widest font-bold text-premium">Founder, Minchu's Den</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
