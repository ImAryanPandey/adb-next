import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/client';
import { POSTS_QUERY, ACTIVE_ADS_QUERY } from '@/sanity/queries';
import { AdUnit, SanityImage } from '@/types/sanity';
import { urlFor } from '@/sanity/image';
import AdClient from '@/components/AdClient';

export const revalidate = 60;

interface HomepagePost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: SanityImage;
  categories?: string[];
}

export default async function HomePage() {
  const [posts, ads] = await Promise.all([
    client.fetch<HomepagePost[]>(POSTS_QUERY),
    client.fetch<AdUnit[]>(ACTIVE_ADS_QUERY)
  ]);

  const sidebarAd = ads.find(ad => ad.placement === 'sidebar');

  // Helper to render categories
  const CategoryTags = ({ categories }: { categories?: string[] }) => (
    <div className="flex gap-2 mb-2">
      {categories?.slice(0, 2).map((cat) => (
        <span key={cat} className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded-sm">
          {cat}
        </span>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

      {/* LEFT COLUMN: Main Content (Bento Grid) */}
      <section className="lg:col-span-8 space-y-12">
        
        {/* Header */}
        <div className="border-b border-gray-100 pb-4">
          <h1 className="text-4xl font-serif font-black text-gray-900 tracking-tight">
            Latest Insights
          </h1>
        </div>

        {/* LOGIC: Check Post Count */}
        {posts.length > 0 ? (
          <div className="flex flex-col gap-12">
            
            {/* 1. BENTO GRID (Top 3 Posts) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-125">
              
              {/* HERO CARD (Post Index 0) - Left Column */}
              {posts[0] && (
                <Link 
                  href={`/${posts[0].slug.current}`} 
                  className="group relative md:row-span-2 rounded-2xl overflow-hidden bg-gray-100 min-h-75"
                >
                  {posts[0].mainImage && (
                    <Image
                      src={urlFor(posts[0].mainImage).width(800).height(800).url()}
                      alt={posts[0].title}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                    <CategoryTags categories={posts[0].categories} />
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                      {posts[0].title}
                    </h2>
                    <p className="text-gray-200 text-sm line-clamp-2 hidden md:block">
                      {posts[0].excerpt}
                    </p>
                  </div>
                </Link>
              )}

              {/* STACKED CARDS (Post Index 1 & 2) - Right Column */}
              <div className="flex flex-col gap-6 h-full">
                {posts.slice(1, 3).map((post) => (
                  <Link 
                    key={post._id}
                    href={`/${post.slug.current}`} 
                    className="group relative flex-1 rounded-2xl overflow-hidden bg-gray-100 min-h-50"
                  >
                    {post.mainImage && (
                      <Image
                        src={urlFor(post.mainImage).width(600).height(400).url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent p-5 flex flex-col justify-end">
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. STANDARD GRID (Posts 4+) */}
            {posts.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 pt-8 border-t border-gray-100">
                {posts.slice(3).map((post) => (
                  <article key={post._id} className="flex flex-col gap-3 group">
                    <Link href={`/${post.slug.current}`} className="overflow-hidden rounded-xl bg-gray-100 aspect-video relative">
                       {post.mainImage && (
                        <Image
                          src={urlFor(post.mainImage).width(600).height(400).url()}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                    </Link>
                    <div>
                      <CategoryTags categories={post.categories} />
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        <Link href={`/${post.slug.current}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* EMPTY STATE: Magazine Coming Soon (No Mock Data) */
          <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-center bg-gray-50 rounded-3xl p-12 border border-gray-100">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-serif font-black text-gray-900 mb-4">
              Magazine Coming Soon
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto text-lg leading-relaxed">
              We are currently curating deep dives into Future Tech and Digital Culture. 
              The future is loading...
            </p>
          </div>
        )}
      </section>

      {/* RIGHT COLUMN: Sidebar (Preserved) */}
      <aside className="lg:col-span-4 space-y-8">
        <div className="sticky top-24">
          {sidebarAd && (
            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Sponsored
              </h3>
              
              <AdClient 
                adId={sidebarAd._id} 
                title={sidebarAd.title} 
                placement="sidebar"
                trackingEnabled={sidebarAd.trackingEnabled !== false}
              >
                <div className="group relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                  {sidebarAd.image && (
                    <Image
                      src={urlFor(sidebarAd.image).width(400).height(400).url()}
                      alt={sidebarAd.title || 'Advertisement'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  )}
                  <a
                    href={sidebarAd.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label={`Visit ${sidebarAd.title}`}
                  >
                    <span className="sr-only">Visit {sidebarAd.title}</span>
                  </a>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-xs font-medium truncate">
                      {sidebarAd.title}
                    </p>
                  </div>
                </div>
              </AdClient>
            </div>
          )}
        </div>
      </aside>

    </div>
  );
}