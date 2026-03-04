import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, X, Plus, Minus, Calendar, Trash2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';

interface CartItem {
  id: string;
  title: string;
  price: number;
  category: string;
  days?: number;
  age?: string;
  startDate?: string;
  endDate?: string;
}

export const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // In a real app, this would be managed by a context or state management lib
  useEffect(() => {
    const savedCart = localStorage.getItem('minchus_cart');
    if (savedCart) setItems(JSON.parse(savedCart));
    
    const handleCartUpdate = () => {
      const updatedCart = localStorage.getItem('minchus_cart');
      if (updatedCart) setItems(JSON.parse(updatedCart));
    };
    
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  const removeItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    localStorage.setItem('minchus_cart', JSON.stringify(newItems));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const updateItem = (id: string, updates: Partial<CartItem>) => {
    const newItems = items.map(item => item.id === id ? { ...item, ...updates } : item);
    setItems(newItems);
    localStorage.setItem('minchus_cart', JSON.stringify(newItems));
  };

  const total = items.reduce((acc, item) => {
    if (item.category === 'boarding') {
      return acc + (item.price * (item.days || 1));
    }
    return acc + item.price;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-trust/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-trust/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-premium" />
                <h2 className="text-xl font-serif text-trust">Your Booking Cart</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-base rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-base rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="text-trust/20 w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-serif text-trust mb-2">Cart is empty</h3>
                  <p className="text-trust/40 text-sm mb-6">Add some services to get started!</p>
                  <button onClick={onClose} className="text-premium font-bold uppercase tracking-widest text-xs">Continue Browsing</button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="bg-base rounded-2xl p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif text-lg text-trust">{item.title}</h4>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-premium">{item.category}</span>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-trust/20 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {item.category === 'boarding' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-trust/40 mb-1 block">Days</label>
                          <div className="flex items-center gap-3 bg-white rounded-lg p-2">
                            <button onClick={() => updateItem(item.id, { days: Math.max(1, (item.days || 1) - 1) })}><Minus className="w-3 h-3" /></button>
                            <span className="text-sm font-bold">{item.days || 1}</span>
                            <button onClick={() => updateItem(item.id, { days: (item.days || 1) + 1 })}><Plus className="w-3 h-3" /></button>
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-trust/40 mb-1 block">Price</label>
                          <span className="text-sm font-bold text-trust">₹{item.price * (item.days || 1)}</span>
                        </div>
                        <div className="col-span-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-trust/40 mb-1 block">Dates</label>
                          <div className="flex gap-2">
                            <input 
                              type="date" 
                              className="bg-white text-[10px] p-2 rounded w-full"
                              value={item.startDate}
                              onChange={(e) => updateItem(item.id, { startDate: e.target.value })}
                            />
                            <input 
                              type="date" 
                              className="bg-white text-[10px] p-2 rounded w-full"
                              value={item.endDate}
                              onChange={(e) => updateItem(item.id, { endDate: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {item.category === 'training' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-trust/40 mb-1 block">Pet Age</label>
                          <input 
                            type="text" 
                            placeholder="e.g. 2 years"
                            className="bg-white text-[10px] p-2 rounded w-full"
                            value={item.age}
                            onChange={(e) => updateItem(item.id, { age: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-trust/40 mb-1 block">Price</label>
                          <span className="text-sm font-bold text-trust">₹{item.price}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-[10px] text-trust/40 italic">Duration: 20 Days Intensive</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-trust/5 bg-base/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-trust/60 font-serif">Total Estimate</span>
                  <span className="text-2xl font-bold text-trust">₹{total}</span>
                </div>
                <Link
                  to="/booking"
                  onClick={onClose}
                  className="w-full bg-trust text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-organic transition-all"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
