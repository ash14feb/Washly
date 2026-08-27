import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/ui';

const dates = [
  { id: 'd1', label: 'TODAY', date: '27 AUG' },
  { id: 'd2', label: 'TOMORROW', date: '28 AUG' },
  { id: 'd3', label: 'SAT', date: '29 AUG' },
  { id: 'd4', label: 'SUN', date: '30 AUG' },
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

export const SelectDateTime = () => {
  const navigate = useNavigate();
  const { updateBooking } = useBooking();
  const [selectedDate, setSelectedDate] = useState(dates[0].id);
  const [selectedTime, setSelectedTime] = useState(timeSlots[1]);

  const handleContinue = () => {
    const d = dates.find(x => x.id === selectedDate);
    updateBooking({ date: `${d?.date} 2026`, time: selectedTime });
    navigate('/summary');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-slate-900 text-white px-4 pt-12 pb-6 rounded-b-[2rem] shadow-sm flex items-center sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-800 text-white transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold ml-2">Choose Date & Time</h1>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-slate-900 mb-4 text-lg">Select Date</h3>
        <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide">
          {dates.map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedDate(d.id)}
              className={`flex-shrink-0 w-24 h-24 rounded-3xl border-2 flex flex-col items-center justify-center transition-all shadow-sm ${
                selectedDate === d.id 
                  ? 'border-indigo-600 bg-indigo-600 text-white' 
                  : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'
              }`}
            >
              <span className={`text-xs font-bold mb-1 ${selectedDate === d.id ? 'text-lime-400' : 'text-slate-400'}`}>
                {d.label}
              </span>
              <span className={`text-lg font-extrabold ${selectedDate === d.id ? 'text-white' : 'text-slate-900'}`}>
                {d.date.split(' ')[0]}
              </span>
              <span className="text-xs font-bold">
                {d.date.split(' ')[1]}
              </span>
            </button>
          ))}
        </div>

        <h3 className="font-bold text-slate-900 mt-8 mb-4 text-lg">Select Time</h3>
        <div className="grid grid-cols-3 gap-3">
          {timeSlots.map(time => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`py-4 rounded-2xl border-2 font-bold text-sm transition-all shadow-sm ${
                selectedTime === time
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 max-w-[480px] mx-auto z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <Button className="w-full font-bold text-sm py-4" onClick={handleContinue}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};
