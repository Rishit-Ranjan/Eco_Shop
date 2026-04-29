import { Shield, Users, Zap, Globe } from 'lucide-react';
export default function About() {
    return (<div>
      {/* Hero Section */}
      <div className="bg-sage-dark text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-6">About EcoShop</h1>
          <p className="text-xl text-natural-bg/80 max-w-3xl mx-auto">
            We are on a mission to redefine the e-commerce experience by providing top-quality products, exceptional customer service, and sustainable practices.
          </p>
        </div>
      </div>

      {/* Image & Text Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Our Team" className="rounded-[40px] soft-shadow border border-natural-border"/>
          </div>
          <div>
            <h2 className="text-3xl font-serif font-semibold text-sage-dark mb-6">Our Story</h2>
            <p className="text-natural-text/80 mb-4 leading-relaxed">
              EcoShop started with a simple idea: making premium products accessible to everyone while maintaining a deep commitment to environmental responsibility. What began as a small operation in a garage has grown into a global brand serving millions of customers.
            </p>
            
            <div className="flex gap-4">
              <div className="pt-4 border-t border-natural-border">
                <p className="text-3xl font-serif font-semibold text-sage-leaf mb-1">500k+</p>
                <p className="text-sm text-natural-text/70 font-medium">Happy Customers</p>
              </div>
              <div className="pt-4 border-t border-natural-border">
                <p className="text-3xl font-serif font-semibold text-sage-leaf mb-1">100+</p>
                <p className="text-sm text-natural-text/70 font-medium">Partner Brands</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-[#F7F6F2] py-20 border-y border-natural-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-semibold text-sage-dark mb-4">Why Choose Us?</h2>
            <p className="text-natural-text/70 max-w-2xl mx-auto">We stand out from the crowd by focusing on what truly matters to our customers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
            { icon: Shield, title: 'Quality Guaranteed', desc: 'Every product goes through rigorous quality checks.' },
            { icon: Zap, title: 'Fast Delivery', desc: 'Lightning-fast shipping options available worldwide.' },
            { icon: Users, title: 'Customer First', desc: 'Our support team is available 24/7 to help you.' },
            { icon: Globe, title: 'Sustainable', desc: 'Committed to eco-friendly packaging and shipping.' },
        ].map((f, i) => (<div key={i} className="bg-[#FCFCFA] p-8 rounded-[32px] soft-shadow text-center border border-natural-border hover:soft-shadow transition">
                <div className="w-14 h-14 bg-sage-leaf/10 text-sage-leaf rounded-full flex items-center justify-center mx-auto mb-6">
                  <f.icon className="w-6 h-6"/>
                </div>
                <h3 className="text-xl font-serif font-semibold text-sage-dark mb-3">{f.title}</h3>
                <p className="text-natural-text/70 text-sm">{f.desc}</p>
              </div>))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-semibold text-sage-dark mb-4">What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Sarah Jenkins', role: 'Verified Buyer', content: 'Absolutely love the quality of the products I received. Delivery was fast and the packaging was completely recyclable. Will definitely shop here again!' },
            { name: 'Michael Chen', role: 'Tech Enthusiast', content: 'The electronics selection is fantastic. I foundexactly what I was looking for at a better price than anywhere else. Customer service was also very helpful.' },
            { name: 'Emily Rodriguez', role: 'Regular Customer', content: 'EcoShop has become my go-to for home goods. The minimalist designs fit perfectly in my apartment, and the prices are unbeatable.' },
        ].map((t, i) => (<div key={i} className="bg-[#FCFCFA] p-8 rounded-[32px] border border-natural-border soft-shadow relative pt-12">
              <div className="absolute top-0 transform -translate-y-1/2 left-8 text-5xl text-natural-bg/80 font-serif">"</div>
              <p className="text-natural-text/80 mb-6 italic relative z-10">{t.content}</p>
              <div>
                <p className="font-serif font-semibold text-sage-dark">{t.name}</p>
                <p className="text-sm text-natural-text/70">{t.role}</p>
              </div>
            </div>))}
        </div>
      </div>
    </div>);
}
