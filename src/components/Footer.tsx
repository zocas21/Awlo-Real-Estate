import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUpRight, Navigation, Calendar } from 'lucide-react';
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
    <footer className="bg-[#0A1128] text-white pt-16 sm:pt-20 pb-14 sm:pb-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-5 sm:space-y-6">
            <button
              onClick={() => handleNav('home')}
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md transition-transform hover:opacity-95 active:scale-[0.99]"
              aria-label="EthioBest Real Estate"
            >
              <img
                src="https://i.postimg.cc/6QRMkh9s/IMG-20260910-094745-843-modified.png"
                alt="EthioBest Real Estate"
                className="h-[65px] sm:h-[85px] md:h-[105px] lg:h-[120px] xl:h-[132px] w-auto max-w-[280px] sm:max-w-[360px] lg:max-w-[440px] object-contain bg-transparent select-none drop-shadow-xs"
                referrerPolicy="no-referrer"
              />
            </button>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              "Find Your Place in Addis Ababa" — Premier developer of luxury residential apartments, penthouses, and commercial properties with 100% legal title deeds in Ethiopia.
            </p>

            {/* Social / Contact Icons */}
            <div className="pt-2 space-y-2">
              <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                Connect With Us
              </p>
              <SocialLinks variant="footer" />
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-blue-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('projects')} className="hover:text-blue-400 transition-colors">
                  Projects & Listings
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-blue-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-blue-400 transition-colors">
                  Contact Office
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('faq')} className="hover:text-blue-400 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Neighborhoods */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Addis Ababa Prime</h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>Bole (Atlas & Medhanialem)</li>
              <li>CMC (Michael Church)</li>
              <li>Sarbet (AU & Old Airport)</li>
              <li>Summit (Pinnacle Corridor)</li>
              <li>Ayat (Light Rail Link)</li>
              <li>Gerji & Lebu</li>
            </ul>
          </div>

          {/* Col 5: Office Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Contact & Office</h4>
            <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{AWLO_CONTACT_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${AWLO_CONTACT_INFO.phoneClean}`} className="hover:text-blue-400 transition-colors">
                  {AWLO_CONTACT_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                <a href={`mailto:${AWLO_CONTACT_INFO.email}`} className="hover:text-blue-400 transition-colors">
                  {AWLO_CONTACT_INFO.email}
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onBookTour}
                  className="rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Private Tour</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} EthioBest Real Estate. All rights reserved. Addis Ababa, Ethiopia.</p>
          <div className="flex items-center space-x-4">
            <button onClick={() => handleNav('faq')} className="hover:text-slate-200 transition-colors">
              Legal Title Guarantee
            </button>
            <span>•</span>
            <button onClick={() => handleNav('contact')} className="hover:text-slate-200 transition-colors">
              Direct Sales
            </button>
            <span>•</span>
            <a
              href={AWLO_CONTACT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <span>Map Directions</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
