import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Phone, MessageCircle, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui';

const faqs = [
  { q: "How does doorstep washing work?", a: "Our professional technician arrives at your location with specialized equipment. We use your water and power to deliver a premium wash." },
  { q: "Do I need to provide water?", a: "Yes, we require access to a standard water tap connection." },
  { q: "Do I need to provide electricity?", a: "Yes, we need a standard 15A power socket for our high-pressure washer and vacuum." },
  { q: "How much water is used?", a: "Our modern equipment uses up to 70% less water compared to traditional pipe washing." },
  { q: "How can I cancel my booking?", a: "You can cancel up to 2 hours before the scheduled time from the My Bookings section." },
];

export const Support = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-6">
      <div className="bg-slate-900 px-4 pt-12 pb-6 text-white rounded-b-[2rem] shadow-sm flex items-center sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-800 transition-colors">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-lg font-bold ml-2">Help & Support</h1>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How can we help?</h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search help..." 
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 font-medium shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-4 mb-10">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-start">
              <HelpCircle className="w-5 h-5 text-indigo-500 mr-3 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 mb-1">{faq.q}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-indigo-600 text-white rounded-3xl p-8 text-center shadow-md">
          <h3 className="font-bold text-xl mb-2">Need more help?</h3>
          <p className="text-indigo-100 text-sm mb-6 font-medium">Our support team is always ready to assist you.</p>
          <div className="flex space-x-3">
            <Button variant="secondary" className="flex-1 text-sm font-bold h-12 px-0 bg-white text-indigo-600 hover:bg-indigo-50">
              <Phone className="w-4 h-4 mr-2" /> Call
            </Button>
            <Button variant="outline" className="flex-1 text-sm font-bold h-12 px-0 text-white border-indigo-400 hover:bg-indigo-500 hover:border-indigo-300">
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
