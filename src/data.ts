import { VehicleCategory, WashService, Location, Offer, SubscriptionPlan, Booking, Technician } from './types';

export const mockVehicleCategories: VehicleCategory[] = [
  { id: 'c1', type: 'car', name: 'Hatchback', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=400&q=80' },
  { id: 'c2', type: 'car', name: 'Sedan', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80' },
  { id: 'c3', type: 'car', name: 'SUV', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=80' },
  { id: 'c4', type: 'car', name: 'Luxury', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80' },
  { id: 'b1', type: 'bike', name: 'Scooter', image: 'https://images.unsplash.com/photo-1616428784918-a6d177abde9e?auto=format&fit=crop&w=400&q=80' },
  { id: 'b2', type: 'bike', name: 'Bike', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=400&q=80' },
  { id: 'b3', type: 'bike', name: 'Premium Bike', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=400&q=80' },
];

export const mockServices: WashService[] = [
  {
    id: 's_c1',
    vehicleType: 'car',
    name: 'Basic Wash',
    price: 299,
    features: ['Exterior foam wash', 'Wheel cleaning', 'Drying'],
    duration: '30-45 minutes',
    addons: [
      { id: 'a1', name: 'Interior Vacuum', price: 100 },
      { id: 'a2', name: 'Tyre Polish', price: 50 },
    ]
  },
  {
    id: 's_c2',
    vehicleType: 'car',
    name: 'Premium Wash',
    price: 499,
    popular: true,
    features: ['Foam wash', 'Exterior cleaning', 'Wheel cleaning', 'Tyre dressing', 'Interior vacuum', 'Dashboard cleaning'],
    duration: '45-60 minutes',
    addons: [
      { id: 'a3', name: 'Wax Finish', price: 150 },
      { id: 'a2', name: 'Tyre Polish', price: 50 },
    ]
  },
  {
    id: 's_c3',
    vehicleType: 'car',
    name: 'Super Shine',
    price: 899,
    features: ['Premium wash', 'Interior cleaning', 'Dashboard treatment', 'Tyre dressing', 'Wax finish'],
    duration: '60-90 minutes',
  },
  {
    id: 's_b1',
    vehicleType: 'bike',
    name: 'Basic Wash',
    price: 99,
    features: ['Exterior foam wash', 'Wheel cleaning', 'Drying'],
    duration: '20-30 minutes',
    addons: [
      { id: 'a4', name: 'Chain Lube', price: 50 },
    ]
  },
  {
    id: 's_b2',
    vehicleType: 'bike',
    name: 'Premium Wash',
    price: 249,
    popular: true,
    features: ['Foam wash', 'Engine degreasing', 'Chain cleaning & lube', 'Tyre dressing', 'Wax polish'],
    duration: '40-50 minutes',
  }
];

export const mockLocations: Location[] = [
  { id: 'l1', name: 'Home', address: '123, Example Apartments, Mysuru, Karnataka' },
  { id: 'l2', name: 'Work', address: 'Example Business Park, Mysuru, Karnataka' },
];

export const mockOffers: Offer[] = [
  { id: 'o1', title: 'FIRST WASH OFFER', description: '₹50 OFF on your first wash', code: 'WELCOME50', discount: 50, type: 'flat' },
  { id: 'o2', title: 'WEEKEND SPECIAL', description: '20% OFF Valid Saturday & Sunday', discount: 20, type: 'percentage' },
  { id: 'o3', title: 'REFER & EARN', description: 'Give ₹100, Get ₹100', discount: 100, type: 'flat' },
];

export const mockSubscriptions: SubscriptionPlan[] = [
  { id: 'sub1', type: 'bike', name: 'BIKE CARE', price: 399, frequency: 'month', features: ['4 washes/month', 'Basic bike wash', 'Priority booking'] },
  { id: 'sub2', type: 'car', name: 'CAR CARE', price: 799, frequency: 'month', features: ['4 washes/month', 'Basic car wash', 'Interior vacuum', 'Priority booking'], popular: true },
  { id: 'sub3', type: 'premium', name: 'PREMIUM CARE', price: 1299, frequency: 'month', features: ['4 premium washes/month', 'Premium wash', 'Interior cleaning', 'Tyre dressing', 'Priority booking', 'Special discounts'] },
];

export const mockTechnician: Technician = {
  id: 't1',
  name: 'Rahul',
  rating: 4.8,
  image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
};

export const initialBookings: Booking[] = [
  {
    id: 'WLY-20260825-0820',
    date: '25 August 2026',
    time: '09:00 AM',
    vehicleType: 'bike',
    vehicleCategoryName: 'Honda Activa',
    serviceId: 's_b1',
    serviceName: 'Basic Bike Wash',
    location: mockLocations[0],
    totalPrice: 99,
    status: 'completed',
    technician: mockTechnician
  }
];
