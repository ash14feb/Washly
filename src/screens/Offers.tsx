import React from 'react';
import { mockOffers } from '../data';
import { Ticket, Copy, Share2 } from 'lucide-react';

export const Offers = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-900 px-6 pt-12 pb-6 shadow-sm sticky top-0 z-20 rounded-b-[2rem]">
        <h1 className="text-2xl font-bold text-white">Offers & Rewards</h1>
      </div>

      <div className="p-6 space-y-5">
        {mockOffers.map(offer => (
          <div key={offer.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex relative">
            <div className="w-1/3 bg-indigo-600 p-4 flex flex-col justify-center items-center text-white text-center relative border-r-2 border-dashed border-white">
              <Ticket className="w-8 h-8 mb-2 text-indigo-200 drop-shadow-md" strokeWidth={1.5} />
              <span className="text-2xl font-black leading-none mb-1 text-lime-400">
                {offer.type === 'flat' ? `₹${offer.discount}` : `${offer.discount}%`}
              </span>
              <span className="text-[10px] font-bold tracking-widest opacity-80">OFF</span>
              
              {/* Ticket cutouts */}
              <div className="absolute top-[-12px] right-[-12px] w-6 h-6 bg-white rounded-full" />
              <div className="absolute bottom-[-12px] right-[-12px] w-6 h-6 bg-white rounded-full" />
            </div>
            
            <div className="w-2/3 p-5 flex flex-col justify-center">
              <h3 className="font-bold text-slate-900 mb-1 leading-tight text-lg">{offer.title}</h3>
              <p className="text-sm text-slate-500 mb-4 font-medium">{offer.description}</p>
              
              {offer.code ? (
                <div className="flex items-center justify-between bg-indigo-50 rounded-xl p-3 border border-indigo-100">
                  <span className="font-mono font-bold text-indigo-700 tracking-wider text-sm">{offer.code}</span>
                  <button className="text-indigo-600 hover:text-indigo-800 p-1">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button className="bg-slate-900 text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center hover:bg-slate-800 transition-colors">
                  <Share2 className="w-4 h-4 mr-2" /> REFER A FRIEND
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
