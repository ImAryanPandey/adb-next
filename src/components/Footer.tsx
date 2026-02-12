import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-2 space-y-4">
          <Link href="/" className="text-2xl font-serif font-black text-gray-900 tracking-tight">
            Infinite Trenz<span className="text-blue-600">.</span>
          </Link>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            Curating the bleeding edge of technology, finance, and internet culture. 
            Built for performance.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link href="/category/tech" className="hover:text-blue-600">Tech</Link></li>
            <li><Link href="/category/lifestyle" className="hover:text-blue-600">Lifestyle</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><span className="cursor-not-allowed opacity-50">Privacy Policy</span></li>
            <li><span className="cursor-not-allowed opacity-50">Terms of Service</span></li>
            <li><span className="cursor-not-allowed opacity-50">Cookie Preferences</span></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-200">
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