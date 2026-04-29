import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
export default function Navbar() {
    const { cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (<nav className="bg-[#FCFCFA] sticky top-0 z-50 border-b border-natural-border soft-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sage-leaf"></div>
            <span className="text-sage-dark font-serif font-semibold text-2xl tracking-tight">EcoShop.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10 text-sm font-medium uppercase tracking-widest text-natural-text/70">
            <Link to="/" className="hover:text-sage-dark transition-colors">Home</Link>
            <Link to="/products" className="hover:text-sage-dark transition-colors">Products</Link>
            <Link to="/categories" className="hover:text-sage-dark transition-colors">Categories</Link>
            <Link to="/about" className="hover:text-sage-dark transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-sage-dark transition-colors">Contact</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/search" className="text-natural-text/70 hover:text-sage-leaf">
              <Search className="h-6 w-6"/>
            </Link>
            <Link to="/cart" className="text-natural-text/70 hover:text-sage-leaf relative">
              <ShoppingCart className="h-6 w-6"/>
              {cartCount > 0 && (<span className="absolute -top-2 -right-2 bg-sage-leaf text-white text-xs font-serif font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>)}
            </Link>
            <button className="md:hidden text-natural-text/70 hover:text-sage-leaf" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (<div className="md:hidden bg-[#FCFCFA] border-t border-natural-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-natural-text/80 hover:text-sage-leaf font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/products" className="block px-3 py-2 text-natural-text/80 hover:text-sage-leaf font-medium" onClick={() => setIsMenuOpen(false)}>Products</Link>
            <Link to="/categories" className="block px-3 py-2 text-natural-text/80 hover:text-sage-leaf font-medium" onClick={() => setIsMenuOpen(false)}>Categories</Link>
            <Link to="/about" className="block px-3 py-2 text-natural-text/80 hover:text-sage-leaf font-medium" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/contact" className="block px-3 py-2 text-natural-text/80 hover:text-sage-leaf font-medium" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </div>
        </div>)}
    </nav>);
}
