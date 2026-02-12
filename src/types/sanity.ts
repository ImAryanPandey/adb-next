import { PortableTextBlock } from 'next-sanity';

// --- BASE TYPES ---
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

// --- SEO OBJECT (Reusable) ---
export interface SeoMetadata {
  metaTitle?: string;
  metaDescription?: string;
  openGraphImage?: SanityImage;
}

// --- CORE ENTITIES ---
export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

export interface Author {
  _id: string;
  name: string;
  image?: SanityImage;
}

export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  slug: { current: string };
  mainImage?: SanityImage;
  excerpt?: string;
  
  // ✅ UPGRADE: Using official type for Portable Text (Required for SanityContent component)
  body: PortableTextBlock[]; 
  
  author?: Author;
  categories?: Category[];
  seo?: SeoMetadata;
}

// --- AD SERVER ENTITIES (The Money Layer) ---
export interface AdUnit {
  _id: string;
  title: string;
  
  placement: 'sidebar' | 'banner' | 'footer' | 'popup'; 
  
  categories?: string[];
  
  type: 'image' | 'code';
  image?: SanityImage;
  link?: string;   // Affiliate link
  code?: string;   // HTML/Script fallback
  priority: number; 
  active: boolean;
  
  // ✅ NEW FIELD: For Phase 4 Tracking Logic
  trackingEnabled?: boolean; 
}