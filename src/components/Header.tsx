import React, { useState } from 'react';
import { Calendar, Menu, X, ShieldCheck } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-[#0A1128] border-b border-slate-800/90 shadow-md">
      {/* Main Header bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 flex items-center justify-between bg-[#0A1128]">
        {/* Prominent Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl p-1 pr-3 sm:pr-5 transition-transform hover:opacity-95 active:scale-[0.99] group"
          aria-label="EthioBest Real Estate Home"
        >
          <img
            src="https://i.postimg.cc/6QRMkh9s/IMG-20260910-094745-843-modified.png"
            alt="EthioBest Real Estate"
            className="h-[65px] sm:h-[85px] md:h-[105px] lg:h-[120px] xl:h-[135px] w-auto max-w-[280px] sm:max-w-[360px] lg:max-w-[450px] object-contain bg-transparent select-none drop-shadow-xs"
            referrerPolicy="no-referrer"
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'home'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('projects')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            Projects
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'about'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'contact'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => handleNavClick('faq')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'faq'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            FAQ
          </button>
        </nav>

        {/* Right CTA Area: Solid blue rounded pill primary button */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={() => onOpenBookTour()}
            className="flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 text-sm font-semibold transition-all shadow-md shadow-blue-950/50 hover:shadow-blue-900/60"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>Book a Tour</span>
          </button>
        </div>

        {/* Mobile menu trigger button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onOpenBookTour()}
            className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Tour</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800/80 border border-slate-700/60 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A1128] border-t border-slate-800 px-4 pt-3 pb-6 space-y-1">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-4 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'home' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('projects')}
            className={`w-full text-left px-4 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'projects' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            Projects
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-left px-4 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'about' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`w-full text-left px-4 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'contact' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => handleNavClick('faq')}
            className={`w-full text-left px-4 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'faq' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            FAQ
          </button>

          <div className="pt-3 border-t border-slate-800/80">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookTour();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 font-semibold text-sm shadow-sm"
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
