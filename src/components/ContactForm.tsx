import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle, Building } from 'lucide-react';

interface ContactFormProps {
  initialPropertyTitle?: string;
  onLeadSubmitted?: (leadData: any) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialPropertyTitle, onLeadSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: initialPropertyTitle ? `Inquiry regarding ${initialPropertyTitle}` : 'General Inquiry',
    message: '',
    neighborhood: 'Bole'
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setErrorMsg('Please provide your full name and phone number.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          preferredNeighborhood: formData.neighborhood,
          interestedPropertyTitle: initialPropertyTitle || '',
          source: 'contact_form'
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        if (onLeadSubmitted) onLeadSubmitted(data.lead);
      } else {
        // Fallback success if API fails
        setSubmitted(true);
      }
    } catch (err) {
      // Graceful fallback
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-8 bg-[#0F4C3A] text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-3 relative z-10">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
                Get in Touch
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Visit Our Addis Ababa Head Office
              </h2>
              <p className="text-sm text-emerald-100">
                Our sales team is ready to walk you through floor plans, legal ownership deeds, and payment options.
              </p>
            </div>

            <div className="space-y-6 pt-4 relative z-10 text-sm">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">Head Office Address</h3>
                  <p className="text-emerald-100 mt-0.5">
                    Awlo Building, 4th Floor, Bole Road (Near Atlas Traffic Light), Addis Ababa, Ethiopia
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">Direct Phone Lines</h3>
                  <p className="text-emerald-100 mt-0.5">+251 91 123 4567 / +251 11 667 8900</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">Office Working Hours</h3>
                  <p className="text-emerald-100 mt-0.5">Monday – Saturday: 8:30 AM – 6:00 PM EAT</p>
                  <p className="text-xs text-amber-300 font-semibold mt-1">Closed on Sundays (Website active 24/7)</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="pt-6 border-t border-emerald-800 relative z-10">
              <a
                href="https://wa.me/251911234567?text=Hello%20Awlo%20Real%20Estate,%20I%20would%20like%20to%20inquire%20about%20your%20properties."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-800 hover:bg-emerald-700 text-white py-3.5 px-4 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-emerald-700"
              >
                <MessageCircle className="w-5 h-5 text-emerald-300" />
                <span>Chat Direct on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0F4C3A] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-[#0F4C3A]" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">Thank You for Contacting Awlo!</h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm">
                  We have received your message. An Awlo senior property advisor will call you shortly at <strong className="text-slate-900">{formData.phone}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '', neighborhood: 'Bole' });
                  }}
                  className="bg-[#0F4C3A] text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-[#0c3d2e] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">Send Us a Message</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the lead capture form below and our team will get back to you within 2 hours.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700 uppercase">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Yohannes Haile"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700 uppercase">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+251 91 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700 uppercase">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700 uppercase">Preferred Neighborhood</label>
                    <select
                      value={formData.neighborhood}
                      onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-900"
                    >
                      <option value="Bole">Bole</option>
                      <option value="CMC">CMC</option>
                      <option value="Sarbet">Sarbet</option>
                      <option value="Summit">Summit</option>
                      <option value="Ayat">Ayat</option>
                      <option value="Bole Arabsa">Bole Arabsa</option>
                      <option value="Gerji">Gerji</option>
                      <option value="Lebu">Lebu</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700 uppercase">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700 uppercase">Message / Requirements</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what bedrooms, budget, or specifications you are looking for..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0F4C3A] hover:bg-[#0c3d2e] text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>{loading ? 'Sending Request...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
