import Link from 'next/link';
import { client } from '@/sanity/client';
import { groq } from 'next-sanity';
import { Category } from '@/types/sanity'; // Import the type!

const CATEGORIES_QUERY = groq`*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug
}`;

export async function Navbar() {
  const categories = await client.fetch<Category[]>(CATEGORIES_QUERY); // Add <Category[]>

  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
          ADB<span className="text-blue-600">.</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat._id} 
              // Strict check to ensure slug exists before rendering
              href={cat.slug?.current ? `/category/${cat.slug.current}` : '#'}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              {cat.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}