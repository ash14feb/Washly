import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, Calendar, Clock, MapPin, Car } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/ui';

export const BookingSuccess = () => {
  const navigate = useNavigate();
  const { bookings } = useBooking();
  const latestBooking = bookings[0];

  useEffect(() => {
    if (!latestBooking) {
      navigate('/home');
    }
  }, [latestBooking, navigate]);

  if (!latestBooking) return null;

  return (
    <div className="flex flex-col min-h-screen bg-indigo-600 overflow-hidden relative">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-white text-center relative z-10 mt-8">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-lime-400 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(163,230,53,0.4)] mb-8"
        >
          <Check className="w-12 h-12 text-indigo-900" strokeWidth={3.5} />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-black tracking-tight mb-2"
        >
          BOOKING CONFIRMED! 🎉
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-indigo-100 font-medium mb-8 text-lg"
        >
          Your Washly professional is scheduled.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-[2rem] p-8 w-full shadow-2xl text-left"
        >
          <div className="border-b border-dashed border-slate-200 pb-5 mb-5">
            <p className="text-xs text-slate-400 font-bold tracking-wider uppercase mb-1">Booking ID</p>
            <p className="font-mono font-bold text-slate-900 text-lg">{latestBooking.id}</p>
          </div>
          
          <div className="space-y-5">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center mr-4 shrink-0">
                <Calendar className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium mb-0.5">Date</p>
                <p className="font-bold text-slate-900">{latestBooking.date}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center mr-4 shrink-0">
                <Clock className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium mb-0.5">Time</p>
                <p className="font-bold text-slate-900">{latestBooking.time}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center mr-4 shrink-0">
                <Car className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium mb-0.5">Service</p>
                <p className="font-bold text-slate-900">{latestBooking.serviceName}</p>
                <p className="text-sm text-slate-500 font-medium">{latestBooking.vehicleCategoryName}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="p-6 pt-0 space-y-4 relative z-10 mt-4 mb-4">
        <Button className="w-full bg-lime-400 text-slate-900 hover:bg-lime-300 shadow-xl font-bold py-4 text-sm" onClick={() => navigate('/bookings')}>
          TRACK BOOKING
        </Button>
        <Button variant="ghost" className="w-full text-indigo-100 hover:bg-indigo-500 hover:text-white font-bold py-4 text-sm" onClick={() => navigate('/home')}>
          BACK TO HOME
        </Button>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500 rounded-full blur-3xl opacity-50 -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-700 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/3" />
    </div>
  );
};
