import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, WalletCards, Coins, CreditCard, Car, Sparkles, Calendar, MapPin, Clock } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/ui';

export const BookingSummary = () => {
  const navigate = useNavigate();
  const { bookingState, updateBooking, addBooking } = useBooking();
  const { service, vehicleName, location, date, time } = bookingState;

  const [addons, setAddons] = useState<string[]>([]);
  const [discountAmount, setDiscountAmount] = useState(50); // mock discount
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!service) return <div className="p-6">Missing info</div>;

  const isBasicOrPremium = service.name.toLowerCase().includes('basic') || service.name.toLowerCase().includes('premium');
  const showAddonOffer = isBasicOrPremium && timeLeft > 0;

  const handleAddonToggle = (id: string) => {
    setAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const selectedAddonsData = (service.addons || []).filter(a => addons.includes(a.id));
  const addonsTotal = selectedAddonsData.reduce((sum, a) => sum + a.price, 0);
  
  const addonDiscount = (showAddonOffer && addonsTotal > 0) ? Math.floor(addonsTotal * 0.10) : 0;
  const total = service.price + addonsTotal - discountAmount - addonDiscount;

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timeString = `${mins}:${secs.toString().padStart(2, '0')}`;

  const handleConfirm = () => {
    // create mock booking
    const newBooking = {
      id: `WLY-${Date.now().toString().slice(-8)}`,
      date: date || 'Today',
      time: time || '10:00 AM',
      vehicleType: bookingState.vehicleType!,
      vehicleCategoryName: vehicleName || 'Vehicle',
      serviceId: service.id,
      serviceName: service.name,
      location: location!,
      totalPrice: total,
      status: 'upcoming' as const,
    };
    addBooking(newBooking);
    navigate('/success');
  };

  return (
    <div className="flex flex-col flex-1 bg-slate-50">
      <div className="bg-slate-900 text-white px-4 pt-12 pb-10 shadow-sm flex items-center sticky top-0 z-20 shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-800 text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold ml-2">Review Your Booking</h1>
      </div>

      <div className="p-6 space-y-6 bg-white flex-1 rounded-t-[2.5rem] shadow-sm -mt-6 relative z-30">
        <h3 className="text-xl font-bold mb-2 flex items-center justify-between text-slate-900">
          Booking Summary
          <span className="bg-indigo-50 text-indigo-600 text-[10px] px-3 py-1 rounded-full font-black tracking-wider uppercase">WLY-1042</span>
        </h3>

        {/* Main Info */}
        <div className="flex gap-4">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center border border-slate-200 shadow-[inset_0_2px_4px_rgba(255,255,255,1)] shrink-0">
                <Car className="w-5 h-5 text-slate-600 drop-shadow-sm" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Vehicle</p>
                <p className="font-bold text-sm text-slate-900 leading-tight">{vehicleName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center border border-slate-200 shadow-[inset_0_2px_4px_rgba(255,255,255,1)] shrink-0">
                <Sparkles className="w-5 h-5 text-slate-600 drop-shadow-sm" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Service</p>
                <p className="font-bold text-sm text-slate-900 leading-tight">{service.name}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center border border-slate-200 shadow-[inset_0_2px_4px_rgba(255,255,255,1)] shrink-0">
                <Calendar className="w-5 h-5 text-slate-600 drop-shadow-sm" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Date & Time</p>
                <p className="font-bold text-sm text-slate-900 leading-tight line-clamp-1">{date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center border border-slate-200 shadow-[inset_0_2px_4px_rgba(255,255,255,1)] shrink-0">
                <MapPin className="w-5 h-5 text-slate-600 drop-shadow-sm" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Location</p>
                <p className="font-bold text-sm text-slate-900 leading-tight line-clamp-1">{location?.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add-ons */}
        {service.addons && service.addons.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-slate-900">Add-ons</h3>
              {showAddonOffer && (
                <div className="flex items-center gap-1.5 bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-bold border border-rose-100">
                  <Clock className="w-3.5 h-3.5" />
                  <span>10% OFF ends in {timeString}</span>
                </div>
              )}
            </div>
            <div className="space-y-3">
              {service.addons.map(addon => (
                <label key={addon.id} className={`flex items-center p-4 bg-white rounded-xl border cursor-pointer transition-colors ${addons.includes(addon.id) ? 'border-lime-400 bg-lime-50/30' : 'border-slate-100'}`}>
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-slate-300 text-lime-500 focus:ring-lime-500"
                    checked={addons.includes(addon.id)}
                    onChange={() => handleAddonToggle(addon.id)}
                  />
                  <div className="ml-3 flex-1">
                    <p className="font-semibold text-slate-900 text-sm">{addon.name}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-700">
                      +₹{addon.price}
                    </div>
                    {showAddonOffer && addons.includes(addon.id) && (
                      <div className="text-[10px] font-bold text-rose-500">
                        -₹{Math.floor(addon.price * 0.10)}
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Bill Details */}
        <div className="bg-slate-50 p-6 rounded-3xl border-dashed border-2 border-slate-200 mt-6">
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-slate-500">Service Base Price</span>
              <span className="font-bold text-slate-900">₹{service.price}</span>
            </div>
            {selectedAddonsData.map(a => (
              <div key={a.id} className="flex justify-between mb-2">
                <span className="text-slate-500">Add-ons ({a.name})</span>
                <span className="font-bold text-slate-900">₹{a.price}</span>
              </div>
            ))}
            <div className="flex justify-between text-lime-600 font-bold mb-2">
              <span>Discount (WELCOME50)</span>
              <span>-₹{discountAmount}</span>
            </div>
            {addonDiscount > 0 && (
              <div className="flex justify-between text-rose-500 font-bold mb-2">
                <span>Add-ons Offer (10% OFF)</span>
                <span>-₹{addonDiscount}</span>
              </div>
            )}
            <div className="border-b border-slate-200 pb-2 mb-2"></div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-black text-slate-900">Total Amount</span>
            <span className="text-2xl font-black text-indigo-700">₹{total}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="pt-4">
          <h3 className="font-bold text-slate-900 mb-3 text-sm">Pay Via</h3>
          <div className="flex gap-4">
            <div className="flex-1 bg-white border-2 border-slate-200 p-4 rounded-2xl flex items-center gap-3 cursor-pointer hover:border-indigo-600 transition-all shadow-sm">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-black">UPI</div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Pay with</p>
                <p className="text-sm font-bold text-slate-900">Google Pay</p>
              </div>
            </div>
            <div className="w-16 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-slate-50">
               <CreditCard className="w-6 h-6 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto sticky bottom-0 left-0 right-0 p-4 bg-white z-50 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-safe">
        <Button className="w-full py-6 h-auto text-lg rounded-2xl" onClick={handleConfirm}>
          CONFIRM BOOKING
        </Button>
      </div>
    </div>
  );
};
