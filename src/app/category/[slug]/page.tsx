import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/client';
import { CATEGORY_PAGE_QUERY, ACTIVE_ADS_QUERY } from '@/sanity/queries';
import { urlFor } from '@/sanity/image';
import { AdUnit, SanityImage } from '@/types/sanity';

// --- TYPES ---
interface CategoryPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  categories: string[];
}

interface CategoryData {
  _id: string;
  title: string;
  slug: { current: string };
  posts: CategoryPost[];
}

type Props = {
  params: Promise<{ slug: string }>;
};

// --- METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const category = await client.fetch<{ title: string }>(
    `*[_type == "category" && slug.current == $slug][0]{ title }`,
    { slug }
  );

  if (!category) {
    return {
      title: 'Category Not Found',
      robots: { index: false } // ⚠️ Don't index 404 pages
    };
  }

  return {
    title: `${category.title} Insights`, // Becomes "Tech Insights | ADB"
    description: `Read the latest news, tutorials, and updates about ${category.title} on ADB.`,
    openGraph: {
      title: `${category.title} - ADB Category`,
      description: `Curated articles about ${category.title}.`,
      type: 'website',
    }
  };
}

// --- MAIN COMPONENT ---
export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  // Parallel Fetch: Category Data + All Ads
  const [data, ads] = await Promise.all([
    client.fetch<CategoryData>(CATEGORY_PAGE_QUERY, { slug }),
    client.fetch<AdUnit[]>(ACTIVE_ADS_QUERY)
  ]);

  if (!data) {
    notFound();
  }

  // AD LOGIC: Find best ad for this specific category
  // Priority: 1. Exact Category Match, 2. Global
  const sidebarAd = ads.find(ad => 
    ad.placement === 'sidebar' && ad.category === slug
  ) || ads.find(ad => 
    ad.placement === 'sidebar' && ad.category === 'global'
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      {/* HEADER (Full Width) */}
      <div className="col-span-1 lg:col-span-12 mb-8 border-b border-gray-100 pb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          {data.title}
          <span className="text-blue-600">.</span>
        </h1>
        <p className="mt-2 text-gray-500 text-lg">
          Browse all {data.posts.length} articles in {data.title}
        </p>
      </div>

      {/* LEFT COLUMN: Content */}
      <section className="lg:col-span-8 space-y-10">
        {data.posts.length > 0 ? (
          data.posts.map((post) => (
            <article key={post._id} className="group flex flex-col md:flex-row gap-6 items-start">
              {post.mainImage && (
                <div className="relative w-full md:w-64 aspect-video bg-gray-100 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={urlFor(post.mainImage).width(600).height(400).url()}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
              )}
              
              <div className="flex-1 space-y-2">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  <Link href={`/${post.slug.current}`}>
                    {post.title}
                  </Link>
                </h2>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </time>
                </div>
                <p className="text-gray-600 leading-relaxed line-clamp-2">
                  {post.excerpt || "Click to read more..."}
                </p>
              </div>
            </article>
          ))
        ) : (
          <div className="p-12 bg-gray-50 rounded-xl text-center">
            <p className="text-gray-500">No posts found in this category yet.</p>
          </div>
        )}
      </section>

      {/* RIGHT COLUMN: Sidebar */}
      <aside className="lg:col-span-4 space-y-8">
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm sticky top-24">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Sponsored in {data.title}
          </h3>
          {sidebarAd ? (
            <div className="group relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden">
              {sidebarAd.image && (
                <Image
                  src={urlFor(sidebarAd.image).width(400).height(400).url()}
                  alt={sidebarAd.title || 'Advertisement'}
                  fill
                  className="object-cover"
                />
              )}
              <a 
                href={sidebarAd.link || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 z-10" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-xs">
                {sidebarAd.title}
              </div>
            </div>
          ) : (
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-300 text-sm">
              Ad Space Available
            </div>
          )}
        </div>
      </aside>

    </div>
  );
}