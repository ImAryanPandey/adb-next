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

  // ✅ AD ROTATION LOGIC: 
  // Pick the highest priority 'sidebar' ad regardless of category.
  // The GROQ query already orders them by priority desc.
  const sidebarAd = ads.find(ad => ad.placement === 'sidebar');

  // Helper for Categories - Now with Rounded Styling
  const CategoryTag = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-sm">
      {children}
    </span>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

      {/* LEFT COLUMN: Main Content (8 Cols) */}
      <section className="lg:col-span-8 space-y-12">
        
        {/* Header */}
        <div className="border-b border-gray-100 pb-4 mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-gray-900 tracking-tight">
            Latest Insights<span className="text-blue-600">.</span>
          </h1>
        </div>

        {posts.length > 0 ? (
          <div className="flex flex-col gap-12">
            
            {/* 1. BENTO GRID (Top 3 Posts) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-125">
              
              {/* HERO CARD (Post 0) - Rounded & Professional */}
              {posts[0] && (
                <Link 
                  href={`/${posts[0].slug.current}`} 
                  className="group relative md:row-span-2 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 min-h-75 shadow-sm"
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
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
                    <div className="mb-4">
                      <span className="text-[10px] font-bold text-white bg-blue-600 px-2 py-1 uppercase tracking-widest rounded-sm">
                        {posts[0].categories?.[0] || 'Featured'}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-serif font-bold text-white mb-3 leading-tight">
                      {posts[0].title}
                    </h2>
                    {posts[0].excerpt && (
                      <p className="text-gray-200 text-sm line-clamp-2 hidden md:block leading-relaxed">
                        {posts[0].excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              )}

              {/* STACKED CARDS (Post 1 & 2) */}
              <div className="flex flex-col gap-6 h-full">
                {posts.slice(1, 3).map((post) => (
                  <Link 
                    key={post._id}
                    href={`/${post.slug.current}`} 
                    className="group relative flex-1 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 min-h-50 shadow-sm"
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
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent p-6 flex flex-col justify-end">
                      <h3 className="text-xl font-serif font-bold text-white leading-tight">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. STANDARD FEED (Posts 4+) */}
            {posts.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 pt-12 border-t border-gray-100">
                {posts.slice(3).map((post) => (
                  <article key={post._id} className="flex flex-col gap-4 group">
                    <Link href={`/${post.slug.current}`} className="overflow-hidden rounded-xl bg-gray-100 aspect-video relative border border-gray-100 shadow-sm">
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
                      <div className="mb-2">
                        <CategoryTag>{post.categories?.[0] || 'Article'}</CategoryTag>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 leading-tight">
                        <Link href={`/${post.slug.current}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed font-sans">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full min-h-[40vh] flex flex-col items-center justify-center text-center bg-gray-50 border border-gray-100 rounded-3xl p-12">
            <h2 className="text-3xl font-serif font-black text-gray-900 mb-2">
              Magazine Coming Soon
            </h2>
            <p className="text-gray-500">Curating the future.</p>
          </div>
        )}
      </section>

      {/* RIGHT COLUMN: Sticky Sidebar */}
      <aside className="lg:col-span-4 space-y-8">
        <div className="sticky top-28">
          
          {/* About Widget - Rounded */}
          <div className="p-8 border border-gray-100 bg-gray-50 mb-8 rounded-2xl shadow-sm">
             <h3 className="font-serif text-2xl font-black mb-4">Infinite Trenz<span className="text-blue-600">.</span></h3>
             <p className="text-sm text-gray-600 leading-relaxed font-sans">
               Decoding the intersection of technology, culture, and high-stakes finance. 
               The digital authority for what comes next.
             </p>
          </div>

          {/* Ad Block - Rounded & Targeted */}
          {sidebarAd && (
            <div className="border border-gray-100 bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-3 border-b border-gray-50 bg-white">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Sponsored</span>
              </div>
              <AdClient 
                adId={sidebarAd._id} 
                title={sidebarAd.title} 
                placement="sidebar"
                trackingEnabled={sidebarAd.trackingEnabled !== false}
              >
                <div className="group relative w-full aspect-square bg-gray-50 overflow-hidden">
                  {sidebarAd.image && (
                    <Image
                      src={urlFor(sidebarAd.image).width(400).height(400).url()}
                      alt={sidebarAd.title || "Sponsored Advertisement"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 400px"
                    />
                  )}
                  {/* Link Overlay */}
                  <a 
                    href={sidebarAd.link || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="absolute inset-0 z-20" 
                    aria-label={`Visit ${sidebarAd.title}`}
                  />
                  
                  {/* Text Badge - Pointer Events Fixed */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 z-10 pointer-events-none border-t border-gray-100">
                    <p className="text-gray-900 text-sm font-bold truncate font-serif">{sidebarAd.title}</p>
                    <p className="text-blue-600 text-[10px] font-bold uppercase tracking-wider mt-1">Learn More &rarr;</p>
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