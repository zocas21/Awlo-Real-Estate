import React from 'react';
import { Search, MapPin, Building, DollarSign, Calendar, ArrowRight, Sparkles, Check, Home, Layers } from 'lucide-react';
import { FilterState } from '../types';

interface HeroProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onSearchSubmit: () => void;
  onExploreProjects: () => void;
  onBookTour?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  filters,
  setFilters,
  onSearchSubmit,
  onExploreProjects,
  onBookTour
}) => {
  const handleInputChange = (field: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <section className="relative bg-[#0A1128] text-white py-16 sm:py-24 border-b border-slate-900 overflow-hidden">
      {/* Subtle grid/dot pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern-dark pointer-events-none opacity-90" />

      {/* Subtle blue accent glow behind hero content */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Header Block */}
        <div className="max-w-3xl space-y-6">
          
          {/* Small rounded pill badge above section headline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-950/80 text-blue-400 border border-blue-800/60 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>PREMIER REAL ESTATE IN ADDIS ABABA</span>
          </div>

          {/* Bold white headline text with ONE word highlighted in blue */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
            Find Your Dream <span className="text-blue-500">Property</span> in Addis Ababa
          </h1>

          {/* Light gray subtext */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            Discover verified luxury apartments, penthouses, and commercial developments across Bole, CMC, Sarbet, Summit, and Ayat with guaranteed 100% legal title deeds.
          </p>

          {/* Rounded pill-shaped filter tags/badges with icons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                handleInputChange('neighborhood', 'Bole');
                onSearchSubmit();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-medium transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Bole</span>
            </button>

            <button
              type="button"
              onClick={() => {
                handleInputChange('neighborhood', 'CMC');
                onSearchSubmit();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-medium transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>CMC</span>
            </button>

            <button
              type="button"
              onClick={() => {
                handleInputChange('neighborhood', 'Sarbet');
                onSearchSubmit();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-medium transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Sarbet</span>
            </button>

            <button
              type="button"
              onClick={() => {
                handleInputChange('propertyType', 'Apartment');
                onSearchSubmit();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-medium transition-all"
            >
              <Home className="w-3.5 h-3.5 text-blue-400" />
              <span>Apartments</span>
            </button>

            <button
              type="button"
              onClick={() => {
                handleInputChange('propertyType', 'Commercial');
                onSearchSubmit();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-medium transition-all"
            >
              <Building className="w-3.5 h-3.5 text-blue-400" />
              <span>Commercial</span>
            </button>

            <button
              type="button"
              onClick={() => {
                handleInputChange('status', 'Ready');
                onSearchSubmit();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-amber-300 border border-slate-700/80 text-xs font-medium transition-all"
            >
              <Check className="w-3.5 h-3.5 text-amber-400" />
              <span>Ready for Move-In</span>
            </button>
          </div>

          {/* Action Buttons: Solid blue rounded pill primary button + outline rounded pill secondary button */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onExploreProjects}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 shadow-sm transition-all flex items-center gap-2"
            >
              <span>Explore Available Listings</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onBookTour}
              className="rounded-full border border-slate-600 hover:border-blue-400 text-slate-200 hover:text-white hover:bg-slate-800/60 font-semibold text-sm px-6 py-3 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Book VIP Site Tour</span>
            </button>
          </div>
        </div>

        {/* Clean Hero Search Card: White rounded card with soft shadows */}
        <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/90 shadow-md text-slate-900 max-w-5xl">
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            
            {/* Location Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Neighborhood</span>
              </label>
              <select
                value={filters.neighborhood}
                onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 transition-colors"
              >
                <option value="all">All Addis Ababa Locations</option>
                <option value="Bole">Bole (Atlas & Medhanialem)</option>
                <option value="CMC">CMC (Michael Church)</option>
                <option value="Sarbet">Sarbet (AU & Old Airport)</option>
                <option value="Summit">Summit (Pepsi & Safari)</option>
                <option value="Ayat">Ayat (Light Rail)</option>
                <option value="Bole Arabsa">Bole Arabsa</option>
                <option value="Gerji">Gerji (Imperial)</option>
                <option value="Lebu">Lebu</option>
              </select>
            </div>

            {/* Property Type Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                <span>Property Type</span>
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 transition-colors"
              >
                <option value="all">All Property Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Commercial">Commercial / Office</option>
                <option value="Mixed-use">Mixed-use Duplex</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                <span>Max Budget (ETB)</span>
              </label>
              <select
                value={filters.maxPrice}
                onChange={(e) => handleInputChange('maxPrice', Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 transition-colors"
              >
                <option value={50000000}>Any Budget</option>
                <option value={15000000}>Under ETB 15 Million</option>
                <option value={20000000}>Under ETB 20 Million</option>
                <option value={30000000}>Under ETB 30 Million</option>
                <option value={40000000}>Under ETB 40 Million</option>
              </select>
            </div>

            {/* Primary Search Action Button: Solid Blue Rounded Pill */}
            <div className="pt-2 sm:pt-0">
              <button
                type="submit"
                className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Search Properties</span>
              </button>
            </div>
          </form>

          {/* Thin divider line at the bottom of the card */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Quick Picks:</span>
              <button
                type="button"
                onClick={() => {
                  handleInputChange('neighborhood', 'Bole');
                  onSearchSubmit();
                }}
                className="hover:text-blue-600 hover:underline"
              >
                Bole Luxury
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  handleInputChange('propertyType', 'Penthouse');
                  onSearchSubmit();
                }}
                className="hover:text-blue-600 hover:underline"
              >
                Penthouses
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  handleInputChange('status', 'Ready');
                  onSearchSubmit();
                }}
                className="hover:text-blue-600 hover:underline"
              >
                Immediate Handover
              </button>
            </div>

            <button
              type="button"
              onClick={onExploreProjects}
              className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
            >
              <span>View all 8 projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
