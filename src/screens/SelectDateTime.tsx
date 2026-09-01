import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/ui';

const generateDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 4; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    
    let label = '';
    if (i === 0) label = 'TODAY';
    else if (i === 1) label = 'TOMORROW';
    else label = nextDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    
    const day = nextDate.getDate().toString().padStart(2, '0');
    const month = nextDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    
    dates.push({
      id: `d${i+1}`,
      label,
      date: `${day} ${month}`,
      fullDate: nextDate
    });
  }
  return dates;
};

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

export const SelectDateTime = () => {
  const navigate = useNavigate();
  const { updateBooking } = useBooking();
  const [dates] = useState(generateDates());
  const [selectedDate, setSelectedDate] = useState(dates[0].id);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    // Select first available time when date changes
    const availableSlots = timeSlots.filter(t => !isSlotExpired(t));
    if (availableSlots.length > 0) {
      setSelectedTime(availableSlots[0]);
    } else {
      setSelectedTime(null);
    }
  }, [selectedDate]);

  const isSlotExpired = (time: string) => {
    if (selectedDate !== 'd1') return false; // Not today
    
    const now = new Date();
    const [timeStr, ampm] = time.split(' ');
    let [hours, minutes] = timeStr.split(':').map(Number);
    
    if (ampm === 'PM' && hours !== 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    
    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);
    
    return now >= slotTime;
  };

  const handleContinue = () => {
    if (!selectedTime) return;
    const d = dates.find(x => x.id === selectedDate);
    const year = d?.fullDate.getFullYear() || new Date().getFullYear();
    updateBooking({ date: `${d?.date} ${year}`, time: selectedTime });
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
          {timeSlots.map(time => {
            const expired = isSlotExpired(time);
            return (
              <button
                key={time}
                onClick={() => !expired && setSelectedTime(time)}
                disabled={expired}
                className={`py-4 rounded-2xl border-2 font-bold text-sm transition-all shadow-sm ${
                  expired ? 'border-slate-100 bg-slate-50 text-slate-400 opacity-50 cursor-not-allowed'
                  : selectedTime === time
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
                }`}
              >
                {time}
              </button>
            );
          })}
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
