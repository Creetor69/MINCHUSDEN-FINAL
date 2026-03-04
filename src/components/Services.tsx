import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICES, cn } from '@/src/lib/utils';
import { Plus, Check, ShoppingCart } from 'lucide-react';

export const Services = () => {
  const [cart, setCart] = useState<string[]>([]);

  const toggleCart = (id: string) => {
    if (cart.includes(id)) {
      setCart(cart.filter(item => item !== id));
    } else {
      setCart([...cart, id]);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <span className="text-premium font-bold uppercase tracking-widest text-xs">Our Offerings</span>
          <h2 className="text-5xl md:text-7xl font-serif text-trust mt-4">Premium Care <br /> <span className="italic">For Your Pack</span></h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[32px] overflow-hidden border border-trust/5 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-trust">
                    {service.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-serif text-trust">{service.title}</h3>
                  <span className="text-xl font-bold text-premium">₹{service.price}</span>
                </div>
                <p className="text-trust/60 mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                <button
                  onClick={() => toggleCart(service.id)}
                  className={cn(
                    "w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300",
                    cart.includes(service.id) 
                      ? "bg-organic text-white" 
                      : "bg-base text-trust hover:bg-trust hover:text-white"
                  )}
                >
                  {cart.includes(service.id) ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Booking
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add to Booking
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sticky Cart Button */}
      {cart.length > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <Link
            to="/booking"
            className="bg-trust text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all relative"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-premium text-trust text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
              {cart.length}
            </span>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

import { Link } from 'react-router-dom';
