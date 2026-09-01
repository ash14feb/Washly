import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Car, Bike } from 'lucide-react';
import { mockVehicleCategories } from '../data';
import { useBooking } from '../context/BookingContext';

export const SelectVehicle = () => {
  const navigate = useNavigate();
  const { bookingState, updateBooking } = useBooking();

  const selectedType = bookingState.vehicleType || 'car';
  
  const categories = mockVehicleCategories.filter(c => c.type === selectedType);

  const handleSelect = (categoryId: string, name: string) => {
    updateBooking({ vehicleCategoryId: categoryId, vehicleName: name });
    navigate('/services');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-6">
      {/* Header */}
      <div className="bg-slate-900 text-white px-4 pt-12 pb-6 rounded-b-[2rem] shadow-sm flex items-center sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-800 text-white transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold ml-2">Select Your Vehicle</h1>
      </div>

      <div className="px-6 mt-8">
        {/* Type Toggle */}
        <div className="flex bg-slate-200 p-1.5 rounded-2xl mb-8">
          <button 
            className={`flex-1 flex items-center justify-center py-3 rounded-xl text-sm font-bold transition-all ${selectedType === 'car' ? 'bg-indigo-600 shadow-md text-white' : 'text-slate-600 hover:bg-slate-300'}`}
            onClick={() => updateBooking({ vehicleType: 'car' })}
          >
            <Car className={`w-5 h-5 mr-2 ${selectedType === 'car' ? 'drop-shadow-sm' : ''}`} strokeWidth={selectedType === 'car' ? 2 : 1.5} /> Car
          </button>
          <button 
            className={`flex-1 flex items-center justify-center py-3 rounded-xl text-sm font-bold transition-all ${selectedType === 'bike' ? 'bg-indigo-600 shadow-md text-white' : 'text-slate-600 hover:bg-slate-300'}`}
            onClick={() => updateBooking({ vehicleType: 'bike' })}
          >
            <Bike className={`w-5 h-5 mr-2 ${selectedType === 'bike' ? 'drop-shadow-sm' : ''}`} strokeWidth={selectedType === 'bike' ? 2 : 1.5} /> Bike
          </button>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => handleSelect(cat.id, cat.name)}
              className="w-full bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex items-center hover:border-indigo-400 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="w-20 h-16 rounded-2xl bg-slate-100 overflow-hidden mr-4">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-slate-900 text-lg">{cat.name}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
