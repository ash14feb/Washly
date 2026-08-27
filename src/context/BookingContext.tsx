import React, { createContext, useContext, useState, ReactNode } from 'react';
import { VehicleType, WashService, Location, ServiceAddon, Booking } from '../types';
import { initialBookings } from '../data';

interface BookingState {
  vehicleType?: VehicleType;
  vehicleCategoryId?: string;
  vehicleName?: string;
  service?: WashService;
  addons: ServiceAddon[];
  location?: Location;
  date?: string;
  time?: string;
  discount?: number;
}

interface BookingContextType {
  bookingState: BookingState;
  updateBooking: (updates: Partial<BookingState>) => void;
  resetBooking: () => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookingState, setBookingState] = useState<BookingState>({ addons: [] });
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const updateBooking = (updates: Partial<BookingState>) => {
    setBookingState(prev => ({ ...prev, ...updates }));
  };

  const resetBooking = () => {
    setBookingState({ addons: [] });
  };

  const addBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
  };

  return (
    <BookingContext.Provider value={{ bookingState, updateBooking, resetBooking, bookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
