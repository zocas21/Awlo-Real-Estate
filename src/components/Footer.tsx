import React from 'react';
import { Building2, Phone, Mail, MapPin, MessageCircle, Send, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'projects' | 'about' | 'contact' | 'faq') => void;
  onBookTour: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onBookTour }) => {
  const handleNav = (tab: 'home' | 'projects' | 'about' | 'contact' | 'faq') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F4C3A] text-white pt-16 pb-12 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-extrabold shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight">AWLO</span>
                <p className="text-[10px] font-semibold text-amber-300 uppercase tracking-widest -mt-1">
                  Real Estate
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-sm">
              "Find Your Place in Addis Ababa" — Premier developer of luxury residential apartments, commercial high-rises, and mixed-use communities in Ethiopia.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-emerald-200">
              <a
                href="https://wa.me/251911234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-slate-900 flex items-center justify-center transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/awlo_real_estate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-slate-900 flex items-center justify-center transition-colors"
                title="Telegram Channel"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="tel:+251911234567"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-slate-900 flex items-center justify-center transition-colors"
                title="Call Office"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-amber-300 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs text-emerald-100 font-medium">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-amber-300 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('projects')} className="hover:text-amber-300 transition-colors">
                  Projects & Listings
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-amber-300 transition-colors">
                  About Awlo Story
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-amber-300 transition-colors">
                  Contact Sales Office
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('faq')} className="hover:text-amber-300 transition-colors">
                  FAQ & Legal Ownership
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Neighborhoods */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-amber-300 uppercase tracking-wider">Addis Ababa Locations</h4>
            <ul className="space-y-2 text-xs text-emerald-100 font-medium">
              <li className="hover:text-amber-300">Bole Atlas & Airport Corridor</li>
              <li className="hover:text-amber-300">CMC Michael & Safari</li>
              <li className="hover:text-amber-300">Sarbet AU Diplomatic Hub</li>
              <li className="hover:text-amber-300">Summit Pinnacle Heights</li>
              <li className="hover:text-amber-300">Ayat Light Rail Zone</li>
              <li className="hover:text-amber-300">Gerji Commercial District</li>
            </ul>
          </div>

          {/* Col 5: Head Office Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-amber-300 uppercase tracking-wider">Head Office</h4>
            <div className="space-y-2 text-xs text-emerald-100">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Awlo Building, 4th Floor, Bole Road (Atlas Traffic Light), Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+251 91 123 4567 / +251 11 667 8900</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>info@awlo-realestate.et</span>
              </div>
            </div>

            <button
              onClick={onBookTour}
              className="mt-2 w-full bg-amber-400 hover:bg-amber-300 text-slate-900 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Book a Site Tour</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-emerald-200">
          <p>© {new Date().getFullYear()} Awlo Real Estate PLC. All Rights Reserved. Addis Ababa, Ethiopia.</p>
          <div className="flex items-center space-x-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Legal Certificate Verification</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
