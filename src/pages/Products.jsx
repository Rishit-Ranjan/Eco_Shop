import { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Filter, Star } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/mockData';
import { useCart } from '../context/CartContext';
export default function Products() {
    const { addToCart } = useCart();
    const location = useLocation();
    const state = location.state;
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState(500);
    useEffect(() => {
        if (state?.categoryId) {
            setSelectedCategory(state.categoryId);
        }
    }, [state?.categoryId]);
    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter((product) => {
            const matchCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
            const matchPrice = product.price <= priceRange;
            return matchCategory && matchPrice;
        });
    }, [selectedCategory, priceRange]);
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-sage-dark mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5"/> Filters
            </h3>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-medium text-sage-dark mb-3">Category</h4>
              <ul className="space-y-2">
                <li>
                  <button className={`text-sm ${selectedCategory === 'all' ? 'text-sage-leaf font-semibold' : 'text-natural-text/80 hover:text-sage-leaf'}`} onClick={() => setSelectedCategory('all')}>
                    All Categories
                  </button>
                </li>
                {CATEGORIES.map(category => (<li key={category.id}>
                    <button className={`text-sm ${selectedCategory === category.id ? 'text-sage-leaf font-semibold' : 'text-natural-text/80 hover:text-sage-leaf'}`} onClick={() => setSelectedCategory(category.id)}>
                      {category.name}
                    </button>
                  </li>))}
              </ul>
            </div>

            {/* Price Filter */}
            <div>
              <h4 className="font-medium text-sage-dark mb-3">Price Range: Up to ${priceRange}</h4>
              <input type="range" min="0" max="500" step="10" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-full cursor-pointer accent-indigo-600"/>
              <div className="flex justify-between text-xs text-natural-text/70 mt-2">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-grow">
          <h1 className="text-2xl font-serif font-semibold text-sage-dark mb-6">Our Products</h1>
          
          {filteredProducts.length === 0 ? (<div className="bg-[#FCFCFA] border rounded-[32px] p-12 text-center text-natural-text/70">
              No products found matching your criteria. Try adjusting the filters.
            </div>) : (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (<div key={product.id} className="bg-[#FCFCFA] rounded-[32px] soft-shadow border border-natural-border overflow-hidden hover:soft-shadow transition flex flex-col">
                  <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden group">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300"/>
                  </Link>
                  <div className="p-4 flex flex-col flex-grow">
                    <Link to={`/product/${product.id}`} className="block hover:text-sage-leaf">
                      <h3 className="text-lg font-semibold text-sage-dark mb-1">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-500"/>
                      <span className="text-sm font-medium text-sage-dark/80">{product.rating}</span>
                      <span className="text-xs text-natural-text/70">({product.reviews})</span>
                    </div>
                    <p className="text-natural-text/70 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xl font-serif font-semibold text-sage-dark">${product.price.toFixed(2)}</span>
                      <button onClick={() => addToCart(product)} className="bg-sage-leaf text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-sage-leaf-hover transition">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>))}
            </div>)}
        </div>
      </div>
    </div>);
}
