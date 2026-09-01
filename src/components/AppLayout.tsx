import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNavigation } from './BottomNavigation';
import { motion, AnimatePresence } from 'motion/react';

export const AppLayout = () => {
  const location = useLocation();
  const hideNavRoutes = ['/', '/onboarding', '/success', '/login', '/verify-otp', '/register', '/edit-profile'];
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-slate-50 md:bg-slate-100 flex justify-center">
      <div className="w-full max-w-[480px] bg-white min-h-screen relative shadow-2xl overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
        {showNav && <BottomNavigation />}
      </div>
    </div>
  );
};
