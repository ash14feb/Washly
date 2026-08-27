/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { AppLayout } from './components/AppLayout';

import { Splash } from './screens/Splash';
import { Onboarding } from './screens/Onboarding';
import { Home } from './screens/Home';
import { SelectVehicle } from './screens/SelectVehicle';
import { Services } from './screens/Services';
import { ServiceDetails } from './screens/ServiceDetails';
import { SelectLocation } from './screens/SelectLocation';
import { SelectDateTime } from './screens/SelectDateTime';
import { BookingSummary } from './screens/BookingSummary';
import { BookingSuccess } from './screens/BookingSuccess';
import { MyBookings } from './screens/MyBookings';
import { Subscriptions } from './screens/Subscriptions';
import { Offers } from './screens/Offers';
import { Profile } from './screens/Profile';
import { Support } from './screens/Support';

export default function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Splash />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/home" element={<Home />} />
            <Route path="/select-vehicle" element={<SelectVehicle />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service-details" element={<ServiceDetails />} />
            <Route path="/select-location" element={<SelectLocation />} />
            <Route path="/select-time" element={<SelectDateTime />} />
            <Route path="/summary" element={<BookingSummary />} />
            <Route path="/success" element={<BookingSuccess />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BookingProvider>
  );
}
