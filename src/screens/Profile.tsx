import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Car, MapPin, CreditCard, Shield, HelpCircle, LogOut, ChevronRight, Settings, Calendar, Edit3, Share2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-900 px-6 pt-12 pb-10 text-white rounded-b-[2rem] relative z-10 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <button onClick={() => navigate('/edit-profile')} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
            <Edit3 className="w-5 h-5 text-slate-300" />
          </button>
        </div>
        
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-lime-400 p-1 mr-4 overflow-hidden">
            <img src="https://i.pravatar.cc/100?img=11" alt="Profile" className="w-full h-full rounded-full object-cover" />
          </div>
          <div>
            <h2 className="font-bold text-xl mb-0.5">{user ? `${user.firstName} ${user.lastName}` : 'Guest User'}</h2>
            <p className="text-slate-400 text-sm font-medium">{user?.phone ? `+91 ${user.phone}` : 'No phone linked'}</p>
          </div>
        </div>
      </div>

      <div className="p-6 relative z-0 space-y-4">
        <ProfileSection>
          <ProfileItem icon={<Calendar />} label="My Bookings" onClick={() => navigate('/bookings')} />
          <ProfileItem icon={<User />} label="Edit Profile" onClick={() => navigate('/edit-profile')} />
        </ProfileSection>
        
        <ProfileSection>
          <ProfileItem icon={<Car />} label="My Vehicles" />
          <ProfileItem icon={<MapPin />} label="Saved Locations" />
          <ProfileItem icon={<User />} label="My Membership" onClick={() => navigate('/subscriptions')} />
          <ProfileItem icon={<CreditCard />} label="Payment Methods" border={false} />
        </ProfileSection>

        <ProfileSection>
          <ProfileItem 
            icon={<Share2 />} 
            label="Refer a Friend" 
            onClick={() => window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent('Hey! Use my coupon code WASH50 to get 50% off on your first car wash with Washly!'), '_blank')} 
          />
          <ProfileItem icon={<HelpCircle />} label="Help & Support" onClick={() => navigate('/support')} />
          <ProfileItem icon={<Shield />} label="Privacy Policy" border={false} />
        </ProfileSection>

        <button onClick={handleLogout} className="w-full bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex items-center justify-center text-red-500 font-bold mt-8 active:scale-[0.98] transition-all hover:border-red-100 hover:bg-red-50/30">
          <LogOut className="w-5 h-5 mr-2" /> LOGOUT
        </button>
      </div>
    </div>
  );
};

const ProfileSection = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
    {children}
  </div>
);

const ProfileItem = ({ icon, label, onClick, border = true }: { icon: React.ReactNode, label: string, onClick?: () => void, border?: boolean }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors active:bg-slate-100 ${border ? 'border-b border-slate-100' : ''}`}
  >
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center text-indigo-600 mr-4 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8)] border border-indigo-100">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5 drop-shadow-sm', strokeWidth: 1.5 })}
      </div>
      <span className="font-bold text-slate-800">{label}</span>
    </div>
    <ChevronRight className="w-5 h-5 text-slate-300" strokeWidth={2} />
  </button>
);
