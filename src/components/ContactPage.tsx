import React from 'react';
import { ContactForm } from './ContactForm';
import { MapPin, Phone, MessageCircle, Clock, Mail, ShieldCheck } from 'lucide-react';

interface ContactPageProps {
  onLeadSubmitted?: (leadData: any) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onLeadSubmitted }) => {
  return (
    <div className="py-12 bg-slate-50 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs font-extrabold tracking-widest text-[#0F4C3A] uppercase bg-emerald-100 px-3.5 py-1 rounded-full">
          Reach Our Sales Team
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Contact Awlo Real Estate
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Whether you want to schedule a site tour, review legal title deeds, or discuss payment plans, our advisors are here for you.
        </p>
      </div>

      <ContactForm onLeadSubmitted={onLeadSubmitted} />

      {/* Embedded Map Visualizer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#0F4C3A]" />
                <span>Head Office Location Map</span>
              </h3>
              <p className="text-xs text-slate-500">Awlo Building, Bole Road (Near Atlas Traffic Light), Addis Ababa, Ethiopia</p>
            </div>
            <a
              href="https://maps.google.com/?q=Bole+Road+Addis+Ababa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#0F4C3A] hover:underline"
            >
              Open in Google Maps →
            </a>
          </div>

          <div className="relative h-72 rounded-2xl overflow-hidden bg-slate-900 border border-slate-300 flex items-center justify-center text-white shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80"
              alt="Addis Ababa Bole Road Map"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

            <div className="relative z-10 text-center p-6 max-w-md space-y-3 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-extrabold text-white">Awlo Headquarters</h4>
              <p className="text-xs text-amber-300 font-semibold">Bole Road • Atlas Junction • 4th Floor</p>
              <p className="text-xs text-slate-300">Free client parking available in basement garage.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
