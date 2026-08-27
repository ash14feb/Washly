import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Plus } from 'lucide-react';
import { mockLocations } from '../data';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/ui';

export const SelectLocation = () => {
  const navigate = useNavigate();
  const { bookingState, updateBooking } = useBooking();
  const [selectedId, setSelectedId] = useState(bookingState.location?.id || mockLocations[0].id);
  const [confirmed, setConfirmed] = useState(false);

  const handleContinue = () => {
    const loc = mockLocations.find(l => l.id === selectedId);
    if (loc && confirmed) {
      updateBooking({ location: loc });
      navigate('/select-time');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-slate-900 text-white px-4 pt-12 pb-6 rounded-b-[2rem] shadow-sm flex items-center sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-800 text-white transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold ml-2">Where should we wash?</h1>
      </div>

      <div className="p-6">
        <div className="w-full h-32 bg-slate-200 rounded-3xl mb-8 overflow-hidden relative shadow-sm">
          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" alt="Map" className="w-full h-full object-cover opacity-50 grayscale" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg">
                Mysuru
             </div>
          </div>
        </div>

        <h3 className="font-bold text-slate-900 mb-4 text-lg">Saved Addresses</h3>
        <div className="space-y-3 mb-8">
          {mockLocations.map(loc => (
            <div 
              key={loc.id} 
              onClick={() => setSelectedId(loc.id)}
              className={`p-5 rounded-3xl border-2 cursor-pointer transition-all ${selectedId === loc.id ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'}`}
            >
              <div className="flex items-start">
                <MapPin className={`w-5 h-5 mr-3 mt-0.5 ${selectedId === loc.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                <div>
                  <h4 className="font-bold text-slate-900">{loc.name}</h4>
                  <p className="text-sm text-slate-500 leading-tight mt-1 font-medium">{loc.address}</p>
                </div>
              </div>
            </div>
          ))}
          <button className="w-full py-5 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-slate-500 font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors">
            <Plus className="w-5 h-5 mr-2" /> ADD NEW LOCATION
          </button>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5">
          <h4 className="font-bold text-amber-900 mb-2 text-sm">Before booking:</h4>
          <ul className="text-sm text-amber-800 space-y-2 mb-5 font-medium">
            <li>✓ Water connection available</li>
            <li>✓ Electricity socket available</li>
            <li>✓ Vehicle accessible to technician</li>
          </ul>
          
          <label className="flex items-start cursor-pointer group">
            <input 
              type="checkbox" 
              className="mt-0.5 w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 transition-colors cursor-pointer" 
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <span className="ml-3 text-sm text-slate-800 font-bold leading-tight group-hover:text-slate-900">
              I confirm water and electricity are available at the location.
            </span>
          </label>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 max-w-[480px] mx-auto z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <Button className="w-full font-bold text-sm py-4" disabled={!confirmed} onClick={handleContinue}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};
