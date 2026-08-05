import React, { useState } from 'react';
import { Building2, Phone, MessageCircle, Calendar, Menu, X, ShieldCheck } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 shadow-sm transition-all">
      {/* Top micro bar for quick contact info */}
      <div className="bg-[#0F4C3A] text-white py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1 font-medium text-emerald-100">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Addis Ababa, Ethiopia • Bole Road Office
            </span>
            <span className="hidden md:inline text-emerald-300">|</span>
            <span className="hidden md:inline text-emerald-100">Mon - Sat: 8:30 AM - 6:00 PM</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="tel:+251911234567"
              className="flex items-center gap-1 text-emerald-100 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+251 91 123 4567</span>
            </a>
            <a
              href="https://wa.me/251911234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-100 hover:text-amber-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            {onOpenLeads && (
              <button
                onClick={onOpenLeads}
                className="flex items-center gap-1 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 px-2 py-0.5 rounded text-[11px] transition-colors"
              >
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>Leads ({leadsCount})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Header bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0F4C3A] flex items-center justify-center text-amber-400 shadow-md group-hover:bg-[#0c3d2e] transition-colors">
            <Building2 className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-extrabold tracking-tight text-[#0F4C3A]">AWLO</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            </div>
            <p className="text-[10px] font-semibold tracking-widest text-amber-700 uppercase -mt-1">
              Real Estate
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'home'
                ? 'bg-emerald-50 text-[#0F4C3A] font-semibold'
                : 'text-slate-600 hover:text-[#0F4C3A] hover:bg-slate-50'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('projects')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'projects'
                ? 'bg-emerald-50 text-[#0F4C3A] font-semibold'
                : 'text-slate-600 hover:text-[#0F4C3A] hover:bg-slate-50'
            }`}
          >
            Projects
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'about'
                ? 'bg-emerald-50 text-[#0F4C3A] font-semibold'
                : 'text-slate-600 hover:text-[#0F4C3A] hover:bg-slate-50'
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'contact'
                ? 'bg-emerald-50 text-[#0F4C3A] font-semibold'
                : 'text-slate-600 hover:text-[#0F4C3A] hover:bg-slate-50'
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => handleNavClick('faq')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'faq'
                ? 'bg-emerald-50 text-[#0F4C3A] font-semibold'
                : 'text-slate-600 hover:text-[#0F4C3A] hover:bg-slate-50'
            }`}
          >
            FAQ
          </button>
        </nav>

        {/* Right CTA Area */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={() => onOpenBookTour()}
            className="flex items-center gap-2 bg-[#0F4C3A] hover:bg-[#0c3d2e] text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Book a Tour</span>
          </button>
        </div>

        {/* Mobile menu trigger button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onOpenBookTour()}
            className="bg-[#0F4C3A] text-amber-300 p-2 rounded-lg text-xs font-medium flex items-center gap-1"
          >
            <Calendar className="w-4 h-4" />
            <span className="sr-only sm:not-sr-only">Book</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium ${
              activeTab === 'home' ? 'bg-emerald-50 text-[#0F4C3A] font-semibold' : 'text-slate-700'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('projects')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium ${
              activeTab === 'projects' ? 'bg-emerald-50 text-[#0F4C3A] font-semibold' : 'text-slate-700'
            }`}
          >
            Projects & Listings
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium ${
              activeTab === 'about' ? 'bg-emerald-50 text-[#0F4C3A] font-semibold' : 'text-slate-700'
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium ${
              activeTab === 'contact' ? 'bg-emerald-50 text-[#0F4C3A] font-semibold' : 'text-slate-700'
            }`}
          >
            Contact Us
          </button>

          <button
            onClick={() => handleNavClick('faq')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium ${
              activeTab === 'faq' ? 'bg-emerald-50 text-[#0F4C3A] font-semibold' : 'text-slate-700'
            }`}
          >
            FAQ
          </button>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookTour();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#0F4C3A] text-white py-3 rounded-xl font-semibold text-sm shadow-md"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Book a Site Visit</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
