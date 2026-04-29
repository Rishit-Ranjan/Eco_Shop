import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Shield, RefreshCw, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/mockData';
import { useCart } from '../context/CartContext';
const HERO_SLIDES = [
    {
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
        title: "Discover Your Next Favorite Thing",
        subtitle: "Shop the latest trends in electronics, fashion, and home goods with unbeatable prices and exceptional quality."
    },
    {
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
        title: "Elevate Your Workspace",
        subtitle: "Discover minimalist and functional pieces designed to boost your productivity and inspire creativity."
    },
    {
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200",
        title: "Step Into Style",
        subtitle: "Explore our new collection of premium fashion essentials tailored for the modern lifestyle."
    }
];
export default function Home() {
    const { addToCart } = useCart();
    const latestProducts = PRODUCTS.slice(0, 4);
    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    return (<div>
      {/* Slider / Hero */}
      <div className="relative bg-sage-dark text-[#F7F6F2] overflow-hidden">
        {HERO_SLIDES.map((slide, index) => (<div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0">
              <img className="w-full h-full object-cover opacity-40 mix-blend-overlay" src={slide.image} alt={slide.title}/>
            </div>
          </div>))}
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center text-center min-h-[500px] justify-center">
          <h1 key={`title-${currentSlide}`} className="text-4xl md:text-6xl font-serif font-semibold tracking-tight mb-6 mt-12 animate-[fadeIn_0.5s_ease-out]">
            {HERO_SLIDES[currentSlide].title}
          </h1>
          <p key={`desc-${currentSlide}`} className="text-lg md:text-xl text-[#F7F6F2]/80 max-w-2xl mb-10 animate-[fadeIn_0.5s_ease-out]">
            {HERO_SLIDES[currentSlide].subtitle}
          </p>
          <Link to="/products" className="bg-sage-leaf hover:bg-sage-leaf-hover text-white font-semibold py-3 px-8 rounded-full transition soft-shadow relative z-10">
            Shop Now
          </Link>

          {/* Slider Controls */}
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition z-10 hidden sm:block">
            <ChevronLeft className="w-6 h-6"/>
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition z-10 hidden sm:block">
            <ChevronRight className="w-6 h-6"/>
          </button>

          {/* Slider Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {HERO_SLIDES.map((_, index) => (<button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}`}/>))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-[#FCFCFA] py-12 border-b border-natural-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <Truck className="h-10 w-10 text-sage-leaf mb-4"/>
              <h3 className="font-semibold text-sage-dark">Free Shipping</h3>
              <p className="text-sm text-natural-text/70 mt-2">On all orders over $50</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="h-10 w-10 text-sage-leaf mb-4"/>
              <h3 className="font-semibold text-sage-dark">Secure Payment</h3>
              <p className="text-sm text-natural-text/70 mt-2">100% secure payments</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <RefreshCw className="h-10 w-10 text-sage-leaf mb-4"/>
              <h3 className="font-semibold text-sage-dark">Easy Returns</h3>
              <p className="text-sm text-natural-text/70 mt-2">30 days return policy</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="h-10 w-10 text-sage-leaf mb-4"/>
              <h3 className="font-semibold text-sage-dark">24/7 Support</h3>
              <p className="text-sm text-natural-text/70 mt-2">Dedicated support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shop by Category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-serif font-semibold text-sage-dark">Shop by Category</h2>
          <Link to="/categories" className="text-sage-leaf hover:text-sage-dark font-medium">View All &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {CATEGORIES.map((category) => (<Link key={category.id} to={`/products`} state={{ categoryId: category.id }} className="group relative rounded-[32px] overflow-hidden soft-shadow hover:soft-shadow transition">
              <div className="aspect-[4/3] w-full">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-sage-dark/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-serif font-semibold text-[#F7F6F2] mb-1">{category.name}</h3>
                <p className="text-[#F7F6F2]/80 text-sm">Shop Now &rarr;</p>
              </div>
            </Link>))}
        </div>
      </div>

      {/* Latest Products */}
      <div className="bg-natural-stone py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-serif font-semibold text-sage-dark">Latest Products</h2>
            <Link to="/products" className="text-sage-leaf hover:text-sage-dark font-medium">View All &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestProducts.map((product) => (<div key={product.id} className="bg-[#FCFCFA] rounded-[32px] soft-shadow border border-natural-border overflow-hidden hover:soft-shadow transition flex flex-col">
                <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden group">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300"/>
                </Link>
                <div className="p-5 flex flex-col flex-grow">
                  <Link to={`/product/${product.id}`} className="block hover:text-sage-leaf">
                    <h3 className="text-lg font-semibold text-sage-dark mb-1">{product.name}</h3>
                  </Link>
                  <p className="text-natural-text/70 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-serif font-semibold text-sage-dark">${product.price.toFixed(2)}</span>
                    <button onClick={() => addToCart(product)} className="bg-sage-leaf text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sage-leaf-hover transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>))}
          </div>
        </div>
      </div>
    </div>);
}
