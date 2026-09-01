import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Phone } from 'lucide-react';
import { Button } from '../components/ui';
import { useAuth } from '../context/AuthContext';

export const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const phone = user?.phone || '';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName) {
      updateUser({ firstName, lastName });
      navigate(-1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="bg-slate-900 px-6 pt-12 pb-6 shadow-sm sticky top-0 z-20 rounded-b-[2rem]">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 mr-2 rounded-full hover:bg-slate-800 transition-colors">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col mt-4">
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

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center">
                <Phone className="w-4 h-4 text-slate-400" />
              </div>
              <input 
                type="tel" 
                value={phone}
                readOnly
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-16 pr-4 font-bold text-slate-500 shadow-sm cursor-not-allowed"
              />
            </div>
          </div>

          <div className="mt-auto pb-4">
            <Button 
              type="submit"
              disabled={!firstName || !lastName}
              className="w-full py-4 text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:bg-slate-300 shadow-xl shadow-indigo-600/20"
            >
              SAVE CHANGES
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
