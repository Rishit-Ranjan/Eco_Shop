import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShieldCheck } from 'lucide-react';
export default function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        country: 'India'
    });
    const [errors, setErrors] = useState({});
    if (cart.length === 0) {
        return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center py-20">
                <h1 className="text-3xl font-serif font-semibold text-sage-dark mb-4">Your cart is empty</h1>
                <p className="text-natural-text/70 mb-8 max-w-md mx-auto">Your shopping cart is empty. Add some items to proceed with checkout.</p>
                <a href="/products" className="inline-block bg-sage-leaf hover:bg-sage-leaf-hover text-white font-serif font-semibold py-3 px-8 rounded-[32px] transition soft-shadow">Shop Products</a>
            </div>
        </div>;
    }
    const validate = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }
        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }
        if (!formData.zip.trim()) {
            newErrors.zip = 'ZIP/Postal code is required';
        } else if (!/^[1-9][0-9]{5}$|^\d{6}$/.test(formData.zip)) {
            newErrors.zip = 'Invalid ZIP/Postal code format';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        // Simulate order processing
        const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        clearCart();
        navigate('/confirmation', { state: { orderId, email: formData.email } });
    };
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-semibold text-sage-dark mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-12 lg:flex-row-reverse">
        
        {/* Order Summary */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-[#F7F6F2] rounded-[40px] p-6 border border-natural-border sticky top-24">
            <h2 className="text-xl font-serif font-semibold text-sage-dark mb-6">Order Summary</h2>
            
            <ul className="space-y-4 mb-6">
              {cart.map((item) => (<li key={item.id} className="flex items-start gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover border border-natural-border"/>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-sage-dark line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-natural-text/70 mb-1">Qty: {item.quantity}</p>
                  <p className="text-sm font-medium text-sage-dark">₹{(item.price * item.quantity).toFixed(0)}</p>
                  </div>
                </li>))}
            </ul>

            <div className="border-t border-natural-border pt-4 space-y-3 mb-6 text-sm">
              <div className="flex justify-between text-natural-text/80">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-natural-text/80">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-natural-text/80">
                <span>Tax (10%)</span>
                <span>₹{(cartTotal * 0.18).toFixed(0)} (GST 18%)</span>
              </div>
            </div>

            <div className="border-t border-natural-border pt-4 flex justify-between items-center mb-6">
              <span className="text-lg font-serif font-semibold text-sage-dark">Total</span>
              <span className="text-2xl font-serif font-semibold text-sage-leaf">₹{(cartTotal * 1.18).toFixed(0)}</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-natural-text/70 bg-[#FCFCFA] py-3 rounded-lg border border-natural-border">
              <ShieldCheck className="w-5 h-5 text-green-500"/> Secure Checkout
            </div>
          </div>
        </div>

        {/* Shipping Form */}
        <div className="flex-grow">
          <form onSubmit={handleSubmit} className="bg-[#FCFCFA] rounded-[40px] soft-shadow border border-natural-border p-8">
            <h2 className="text-2xl font-serif font-semibold text-sage-dark mb-6 border-b border-natural-border pb-4">Shipping Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-sage-dark/80 mb-2">First Name</label>
                <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border \${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-natural-border focus:ring-sage-leaf'} focus:ring-2 focus:border-transparent outline-none bg-[#F7F6F2] transition`} placeholder="John"/>
                {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-dark/80 mb-2">Last Name</label>
                <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border \${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-natural-border focus:ring-sage-leaf'} focus:ring-2 focus:border-transparent outline-none bg-[#F7F6F2] transition`} placeholder="Doe"/>
                {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-sage-dark/80 mb-2">Email Address</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border \${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-natural-border focus:ring-sage-leaf'} focus:ring-2 focus:border-transparent outline-none bg-[#F7F6F2] transition`} placeholder="john@example.com"/>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-sage-dark/80 mb-2">Street Address</label>
              <input required type="text" name="address" value={formData.address} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border \${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-natural-border focus:ring-sage-leaf'} focus:ring-2 focus:border-transparent outline-none bg-[#F7F6F2] transition`} placeholder="123 Main St"/>
              {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-sage-dark/80 mb-2">City</label>
                <input required type="text" name="city" value={formData.city} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border \${errors.city ? 'border-red-500 focus:ring-red-500' : 'border-natural-border focus:ring-sage-leaf'} focus:ring-2 focus:border-transparent outline-none bg-[#F7F6F2] transition`} placeholder="New York"/>
                {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-dark/80 mb-2">ZIP Code</label>
                <input required type="text" name="zip" value={formData.zip} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border \${errors.zip ? 'border-red-500 focus:ring-red-500' : 'border-natural-border focus:ring-sage-leaf'} focus:ring-2 focus:border-transparent outline-none bg-[#F7F6F2] transition`} placeholder="10001"/>
                {errors.zip && <p className="mt-1 text-sm text-red-500">{errors.zip}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-dark/80 mb-2">Country</label>
                <select name="country" value={formData.country} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border \${errors.country ? 'border-red-500 focus:ring-red-500' : 'border-natural-border focus:ring-sage-leaf'} focus:ring-2 focus:border-transparent outline-none bg-[#F7F6F2] transition`}>
                  <option>India</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                  <option>Singapore</option>
                  <option>UAE</option>
                  <option>Saudi Arabia</option>
                </select>
                {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
              </div>
            </div>

            <h2 className="text-2xl font-serif font-semibold text-sage-dark mb-6 border-b border-natural-border pb-4">Payment Method</h2>
            
            <div className="bg-[#F7F6F2] p-4 rounded-lg border border-natural-border mb-8 flex items-center justify-center text-natural-text/70">
              <p>Simulated Checkout: No real payment info needed.</p>
            </div>

            <button type="submit" className="w-full bg-sage-leaf hover:bg-sage-leaf-hover text-white font-serif font-semibold py-4 rounded-[32px] text-lg transition soft-shadow shadow-[0_10px_30px_-15px_rgba(113,125,107,0.3)]">
              Place Order
            </button>
          </form>
        </div>

      </div>
    </div>);
}
