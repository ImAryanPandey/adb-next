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
  let categories: Category[] = [];
  try {
    categories = await client.fetch<Category[]>(CATEGORIES_QUERY);
  } catch (error) {
    console.error("Sanity Fetch Failed:", error);
  }

  // Fallback for visual testing if Sanity is down
  if (categories.length === 0) {
     categories = [
       { _id: '1', title: 'Future Tech', slug: { current: 'future-tech' } },
       { _id: '2', title: 'Digital Culture', slug: { current: 'digital-culture' } },
       { _id: '3', title: 'Money Moves', slug: { current: 'money-moves' } },
     ] as Category[];
  }

  return (
    <header className="border-b border-gray-100 bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* LOGO: Serif & Bold */}
        <Link href="/" className="group flex flex-col items-start">
          <span className="font-serif text-3xl font-black tracking-tighter text-gray-900">
            Infinite Trenz<span className="text-blue-600">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {categories.slice(0, 5).map((cat) => (
            <Link 
              key={cat._id} 
              href={cat.slug?.current ? `/category/${cat.slug.current}` : '#'}
              className="text-xs font-bold text-gray-500 hover:text-blue-600 uppercase tracking-widest transition-colors"
            >
              {cat.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}