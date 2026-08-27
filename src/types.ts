export type VehicleType = 'car' | 'bike';

export interface VehicleCategory {
  id: string;
  type: VehicleType;
  name: string;
  image: string;
}

export interface ServiceAddon {
  id: string;
  name: string;
  price: number;
}

export interface WashService {
  id: string;
  vehicleType: VehicleType;
  name: string;
  price: number;
  features: string[];
  duration: string;
  popular?: boolean;
  addons?: ServiceAddon[];
}

export interface Location {
  id: string;
  name: string;
  address: string;
}

export interface Technician {
  id: string;
  name: string;
  rating: number;
  image?: string;
}

export interface Booking {
  id: string;
  date: string;
  time: string;
  vehicleType: VehicleType;
  vehicleCategoryName: string;
  serviceId: string;
  serviceName: string;
  location: Location;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  technician?: Technician;
}

export interface SubscriptionPlan {
  id: string;
  type: VehicleType | 'premium';
  name: string;
  price: number;
  frequency: string;
  features: string[];
  popular?: boolean;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code?: string;
  discount: number; // For simplicity, assume flat discount or percentage based on type
  type: 'flat' | 'percentage';
  validity?: string;
}
