import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim())
            newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.message.trim())
            newErrors.message = 'Message is required';
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
        if (validate()) {
            // Simulate API call
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSubmitted(false), 5000);
        }
    };
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-semibold text-sage-dark mb-4">Contact Us</h1>
        <p className="text-xl text-natural-text/70 max-w-2xl mx-auto">
          Have a question or just want to say hi? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-[#FCFCFA] rounded-[40px] soft-shadow border border-natural-border p-8 flex items-start gap-4">
            <div className="bg-sage-leaf/10 p-3 rounded-full text-sage-leaf flex-shrink-0">
              <MapPin className="w-6 h-6"/>
            </div>
            <div>
              <h3 className="text-lg font-serif font-semibold text-sage-dark mb-1">Our Location</h3>
              <p className="text-natural-text/80">123 Commerce Blvd, Suite 400<br />San Francisco, CA 94103</p>
            </div>
          </div>

          <div className="bg-[#FCFCFA] rounded-[40px] soft-shadow border border-natural-border p-8 flex items-start gap-4">
            <div className="bg-sage-leaf/10 p-3 rounded-full text-sage-leaf flex-shrink-0">
              <Mail className="w-6 h-6"/>
            </div>
            <div>
              <h3 className="text-lg font-serif font-semibold text-sage-dark mb-1">Email Us</h3>
              <p className="text-natural-text/80">support@ecoshop.com<br />hello@ecoshop.com</p>
            </div>
          </div>

          <div className="bg-[#FCFCFA] rounded-[40px] soft-shadow border border-natural-border p-8 flex items-start gap-4">
            <div className="bg-sage-leaf/10 p-3 rounded-full text-sage-leaf flex-shrink-0">
              <Phone className="w-6 h-6"/>
            </div>
            <div>
              <h3 className="text-lg font-serif font-semibold text-sage-dark mb-1">Call Us</h3>
              <p className="text-natural-text/80">+1 (555) 123-4567<br />Mon-Fri, 9am-6pm PST</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-[#FCFCFA] rounded-[40px] soft-shadow border border-natural-border p-8 md:p-10">
            <h2 className="text-2xl font-serif font-semibold text-sage-dark mb-6">Send a Message</h2>
            
            {submitted && (<div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-100">
                Thank you for reaching out! Your message has been sent successfully. We will get back to you shortly.
              </div>)}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-sage-dark/80 mb-2">Your Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-natural-border focus:ring-sage-leaf'} focus:ring-2 focus:border-transparent outline-none transition bg-[#F7F6F2]`}/>
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-sage-dark/80 mb-2">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-natural-border focus:ring-sage-leaf'} focus:ring-2 focus:border-transparent outline-none transition bg-[#F7F6F2]`}/>
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-dark/80 mb-2">Subject (Optional)</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" className="w-full px-4 py-3 rounded-lg border border-natural-border focus:ring-2 focus:ring-sage-leaf focus:border-transparent outline-none transition bg-[#F7F6F2]"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-dark/80 mb-2">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={6} placeholder="Your message..." className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-natural-border focus:ring-sage-leaf'} focus:ring-2 focus:border-transparent outline-none transition bg-[#F7F6F2] resize-none`}/>
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
              </div>

              <button type="submit" className="w-full sm:w-auto bg-sage-leaf hover:bg-sage-leaf-hover text-white font-serif font-semibold py-3 px-8 rounded-[32px] flex items-center justify-center transition soft-shadow shadow-[0_10px_30px_-15px_rgba(113,125,107,0.2)]">
                Send Message <Send className="w-5 h-5 ml-2"/>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>);
}
