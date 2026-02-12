import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row justify-between items-start gap-8">
        
        {/* Brand Section */}
        <div className="space-y-4 max-w-sm">
          <Link href="/" className="text-2xl font-serif font-black text-gray-900 tracking-tight">
            Infinite Trenz<span className="text-blue-600">.</span>
          </Link>
          <p className="text-sm text-gray-500 leading-relaxed">
            Curating the bleeding edge of technology, finance, and internet culture. 
            Built for performance.
          </p>
        </div>

        {/* Platform Links (Only the ones that work) */}
        <div className="flex gap-12">
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Read</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Latest</Link></li>
              <li><Link href="/category/tech" className="hover:text-blue-600 transition-colors">Tech</Link></li>
              <li><Link href="/category/lifestyle" className="hover:text-blue-600 transition-colors">Lifestyle</Link></li>
            </ul>
          </div>
          
          {/* Socials / Contact (Placeholders that don't look broken) */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Twitter / X</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

      </div>
      
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Infinite Trenz. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            System Status: Operational
          </p>
        </div>
      </div>
    </footer>
  );
}