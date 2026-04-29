import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
export default function Cart() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();
    if (cart.length === 0) {
        return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-natural-stone p-6 rounded-full inline-block">
            <ShoppingBag className="w-16 h-16 text-natural-text/40"/>
          </div>
        </div>
        <h2 className="text-3xl font-serif font-semibold text-sage-dark mb-4">Your Cart is Empty</h2>
        <p className="text-natural-text/70 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Browse our products and discover great deals.</p>
        <Link to="/products" className="inline-flex items-center bg-sage-leaf hover:bg-sage-leaf-hover text-white font-medium py-3 px-8 rounded-full transition soft-shadow">
          Start Shopping
        </Link>
      </div>);
    }
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-semibold text-sage-dark mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-grow">
          <div className="bg-[#FCFCFA] rounded-[32px] soft-shadow border border-natural-border overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-natural-border text-sm font-medium text-natural-text/70 bg-[#F7F6F2]">
              <div className="col-span-6">Product Details</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Total</div>
            </div>

            <ul className="divide-y divide-natural-border">
              {cart.map((item) => (<li key={item.id} className="p-4 sm:p-6 flex flex-col sm:grid sm:grid-cols-12 sm:items-center sm:gap-4 group">
                  {/* Product Details */}
                  <div className="col-span-6 flex items-center gap-4 mb-4 sm:mb-0">
                    <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-natural-border"/>
                    <div>
                      <Link to={`/product/${item.id}`} className="font-semibold text-sage-dark hover:text-sage-leaf block mb-1">
                        {item.name}
                      </Link>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm flex items-center mt-2 group-hover:opacity-100 opacity-60 transition">
                        <Trash2 className="w-4 h-4 mr-1"/> Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-2 flex items-center justify-between sm:justify-center mb-4 sm:mb-0">
                    <span className="sm:hidden text-sm font-medium text-natural-text/70">Quantity</span>
                    <div className="flex items-center border border-natural-border rounded-md w-24">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-natural-text/80 hover:bg-natural-stone rounded-l-md w-1/3">
                        -
                      </button>
                      <span className="w-1/3 text-center text-sm font-medium border-x border-natural-border py-1">
                        {item.quantity}
                      </span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-natural-text/80 hover:bg-natural-stone rounded-r-md w-1/3">
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 flex justify-between sm:justify-center mb-2 sm:mb-0">
                    <span className="sm:hidden text-sm font-medium text-natural-text/70">Price</span>
                    <span className="text-sage-dark font-medium">₹{Math.round(item.price)}</span>
                  </div>

                  {/* Total */}
                  <div className="col-span-2 flex justify-between sm:justify-center">
                    <span className="sm:hidden text-sm font-medium text-natural-text/70">Total</span>
                    <span className="text-sage-leaf font-serif font-semibold">₹{Math.round(item.price * item.quantity)}</span>
                  </div>
                </li>))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-[#FCFCFA] rounded-[32px] soft-shadow border border-natural-border p-6 sticky top-24">
            <h2 className="text-xl font-serif font-semibold text-sage-dark mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-natural-text/80">
                <span>Subtotal</span>
                <span>₹{Math.round(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-natural-text/80">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-natural-text/80">
                <span>Tax</span>
                <span>₹{Math.round(cartTotal * 0.18)} (GST 18%)</span>
              </div>
            </div>

            <div className="border-t border-natural-border pt-4 mb-8 flex justify-between items-center">
              <span className="text-lg font-serif font-semibold text-sage-dark">Total</span>
              <span className="text-2xl font-serif font-semibold text-sage-leaf">₹{Math.round(cartTotal * 1.18)}</span>
            </div>

            <button onClick={() => navigate('/checkout')} className="w-full bg-sage-leaf hover:bg-sage-leaf-hover text-white font-serif font-semibold py-4 rounded-[32px] flex items-center justify-center transition soft-shadow shadow-[0_10px_30px_-15px_rgba(113,125,107,0.3)]">
              Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2"/>
            </button>
            <div className="mt-4 text-center">
              <Link to="/products" className="text-natural-text/70 hover:text-sage-leaf text-sm font-medium">
                or Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
