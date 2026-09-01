import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User } from 'lucide-react';
import { Button } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';

export const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const phone = localStorage.getItem('tempPhone') || '';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName) {
      setUser({ firstName, lastName, phone });
      localStorage.removeItem('tempPhone');
      navigate('/home');
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-slate-50">
      <div className="bg-slate-900 px-6 pt-12 pb-6 shadow-sm sticky top-0 z-20 rounded-b-[2rem]">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 mr-2 rounded-full hover:bg-slate-800 transition-colors">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Your Details</h1>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col mt-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Let's get to know you</h2>
        <p className="text-slate-500 font-medium mb-8">Please enter your name to complete your profile.</p>

        <form onSubmit={handleSave} className="flex-1 flex flex-col">
          <div className="space-y-4 mb-8">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-50 rounded-xl flex items-center justify-center">
                <User className="w-4 h-4 text-indigo-600" />
              </div>
              <input 
                type="text" 
                placeholder="First Name" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-16 pr-4 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 font-bold text-slate-900 shadow-sm"
                required
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-50 rounded-xl flex items-center justify-center">
                <User className="w-4 h-4 text-indigo-600" />
              </div>
              <input 
                type="text" 
                placeholder="Last Name" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-16 pr-4 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 font-bold text-slate-900 shadow-sm"
                required
              />
            </div>
          </div>

          <div className="mt-auto pb-4">
            <Button 
              type="submit"
              disabled={!firstName || !lastName}
              className="w-full py-4 text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:bg-slate-300 shadow-xl shadow-indigo-600/20"
            >
              SAVE & CONTINUE
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
