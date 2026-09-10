import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { SocialLinks, AWLO_CONTACT_INFO } from './SocialLinks';

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
    <footer className="bg-[#0F4C3A] text-white pt-14 pb-10 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => handleNav('home')}
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-md"
              aria-label="Awlo Real Estate"
            >
              <img
                src="https://i.postimg.cc/N0S4FWJj/IMG-20260910-094745-843-removebg-preview.png"
                alt="Awlo Real Estate"
                className="h-11 sm:h-12 w-auto object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </button>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-sm">
              "Find Your Place in Addis Ababa" — Premier developer of luxury residential apartments and commercial properties with 100% legal title deeds in Ethiopia.
            </p>

            {/* Social / Contact Icons */}
            <div className="pt-2 space-y-2">
              <p className="text-[11px] font-semibold tracking-wider text-emerald-200/80 uppercase">
                Connect With Us
              </p>
              <SocialLinks variant="footer" />
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs text-emerald-100 font-medium">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-amber-300 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('projects')} className="hover:text-amber-300 transition-colors">
                  Projects & Listings
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-amber-300 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-amber-300 transition-colors">
                  Contact Office
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('faq')} className="hover:text-amber-300 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Neighborhoods */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Locations</h4>
            <ul className="space-y-2 text-xs text-emerald-100 font-medium">
              <li>Bole (Atlas & Medhanialem)</li>
              <li>CMC (Michael Church)</li>
              <li>Sarbet (AU & Old Airport)</li>
              <li>Summit (Pinnacle Corridor)</li>
              <li>Ayat & Bole Arabsa</li>
              <li>Gerji & Lebu</li>
            </ul>
          </div>

          {/* Col 5: Office Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Contact & Office</h4>
            <div className="space-y-2.5 text-xs text-emerald-100 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{AWLO_CONTACT_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${AWLO_CONTACT_INFO.phoneClean}`} className="hover:text-amber-300 transition-colors">
                  {AWLO_CONTACT_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${AWLO_CONTACT_INFO.email}`} className="hover:text-amber-300 transition-colors">
                  {AWLO_CONTACT_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p>{AWLO_CONTACT_INFO.hoursWeekday}</p>
                  <p className="text-emerald-300/80">{AWLO_CONTACT_INFO.hoursSunday}</p>
                </div>
              </div>
            </div>

            <button
              onClick={onBookTour}
              className="mt-3 w-full bg-amber-400 hover:bg-amber-300 text-slate-900 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Book a Tour</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-emerald-200/80">
          <p>© {new Date().getFullYear()} Awlo Real Estate. All Rights Reserved. Addis Ababa, Ethiopia.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span>Bole Sub-city</span>
            <span>•</span>
            <a href={AWLO_CONTACT_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">
              Google Maps
            </a>
            <span>•</span>
            <a href={AWLO_CONTACT_INFO.wazeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">
              Waze Directions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
