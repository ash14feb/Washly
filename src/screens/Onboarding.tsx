import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui';

const slides = [
  {
    title: "Professional Vehicle Care",
    description: "Professional car and bike washing at your doorstep.",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "We Come To You",
    description: "No driving to a washing center. No waiting in queues.",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Your Water. Your Power. Our Care.",
    description: "We bring professional equipment directly to your location.",
    image: "https://images.unsplash.com/photo-1587588079047-9750058b8d4e?auto=format&fit=crop&w=800&q=80"
  }
];

export const Onboarding = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      navigate('/home');
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 relative overflow-hidden bg-slate-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={slides[currentSlide].image}
            alt="Onboarding"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
      </div>

      <div className="bg-slate-900 text-white rounded-t-3xl -mt-6 relative z-10 px-6 pt-10 pb-8 flex flex-col items-center text-center">
        <div className="flex space-x-2 mb-8">
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-6 bg-lime-400' : 'w-2 bg-slate-600'}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-32"
          >
            <h2 className="text-2xl font-bold mb-4">{slides[currentSlide].title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xs mx-auto">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="w-full flex flex-col space-y-3 mt-8">
          <Button variant="secondary" size="lg" className="w-full font-bold text-slate-900" onClick={handleNext}>
            {currentSlide === slides.length - 1 ? "GET STARTED" : "NEXT"}
          </Button>
          <Button variant="ghost" className="w-full text-slate-400 hover:text-white" onClick={() => navigate('/home')}>
            SKIP
          </Button>
        </div>
      </div>
    </div>
  );
};
