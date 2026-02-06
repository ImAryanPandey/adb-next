// src/types/sanity.ts

// --- BASE TYPES ---
export interface SanityBody {
  _type: 'block';
  children: { _type: 'span'; text: string }[];
}

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
  metaTitle: string;
  metaDescription: string;
  openGraphImage?: SanityImage;
}

// --- CORE ENTITIES ---
export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
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
  body: SanityBody[]; // Portable Text
  author?: Author;
  categories?: Category[]; // Array of categories
  seo?: SeoMetadata;
}

// --- AD SERVER ENTITIES (The Money Layer) ---
export interface AdUnit {
  _id: string;
  title: string;
  // "placement" matches the schema I gave you (Sidebar/Banner)
  placement: 'sidebar' | 'banner' | 'footer'; 
  // "category" allows targeting (Matches the Post categories)
  category: 'global' | 'tech' | 'lifestyle'; 
  type: 'image' | 'code';
  image?: SanityImage;
  link?: string;   // Affiliate link
  code?: string;   // HTML/Script fallback
  priority: number; // 1-10
  active: boolean;
}