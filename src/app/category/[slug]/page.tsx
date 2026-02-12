import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/client';
import { 
  CATEGORY_PAGE_QUERY, 
  ACTIVE_ADS_QUERY, 
  ALL_CATEGORIES_SLUGS_QUERY // ✅ Import this
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
  
  const sidebarAd = ads.find(ad => 
    ad.placement === 'sidebar' && 
    (ad.category === slug || ad.category === 'global')
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
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      {/* LEFT COLUMN: Content */}
      <section className="lg:col-span-8 space-y-12">
        <div className="border-b border-gray-100 pb-4">
          <h1 className="text-4xl font-serif font-black text-gray-900 tracking-tight">
            {data.title}<span className="text-blue-600">.</span>
          </h1>
          <p className="mt-2 text-gray-500">Curated insights on {data.title}.</p>
        </div>

        {posts && posts.length > 0 ? (
          <div className="flex flex-col gap-12">
             {/* BENTO GRID (Top 3) */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-125">
               {/* Hero */}
               {posts[0] && (
                 <Link href={`/${posts[0].slug.current}`} className="group relative md:row-span-2 rounded-2xl overflow-hidden bg-gray-100 min-h-75">
                   {posts[0].mainImage && (
                     <Image
                       src={urlFor(posts[0].mainImage).width(800).height(800).url()}
                       alt={posts[0].title || 'Post Image'}
                       fill
                       priority
                       className="object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                   )}
                   <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                     <CategoryTags categories={posts[0].categories} />
                     <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">{posts[0].title}</h2>
                   </div>
                 </Link>
               )}
               {/* Stacked */}
               <div className="flex flex-col gap-6 h-full">
                 {posts.slice(1, 3).map((post) => (
                   <Link key={post._id} href={`/${post.slug.current}`} className="group relative flex-1 rounded-2xl overflow-hidden bg-gray-100 min-h-50">
                     {post.mainImage && (
                       <Image
                         src={urlFor(post.mainImage).width(600).height(400).url()}
                         alt={post.title || 'Post Image'}
                         fill
                         className="object-cover transition-transform duration-700 group-hover:scale-105"
                       />
                     )}
                     <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent p-5 flex flex-col justify-end">
                       <h3 className="text-lg font-bold text-white leading-tight">{post.title}</h3>
                     </div>
                   </Link>
                 ))}
               </div>
             </div>

             {/* Standard List */}
             {posts.length > 3 && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 pt-8 border-t border-gray-100">
                 {posts.slice(3).map((post) => (
                   <article key={post._id} className="flex flex-col gap-3 group">
                     <Link href={`/${post.slug.current}`} className="overflow-hidden rounded-xl bg-gray-100 aspect-video relative">
                       {post.mainImage && (
                         <Image
                           src={urlFor(post.mainImage).width(600).height(400).url()}
                           alt={post.title || 'Post Image'}
                           fill
                           className="object-cover transition-transform duration-500 group-hover:scale-105"
                         />
                       )}
                     </Link>
                     <div>
                       <CategoryTags categories={post.categories} />
                       <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                         <Link href={`/${post.slug.current}`}>{post.title}</Link>
                       </h3>
                     </div>
                   </article>
                 ))}
               </div>
             )}
          </div>
        ) : (
          <div className="w-full py-20 text-center bg-gray-50 rounded-3xl border border-gray-100">
            <h2 className="text-2xl font-serif font-bold text-gray-900">Coming Soon</h2>
          </div>
        )}
      </section>

      {/* RIGHT COLUMN: Sidebar */}
      <aside className="lg:col-span-4 space-y-8">
        <div className="sticky top-24">
          {sidebarAd && (
            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-4 block">Sponsored</span>
              <AdClient adId={sidebarAd._id} title={sidebarAd.title} placement="sidebar" trackingEnabled={sidebarAd.trackingEnabled !== false}>
                <div className="group relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                  {sidebarAd.image && (
                    <Image
                      src={urlFor(sidebarAd.image).width(400).height(400).url()}
                      alt={sidebarAd.title || 'Advertisement'}
                      fill
                      className="object-cover"
                    />
                  )}
                  <a href={sidebarAd.link || '#'} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" aria-label="Visit Ad" />
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4 z-10 pointer-events-none">
                    <p className="text-white text-xs font-medium truncate">{sidebarAd.title}</p>
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