import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';
export default function Confirmation() {
    const location = useLocation();
    const state = location.state;
    if (!state) {
        return <Navigate to="/"/>;
    }
    return (<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-24 h-24 text-green-500"/>
      </div>
      
      <h1 className="text-4xl font-serif font-semibold text-sage-dark mb-4">Order Confirmed!</h1>
      <p className="text-xl text-natural-text/80 mb-8 max-w-xl mx-auto">
        Thank you for your purchase. Your order has been received and is currently being processed.
      </p>

      <div className="bg-[#FCFCFA] border border-natural-border soft-shadow rounded-[40px] p-8 mb-10 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Package className="w-32 h-32"/>
        </div>
        <h2 className="text-xl font-serif font-semibold text-sage-dark mb-6">Order Details</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-natural-text/70 mb-1">Order Number</p>
            <p className="font-serif font-semibold text-sage-dark text-lg">{state.orderId}</p>
          </div>
          <div>
            <p className="text-natural-text/70 mb-1">Status</p>
            <p className="font-medium inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
              Processing
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-natural-text/70 mb-1">Confirmation Email Sent To</p>
            <p className="font-medium text-sage-dark">{state.email}</p>
          </div>
        </div>
      </div>

      <div className="space-x-4">
        <Link to="/products" className="inline-block bg-sage-leaf hover:bg-sage-leaf-hover text-white font-semibold py-3 px-8 rounded-[32px] transition soft-shadow shadow-[0_10px_30px_-15px_rgba(113,125,107,0.2)]">
          Continue Shopping
        </Link>
      </div>
    </div>);
}
