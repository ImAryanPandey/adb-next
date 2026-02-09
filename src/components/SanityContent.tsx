import { PortableText, PortableTextComponents, PortableTextTypeComponentProps } from '@portabletext/react';
import { PortableTextBlock } from 'next-sanity';
import Image from 'next/image';
import { urlFor } from '@/sanity/image';

// Define what the Image block data looks like
interface SanityImageBlock {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
  alt?: string;
}

const components: PortableTextComponents = {
  types: {
    // Strictly typed component
    image: ({ value }: PortableTextTypeComponentProps<SanityImageBlock>) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Post Image'}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-gray-700 leading-7 text-lg">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-600 pl-4 py-2 italic bg-gray-50 my-6 text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-2">{children}</ol>,
  },
};

// Typed Props
export function SanityContent({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}