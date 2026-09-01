import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNavigation } from './BottomNavigation';
import { motion, AnimatePresence } from 'motion/react';

export const AppLayout = () => {
  const location = useLocation();
  const hideNavRoutes = ['/', '/onboarding', '/success', '/login', '/verify-otp', '/register', '/edit-profile'];
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <div className="h-[100dvh] bg-slate-50 md:bg-slate-100 flex justify-center overflow-hidden w-full">
      <div className="w-full max-w-[480px] bg-white h-full relative shadow-2xl overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide flex flex-col relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col"
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
