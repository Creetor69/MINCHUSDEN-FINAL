import React from 'react';
import { motion } from 'motion/react';
import { REVIEWS } from '@/src/lib/utils';
import { Star, Quote } from 'lucide-react';

export const Reviews = () => {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <span className="text-premium font-bold uppercase tracking-widest text-xs">The Pack Speaks</span>
          <h2 className="text-5xl md:text-7xl font-serif text-trust mt-4">Real Stories <br /> <span className="italic">From Happy Tails</span></h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[40px] border border-trust/5 shadow-sm relative overflow-hidden group"
            >
              <Quote className="absolute -top-4 -right-4 w-32 h-32 text-trust/5 group-hover:text-premium/10 transition-colors" />
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-premium text-premium" />
                ))}
              </div>
              <p className="text-xl font-serif text-trust mb-8 leading-relaxed italic">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-base rounded-full flex items-center justify-center font-bold text-trust">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-trust">{review.name}</h4>
                  <p className="text-xs text-trust/40 uppercase tracking-widest font-bold">{review.pet}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
