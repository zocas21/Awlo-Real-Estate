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
    <div className="relative bg-[#0F4C3A] text-white py-14 lg:py-20 border-b border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-5">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 bg-emerald-900 text-amber-300 px-3 py-1 rounded-md text-xs font-semibold tracking-wide border border-emerald-800">
            <span>Find Your Place in Addis Ababa</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-white">
            Premium Properties in Addis Ababa
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-emerald-100/90 font-normal leading-relaxed max-w-2xl">
            Discover verified apartments, luxury penthouses, and prime commercial hubs in Bole, CMC, Sarbet, Summit, and Ayat with 100% legal title deeds.
          </p>

          {/* Key Trust Highlights */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-emerald-100/80 pt-1">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Full Legal Title Deeds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Milestone Payment Plans</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Bole Office Tour Pick-up</span>
            </div>
          </div>
        </div>

        {/* Flat Hero Search Box */}
        <div className="mt-8 bg-white p-5 sm:p-6 rounded-xl border border-slate-200 text-slate-800">
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Location Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#0F4C3A]" />
                Neighborhood
              </label>
              <select
                value={filters.neighborhood}
                onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-800"
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
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-[#0F4C3A]" />
                Property Type
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-800"
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
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-[#0F4C3A]" />
                Max Price (ETB)
              </label>
              <select
                value={filters.maxPrice}
                onChange={(e) => handleInputChange('maxPrice', Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-800"
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
                className="w-full bg-[#0F4C3A] hover:bg-[#0c3d2e] text-white py-2.5 px-5 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>Search Properties</span>
              </button>
            </div>
          </form>

          {/* Quick Filter Tags */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500">Popular:</span>
            <button
              onClick={() => {
                handleInputChange('neighborhood', 'Bole');
                onSearchSubmit();
              }}
              className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-2.5 py-1 rounded font-medium transition-colors"
            >
              Bole Apartments
            </button>
            <button
              onClick={() => {
                handleInputChange('status', 'Ready');
                onSearchSubmit();
              }}
              className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-2.5 py-1 rounded font-medium transition-colors"
            >
              Ready for Move-in
            </button>
            <button
              onClick={() => {
                handleInputChange('propertyType', 'Commercial');
                onSearchSubmit();
              }}
              className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-2.5 py-1 rounded font-medium transition-colors"
            >
              Commercial Units
            </button>
            <button
              onClick={onExploreProjects}
              className="ml-auto text-[#0F4C3A] hover:underline font-semibold flex items-center gap-1"
            >
              <span>View All 8 Listings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
