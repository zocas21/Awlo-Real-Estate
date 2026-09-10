import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { SocialLinks, AWLO_CONTACT_INFO } from './SocialLinks';

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
        setSubmitted(true);
      }
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 bg-[#0F4C3A] text-white p-6 sm:p-8 rounded-2xl border border-emerald-900 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Direct Contact
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Awlo Real Estate Office
              </h2>
              <p className="text-sm text-emerald-100/90 leading-relaxed">
                Connect directly with our sales advisors for floor plans, site tours, and legal ownership deed inquiries.
              </p>
            </div>

            <div className="space-y-5 pt-2 text-sm">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-900 text-amber-300 flex items-center justify-center shrink-0 border border-emerald-800">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Office Location</h3>
                  <p className="text-emerald-100/90 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    {AWLO_CONTACT_INFO.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-900 text-amber-300 flex items-center justify-center shrink-0 border border-emerald-800">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Phone</h3>
                  <a
                    href={`tel:${AWLO_CONTACT_INFO.phoneClean}`}
                    className="text-emerald-100 hover:text-amber-300 transition-colors text-xs sm:text-sm mt-0.5 block font-medium"
                  >
                    {AWLO_CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-900 text-amber-300 flex items-center justify-center shrink-0 border border-emerald-800">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Email</h3>
                  <a
                    href={`mailto:${AWLO_CONTACT_INFO.email}`}
                    className="text-emerald-100 hover:text-amber-300 transition-colors text-xs sm:text-sm mt-0.5 block"
                  >
                    {AWLO_CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-900 text-amber-300 flex items-center justify-center shrink-0 border border-emerald-800">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Working Hours</h3>
                  <p className="text-emerald-100/90 text-xs sm:text-sm mt-0.5">
                    {AWLO_CONTACT_INFO.hoursWeekday}
                  </p>
                  <p className="text-emerald-300/80 text-xs mt-0.5">
                    {AWLO_CONTACT_INFO.hoursSunday}
                  </p>
                </div>
              </div>
            </div>

            {/* Social and Quick Links */}
            <div className="pt-4 border-t border-emerald-900 space-y-2.5">
              <p className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
                Fast Contact & Navigation
              </p>
              <SocialLinks variant="contact-card" />
            </div>
          </div>

          {/* Right Column: Inquiries Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#0F4C3A] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">Inquiry Received</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-slate-800">{formData.name}</span>. An Awlo sales advisor will call you at <span className="font-semibold text-slate-800">{formData.phone}</span> shortly.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      subject: 'General Inquiry',
                      message: '',
                      neighborhood: 'Bole'
                    });
                  }}
                  className="mt-4 px-5 py-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Send Us a Message
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Fill out the form below and our team will get back to you within 2 business hours.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Almaz Bekele"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-900"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+251 9..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-900"
                    />
                  </div>

                  {/* Preferred Location */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Preferred Neighborhood
                    </label>
                    <select
                      value={formData.neighborhood}
                      onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-900"
                    >
                      <option value="Bole">Bole (Atlas / Medhanialem)</option>
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

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-900"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Your Message / Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your budget, bedroom preference, or schedule a visit..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0F4C3A] hover:bg-[#0c3d2e] text-white py-3 px-6 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>{loading ? 'Submitting...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
