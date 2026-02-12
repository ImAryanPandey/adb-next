'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Category } from '@/types/sanity';

export default function MobileMenu({ categories }: { categories: Category[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* HAMBURGER BUTTON */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 text-gray-900 focus:outline-none"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          /* X ICON */
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          /* HAMBURGER ICON */
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* DROPDOWN MENU OVERLAY */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl p-5 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200 z-50">
          {categories.map((cat) => (
            <Link 
              key={cat._id} 
              href={`/category/${cat.slug.current}`}
              onClick={() => setIsOpen(false)} // Close menu on click
              className="text-sm font-bold text-gray-700 hover:text-blue-600 uppercase tracking-widest border-b border-gray-50 pb-2 transition-colors"
            >
              {cat.title}
            </Link>
          ))}
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="text-xs font-medium text-gray-400 pt-2 hover:text-gray-900 transition-colors"
          >
            Return Home
          </Link>
        </div>
      )}
    </div>
  );
}