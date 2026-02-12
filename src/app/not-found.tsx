import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-2xl space-y-6">
        {/* Error Code */}
        <span className="text-sm font-bold text-blue-600 uppercase tracking-[0.3em] bg-blue-50 px-4 py-2 rounded-full">
          Error 404
        </span>

        {/* Serif Heading */}
        <h1 className="text-5xl md:text-7xl font-serif font-black text-gray-900 tracking-tight leading-tight">
          Lost in the <br />
          <span className="italic text-blue-600 underline decoration-gray-100 underline-offset-8">Noise.</span>
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-lg md:text-xl font-sans leading-relaxed max-w-md mx-auto">
          The trend you are looking for has either expired, shifted, or never existed in this timeline.
        </p>

        {/* Call to Action */}
        <div className="pt-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold uppercase tracking-widest text-xs hover:bg-blue-600 transition-all duration-300 shadow-xl hover:shadow-blue-200"
          >
            Return to Signal
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Decorative Background Element */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-linear-to-tr from-blue-50 to-transparent rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}