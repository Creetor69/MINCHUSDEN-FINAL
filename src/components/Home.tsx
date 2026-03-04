import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero3D } from './Hero3D';
import { ArrowRight, CheckCircle2, Quote, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Magnetic } from './Magnetic';
import { BOARDING_SERVICES, TRAINING_SERVICES, REVIEWS } from '@/src/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const CountUp = ({ end, duration = 2 }: { end: string; duration?: number }) => {
  const countRef = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(end.replace(/,/g, ''));
  const suffix = end.replace(/[0-9,]/g, '');

  useEffect(() => {
    if (!countRef.current) return;

    gsap.fromTo(
      countRef.current,
      { innerText: 0 },
      {
        innerText: numericValue,
        duration: duration,
        ease: 'power2.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: countRef.current,
          start: 'top 80%',
        },
        onUpdate: function() {
          if (countRef.current) {
            countRef.current.innerText = Math.ceil(Number(this.targets()[0].innerText)).toLocaleString() + suffix;
          }
        }
      }
    );
  }, [numericValue, suffix, duration]);

  return <span ref={countRef}>0</span>;
};

export const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [reviewIndex, setReviewIndex] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Hero Entrance Animation
    const tl = gsap.timeline();
    
    tl.fromTo(
      headingRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: 'expo.out',
      }
    ).fromTo(
      buttonsRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      },
      '-=1'
    );

    // Scroll-based scaling for hero
    gsap.to(headingRef.current, {
      scale: 1.1,
      opacity: 0.5,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });
  }, []);

  const stats = [
    { label: 'Pets Treated', value: '2,500+' },
    { label: 'Years Experience', value: '12+' },
    { label: 'Success Rate', value: '99%' },
    { label: 'Happy Owners', value: '1,800+' },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden px-6">
        <Hero3D />
        
        <div className="max-w-5xl text-center z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block px-4 py-1.5 bg-premium/10 text-premium rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              The Best Place to Board and Train Your Pet
            </span>
            <h1 ref={headingRef} className="text-6xl md:text-9xl font-serif text-trust mb-8 leading-[0.85] tracking-tighter">
              A Sanctuary <br />
              <span className="italic text-premium">Beyond Boarding.</span>
            </h1>
            <p className="text-lg md:text-xl text-trust/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Minchu's Den isn't just a facility; it's a philosophy. We believe in creating a sensory-rich environment that reduces stress and promotes natural canine behavior.
            </p>
            
            <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Magnetic>
                <Link
                  to="/boarding"
                  className="w-full sm:w-auto bg-trust text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-organic transition-all group shadow-2xl shadow-trust/20"
                >
                  Book Boarding
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  to="/training"
                  className="w-full sm:w-auto border-2 border-trust/10 text-trust px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-trust hover:text-white transition-all"
                >
                  Explore Training
                </Link>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Fixed overlapping by moving it slightly */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 pointer-events-none"
        >
          <div className="w-[1px] h-10 bg-trust" />
          <span className="text-[8px] uppercase tracking-[0.3em] font-black">Scroll</span>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-trust text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <h4 className="text-4xl md:text-6xl font-serif text-premium mb-2">
                  <CountUp end={stat.value} />
                </h4>
                <p className="text-[10px] uppercase tracking-widest font-black text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Minchu's Den */}
      <section className="py-32 px-6 bg-base">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-premium font-bold uppercase tracking-widest text-xs">Our Philosophy</span>
            <h2 className="text-5xl md:text-7xl font-serif text-trust mt-4 mb-8">Why Choose <br /> <span className="italic">Minchu's Den?</span></h2>
            <div className="space-y-6">
              {[
                "Climate Controlled Suites",
                "Organic Play Areas",
                "Interactive Enrichment",
                "Daily Health Reports"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-organic/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-organic" />
                  </div>
                  <span className="text-lg text-trust/70">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-[40px] overflow-hidden shadow-2xl"
            >
              <img 
                src="https://picsum.photos/seed/dog-philosophy/800/1000" 
                alt="Happy Dog" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview - Small Cards */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="text-premium font-bold uppercase tracking-widest text-xs">Our Offerings</span>
              <h2 className="text-5xl font-serif text-trust mt-4">Premium Care <br /> <span className="italic">Preview</span></h2>
            </div>
            <Link to="/boarding" className="text-premium font-black uppercase tracking-widest text-[10px] hover:underline">View All Services</Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...BOARDING_SERVICES, ...TRAINING_SERVICES].slice(0, 3).map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-base p-10 rounded-[40px] border border-trust/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
              >
                <h3 className="text-2xl font-serif text-trust mb-4">{service.title}</h3>
                <p className="text-trust/60 text-sm leading-relaxed mb-8">{service.description}</p>
                <Link 
                  to={service.category === 'boarding' ? '/boarding' : '/training'} 
                  className="text-[10px] font-black uppercase tracking-widest text-trust hover:text-premium transition-colors flex items-center gap-2"
                >
                  Learn More
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainer Section - Updated wording */}
      <section className="py-32 px-6 bg-base">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-[40px] overflow-hidden shadow-2xl aspect-[4/5]"
            >
              <img 
                src="https://picsum.photos/seed/trainer-home/800/1000" 
                alt="Purushotham" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <span className="text-premium font-bold uppercase tracking-widest text-xs">What Our Trainer Says</span>
            <h2 className="text-5xl md:text-7xl font-serif text-trust mt-4 mb-8">Behavioral <br /> <span className="italic">Excellence</span></h2>
            <div className="relative mb-8">
              <Quote className="absolute -top-6 -left-6 w-12 h-12 text-premium/10" />
              <p className="text-2xl font-serif text-trust leading-relaxed italic">
                "At Minchu's Den, we don't just train dogs; we bridge the communication gap between you and your pet. Every dog has a unique language, and our goal is to help you understand it."
              </p>
            </div>
            <h4 className="text-xl font-bold text-trust mb-1">Purushotham</h4>
            <p className="text-xs uppercase tracking-widest font-bold text-premium mb-12">Founder & Lead Behaviorist</p>
            <Link 
              to="/meet-purushotham" 
              className="bg-trust text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-organic transition-all shadow-xl shadow-trust/20"
            >
              Meet Purushotham
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Single Review Card Section with Slider */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <header className="mb-16 text-center">
            <span className="text-premium font-bold uppercase tracking-widest text-xs">The Pack Speaks</span>
            <h2 className="text-5xl font-serif text-trust mt-4">Happy <span className="italic">Tails</span></h2>
          </header>
          
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={reviewIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="bg-base p-10 md:p-20 rounded-[60px] border border-trust/5 relative overflow-hidden text-center"
              >
                <Quote className="absolute -top-10 -left-10 w-40 h-40 text-trust/5" />
                <div className="relative z-10">
                  <div className="flex justify-center gap-1 mb-8">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-5 h-5 md:w-6 md:h-6 fill-premium text-premium" />
                    ))}
                  </div>
                  <p className="text-xl md:text-3xl font-serif text-trust mb-12 leading-relaxed italic min-h-[120px] flex items-center justify-center">
                    "{REVIEWS[reviewIndex].text}"
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center font-black text-trust text-xl mb-4 shadow-sm">
                      {REVIEWS[reviewIndex].name[0]}
                    </div>
                    <h4 className="text-xl font-bold text-trust">{REVIEWS[reviewIndex].name}</h4>
                    <p className="text-[10px] text-trust/40 uppercase tracking-widest font-black">{REVIEWS[reviewIndex].pet}</p>
                  </div>
                  
                  <div className="mt-12">
                    <Link to="/reviews" className="text-[10px] font-black uppercase tracking-widest text-premium hover:underline">Read All Reviews</Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};
