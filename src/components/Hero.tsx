import React from 'react';
import { Search, MapPin, Building, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';
import { FilterState } from '../types';

interface HeroProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onSearchSubmit: () => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  filters,
  setFilters,
  onSearchSubmit,
  onExploreProjects
}) => {
  const handleInputChange = (field: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <div className="relative bg-[#0F4C3A] text-white overflow-hidden py-16 lg:py-24">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80"
          alt="Addis Ababa Luxury Real Estate"
          className="w-full h-full object-cover object-center opacity-25 scale-105 transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F4C3A]/95 via-[#0F4C3A]/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C3A] via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>Find Your Place in Addis Ababa</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Premium Luxury <span className="text-amber-400">Properties</span> in Addis Ababa
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-emerald-100/90 font-normal leading-relaxed max-w-2xl">
            Explore ready-to-move-in apartments and high-yield commercial hubs across Bole, Sarbet, CMC, Summit, and Ayat with complete legal title deeds.
          </p>

          {/* Key Trust Highlights */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-emerald-100/80 pt-1">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Full Legal Ownership Documents</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>20% Milestone Payment Plans</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>24/7 Backup Power & Water</span>
            </div>
          </div>
        </div>

        {/* Hero Search Box Card */}
        <div className="mt-10 bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-2xl border border-white/20 text-slate-800">
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Location Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#0F4C3A]" />
                Neighborhood
              </label>
              <select
                value={filters.neighborhood}
                onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-800"
              >
                <option value="all">All Addis Ababa Locations</option>
                <option value="Bole">Bole (Atlas & Airport)</option>
                <option value="CMC">CMC (Michael Church)</option>
                <option value="Sarbet">Sarbet (AU & Old Airport)</option>
                <option value="Summit">Summit (Pepsi & Safari)</option>
                <option value="Ayat">Ayat (Light Rail)</option>
                <option value="Bole Arabsa">Bole Arabsa</option>
                <option value="Gerji">Gerji (Imperial & Jackros)</option>
                <option value="Lebu">Lebu (Varnero & Music Sefer)</option>
              </select>
            </div>

            {/* Property Type Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-[#0F4C3A]" />
                Property Type
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-800"
              >
                <option value="all">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Commercial">Commercial / Office</option>
                <option value="Mixed-use">Mixed-use Duplex</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-[#0F4C3A]" />
                Max Price (ETB)
              </label>
              <select
                value={filters.maxPrice}
                onChange={(e) => handleInputChange('maxPrice', Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-800"
              >
                <option value={50000000}>Any Price</option>
                <option value={15000000}>Under ETB 15 Million</option>
                <option value={20000000}>Under ETB 20 Million</option>
                <option value={30000000}>Under ETB 30 Million</option>
                <option value={40000000}>Under ETB 40 Million</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-2 sm:pt-0">
              <button
                type="submit"
                className="w-full bg-[#0F4C3A] hover:bg-[#0c3d2e] text-white py-3 px-6 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>Search Properties</span>
              </button>
            </div>
          </form>

          {/* Quick Filter Tags */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500">Popular Searches:</span>
            <button
              onClick={() => {
                handleInputChange('neighborhood', 'Bole');
                onSearchSubmit();
              }}
              className="bg-emerald-50 text-[#0F4C3A] hover:bg-emerald-100 px-2.5 py-1 rounded-full font-medium transition-colors"
            >
              Bole Apartments
            </button>
            <button
              onClick={() => {
                handleInputChange('status', 'Ready');
                onSearchSubmit();
              }}
              className="bg-emerald-50 text-[#0F4C3A] hover:bg-emerald-100 px-2.5 py-1 rounded-full font-medium transition-colors"
            >
              Ready for Move-in
            </button>
            <button
              onClick={() => {
                handleInputChange('propertyType', 'Commercial');
                onSearchSubmit();
              }}
              className="bg-emerald-50 text-[#0F4C3A] hover:bg-emerald-100 px-2.5 py-1 rounded-full font-medium transition-colors"
            >
              Commercial Showrooms
            </button>
            <button
              onClick={onExploreProjects}
              className="ml-auto text-[#0F4C3A] hover:text-amber-600 font-semibold flex items-center gap-1 group"
            >
              <span>View All 8 Listings</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
