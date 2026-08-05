export type PropertyType = 'Apartment' | 'Commercial' | 'Mixed-use' | 'Penthouse';
export type PropertyStatus = 'Ready' | 'Under Construction';
export type PropertyTag = 'Just Listed' | 'Featured' | 'Penthouse' | 'Commercial' | 'Hot Deal' | 'New Release';

export interface Property {
  id: string;
  title: string;
  neighborhood: 'Bole' | 'CMC' | 'Ayat' | 'Summit' | 'Sarbet' | 'Bole Arabsa' | 'Gerji' | 'Lebu';
  address: string;
  priceETB: number; // in ETB
  priceUSD: number; // in USD estimate
  beds: number;
  baths: number;
  sqft: number; // sq ft (and ~sq m)
  sqm: number;
  propertyType: PropertyType;
  status: PropertyStatus;
  tag: PropertyTag;
  description: string;
  detailedDescription: string;
  images: string[];
  amenities: string[];
  completionDate?: string;
  floor: string;
  mapCoordinates: {
    lat: number;
    lng: number;
  };
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message?: string;
  interestedPropertyTitle?: string;
  budgetRange?: string;
  preferredNeighborhood?: string;
  source: 'contact_form' | 'ai_assistant' | 'book_tour';
  createdAt: string;
}

export interface FilterState {
  search: string;
  neighborhood: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string; // 'any' | '1+' | '2+' | '3+' | '4+'
  bathrooms: string; // 'any' | '1+' | '2+' | '3+' | '4+'
  minSqft: number;
  maxSqft: number;
  status: string; // 'any' | 'Ready' | 'Under Construction'
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  recommendedPropertyIds?: string[];
  isLeadCaptured?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'location' | 'pricing' | 'legal' | 'process';
}
