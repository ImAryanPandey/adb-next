import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/client';
import { POST_QUERY, ACTIVE_ADS_QUERY } from '@/sanity/queries';
import { urlFor } from '@/sanity/image';
import { SanityContent } from '@/components/SanityContent';
import { Post, AdUnit, SanityImage } from '@/types/sanity'; // Import SanityImage
import { PortableTextBlock } from 'next-sanity';

interface SinglePost extends Omit<Post, 'categories' | 'body' | 'author'> {
  body: PortableTextBlock[]; 
  categories: { title: string; slug: { current: string } }[];
  related: { title: string; slug: { current: string }; mainImage: SanityImage }[];
  author: { name: string; image: SanityImage };
}

type Props = {
  params: Promise<{ slug: string }>;
};

// 2. SEO Metadata Generator
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

// 3. Main Page Component
export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const [post, ads] = await Promise.all([
    client.fetch<SinglePost>(POST_QUERY, { slug }),
    client.fetch<AdUnit[]>(ACTIVE_ADS_QUERY),
  ]);

  if (!post) {
    notFound();
  }

  // --- AD LOGIC ---
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
      
      {/* LEFT COLUMN: Article */}
      <article className="lg:col-span-8">
        <header className="mb-8 space-y-4">
          <div className="flex gap-2">
            {post.categories?.map(cat => (
              <Link 
                key={cat.slug.current} 
                href={`/category/${cat.slug.current}`}
                className="text-sm font-bold text-blue-600 uppercase tracking-wider hover:underline"
              >
                {cat.title}
              </Link>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-500 text-sm border-b border-gray-100 pb-8">
            {post.author?.name && (
              <span className="font-medium text-gray-900">By {post.author.name}</span>
            )}
            <time dateTime={post._createdAt}>
              {new Date(post._createdAt).toLocaleDateString('en-US', { 
                month: 'long', day: 'numeric', year: 'numeric' 
              })}
            </time>
          </div>
        </header>

        {/* Featured Image */}
        {post.mainImage && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10 bg-gray-100 shadow-sm">
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

        {/* --- AD SPOT: In-Content --- */}
        {inContentAd && (
          <div className="my-8 p-6 bg-gray-50 border border-dashed border-gray-200 rounded-lg text-center flex flex-col items-center">
             <p className="text-xs text-gray-400 uppercase mb-2">Advertisement</p>
             {inContentAd.image ? (
                <div className="relative w-full h-32 md:h-48 max-w-lg">
                  <Image 
                     src={urlFor(inContentAd.image).url()}
                     alt={inContentAd.title || 'Advertisement'}
                     fill
                     className="object-contain"
                  />
                  <a href={inContentAd.link || '#'} className="absolute inset-0" target="_blank" />
                </div>
             ) : (
                <div className="font-mono text-sm text-gray-500">{inContentAd.title}</div>
             )}
          </div>
        )}

        {/* Main Content */}
        <div className="prose prose-lg prose-blue max-w-none text-gray-800">
          {post.body ? (
            <SanityContent value={post.body} />
          ) : (
             <p className="text-gray-500 italic">No content available.</p>
          )}
        </div>
      </article>

      {/* RIGHT COLUMN: Sidebar */}
      <aside className="lg:col-span-4 space-y-8">
        <div className="sticky top-24">
          <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm mb-8">
             <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Sponsored
            </h3>
            {sidebarAd ? (
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
                <a href={sidebarAd.link || '#'} target="_blank" className="absolute inset-0 z-10" />
                 <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-xs font-medium truncate">{sidebarAd.title}</p>
                 </div>
              </div>
            ) : (
              <div className="h-64 bg-gray-50 flex items-center justify-center text-gray-300">
                Ad Space
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}