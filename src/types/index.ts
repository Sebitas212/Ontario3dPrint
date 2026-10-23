export type ProductCategory = 
  | 'Desk & Workspace'
  | 'Smart Accessories'
  | 'Home Organization'
  | 'Phone & Tech Accessories'
  | 'Everyday Carry'
  | 'Custom 3D Prints'
  | 'Innovative Gadgets';

export interface ProductColor {
  name: string;
  hex: string;
  finish: 'Matte' | 'Textured' | 'Satin' | 'Gloss';
}

export interface ProductMaterial {
  id: string;
  name: string;
  description: string;
  priceModifierCAD: number;
  badge?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  priceCAD: number;
  compareAtPriceCAD?: number;
  image: string;
  gallery: string[];
  description: string;
  fullDescription: string[];
  colors: ProductColor[];
  materials: ProductMaterial[];
  dimensions: {
    lengthMm: number;
    widthMm: number;
    heightMm: number;
    display: string;
  };
  weightGrams: number;
  layerHeight: string;
  infillDensity: string;
  printDurationHours: number;
  inStock: boolean;
  leadTimeDays: number;
  rating: number;
  reviewCount: number;
  features: string[];
  technicalSpecs: Record<string, string>;
  isHeroFeatured?: boolean;
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  selectedMaterial: ProductMaterial;
  quantity: number;
  addedAt: number;
}

export interface CustomProjectSubmission {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  company?: string;
  projectCategory: string;
  description: string;
  dimensionsMm: {
    x: number;
    y: number;
    z: number;
  };
  material: string;
  color: string;
  infillPercent: number;
  layerHeight: string;
  quantity: number;
  estimatedVolumeCm3: number;
  estimatedPriceCAD: number;
  fileName?: string;
  fileSizeMb?: number;
  notes?: string;
  createdAt: string;
}

export interface CanadianProvinceTax {
  code: string;
  name: string;
  taxName: 'HST' | 'GST+PST' | 'GST+QST' | 'GST';
  rate: number; // e.g. 0.13 for 13%
}

export interface ShippingRate {
  id: string;
  name: string;
  description: string;
  carrier: string;
  costCAD: number;
  estimatedDays: string;
}

export interface CheckoutDetails {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  provinceCode: string;
  postalCode: string;
  phone: string;
  shippingRateId: string;
  paymentMethod: 'card' | 'interac' | 'apple_pay';
  cardName?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}
