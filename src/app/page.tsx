import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/client';
import { POSTS_QUERY, ACTIVE_ADS_QUERY } from '@/sanity/queries';
import { AdUnit, SanityImage } from '@/types/sanity';
import { urlFor } from '@/sanity/image';

export const revalidate = 60;

// ✅ SENIOR FIX: Define the specific shape expected by the Homepage Query
interface HomepagePost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: SanityImage;
  categories?: string[]; // GROQ returns strings here, not Objects
}

export default async function HomePage() {
  const [posts, ads] = await Promise.all([
    client.fetch<HomepagePost[]>(POSTS_QUERY), // Use specific type
    client.fetch<AdUnit[]>(ACTIVE_ADS_QUERY)
  ]);

  // 🔍 DEBUG: Look at your VS Code Terminal when you refresh the page
  console.log("---------------- DEBUG ADS ----------------");
  console.log("Raw Ads from Sanity:", JSON.stringify(ads, null, 2));
  console.log("-------------------------------------------");

  // Logic: Find the first ad that matches 'sidebar'
  const sidebarAd = ads.find(ad => ad.placement === 'sidebar');

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

      {/* LEFT COLUMN: Content */}
      <section className="lg:col-span-8 space-y-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Latest Insights
        </h1>

        <div className="grid gap-10">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article key={post._id} className="group flex flex-col md:flex-row gap-6 items-start">
                {post.mainImage && (
                  <div className="relative w-full md:w-64 aspect-video md:aspect-4/3 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={urlFor(post.mainImage).width(800).height(600).url()}
                      alt={post.title}
                      fill
                      priority={true} // ✅ FIX: Loads immediately (LCP optimized)
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // ✅ FIX: Tells browser how big the image is
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="flex-1 space-y-3">
                  <div className="flex gap-2">
                    {/* ✅ NO ANY: TypeScript now knows this is a string[] */}
                    {post.categories?.map((cat) => (
                      <span key={cat} className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    <Link href={`/${post.slug.current}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 leading-relaxed line-clamp-2">
                    {post.excerpt || "Click to read more about this topic..."}
                  </p>
                </div>
              </article>
            ))
          ) : (
            <p className="text-gray-500">No posts found.</p>
          )}
        </div>
      </section>

      {/* RIGHT COLUMN: Sidebar */}
      {/* RIGHT COLUMN: Sidebar */}
      <aside className="lg:col-span-4 space-y-8">
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Sponsored
          </h3>
          {sidebarAd ? (
            <div className="group relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
              {/* 1. The Ad Image */}
              {sidebarAd.image && (
                <Image
                  src={urlFor(sidebarAd.image).width(400).height(400).url()}
                  alt={sidebarAd.title || 'Advertisement'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              )}

              {/* 2. The Link Overlay (Clickable) */}
              <a
                href={sidebarAd.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
                aria-label={`Visit ${sidebarAd.title}`}
              >
                <span className="sr-only">Visit {sidebarAd.title}</span>
              </a>

              {/* 3. Small Badge */}
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4">
                <p className="text-white text-xs font-medium truncate">
                  {sidebarAd.title}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-300 text-sm">
              Ad Space (Empty)
            </div>
          )}
        </div>
      </aside>

    </div>
  );
}