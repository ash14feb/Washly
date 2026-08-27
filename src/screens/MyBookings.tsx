import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { Calendar, MapPin } from 'lucide-react';
import { Button } from '../components/ui';
import { Booking } from '../types';

export const MyBookings = () => {
  const { bookings } = useBooking();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

  const filteredBookings = bookings.filter(b => 
    activeTab === 'upcoming' ? b.status === 'upcoming' : b.status === 'completed'
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-900 px-6 pt-12 pb-6 shadow-sm sticky top-0 z-20 rounded-b-[2rem]">
        <h1 className="text-2xl font-bold text-white mb-6">My Bookings</h1>
        
        <div className="flex bg-slate-800 p-1.5 rounded-2xl">
          <button 
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'upcoming' ? 'bg-indigo-600 shadow-md text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'completed' ? 'bg-indigo-600 shadow-md text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No {activeTab} bookings</h3>
            <p className="text-slate-500 font-medium">When you book a wash, it will appear here.</p>
          </div>
        ) : (
          filteredBookings.map(booking => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        )}
      </div>
    </div>
  );
};

const BookingCard = ({ booking }: { booking: Booking }) => {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
      <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-4">
        <div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase mb-2 ${booking.status === 'upcoming' ? 'bg-lime-400 text-slate-900' : 'bg-slate-200 text-slate-700'}`}>
            {booking.status}
          </span>
          <h3 className="font-bold text-slate-900 text-xl">{booking.serviceName}</h3>
          <p className="text-slate-500 text-sm font-medium">{booking.vehicleCategoryName}</p>
        </div>
        <div className="text-right">
          <p className="font-black text-indigo-600 text-lg">₹{booking.totalPrice}</p>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center text-sm text-slate-600 font-medium">
          <Calendar className="w-4 h-4 mr-3 text-indigo-400" />
          {booking.date} at {booking.time}
        </div>
        <div className="flex items-center text-sm text-slate-600 font-medium">
          <MapPin className="w-4 h-4 mr-3 text-indigo-400" />
          {booking.location.name}
        </div>
      </div>
      
      {booking.status === 'upcoming' ? (
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1 py-3 h-auto text-sm font-bold border-slate-200 text-slate-700">CANCEL</Button>
          <Button className="flex-1 py-3 h-auto text-sm font-bold">VIEW DETAILS</Button>
        </div>
      ) : (
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1 py-3 h-auto text-sm font-bold border-indigo-200 text-indigo-600 hover:bg-indigo-50">BOOK AGAIN</Button>
          <Button variant="ghost" className="flex-1 py-3 h-auto text-sm font-bold">RATE</Button>
        </div>
      )}
    </div>
  );
};
