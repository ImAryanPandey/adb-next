import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/client';
import { POST_QUERY, ACTIVE_ADS_QUERY, ALL_POSTS_SLUGS_QUERY } from '@/sanity/queries';
import { urlFor } from '@/sanity/image';
import { SanityContent } from '@/components/SanityContent';
import { Post, AdUnit, SanityImage } from '@/types/sanity';
import AdClient from '@/components/AdClient';

// ✅ CLEAN INTERFACE: Inherits correctly from your Types file
interface SinglePost extends Omit<Post, 'categories' | 'author'> {
  categories: { title: string; slug: { current: string } }[];
  related: { title: string; slug: { current: string }; mainImage: SanityImage }[];
  author?: { name: string; image: SanityImage };
}

type Props = {
  params: Promise<{ slug: string }>;
};

// 1. GENERATE STATIC PARAMS (Required for output: export)
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(ALL_POSTS_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

// 2. SEO METADATA
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<SinglePost>(POST_QUERY, { slug });

  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      images: post.seo?.openGraphImage 
        ? [urlFor(post.seo.openGraphImage).width(1200).height(630).url()]
        : undefined,
    }
  };
}

// 3. MAIN COMPONENT
export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const [post, ads] = await Promise.all([
    client.fetch<SinglePost>(POST_QUERY, { slug }),
    client.fetch<AdUnit[]>(ACTIVE_ADS_QUERY),
  ]);

  if (!post) notFound();

  // AD TARGETING LOGIC
  const postCategories = post.categories?.map(c => c.slug.current) || [];
  
  const inContentAd = ads.find(ad => 
    ad.placement === 'banner' && 
    (ad.category === 'global' || postCategories.includes(ad.category))
  );

  const sidebarAd = ads.find(ad => 
    ad.placement === 'sidebar' && 
    (ad.category === 'global' || postCategories.includes(ad.category))
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      {/* LEFT COLUMN: Article Content */}
      <article className="lg:col-span-8 flex flex-col">
        {/* Header */}
        <header className="mb-8 space-y-4">
          <div className="flex gap-2">
            {post.categories?.map(cat => (
              <Link 
                key={cat.slug.current} 
                href={`/category/${cat.slug.current}`}
                className="text-xs font-bold text-blue-600 uppercase tracking-widest hover:underline"
              >
                {cat.title}
              </Link>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif font-black text-gray-900 tracking-tight leading-[1.1]">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-gray-500 text-sm border-b border-gray-100 pb-8">
            <span className="font-bold text-gray-900 uppercase tracking-tighter">
              By {post.author?.name || "Infinite Trenz Editorial"}
            </span>
            <span className="text-gray-300">•</span>
            <time dateTime={post._createdAt} className="font-medium">
              {new Date(post._createdAt).toLocaleDateString('en-US', { 
                month: 'long', day: 'numeric', year: 'numeric' 
              })}
            </time>
          </div>
        </header>

        {/* Featured Image */}
        {post.mainImage && (
          <div className="relative w-full aspect-video md:aspect-21/9 overflow-hidden mb-10 bg-gray-50 border border-gray-100 rounded-lg">
            <Image
              src={urlFor(post.mainImage).width(1200).height(800).url()}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </div>
        )}

        {/* In-Content Ad (Protected by Div) */}
        {inContentAd && (
          <div className="my-10 w-full">
            <AdClient 
               adId={inContentAd._id}
               title={inContentAd.title}
               placement="banner"
               trackingEnabled={inContentAd.trackingEnabled !== false}
            >
              <div className="p-6 bg-gray-50 border border-gray-100 text-center relative rounded-lg">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Advertisement</p>
                {inContentAd.image ? (
                    <div className="relative w-full h-32 md:h-48">
                      <Image 
                        src={urlFor(inContentAd.image).url()}
                        alt={inContentAd.title || 'Advertisement'}
                        fill
                        className="object-contain"
                      />
                      <a href={inContentAd.link || '#'} className="absolute inset-0 z-20" target="_blank" rel="noopener noreferrer" />
                    </div>
                ) : (
                    <div className="font-serif text-lg font-bold text-gray-900 underline decoration-blue-500 underline-offset-4">
                      {inContentAd.title}
                    </div>
                )}
              </div>
            </AdClient>
          </div>
        )}

        {/* Body Text */}
        <div className="prose prose-lg prose-blue max-w-none text-gray-800 font-sans selection:bg-blue-100">
          {post.body ? (
            <SanityContent value={post.body} />
          ) : (
             <p className="text-gray-500 italic">No content available.</p>
          )}
        </div>
      </article>

      {/* RIGHT COLUMN: Sidebar (Strictly Separated) */}
      <aside className="lg:col-span-4 space-y-8">
        <div className="sticky top-24">
          
          <div className="p-6 bg-gray-50 border border-gray-100 mb-8 rounded-lg">
             <h3 className="font-serif text-xl font-black mb-2">Infinite Trenz.</h3>
             <p className="text-sm text-gray-600 leading-relaxed font-sans">
               Decoding the intersection of technology, culture, and high-stakes finance.
             </p>
          </div>

          {sidebarAd && (
            <div className="border border-gray-100 bg-white rounded-lg shadow-sm">
              <div className="p-3 border-b border-gray-50">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Sponsored</span>
              </div>
              <AdClient 
                adId={sidebarAd._id} 
                title={sidebarAd.title} 
                placement="sidebar"
                trackingEnabled={sidebarAd.trackingEnabled !== false}
              >
                <div className="group relative w-full aspect-square bg-gray-50 overflow-hidden rounded-b-lg">
                  {sidebarAd.image && (
                    <Image
                      src={urlFor(sidebarAd.image).width(400).height(400).url()}
                      alt={sidebarAd.title || "Sponsored Advertisement"}
                      fill
                      className="object-cover"
                    />
                  )}
                  <a href={sidebarAd.link || '#'} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" />
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4 z-10 pointer-events-none">
                    <p className="text-white text-xs font-medium truncate">{sidebarAd.title}</p>
                    <p className="text-blue-600 text-[10px] uppercase tracking-wider">Learn More &rarr;</p>
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