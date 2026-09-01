import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Lock } from 'lucide-react';
import { Button } from '../../components/ui';

export const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const phone = localStorage.getItem('tempPhone') || '';

  // Auto fill dummy OTP
  useEffect(() => {
    const timer = setTimeout(() => {
      setOtp('1234');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '1234') {
      navigate('/register');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="bg-slate-900 px-6 pt-12 pb-6 shadow-sm sticky top-0 z-20 rounded-b-[2rem]">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 mr-2 rounded-full hover:bg-slate-800 transition-colors">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Verify OTP</h1>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col mt-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Almost there!</h2>
        <p className="text-slate-500 font-medium mb-8">
          Enter the 4-digit code sent to <span className="font-bold text-slate-800">+91 {phone}</span>
        </p>

        <form onSubmit={handleVerify} className="flex-1 flex flex-col">
          <div className="mb-8 flex justify-center space-x-4">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="relative w-16 h-16">
                <input 
                  type="text" 
                  maxLength={1}
                  value={otp[index] || ''}
                  readOnly
                  className="w-full h-full text-center bg-white border border-slate-200 rounded-2xl text-2xl font-bold text-slate-900 shadow-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <p className="text-sm font-medium text-slate-500">Didn't receive the code?</p>
            <button type="button" className="text-sm font-bold text-indigo-600 mt-1 hover:text-indigo-700">Resend Code</button>
          </div>

          <div className="mt-auto pb-4">
            <Button 
              type="submit"
              disabled={otp.length < 4}
              className="w-full py-4 text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:bg-slate-300 shadow-xl shadow-indigo-600/20"
            >
              VERIFY & PROCEED
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
