import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQ = () => {
  const faqs = [
    { q: "What vaccinations are required?", a: "We require DHPP, Rabies, and Bordetella vaccinations for all guests." },
    { q: "Can I see the facility before booking?", a: "Yes! We offer virtual tours on our website and physical tours by appointment." },
    { q: "How do you handle aggressive dogs?", a: "Our lead trainer Purushotham specializes in behavior correction. We assess every dog individually." },
    { q: "What should I bring for boarding?", a: "Just your dog's regular food and any medication. We provide bedding and toys." },
  ];

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16 text-center">
          <span className="text-premium font-bold uppercase tracking-widest text-xs">Common Questions</span>
          <h2 className="text-5xl font-serif text-trust mt-4">Everything You <br /> <span className="italic">Need to Know</span></h2>
        </header>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white rounded-3xl border border-trust/5 overflow-hidden">
              <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                <div className="flex items-center gap-4">
                  <HelpCircle className="text-premium w-5 h-5" />
                  <h3 className="text-lg font-serif text-trust">{faq.q}</h3>
                </div>
                <ChevronDown className="w-5 h-5 text-trust/20 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-8 pb-8 pt-0 text-trust/60 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};
