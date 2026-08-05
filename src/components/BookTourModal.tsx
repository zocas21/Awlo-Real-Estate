import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle, Building2 } from 'lucide-react';
import { SAMPLE_PROPERTIES } from '../data/mockData';

interface BookTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPropertyTitle?: string;
  onSuccess?: (lead: any) => void;
}

export const BookTourModal: React.FC<BookTourModalProps> = ({
  isOpen,
  onClose,
  preselectedPropertyTitle,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyTitle: preselectedPropertyTitle || SAMPLE_PROPERTIES[0].title,
    date: '',
    timeSlot: 'Morning (9:00 AM - 12:00 PM)',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          interestedPropertyTitle: formData.propertyTitle,
          subject: `Site Tour Request for ${formData.propertyTitle}`,
          message: `Date: ${formData.date}, Time Slot: ${formData.timeSlot}. Notes: ${formData.notes}`,
          source: 'book_tour'
        })
      });

      const data = await res.json();
      if (data.success && onSuccess) {
        onSuccess(data.lead);
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">

        {/* Header */}
        <div className="bg-[#0F4C3A] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Book a Site Tour</h3>
              <p className="text-xs text-amber-300 font-medium">Free guided tour of Awlo developments</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0F4C3A] flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-[#0F4C3A]" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900">Tour Request Scheduled!</h4>
              <p className="text-xs text-slate-600">
                Our sales team will contact you at <strong className="text-slate-900">{formData.phone}</strong> to confirm your transport and site meeting details for <strong className="text-slate-900">{formData.propertyTitle}</strong>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-[#0F4C3A] text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-[#0c3d2e] transition-colors"
              >
                Close Dialog
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 uppercase">Select Property</label>
                <select
                  value={formData.propertyTitle}
                  onChange={(e) => setFormData({ ...formData, propertyTitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-800"
                >
                  {SAMPLE_PROPERTIES.map(p => (
                    <option key={p.id} value={p.title}>
                      {p.title} ({p.neighborhood})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 uppercase">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Meron Tadesse"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 uppercase">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+251 91 234 5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 uppercase">Preferred Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 uppercase">Time Window</label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-900"
                  >
                    <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 uppercase">Special Notes / Pick-up request</label>
                <textarea
                  rows={2}
                  placeholder="Let us know if you need transport assistance or have specific questions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-900"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F4C3A] hover:bg-[#0c3d2e] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>{loading ? 'Confirming Tour...' : 'Confirm Site Visit'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
