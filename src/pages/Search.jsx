import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, Star } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { useCart } from '../context/CartContext';
export default function Search() {
    const [query, setQuery] = useState('');
    const { addToCart } = useCart();
    const searchResults = useMemo(() => {
        if (!query.trim())
            return [];
        const lowercaseQuery = query.toLowerCase();
        return PRODUCTS.filter(product => product.name.toLowerCase().includes(lowercaseQuery) ||
            product.description.toLowerCase().includes(lowercaseQuery) ||
            product.categoryId.toLowerCase().includes(lowercaseQuery));
    }, [query]);
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[70vh]">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-serif font-semibold text-sage-dark mb-6">Search Products</h1>
        <div className="relative">
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for products, categories, or keywords..." className="w-full pl-12 pr-4 py-4 rounded-full border border-natural-border focus:ring-2 focus:ring-sage-leaf focus:border-transparent outline-none soft-shadow text-lg transition" autoFocus/>
          <SearchIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 text-natural-text/40 w-6 h-6"/>
        </div>
      </div>

      {query.trim() && (<div>
          <h2 className="text-xl font-medium text-sage-dark/80 mb-6 border-b border-natural-border pb-2">
            {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'} for "{query}"
          </h2>

          {searchResults.length === 0 ? (<div className="text-center py-12">
              <p className="text-natural-text/70 text-lg">No products found matching your search. Try different keywords.</p>
            </div>) : (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {searchResults.map((product) => (<div key={product.id} className="bg-[#FCFCFA] rounded-[32px] soft-shadow border border-natural-border overflow-hidden hover:soft-shadow transition flex flex-col group">
                  <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300"/>
                  </Link>
                  <div className="p-4 flex flex-col flex-grow">
                    <Link to={`/product/${product.id}`} className="block hover:text-sage-leaf mb-1">
                      <h3 className="font-semibold text-sage-dark line-clamp-1">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-500"/>
                      <span className="text-xs font-medium text-sage-dark/80">{product.rating}</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-serif font-semibold text-sage-dark">₹{Math.round(product.price)}</span>
                      <button onClick={() => addToCart(product)} className="text-sage-leaf text-sm font-semibold hover:underline">
                        Add
                      </button>
                    </div>
                  </div>
                </div>))}
            </div>)}
        </div>)}
    </div>);
}
