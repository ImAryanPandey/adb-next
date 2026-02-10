import Link from 'next/link';
import { client } from '@/sanity/client';
import { groq } from 'next-sanity';
import { Category } from '@/types/sanity';

const CATEGORIES_QUERY = groq`*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug
}`;

export async function Navbar() {
  // Try to fetch, but default to empty if connection fails (Robustness)
  let categories: Category[] = [];
  try {
    categories = await client.fetch<Category[]>(CATEGORIES_QUERY);
  } catch (error) {
    console.error("Sanity Fetch Failed (Navbar):", error);
  }

  // Fallback Categories if Sanity is empty/inaccessible
  if (categories.length === 0) {
     categories = [
       { _id: '1', title: 'Future Tech', slug: { current: 'future-tech' } },
       { _id: '2', title: 'Digital Culture', slug: { current: 'digital-culture' } },
       { _id: '3', title: 'Money Moves', slug: { current: 'money-moves' } },
     ] as Category[];
  }

  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* LOGO: Authority Style (Serif) */}
        <Link href="/" className="group flex flex-col items-start">
          <span className="font-serif text-2xl font-black tracking-tight text-gray-900 group-hover:opacity-80 transition-opacity">
            Infinite Trenz<span className="text-blue-600">.</span>
          </span>
          {/* Tagline for authority */}
          {/* <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">
            The Future, Decoded
          </span> */}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {categories.slice(0, 5).map((cat) => (
            <Link 
              key={cat._id} 
              href={cat.slug?.current ? `/category/${cat.slug.current}` : '#'}
              className="text-sm font-bold text-gray-600 hover:text-blue-600 uppercase tracking-wider transition-colors"
            >
              {cat.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}