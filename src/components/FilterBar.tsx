import React, { useState } from 'react';
import { Filter, RotateCcw, Search, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  resultsCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  onReset,
  resultsCount
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleChange = (field: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 mb-8">
      {/* Top Search & Primary Filters row */}
      <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, location, or keywords..."
            value={filters.search}
            onChange={handleTextChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800"
          />
        </div>

        {/* Quick Filter Selectors */}
        <div className="w-full lg:w-auto flex flex-wrap items-center gap-2.5">
          {/* Bedrooms Pills */}
          <div className="flex items-center bg-slate-100 p-1 rounded-full text-xs font-semibold">
            <span className="px-2 text-slate-500 font-medium">Beds:</span>
            {['any', '1+', '2+', '3+', '4+'].map(val => (
              <button
                key={val}
                type="button"
                onClick={() => handleChange('bedrooms', val)}
                className={`px-3 py-1 rounded-full transition-colors capitalize ${
                  filters.bedrooms === val
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {val}
              </button>
            ))}
          </div>

          {/* Status Selector */}
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-700"
          >
            <option value="any">Status: All</option>
            <option value="Ready">Ready for Move-In</option>
            <option value="Under Construction">Under Construction</option>
          </select>

          {/* Expand Filters Toggle Button */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
              expanded
                ? 'bg-blue-50 text-blue-600 border-blue-200'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
            <span>More Filters</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-slate-500 hover:text-red-600 text-xs font-semibold px-2.5 py-2 transition-colors"
            title="Reset all filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Expanded Advanced Filters */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-200">
          {/* Bathrooms */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Bathrooms</label>
            <select
              value={filters.bathrooms}
              onChange={(e) => handleChange('bathrooms', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="any">Any Bathrooms</option>
              <option value="1+">1+ Bathrooms</option>
              <option value="2+">2+ Bathrooms</option>
              <option value="3+">3+ Bathrooms</option>
              <option value="4+">4+ Bathrooms</option>
            </select>
          </div>

          {/* Min Price */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Min Price (ETB)</label>
            <select
              value={filters.minPrice}
              onChange={(e) => handleChange('minPrice', Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value={0}>No Minimum</option>
              <option value={10000000}>10 Million ETB</option>
              <option value={15000000}>15 Million ETB</option>
              <option value={20000000}>20 Million ETB</option>
              <option value={25000000}>25 Million ETB</option>
            </select>
          </div>

          {/* Max Price */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Max Price (ETB)</label>
            <select
              value={filters.maxPrice}
              onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value={50000000}>No Maximum (50M+ ETB)</option>
              <option value={15000000}>15 Million ETB</option>
              <option value={25000000}>25 Million ETB</option>
              <option value={35000000}>35 Million ETB</option>
              <option value={45000000}>45 Million ETB</option>
            </select>
          </div>

          {/* Neighborhood */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Neighborhood</label>
            <select
              value={filters.neighborhood}
              onChange={(e) => handleChange('neighborhood', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All Locations</option>
              <option value="Bole">Bole</option>
              <option value="CMC">CMC</option>
              <option value="Sarbet">Sarbet</option>
              <option value="Summit">Summit</option>
              <option value="Ayat">Ayat</option>
              <option value="Bole Arabsa">Bole Arabsa</option>
              <option value="Gerji">Gerji</option>
              <option value="Lebu">Lebu</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
