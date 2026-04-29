import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { useCart } from '../context/CartContext';
export default function ProductView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) {
        return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h2 className="text-3xl font-serif font-semibold text-sage-dark mb-4">Product Not Found</h2>
        <p className="text-natural-text/70 mb-8">The product you are looking for does not exist.</p>
        <button onClick={() => navigate('/products')} className="text-sage-leaf font-medium hover:underline">
          &larr; Back to Products
        </button>
      </div>);
    }
    const relatedProducts = PRODUCTS.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);
    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center text-sm font-medium text-natural-text/70 hover:text-sage-leaf mb-8 transition">
        <ArrowLeft className="w-4 h-4 mr-1"/> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="bg-[#FCFCFA] rounded-[40px] p-4 soft-shadow border border-natural-border overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-[32px]"/>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-serif font-semibold text-sage-dark mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (<Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-500' : 'text-natural-border'}`}/>))}
            </div>
            <span className="text-sage-dark font-medium">{product.rating}</span>
            <span className="text-natural-text/70 text-sm">({product.reviews} reviews)</span>
          </div>

          <div className="text-3xl font-serif font-semibold text-sage-dark mb-6">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-natural-text/80 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-8 border-t border-b border-natural-border py-6">
            <div className="flex items-center gap-6">
              <span className="font-medium text-sage-dark">Quantity</span>
              <div className="flex items-center border border-natural-border rounded-lg bg-[#F7F6F2] w-32">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-natural-text/80 hover:bg-natural-border/50 rounded-l-lg transition">
                  -
                </button>
                <div className="flex-1 text-center font-medium bg-[#FCFCFA] py-2 border-x border-natural-border">
                  {quantity}
                </div>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-natural-text/80 hover:bg-natural-border/50 rounded-r-lg transition">
                  +
                </button>
              </div>
            </div>
          </div>

          <button onClick={handleAddToCart} disabled={added} className={`w-full py-4 rounded-[32px] flex items-center justify-center gap-2 text-lg font-semibold transition ${added ? 'bg-green-500 text-white' : 'bg-sage-leaf hover:bg-sage-leaf-hover text-white soft-shadow shadow-[0_10px_30px_-15px_rgba(113,125,107,0.3)]'}`}>
            {added ? (<>
                <Check className="w-5 h-5"/> Added to Cart
              </>) : (<>
                <ShoppingCart className="w-5 h-5"/> Add to Cart
              </>)}
          </button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (<div className="border-t border-natural-border pt-16 mt-8">
          <h2 className="text-2xl font-serif font-semibold text-sage-dark mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (<div key={p.id} className="bg-[#FCFCFA] rounded-[32px] soft-shadow border border-natural-border overflow-hidden hover:soft-shadow transition">
                <Link to={`/product/${p.id}`} className="block relative aspect-square overflow-hidden group">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300"/>
                </Link>
                <div className="p-4">
                  <Link to={`/product/${p.id}`} className="block hover:text-sage-leaf mb-1">
                    <h3 className="font-semibold text-sage-dark line-clamp-1">{p.name}</h3>
                  </Link>
                  <span className="font-serif font-semibold text-sage-dark">${p.price.toFixed(2)}</span>
                </div>
              </div>))}
          </div>
        </div>)}
    </div>);
}
