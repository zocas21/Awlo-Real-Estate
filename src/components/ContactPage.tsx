import React from 'react';
import { ContactForm } from './ContactForm';
import { MapPin, Navigation, Compass, ExternalLink, Phone } from 'lucide-react';
import { AWLO_CONTACT_INFO, ReachUsDirectlyCards } from './SocialLinks';

interface ContactPageProps {
  onLeadSubmitted?: (leadData: any) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onLeadSubmitted }) => {
  return (
    <div className="bg-white py-12 sm:py-20 space-y-16">
      
      {/* 1. Top Section: Reach Us Directly */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header with Pill Badge and Two-Tone Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-600 border border-blue-100 shadow-xs">
            REACH US DIRECTLY
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Reach Us <span className="text-blue-600">Directly</span>
          </h1>

          <p className="text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Choose your preferred communication channel for instant floor plans, price proposals, and title deed verification in Addis Ababa.
          </p>
        </div>

        {/* 5 "Reach Us Directly" Cards: Phone (blue), WhatsApp (green), Telegram (light blue), Email (red/pink), Office (purple) */}
        <ReachUsDirectlyCards />
      </div>

      {/* 2. Embedded Google Map Section with "Get Directions" Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EAF2FF] bg-grid-pattern-light p-6 sm:p-10 rounded-3xl border border-blue-100 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-blue-200/60 pb-6">
            <div className="space-y-2">
              <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white text-blue-700 border border-blue-200 shadow-xs">
                HEADQUARTERS MAP
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                EthioBest Business Center <span className="text-blue-600">Location</span>
              </h2>
              <p className="text-sm text-slate-600 flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
                <span>{AWLO_CONTACT_INFO.address}</span>
              </p>
            </div>

            {/* Action Buttons: Solid blue rounded pill primary button ("Get Directions") + outline rounded pill secondary button */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={AWLO_CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 text-sm font-semibold transition-all shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href={`tel:${AWLO_CONTACT_INFO.phoneClean}`}
                className="inline-flex items-center gap-2 rounded-full border border-blue-600 text-blue-600 hover:bg-white px-5 py-2.5 text-sm font-semibold transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Sales Desk</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Map Frame */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-blue-200 shadow-xs bg-slate-100">
            <iframe
              src="https://maps.google.com/maps?q=EthioBest+Real+Estate,+Bole,+Addis+Ababa,+Ethiopia&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="EthioBest Real Estate Business Center Map"
              className="w-full h-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-xs text-xs text-slate-600 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>Landmarks & Proximity</span>
              </div>
              <p>In front of Bole Medhanialem Church, Next to Kenenisa Hotel</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-xs text-xs text-slate-600 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Showroom Hours</span>
              </div>
              <p>Mon–Sat 09:30–20:00, Sun 14:00–20:00 (EAT)</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-xs text-xs text-slate-600 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Parking & Accessibility</span>
              </div>
              <p>Dedicated visitor underground parking with EV charging</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Inquiry Form */}
      <ContactForm onLeadSubmitted={onLeadSubmitted} />

    </div>
  );
};
