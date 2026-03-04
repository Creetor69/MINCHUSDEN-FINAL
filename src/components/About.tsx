import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const About = () => {
  const timeline = [
    { year: '2018', title: 'The Vision', desc: 'Purushotham envisions a space where dogs are treated with elite care and scientific training methods.' },
    { year: '2020', title: 'The Den Opens', desc: 'Minchu\'s Den officially launches on Kanakapura Road with a focus on behavior-first boarding.' },
    { year: '2022', title: 'Expansion', desc: 'New agility grounds and specialized puppy foundation programs are introduced.' },
    { year: '2024', title: 'Digital Transformation', desc: 'Launching our immersive 4D experience to better serve our growing community.' },
  ];

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <span className="text-premium font-bold uppercase tracking-widest text-xs">Our Story</span>
          <h2 className="text-5xl md:text-8xl font-serif text-trust mt-4">Crafting Excellence <br /> <span className="italic">Since Day One</span></h2>
        </header>

        {/* Bio Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-serif text-trust mb-8">A Vision for <span className="italic text-premium">Canine Harmony</span></h3>
            <div className="space-y-6 text-lg text-trust/70 leading-relaxed font-light">
              <p>
                Minchu's Den was born out of a simple realization: dogs deserve more than just a place to stay; they deserve a sanctuary that understands their biological and emotional needs.
              </p>
              <p>
                Founded by Purushotham, a master behaviorist with over a decade of experience, we've built a facility that prioritizes mental enrichment alongside physical comfort. Our approach is rooted in science, empathy, and a deep respect for the canine spirit.
              </p>
            </div>
          </motion.div>
          <div className="relative">
            <div className="absolute -inset-4 bg-premium/5 rounded-[60px] -z-10 rotate-3" />
            <img 
              src="https://picsum.photos/seed/about-den/1200/800" 
              alt="The Facility" 
              className="rounded-[40px] shadow-2xl w-full aspect-video object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>

        {/* Meet Purushotham Section */}
        <section className="bg-trust text-white rounded-[60px] p-12 md:p-24 mb-32 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-premium/5 -skew-x-12 translate-x-1/4" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-premium font-black uppercase tracking-widest text-xs mb-6 block">The Founder</span>
              <h2 className="text-5xl md:text-7xl font-serif mb-8">Meet <span className="italic text-premium">Purushotham</span></h2>
              <p className="text-xl text-white/70 leading-relaxed mb-12 font-light">
                Purushotham isn't just a trainer; he's a translator. With a background in canine psychology and years of hands-on experience with thousands of dogs, he has developed a unique methodology that focuses on "The Language of the Pack."
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-3xl font-serif text-premium">12+</h4>
                  <p className="text-[10px] uppercase tracking-widest text-white/40">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-3xl font-serif text-premium">5k+</h4>
                  <p className="text-[10px] uppercase tracking-widest text-white/40">Dogs Trained</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/5">
                <img 
                  src="https://picsum.photos/seed/purushotham-bio/800/1000" 
                  alt="Purushotham" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto">
          <header className="mb-20 text-center">
            <span className="text-premium font-bold uppercase tracking-widest text-xs">Our Journey</span>
            <h2 className="text-4xl font-serif text-trust mt-4">Milestones of <span className="italic">Excellence</span></h2>
          </header>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-trust/10 -translate-x-1/2 hidden md:block" />

          <div className="space-y-24">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "relative flex flex-col md:flex-row items-center gap-8 md:gap-24",
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-premium rounded-full -translate-x-1/2 z-10 hidden md:block" />

                <div className="flex-1 text-center md:text-right">
                  {i % 2 === 0 ? (
                    <>
                      <span className="text-4xl font-serif text-premium mb-2 block">{item.year}</span>
                      <h3 className="text-2xl font-serif text-trust mb-4">{item.title}</h3>
                      <p className="text-trust/60 leading-relaxed">{item.desc}</p>
                    </>
                  ) : (
                    <div className="md:invisible" />
                  )}
                </div>

                <div className="flex-1 text-center md:text-left">
                  {i % 2 !== 0 ? (
                    <>
                      <span className="text-4xl font-serif text-premium mb-2 block">{item.year}</span>
                      <h3 className="text-2xl font-serif text-trust mb-4">{item.title}</h3>
                      <p className="text-trust/60 leading-relaxed">{item.desc}</p>
                    </>
                  ) : (
                    <div className="md:invisible" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
