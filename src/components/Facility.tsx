import React from 'react';
import { motion } from 'motion/react';

export const Facility = () => {
  const areas = [
    { title: 'The Play Zone', image: 'https://picsum.photos/seed/dog-play/1200/800', desc: 'Expansive outdoor agility grounds for maximum exercise.' },
    { title: 'Luxury Suites', image: 'https://picsum.photos/seed/dog-room/1200/800', desc: 'Climate-controlled, sound-insulated private suites for peaceful rest.' },
    { title: 'Training Arena', image: 'https://picsum.photos/seed/dog-arena/1200/800', desc: 'Indoor facility equipped for behavioral and obedience training.' },
    { title: 'Wellness Spa', image: 'https://picsum.photos/seed/dog-spa/1200/800', desc: 'Hygienic grooming and wellness check area.' },
  ];

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <span className="text-premium font-bold uppercase tracking-widest text-xs">Virtual Tour</span>
          <h2 className="text-5xl md:text-7xl font-serif text-trust mt-4">The Den <br /> <span className="italic">In Detail</span></h2>
        </header>

        <div className="grid grid-cols-1 gap-24">
          {areas.map((area, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative h-[70vh] rounded-[40px] overflow-hidden"
            >
              <img
                src={area.image}
                alt={area.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-trust/80 via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <h3 className="text-4xl md:text-6xl font-serif text-white mb-4">{area.title}</h3>
                <p className="text-white/70 text-lg max-w-xl">{area.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
