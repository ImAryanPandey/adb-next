import { MetadataRoute } from 'next';
import { client } from '@/sanity/client';
import { groq } from 'next-sanity';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Fetch all posts and categories
  const data = await client.fetch<{ posts: string[]; categories: string[] }>(groq`{
    "posts": *[_type == "post" && defined(slug.current)].slug.current,
    "categories": *[_type == "category" && defined(slug.current)].slug.current
  }`);

  // 2. Static Routes
  const routes = [
    '',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  // 3. Category Routes
  const categoryRoutes = data.categories.map((slug) => ({
    url: `${BASE_URL}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // 4. Post Routes
  const postRoutes = data.posts.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...categoryRoutes, ...postRoutes];
}