import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Boarding } from './components/Boarding';
import { Training } from './components/Training';
import { BookingPortal } from './components/BookingPortal';
import { About } from './components/About';
import { Reviews } from './components/Reviews';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { MeetPurushotham } from './components/MeetPurushotham';
import { LoadingScreen } from './components/LoadingScreen';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      <SmoothScrollProvider>
        <div className="min-h-screen bg-base selection:bg-premium selection:text-trust">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/boarding" element={<PageWrapper><Boarding /></PageWrapper>} />
              <Route path="/training" element={<PageWrapper><Training /></PageWrapper>} />
              <Route path="/booking" element={<PageWrapper><BookingPortal /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/reviews" element={<PageWrapper><Reviews /></PageWrapper>} />
              <Route path="/faq" element={<PageWrapper><FAQ /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
              <Route path="/meet-purushotham" element={<PageWrapper><MeetPurushotham /></PageWrapper>} />
              <Route path="/terms" element={<PageWrapper><div className="pt-32 px-6 text-center h-screen"><h1 className="text-4xl font-serif">Terms & Policies</h1><p className="mt-4 text-trust/60">Coming Soon...</p></div></PageWrapper>} />
            </Routes>
          </AnimatePresence>
          
          {/* Footer */}
          <footer className="bg-trust text-white py-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <h2 className="text-3xl font-serif mb-6">Minchu's <span className="text-premium italic">Den</span></h2>
                <p className="text-white/60 max-w-sm leading-relaxed">
                  The premier destination for canine care and behavioral excellence. 
                  Located on Kanakapura Road, Bangalore.
                </p>
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs text-premium mb-6">Quick Links</h4>
                <ul className="space-y-4 text-sm text-white/60">
                  <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/boarding" className="hover:text-white transition-colors">Boarding</Link></li>
                  <li><Link to="/training" className="hover:text-white transition-colors">Training</Link></li>
                  <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to="/meet-purushotham" className="hover:text-white transition-colors">Meet Purushotham</Link></li>
                  <li><Link to="/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
                  <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Policies</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs text-premium mb-6">Contact</h4>
                <ul className="space-y-4 text-sm text-white/60">
                  <li>Kanakapura Road, Bangalore</li>
                  <li>+91 99999 00000</li>
                  <li>hello@minchusden.com</li>
                </ul>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-white/40">© 2024 Minchu's Den. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="text-xs text-white/40 hover:text-premium transition-colors uppercase tracking-widest font-bold">Instagram</a>
                <a href="#" className="text-xs text-white/40 hover:text-premium transition-colors uppercase tracking-widest font-bold">Facebook</a>
              </div>
            </div>
          </footer>
        </div>
      </SmoothScrollProvider>
    </Router>
  );
}
