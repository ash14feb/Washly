import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, Sparkles } from 'lucide-react';
import { mockSubscriptions } from '../data';
import { Button } from '../components/ui';

export const Subscriptions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 pb-20 text-white">
      <div className="px-4 pt-12 pb-4 flex items-center sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-800">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6">
        <h1 className="text-3xl font-black mb-2 tracking-tight">WASHLY<br/>MEMBERSHIPS</h1>
        <p className="text-slate-400 mb-8 font-medium">Keep your vehicle clean all month. Save up to 30%.</p>

        <div className="space-y-6">
          {mockSubscriptions.map(plan => (
            <div key={plan.id} className={`rounded-3xl p-6 relative overflow-hidden ${plan.popular ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'bg-slate-800 border border-slate-700'}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-lime-400 text-slate-900 text-[10px] font-bold px-3 py-1 rounded-bl-2xl flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" /> MOST POPULAR
                </div>
              )}
              
              <h3 className="text-xl font-black mb-1 tracking-tight">{plan.name}</h3>
              <div className="flex items-end mb-6">
                <span className="text-4xl font-extrabold tracking-tighter">₹{plan.price}</span>
                <span className={`text-sm mb-1 ml-1 font-medium ${plan.popular ? 'text-indigo-200' : 'text-slate-400'}`}>/{plan.frequency}</span>
              </div>
              
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <Check className={`w-5 h-5 mr-3 shrink-0 ${plan.popular ? 'text-lime-400' : 'text-indigo-400'}`} />
                    <span className="font-bold">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                className={`w-full py-4 text-sm font-bold ${plan.popular ? 'bg-lime-400 text-slate-900 hover:bg-lime-300' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
                onClick={() => {
                  alert('Mock subscription purchased!');
                  navigate('/home');
                }}
              >
                CHOOSE PLAN
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
