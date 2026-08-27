import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, Droplets, Zap, User } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/ui';

export const ServiceDetails = () => {
  const navigate = useNavigate();
  const { bookingState } = useBooking();
  const { service } = bookingState;

  if (!service) {
    return <div className="p-6">No service selected.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-24">
      <div className="relative h-64 bg-slate-900">
        <img 
          src={bookingState.vehicleType === 'car' ? "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80" : "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"}
          alt="Service" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        <button onClick={() => navigate(-1)} className="absolute top-12 left-4 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white transition-colors hover:bg-black/40">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h1 className="text-3xl font-extrabold mb-1">{service.name}</h1>
          <p className="text-lime-400 text-2xl font-black">₹{service.price}</p>
        </div>
      </div>

      <div className="px-6 py-6 bg-white rounded-t-[2rem] -mt-6 relative z-10 space-y-6">
        <div>
          <h3 className="font-bold text-slate-900 mb-4 text-lg">Includes</h3>
          <div className="space-y-4">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5 text-indigo-600 font-bold" />
                </div>
                <span className="text-slate-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100">
          <h4 className="font-bold text-slate-900 mb-3">Requirements</h4>
          <div className="space-y-3">
            <div className="flex items-center text-sm font-medium text-slate-700">
              <Droplets className="w-5 h-5 text-indigo-500 mr-3" /> You provide water
            </div>
            <div className="flex items-center text-sm font-medium text-slate-700">
              <Zap className="w-5 h-5 text-amber-500 mr-3" /> You provide power
            </div>
            <div className="flex items-center text-sm font-medium text-slate-700">
              <User className="w-5 h-5 text-lime-600 mr-3" /> We bring everything else
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 max-w-[480px] mx-auto z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <Button className="w-full font-bold text-sm py-4" onClick={() => navigate('/select-location')}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};
