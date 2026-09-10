import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, ShieldCheck } from 'lucide-react';
import { SocialLinks, AWLO_CONTACT_INFO } from './SocialLinks';

interface HeaderProps {
  activeTab: 'home' | 'projects' | 'about' | 'contact' | 'faq';
  setActiveTab: (tab: 'home' | 'projects' | 'about' | 'contact' | 'faq') => void;
  onOpenBookTour: (propertyTitle?: string) => void;
  onOpenLeads?: () => void;
  leadsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenBookTour,
  onOpenLeads,
  leadsCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'projects' | 'about' | 'contact' | 'faq') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top micro bar for quick contact info and social links */}
      <div className="bg-[#0A1128] text-white py-2 px-4 text-xs border-b border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Location & Hours */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-slate-300 text-[11px] sm:text-xs">
            <span className="font-medium text-slate-200">
              {AWLO_CONTACT_INFO.address}
            </span>
            <span className="hidden lg:inline text-slate-600">•</span>
            <span className="hidden lg:inline text-slate-400">Mon–Sat 09:30–20:00, Sun 14:00–20:00</span>
          </div>

          {/* Quick Contact & Social Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={`tel:${AWLO_CONTACT_INFO.phoneClean}`}
              className="flex items-center gap-1.5 font-medium text-slate-200 hover:text-blue-400 transition-colors"
              title="Call Awlo Real Estate"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{AWLO_CONTACT_INFO.phone}</span>
            </a>

            <div className="h-3 w-px bg-slate-700 hidden sm:block"></div>

            {/* Social quick links */}
            <div className="flex items-center gap-1">
              <SocialLinks variant="header" />
            </div>

            {onOpenLeads && (
              <button
                onClick={onOpenLeads}
                className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-amber-400 px-2 py-0.5 rounded-full text-[11px] border border-slate-700 transition-colors ml-1"
                title="View Inquiries"
              >
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>Leads ({leadsCount})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Header bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-0.5"
          aria-label="Awlo Real Estate Home"
        >
          <img
            src="https://i.postimg.cc/tRtfTN6S/IMG-20260910-094745-843-removebg-preview-(1).png"
            alt="Awlo Real Estate"
            className="h-[44px] sm:h-[48px] w-auto object-contain bg-transparent"
            referrerPolicy="no-referrer"
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'home'
                ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('projects')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'projects'
                ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Projects
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'about'
                ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'contact'
                ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => handleNavClick('faq')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'faq'
                ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            FAQ
          </button>
        </nav>

        {/* Right CTA Area: Solid blue rounded pill primary button */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={() => onOpenBookTour()}
            className="flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-semibold transition-all shadow-sm"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>Book a Tour</span>
          </button>
        </div>

        {/* Mobile menu trigger button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onOpenBookTour()}
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Tour</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-6 space-y-1">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-4 py-2.5 rounded-full text-sm font-semibold ${
              activeTab === 'home' ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('projects')}
            className={`w-full text-left px-4 py-2.5 rounded-full text-sm font-semibold ${
              activeTab === 'projects' ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
            }`}
          >
            Projects
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-left px-4 py-2.5 rounded-full text-sm font-semibold ${
              activeTab === 'about' ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`w-full text-left px-4 py-2.5 rounded-full text-sm font-semibold ${
              activeTab === 'contact' ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => handleNavClick('faq')}
            className={`w-full text-left px-4 py-2.5 rounded-full text-sm font-semibold ${
              activeTab === 'faq' ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
            }`}
          >
            FAQ
          </button>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookTour();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 font-semibold text-sm shadow-sm"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Book a Tour</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
