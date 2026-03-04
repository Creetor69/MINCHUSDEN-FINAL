import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Dog, Send, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import confetti from 'canvas-confetti';

export const BookingPortal = () => {
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    petName: '',
    breed: '',
    age: '',
    ownerName: '',
    phone: '',
    email: '',
    dropOffTime: '10:00',
    startDate: '',
    endDate: '',
    additionalNotes: ''
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('minchus_cart');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(items);
      if (items.length > 0) {
        const firstItem = items[0];
        setFormData(prev => ({
          ...prev,
          startDate: firstItem.startDate || '',
          endDate: firstItem.endDate || '',
          age: firstItem.age || ''
        }));
      }
    }
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      if (item.category === 'boarding') {
        return total + (item.price * (item.days || 1));
      }
      return total + item.price;
    }, 0);
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C5A059', '#0A2647', '#5B8C5A']
    });
    
    const totalPrice = calculateTotalPrice();
    const servicesList = cartItems.map(item => 
      `- ${item.title} (${item.category === 'boarding' ? `${item.days} days` : 'Training'})`
    ).join('\n');

    // WhatsApp Bridge
    const message = `Hi Minchu's Den! I'd like to confirm my booking:

👤 *OWNER DETAILS*
Name: ${formData.ownerName}
Phone: ${formData.phone}
Email: ${formData.email}

🐶 *PET DETAILS*
Name: ${formData.petName}
Breed: ${formData.breed}
Age: ${formData.age}

🛠 *SERVICES*
${servicesList}

📅 *SCHEDULE*
Start Date: ${formData.startDate}
End Date: ${formData.endDate || 'N/A'}
Drop-off Time: ${formData.dropOffTime}

💰 *TOTAL ESTIMATE*: ₹${totalPrice}

Notes: ${formData.additionalNotes || 'None'}

Please confirm my booking request!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919999900000?text=${encodedMessage}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setStep(4);
      localStorage.removeItem('minchus_cart');
      window.dispatchEvent(new Event('cart-updated'));
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-base">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-12">
          <span className="text-premium font-bold uppercase tracking-widest text-[10px] mb-2 block">Secure Checkout</span>
          <h2 className="text-4xl md:text-5xl font-serif text-trust mb-4">Finalize Your Booking</h2>
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  step >= s ? "w-12 bg-premium" : "w-4 bg-trust/10"
                )}
              />
            ))}
          </div>
        </header>

        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-trust/5">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-premium mb-8">
                  <Dog className="w-6 h-6" />
                  <h3 className="text-xl font-bold uppercase tracking-wider">Pet Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-trust/50 mb-2">Pet Name</label>
                    <input
                      type="text"
                      value={formData.petName}
                      onChange={(e) => setFormData({...formData, petName: e.target.value})}
                      className="w-full bg-base border-none rounded-2xl p-4 focus:ring-2 focus:ring-premium transition-all"
                      placeholder="e.g. Max"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-trust/50 mb-2">Breed</label>
                    <input
                      type="text"
                      value={formData.breed}
                      onChange={(e) => setFormData({...formData, breed: e.target.value})}
                      className="w-full bg-base border-none rounded-2xl p-4 focus:ring-2 focus:ring-premium transition-all"
                      placeholder="e.g. Beagle"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-trust/50 mb-2">Age</label>
                    <input
                      type="text"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      className="w-full bg-base border-none rounded-2xl p-4 focus:ring-2 focus:ring-premium transition-all"
                      placeholder="e.g. 2 Years"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-premium mb-8">
                  <Calendar className="w-6 h-6" />
                  <h3 className="text-xl font-bold uppercase tracking-wider">Schedule Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-trust/50 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full bg-base border-none rounded-2xl p-4 focus:ring-2 focus:ring-premium transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-trust/50 mb-2">End Date (Optional)</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="w-full bg-base border-none rounded-2xl p-4 focus:ring-2 focus:ring-premium transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-trust/50 mb-2">Preferred Drop-off Time</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-trust/30" />
                      <select
                        value={formData.dropOffTime}
                        onChange={(e) => setFormData({...formData, dropOffTime: e.target.value})}
                        className="w-full bg-base border-none rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-premium transition-all appearance-none"
                      >
                        <option>08:00 AM</option>
                        <option>09:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>12:00 PM</option>
                        <option>02:00 PM</option>
                        <option>04:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-premium mb-8">
                  <User className="w-6 h-6" />
                  <h3 className="text-xl font-bold uppercase tracking-wider">Owner Information</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-trust/50 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                      className="w-full bg-base border-none rounded-2xl p-4 focus:ring-2 focus:ring-premium transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-trust/50 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-base border-none rounded-2xl p-4 focus:ring-2 focus:ring-premium transition-all"
                        placeholder="+91 00000 00000"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-trust/50 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-base border-none rounded-2xl p-4 focus:ring-2 focus:ring-premium transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-trust/50 mb-2">Additional Notes</label>
                    <textarea
                      rows={3}
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                      className="w-full bg-base border-none rounded-2xl p-4 focus:ring-2 focus:ring-premium transition-all"
                      placeholder="Any special requirements or medical history..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-organic/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-12 h-12 text-organic" />
                </div>
                <h3 className="text-4xl font-serif text-trust mb-4">Request Initiated!</h3>
                <p className="text-trust/60 mb-10 max-w-sm mx-auto leading-relaxed">
                  We've opened WhatsApp with your booking details. Please send the message to confirm your request with Purushotham.
                </p>
                <button
                  onClick={() => setStep(1)}
                  className="bg-trust text-white px-10 py-4 rounded-2xl font-bold hover:bg-organic transition-all"
                >
                  Start New Booking
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {step < 4 && (
            <div className="mt-12 pt-8 border-t border-trust/5 flex items-center justify-between">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                className={cn(
                  "text-trust/40 font-black uppercase tracking-widest text-[10px] hover:text-trust transition-colors",
                  step === 1 && "invisible"
                )}
              >
                Back
              </button>
              <div className="flex items-center gap-6">
                {step === 3 && (
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-trust/40">Total Estimate</p>
                    <p className="text-xl font-bold text-trust">₹{calculateTotalPrice()}</p>
                  </div>
                )}
                <button
                  onClick={handleNext}
                  className="bg-trust text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-organic transition-all group shadow-xl shadow-trust/20"
                >
                  {step === 3 ? 'Confirm & WhatsApp' : 'Next Step'}
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
