import { groq } from 'next-sanity';

// 1. Get all posts for Homepage
export const POSTS_QUERY = groq`*[_type == "post"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  "categories": categories[]->title
}`;

// 2. Get Single Post by Slug
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  ...,
  author->,
  categories[]->,
  "related": *[_type == "post" && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(_createdAt desc) [0...3] {
    title,
    slug,
    mainImage
  }
}`;

// 3. Get Active Ads
// ✅ FIX: Changed 'location' to 'placement' AND added 'category' field
export const ACTIVE_ADS_QUERY = groq`*[_type == "ad" && active == true] | order(priority desc) {
  _id,
  placement,
  category, 
  type,
  image,
  link,
  code,
  trackingEnabled
}`;

// 4. Get Category + Its Posts
export const CATEGORY_PAGE_QUERY = groq`*[_type == "category" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  "posts": *[_type == "post" && references(^._id)] | order(_createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    "categories": categories[]->title
  }
}`;