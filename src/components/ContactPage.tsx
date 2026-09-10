import React from 'react';
import { ContactForm } from './ContactForm';
import { MapPin, Navigation, Compass } from 'lucide-react';
import { AWLO_CONTACT_INFO, SocialLinks } from './SocialLinks';

interface ContactPageProps {
  onLeadSubmitted?: (leadData: any) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onLeadSubmitted }) => {
  return (
    <div className="bg-slate-50 py-10 sm:py-14 space-y-12">
      {/* Header section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs font-semibold tracking-wider text-[#0F4C3A] uppercase bg-slate-200/70 px-3 py-1 rounded-md">
          Direct Sales Office
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Contact Awlo Real Estate
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Visit our Bole Sub-city office, reach us by phone or messaging, or request a personalized tour of our developments in Addis Ababa.
        </p>
      </div>

      {/* Main Contact Form & Details Component */}
      <ContactForm onLeadSubmitted={onLeadSubmitted} />

      {/* Office Directions & Location Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#0F4C3A]" />
                <span>Office Location & Landmarks</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {AWLO_CONTACT_INFO.address}
              </p>
            </div>

            {/* Direct navigation action buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={AWLO_CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0F4C3A] hover:bg-[#0c3d2e] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                <span>Google Maps Directions</span>
              </a>

              <a
                href={AWLO_CONTACT_INFO.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-lg text-xs font-semibold transition-colors border border-slate-300"
              >
                <Compass className="w-3.5 h-3.5 text-slate-600" />
                <span>Waze Navigation</span>
              </a>
            </div>
          </div>

          {/* Clean flat map visual placeholder with exact landmark indicator */}
          <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex flex-col justify-end p-6">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80"
              alt="Bole Medhanialem Addis Ababa Map Landmark"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-slate-900/40"></div>

            <div className="relative z-10 bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-slate-200 max-w-md space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0F4C3A]"></span>
                <h4 className="font-bold text-sm text-slate-900">Awlo Real Estate Head Office</h4>
              </div>
              <p className="text-xs text-slate-600">
                In front of Bole Medhanialem Church, Next to Kenenisa Hotel, Bole Sub-city, Addis Ababa.
              </p>
              <div className="pt-1 flex items-center gap-4 text-xs font-medium text-slate-700">
                <span>Mon–Sat: 09:30–20:00</span>
                <span>•</span>
                <span>Sun: 14:00–20:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
