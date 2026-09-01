import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Phone } from 'lucide-react';
import { Button } from '../../components/ui';

export const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      localStorage.setItem('tempPhone', phone);
      navigate('/verify-otp');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="bg-slate-900 px-6 pt-12 pb-6 shadow-sm sticky top-0 z-20 rounded-b-[2rem]">
        <div className="flex items-center">
          <button onClick={() => navigate('/onboarding')} className="p-2 -ml-2 mr-2 rounded-full hover:bg-slate-800 transition-colors">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Login</h1>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col mt-4">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="https://i.ibb.co/m5PDt4JP/washlylogo-removebg-preview.png" 
            alt="Washly Logo" 
            className="w-24 h-24 object-contain mb-3"
          />
          <h2 className="text-2xl font-bold text-slate-900">Welcome back!</h2>
          <p className="text-slate-500 font-medium text-center mt-2">Enter your mobile number to continue.</p>
        </div>

        <form onSubmit={handleContinue} className="flex-1 flex flex-col">
          <div className="mb-8 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-50 rounded-xl flex items-center justify-center">
              <Phone className="w-4 h-4 text-indigo-600" />
            </div>
            <input 
              type="tel" 
              placeholder="Mobile Number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-16 pr-4 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 font-bold text-slate-900 shadow-sm"
              autoFocus
            />
          </div>

          <div className="mt-auto pb-4">
            <Button 
              type="submit"
              disabled={phone.length < 10}
              className="w-full py-4 text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:bg-slate-300 shadow-xl shadow-indigo-600/20"
            >
              CONTINUE
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
