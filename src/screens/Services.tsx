import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, Sparkles } from 'lucide-react';
import { mockServices } from '../data';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/ui';

export const Services = () => {
  const navigate = useNavigate();
  const { bookingState, updateBooking } = useBooking();

  const getDynamicPrice = (service: any) => {
    let basePrice = service.price;
    if (service.vehicleType === 'car' && bookingState.vehicleName) {
      if (bookingState.vehicleName.includes('Sedan')) basePrice += 100;
      else if (bookingState.vehicleName.includes('SUV')) basePrice += 200;
      else if (bookingState.vehicleName.includes('Luxury')) basePrice += 300;
    }
    return basePrice;
  };

  const services = mockServices.filter(s => s.vehicleType === bookingState.vehicleType).map(s => ({
    ...s,
    price: getDynamicPrice(s)
  }));

  const handleSelectService = (service: any) => {
    updateBooking({ service });
    navigate('/service-details');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-6">
      {/* Header */}
      <div className="bg-slate-900 text-white px-4 pt-12 pb-6 rounded-b-[2rem] shadow-sm flex items-center sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-800 text-white transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold ml-2">Select Service</h1>
      </div>

      <div className="px-6 mt-8 space-y-4">
        {services.map(service => (
          <div key={service.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 relative overflow-hidden">
            {service.popular && (
              <div className="absolute top-0 right-0 bg-lime-400 text-slate-900 text-[10px] font-bold px-3 py-1 rounded-bl-2xl flex items-center">
                <Sparkles className="w-3 h-3 mr-1" /> POPULAR
              </div>
            )}
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{service.name}</h3>
                <p className="text-slate-500 text-sm font-medium">{service.duration}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-indigo-600">₹{service.price}</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              {service.features.slice(0, 4).map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center mr-3 mt-0.5 shrink-0 border border-indigo-100">
                    <Check className="w-3.5 h-3.5 text-indigo-600" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm text-slate-600 font-medium leading-relaxed">{feature}</span>
                </div>
              ))}
              {service.features.length > 4 && (
                <p className="text-sm text-slate-400 ml-8 font-medium italic">+ {service.features.length - 4} more</p>
              )}
            </div>
            
            <Button className="w-full text-sm font-bold py-3" onClick={() => handleSelectService(service)}>
              SELECT
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
