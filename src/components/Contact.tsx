import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <header className="mb-12">
              <span className="text-premium font-bold uppercase tracking-widest text-xs">Get in Touch</span>
              <h2 className="text-5xl md:text-7xl font-serif text-trust mt-4">Let's Start <br /> <span className="italic">The Conversation</span></h2>
            </header>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-base rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="text-premium w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-trust mb-1">Our Location</h4>
                  <p className="text-trust/60">Kanakapura Road, Bangalore, Karnataka 560062</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-base rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="text-premium w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-trust mb-1">Call Us</h4>
                  <p className="text-trust/60">+91 99999 00000</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-base rounded-2xl flex items-center justify-center shrink-0">
                  <Mail className="text-premium w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-trust mb-1">Email Us</h4>
                  <p className="text-trust/60">hello@minchusden.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 md:p-12 rounded-[40px] border border-trust/5 shadow-xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-trust/40 mb-2 block">Name</label>
                  <input type="text" className="w-full bg-base border-none rounded-2xl p-4 focus:ring-2 focus:ring-premium" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-trust/40 mb-2 block">Email</label>
                  <input type="email" className="w-full bg-base border-none rounded-2xl p-4 focus:ring-2 focus:ring-premium" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-trust/40 mb-2 block">Message</label>
                <textarea rows={4} className="w-full bg-base border-none rounded-2xl p-4 focus:ring-2 focus:ring-premium" />
              </div>
              <button className="w-full bg-trust text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-organic transition-all group">
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
