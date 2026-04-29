import { Link } from 'react-router-dom';
export default function Footer() {
    return (<footer className="bg-sage-dark text-[#F7F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-white font-serif font-semibold text-2xl tracking-tight mb-4 inline-block">EcoShop.</span>
            <p className="text-sm text-[#F7F6F2]/70">
              Your one-stop destination for everything you need. Quality products, fast shipping, and exceptional customer service.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-[#F7F6F2]/80">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Products</Link></li>
              <li><Link to="/categories" className="hover:text-white transition">Categories</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-[#F7F6F2]/80">
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-white transition">Shipping Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition">Returns & Exchanges</Link></li>
              <li><Link to="#" className="hover:text-white transition">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-sm text-[#F7F6F2]/70 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 rounded-l-[24px] bg-white/10 border border-white/20 focus:outline-none focus:border-white placeholder-white/40 text-white"/>
              <button type="submit" className="bg-white/20 px-6 py-2 rounded-r-[24px] text-white hover:bg-white/30 transition font-medium">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-[#F7F6F2]/50 tracking-wider uppercase">
        <p>&copy; {new Date().getFullYear()} EcoShop. All rights reserved.</p>
      </div>
    </footer>);
}
