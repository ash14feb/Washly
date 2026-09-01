import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Gift, User } from 'lucide-react';
import { cn } from './ui';

export const BottomNavigation = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 w-full bg-white border-t border-slate-100 pb-safe">
      <div className="flex items-center justify-around h-16">
        <NavItem to="/home" icon={<Home className="w-6 h-6" />} label="Home" />
        <NavItem to="/bookings" icon={<Calendar className="w-6 h-6" />} label="Bookings" />
        <NavItem to="/offers" icon={<Gift className="w-6 h-6" />} label="Offers" />
        <NavItem to="/profile" icon={<User className="w-6 h-6" />} label="Profile" />
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
        isActive ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
      )}
    >
      {icon}
      <span className="text-[10px] font-bold">{label}</span>
    </NavLink>
  );
};
