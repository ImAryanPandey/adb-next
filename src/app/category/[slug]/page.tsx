import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/client';
import { 
  CATEGORY_PAGE_QUERY, 
  ACTIVE_ADS_QUERY, 
  ALL_CATEGORIES_SLUGS_QUERY 
} from '@/sanity/queries';
import { AdUnit, SanityImage } from '@/types/sanity';
import { urlFor } from '@/sanity/image';
import AdClient from '@/components/AdClient';

export const revalidate = 60;

// ✅ STATIC GENERATION FUNCTION
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(ALL_CATEGORIES_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

interface CategoryPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: SanityImage;
  categories?: string[];
}

interface CategoryData {
  title: string;
  posts: CategoryPost[];
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [data, ads] = await Promise.all([
    client.fetch<CategoryData>(CATEGORY_PAGE_QUERY, { slug }),
    client.fetch<AdUnit[]>(ACTIVE_ADS_QUERY)
  ]);

  if (!data) {
    notFound();
  }

  const posts = data.posts;
  
  // ✅ FIX: AD TARGETING LOGIC (Updated for Multiple Categories)
  // Match if Ad is Global (no categories) OR if it targets this specific category slug
  const sidebarAd = ads.find(ad => 
    ad.placement === 'sidebar' && 
    (!ad.categories || ad.categories.length === 0 || ad.categories.includes(slug))
  );

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
    // ✅ LAYOUT IMPROVEMENTS: Increased max-width and breathable spacing
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
      
      {/* LEFT COLUMN: Content */}
      <section className="lg:col-span-8 space-y-12">
        <div className="border-b border-gray-100 pb-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-gray-900 tracking-tight leading-tight">
            {data.title}<span className="text-blue-600">.</span>
          </h1>
          <p className="mt-4 text-gray-500 text-lg">Curated insights and analysis on {data.title}.</p>
        </div>

        {posts && posts.length > 0 ? (
          <div className="flex flex-col gap-12">
             {/* 1. BENTO GRID (Top 3 Posts) */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-125">
               {/* Hero Card */}
               {posts[0] && (
                 <Link 
                   href={`/${posts[0].slug.current}`} 
                   className="group relative md:row-span-2 rounded-2xl overflow-hidden bg-gray-100 min-h-75 shadow-sm"
                 >
                   {posts[0].mainImage && (
                     <Image
                       src={urlFor(posts[0].mainImage).width(800).height(800).url()}
                       alt={posts[0].title || 'Post Image'}
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
                     {posts[0].excerpt && (
                        <p className="text-gray-200 text-sm line-clamp-2 hidden md:block">
                          {posts[0].excerpt}
                        </p>
                     )}
                   </div>
                 </Link>
               )}
               
               {/* Stacked Cards */}
               <div className="flex flex-col gap-6 h-full">
                 {posts.slice(1, 3).map((post) => (
                   <Link 
                     key={post._id} 
                     href={`/${post.slug.current}`} 
                     className="group relative flex-1 rounded-2xl overflow-hidden bg-gray-100 min-h-50 shadow-sm"
                   >
                     {post.mainImage && (
                       <Image
                         src={urlFor(post.mainImage).width(600).height(400).url()}
                         alt={post.title || 'Post Image'}
                         fill
                         className="object-cover transition-transform duration-700 group-hover:scale-105"
                         sizes="(max-width: 768px) 100vw, 25vw"
                       />
                     )}
                     <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent p-5 flex flex-col justify-end">
                       <h3 className="text-lg font-bold text-white leading-tight">{post.title}</h3>
                     </div>
                   </Link>
                 ))}
               </div>
             </div>

             {/* 2. STANDARD GRID (Posts 4+) */}
             {posts.length > 3 && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 pt-12 border-t border-gray-100">
                 {posts.slice(3).map((post) => (
                   <article key={post._id} className="flex flex-col gap-4 group">
                     <Link href={`/${post.slug.current}`} className="overflow-hidden rounded-xl bg-gray-100 aspect-video relative shadow-sm">
                       {post.mainImage && (
                         <Image
                           src={urlFor(post.mainImage).width(600).height(400).url()}
                           alt={post.title || 'Post Image'}
                           fill
                           className="object-cover transition-transform duration-500 group-hover:scale-105"
                           sizes="(max-width: 768px) 100vw, 33vw"
                         />
                       )}
                     </Link>
                     <div>
                       <CategoryTags categories={post.categories} />
                       <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
                         <Link href={`/${post.slug.current}`}>{post.title}</Link>
                       </h3>
                       {post.excerpt && (
                         <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                           {post.excerpt}
                         </p>
                       )}
                     </div>
                   </article>
                 ))}
               </div>
             )}
          </div>
        ) : (
          <div className="w-full py-24 text-center bg-gray-50 rounded-3xl border border-gray-100">
            <h2 className="text-2xl font-serif font-bold text-gray-900">No stories found.</h2>
            <p className="text-gray-500 mt-2">Check back soon for new insights in {data.title}.</p>
          </div>
        )}
      </section>

      {/* RIGHT COLUMN: Sidebar */}
      <aside className="lg:col-span-4 space-y-8">
        <div className="sticky top-28">
          
          {/* Brand Widget */}
          <div className="p-8 bg-gray-50 border border-gray-100 mb-8 rounded-xl shadow-sm">
             <h3 className="font-serif text-2xl font-black mb-4">Infinite Trenz<span className="text-blue-600">.</span></h3>
             <p className="text-sm text-gray-600 leading-relaxed font-sans">
               Decoding the intersection of technology, culture, and high-stakes finance. 
               The signals within the noise.
             </p>
          </div>

          {/* Sidebar Ad Block */}
          {sidebarAd && (
            <div className="border border-gray-100 bg-white rounded-xl shadow-sm overflow-hidden">
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
                      alt={sidebarAd.title || 'Sponsored Advertisement'}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 400px"
                    />
                  )}
                  <a 
                    href={sidebarAd.link || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="absolute inset-0 z-20" 
                    aria-label={`Visit ${sidebarAd.title}`} 
                  />
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