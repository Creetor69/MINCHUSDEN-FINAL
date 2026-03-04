import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TRAINING_SERVICES, cn } from '@/src/lib/utils';
import { Plus, Info, GraduationCap } from 'lucide-react';
import { CartDrawer } from './CartDrawer';

gsap.registerPlugin(ScrollTrigger);

export const Training = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: i * 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          }
        }
      );
    });
  }, []);

  const addToCart = (service: any) => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});

    const currentCart = JSON.parse(localStorage.getItem('minchus_cart') || '[]');
    if (!currentCart.find((item: any) => item.id === service.id)) {
      const newItem = { ...service, age: '', duration: '20 Days' };
      const updatedCart = [...currentCart, newItem];
      localStorage.setItem('minchus_cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cart-updated'));
      setIsCartOpen(true);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <span className="text-premium font-bold uppercase tracking-widest text-xs">Expert Training</span>
          <h2 className="text-5xl md:text-7xl font-serif text-trust mt-4">Behavioral <br /> <span className="italic">Excellence</span></h2>
          <p className="mt-6 text-trust/60 max-w-2xl mx-auto leading-relaxed">
            Led by Purushotham, our science-based training methods focus on building confidence and bridging the communication gap between you and your pet.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {TRAINING_SERVICES.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="group bg-white rounded-[40px] overflow-hidden border border-trust/5 hover:shadow-[0_30px_60px_-15px_rgba(10,38,71,0.15)] hover:scale-[1.05] transition-all duration-700 flex flex-col"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 bg-premium text-trust px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <GraduationCap className="w-3 h-3" />
                  {service.duration}
                </div>
              </div>
              
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-serif text-trust mb-2">{service.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.features?.map((f, idx) => (
                        <span key={idx} className="text-[9px] font-bold uppercase tracking-wider bg-base px-2 py-1 rounded text-trust/40">{f}</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-premium">₹{service.price}</span>
                </div>
                
                <p className="text-trust/60 mb-10 leading-relaxed flex-1">
                  {service.description}
                </p>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => addToCart(service)}
                    className="flex-1 bg-trust text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-organic transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    Enroll Now
                  </button>
                  <button className="w-14 h-14 border border-trust/10 rounded-2xl flex items-center justify-center hover:bg-base transition-colors">
                    <Info className="w-5 h-5 text-trust/40" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
