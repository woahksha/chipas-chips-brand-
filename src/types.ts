export type ProductCollection = 'Regional Rasa' | 'Classic' | 'Olive Oil' | 'Protein+';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  collection: ProductCollection;
  description: string;
  longStory: string;
  packagingColor: {
    primary: string;
    secondary: string;
    text: string;
    accent: string;
    bgGradient: string;
  };
  spiceLevel: number; // 0 to 5
  heatDescriptor: string;
  caloriesPerServing: number; // e.g. 142 kcal
  sizes: {
    size: string;
    weight: string;
    price: number;
  }[];
  ingredients: string[];
  keyHighlights: string[];
  hasNoPalmOil: boolean;
  hasProteinBadge?: boolean;
  regionalOrigin?: string;
  idealPairing?: string;
  crunchRating: number; // 1-5
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  price: number;
  quantity: number;
}

export interface StoreLocation {
  id: string;
  name: string;
  chain: string;
  address: string;
  city: string;
  area: string;
  pincode: string;
  lat: number;
  lng: number;
  distanceKm?: number;
  phone: string;
  hours: string;
  stockStatus: 'Full Range In Stock' | 'Limited Stock' | 'Classic & Regional Only';
  flavorsAvailable: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Products' | 'Ingredients' | 'Packaging & Grabber' | 'Ordering';
}
