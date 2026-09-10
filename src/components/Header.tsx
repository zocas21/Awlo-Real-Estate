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
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      {/* Top micro bar for quick contact info and social links */}
      <div className="bg-[#0F4C3A] text-white py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Location & Hours */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-emerald-100 text-[11px] sm:text-xs">
            <span className="font-medium">
              Bole Sub-city, Next to Kenenisa Hotel, Addis Ababa
            </span>
            <span className="hidden lg:inline text-emerald-400/60">•</span>
            <span className="hidden lg:inline">Mon–Sat 09:30–20:00, Sun 14:00–20:00</span>
          </div>

          {/* Quick Contact & Social Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={`tel:${AWLO_CONTACT_INFO.phoneClean}`}
              className="flex items-center gap-1.5 font-medium text-emerald-100 hover:text-amber-300 transition-colors"
              title="Call Awlo Real Estate"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{AWLO_CONTACT_INFO.phone}</span>
            </a>

            <div className="h-3 w-px bg-emerald-700/80 hidden sm:block"></div>

            {/* Social quick links: Facebook, WhatsApp, Telegram, SMS, Maps/Waze */}
            <div className="flex items-center gap-1">
              <SocialLinks variant="header" />
            </div>

            {onOpenLeads && (
              <button
                onClick={onOpenLeads}
                className="flex items-center gap-1 bg-emerald-800/80 hover:bg-emerald-800 text-amber-300 px-2 py-0.5 rounded text-[11px] border border-emerald-700 transition-colors ml-1"
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
        {/* Logo (Exact user image URL, transparent background, ~40-50px height) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A] rounded-lg p-0.5"
          aria-label="Awlo Real Estate Home"
        >
          <img
            src="https://i.postimg.cc/N0S4FWJj/IMG-20260910-094745-843-removebg-preview.png"
            alt="Awlo Real Estate"
            className="h-10 sm:h-12 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'home'
                ? 'bg-slate-100 text-[#0F4C3A] font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('projects')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'projects'
                ? 'bg-slate-100 text-[#0F4C3A] font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Projects
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'about'
                ? 'bg-slate-100 text-[#0F4C3A] font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'contact'
                ? 'bg-slate-100 text-[#0F4C3A] font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => handleNavClick('faq')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'faq'
                ? 'bg-slate-100 text-[#0F4C3A] font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            FAQ
          </button>
        </nav>

        {/* Right CTA Area */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={() => onOpenBookTour()}
            className="flex items-center gap-2 bg-[#0F4C3A] hover:bg-[#0c3d2e] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Book a Tour</span>
          </button>
        </div>

        {/* Mobile menu trigger button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onOpenBookTour()}
            className="bg-[#0F4C3A] text-white px-3 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
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
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
              activeTab === 'home' ? 'bg-slate-100 text-[#0F4C3A] font-semibold' : 'text-slate-700'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('projects')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
              activeTab === 'projects' ? 'bg-slate-100 text-[#0F4C3A] font-semibold' : 'text-slate-700'
            }`}
          >
            Projects
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
              activeTab === 'about' ? 'bg-slate-100 text-[#0F4C3A] font-semibold' : 'text-slate-700'
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
              activeTab === 'contact' ? 'bg-slate-100 text-[#0F4C3A] font-semibold' : 'text-slate-700'
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => handleNavClick('faq')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
              activeTab === 'faq' ? 'bg-slate-100 text-[#0F4C3A] font-semibold' : 'text-slate-700'
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
              className="w-full flex items-center justify-center gap-2 bg-[#0F4C3A] text-white py-2.5 rounded-lg font-semibold text-sm"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Book a Tour</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
