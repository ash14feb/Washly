import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronRight, Car, Bike, Sparkles, CheckCircle2, Droplets, Zap } from 'lucide-react';
import { Button } from '../components/ui';
import { useBooking } from '../context/BookingContext';

export const Home = () => {
  const navigate = useNavigate();
  const { updateBooking, resetBooking } = useBooking();

  const handleStartBooking = (vehicleType?: 'car' | 'bike') => {
    resetBooking();
    if (vehicleType) {
      updateBooking({ vehicleType });
      navigate('/select-vehicle');
    } else {
      navigate('/select-vehicle');
    }
  };

  return (
    <div className="flex flex-col pb-6">
      {/* Header */}
      <div className="bg-slate-900 text-white px-6 pt-12 pb-10 rounded-b-[3rem] shadow-md z-10 relative">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs opacity-60 mb-1 tracking-wider uppercase">Welcome back,</p>
            <h1 className="text-lg font-bold">Ashwaq Ahmed 👋</h1>
          </div>
          <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center font-bold text-slate-900 text-lg">
             AA
          </div>
        </div>
        
        <div className="flex items-center text-sm bg-slate-800 p-3 rounded-2xl">
          <MapPin className="w-4 h-4 text-lime-400 mr-2" />
          <span className="flex-1 font-medium truncate">Mysuru, Karnataka</span>
          <span className="text-xs text-lime-400 cursor-pointer font-bold">Change</span>
        </div>
      </div>

      {/* Main Hero Card */}
      <div className="px-6 -mt-8 relative z-20 mb-8">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-3xl p-6 shadow-xl shadow-indigo-900/20 text-white flex flex-col justify-end overflow-hidden relative min-h-[160px]">
          <img 
            src="https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&q=80&w=400" 
            alt="Washing" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="relative z-10">
            <h2 className="text-2xl font-black mb-1 leading-tight">CAR & BIKE WASH<br/>AT YOUR DOORSTEP</h2>
            <p className="text-[10px] opacity-80 uppercase tracking-[0.2em] mb-4 font-bold">We wash. You relax.</p>
            <Button size="sm" variant="secondary" className="w-fit text-xs px-5 py-2 font-black rounded-full" onClick={() => handleStartBooking()}>
              BOOK NOW
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Vehicle Selection */}
      <div className="px-6 mb-8">
        <h3 className="text-sm font-bold text-slate-900 mb-3">What are we washing today?</h3>
        <div className="flex gap-4">
          <button 
            onClick={() => handleStartBooking('car')}
            className="flex-1 bg-sky-50 rounded-[2rem] p-5 border-2 border-transparent hover:border-sky-300 transition-all flex flex-col justify-center shadow-sm"
          >
            <div className="text-3xl mb-2 text-left">🚗</div>
            <div className="text-left">
              <span className="font-bold text-slate-900 block mb-0.5">Car</span>
              <span className="text-[10px] text-slate-500 font-medium">From ₹199</span>
            </div>
          </button>
          
          <button 
            onClick={() => handleStartBooking('bike')}
            className="flex-1 bg-lime-50 rounded-[2rem] p-5 border-2 border-transparent hover:border-lime-300 transition-all flex flex-col justify-center shadow-sm"
          >
            <div className="text-3xl mb-2 text-left">🏍️</div>
            <div className="text-left">
              <span className="font-bold text-slate-900 block mb-0.5">Bike</span>
              <span className="text-[10px] text-slate-500 font-medium">From ₹99</span>
            </div>
          </button>
        </div>
      </div>

      {/* Popular Services - Horizontal Scroll */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3 px-6">
          <h3 className="text-sm font-bold text-slate-900">Popular Services</h3>
          <span className="text-xs text-indigo-600 font-bold cursor-pointer hover:underline">View all</span>
        </div>
        <div className="flex overflow-x-auto px-6 pb-4 space-x-4 scrollbar-hide">
          {[
            { title: "Premium Wash", price: "₹399", type: "car", img: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=200" },
            { title: "Bike Basic", price: "₹99", type: "bike", img: "https://images.unsplash.com/photo-1621905252472-943afaa20e20?auto=format&fit=crop&q=80&w=200" },
            { title: "Interior Clean", price: "₹499", type: "car", img: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=200" },
          ].map((item, i) => (
            <div key={i} className="min-w-[140px] bg-slate-50 p-3 rounded-2xl border border-slate-100 flex-shrink-0 hover:shadow-md transition-all cursor-pointer" onClick={() => handleStartBooking(item.type as any)}>
              <div className="w-full h-20 bg-slate-200 rounded-xl mb-2 overflow-hidden">
                <img src={item.img} className="w-full h-full object-cover" alt="Service" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs mb-0.5">{item.title}</h4>
              <p className="text-[10px] text-indigo-600 font-black">{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Offer Banner */}
      <div className="px-6 mb-8">
        <div className="bg-slate-900 rounded-2xl p-5 text-white border border-slate-800 flex justify-between items-center overflow-hidden relative">
          <div className="relative z-10">
            <p className="text-xs text-lime-400 font-bold tracking-wider mb-1">FIRST WASH OFFER</p>
            <h3 className="text-lg font-bold mb-2">₹50 OFF</h3>
            <p className="text-xs text-slate-400 mb-3">Use code: <span className="text-white font-mono bg-slate-800 px-1 py-0.5 rounded">WELCOME50</span></p>
            <Button size="sm" variant="secondary" className="h-8 px-3 text-xs" onClick={() => handleStartBooking()}>BOOK NOW</Button>
          </div>
          <div className="absolute right-[-20px] top-[-20px] opacity-10">
            <GiftIcon className="w-32 h-32 text-white" />
          </div>
        </div>
      </div>

      {/* Why Washly */}
      <div className="px-6 mb-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Why Washly?</h3>
        <div className="grid grid-cols-2 gap-3">
          <WhyCard icon={<CheckCircle2 className="w-5 h-5 text-blue-500" />} title="Easy Booking" desc="Book in a few taps" />
          <WhyCard icon={<MapPin className="w-5 h-5 text-red-500" />} title="Doorstep Service" desc="We come to you" />
          <WhyCard icon={<Sparkles className="w-5 h-5 text-amber-500" />} title="Professional Care" desc="Trained experts" />
          <WhyCard icon={<Droplets className="w-5 h-5 text-cyan-500" />} title="Eco Friendly" desc="Efficient water use" />
        </div>
      </div>

      {/* Subscription Banner */}
      <div className="px-6 mb-4">
        <div className="bg-lime-300 p-6 rounded-[2rem] flex items-center justify-between overflow-hidden relative shadow-md">
          <div className="relative z-10">
            <h4 className="text-slate-900 font-black text-xl leading-none mb-2">WASH MORE.<br/>SAVE MORE.</h4>
            <p className="text-slate-800 text-xs mb-4 opacity-80 font-medium">Monthly plans starting at ₹399</p>
            <Button variant="primary" className="bg-slate-900 text-white hover:bg-slate-800 shadow-none px-6 py-2 rounded-xl text-xs font-bold w-fit h-auto" onClick={() => navigate('/subscriptions')}>
              VIEW PLANS
            </Button>
          </div>
          <div className="w-32 h-32 bg-white/20 rounded-full absolute -right-4 -bottom-4"></div>
          <div className="w-48 h-48 bg-white/10 rounded-full absolute -right-10 -top-10"></div>
        </div>
      </div>

    </div>
  );
};

const WhyCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col">
    <div className="mb-2 bg-slate-50 w-8 h-8 rounded-full flex items-center justify-center">
      {icon}
    </div>
    <span className="font-semibold text-slate-900 text-sm mb-0.5">{title}</span>
    <span className="text-xs text-slate-500 leading-tight">{desc}</span>
  </div>
);

function GiftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  )
}
