import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react';
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
    subject: initialPropertyTitle ? `Inquiry regarding ${initialPropertyTitle}` : 'General Property Inquiry',
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
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-600 border border-blue-100 shadow-xs">
            DIRECT INQUIRY
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Send Us a <span className="text-blue-600">Message</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Connect directly with our sales advisors for floor plans, site tours, and legal ownership deed inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Office Details in Dark Navy (#0A1128) */}
          <div className="lg:col-span-5 bg-[#0A1128] text-white p-7 sm:p-9 rounded-2xl border border-slate-800 space-y-6 shadow-sm">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Sales Desk
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Awlo Real Estate Office
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Visit our showroom at Awlo Business Center in Bole or reach us anytime via phone, WhatsApp, or Telegram.
              </p>
            </div>

            <div className="space-y-5 pt-2 text-sm">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-950/80 text-purple-400 flex items-center justify-center shrink-0 border border-purple-800/60">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Office Location</h4>
                  <p className="text-slate-300 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    {AWLO_CONTACT_INFO.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-950/80 text-blue-400 flex items-center justify-center shrink-0 border border-blue-800/60">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Direct Phone</h4>
                  <a
                    href={`tel:${AWLO_CONTACT_INFO.phoneClean}`}
                    className="text-slate-300 hover:text-blue-400 transition-colors text-xs sm:text-sm mt-0.5 block font-medium"
                  >
                    {AWLO_CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-950/80 text-rose-400 flex items-center justify-center shrink-0 border border-rose-800/60">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Email</h4>
                  <a
                    href={`mailto:${AWLO_CONTACT_INFO.email}`}
                    className="text-slate-300 hover:text-blue-400 transition-colors text-xs sm:text-sm mt-0.5 block"
                  >
                    {AWLO_CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 border border-slate-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Working Hours</h4>
                  <p className="text-slate-300 text-xs sm:text-sm mt-0.5">
                    {AWLO_CONTACT_INFO.hoursWeekday}
                  </p>
                  <p className="text-amber-400/90 text-xs mt-0.5">
                    {AWLO_CONTACT_INFO.hoursSunday}
                  </p>
                </div>
              </div>
            </div>

            {/* Social and Quick Links */}
            <div className="pt-5 border-t border-slate-800 space-y-2.5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Instant Chat & Social Channels
              </p>
              <SocialLinks variant="contact-card" />
            </div>
          </div>

          {/* Right Column: Inquiries Form */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-2xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Thank you for your message!</h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  An Awlo senior property advisor will reach out to you within 2 business hours via phone or WhatsApp.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      subject: 'General Property Inquiry',
                      message: '',
                      neighborhood: 'Bole'
                    });
                  }}
                  className="rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 text-xs font-semibold transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Full Name <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abebe Kebede"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Phone Number <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+251 91 234 5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                    />
                  </div>

                  {/* Preferred Location */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Preferred Neighborhood
                    </label>
                    <select
                      value={formData.neighborhood}
                      onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
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
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Your Message / Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your budget, bedroom preference, or preferred site tour schedule..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                  />
                </div>

                {/* Solid blue rounded pill primary button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-6 font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Submitting...' : 'Submit Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
