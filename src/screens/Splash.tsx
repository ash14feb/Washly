import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <img 
          src="https://i.ibb.co/m5PDt4JP/washlylogo-removebg-preview.png" 
          alt="Washly Logo" 
          className="w-32 h-32 mb-6 object-contain"
        />
        <h1 className="text-4xl font-bold tracking-tight mb-2">Washly</h1>
        <p className="text-lime-400 font-medium tracking-wide">WE WASH. YOU RELAX.</p>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-12 w-12 h-1 bg-slate-800 rounded-full overflow-hidden"
      >
        <motion.div 
          className="h-full bg-lime-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};
