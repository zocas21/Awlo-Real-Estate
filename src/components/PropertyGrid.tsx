import React, { useState, useMemo } from 'react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';
import { ArrowUpDown, Building, Sparkles } from 'lucide-react';

interface PropertyGridProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onBookTour: (propertyTitle: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onResetFilters: () => void;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  onSelectProperty,
  onBookTour,
  favorites,
  onToggleFavorite,
  onResetFilters
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'sqft-desc'>('featured');
  const [displayCount, setDisplayCount] = useState(6);

  const sortedProperties = useMemo(() => {
    const list = [...properties];
    if (sortBy === 'price-asc') {
      return list.sort((a, b) => a.priceETB - b.priceETB);
    }
    if (sortBy === 'price-desc') {
      return list.sort((a, b) => b.priceETB - a.priceETB);
    }
    if (sortBy === 'sqft-desc') {
      return list.sort((a, b) => b.sqft - a.sqft);
    }
    return list;
  }, [properties, sortBy]);

  const visibleProperties = sortedProperties.slice(0, displayCount);

  return (
    <div className="space-y-6">
      {/* Grid Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span>Our Latest Properties</span>
            <span className="bg-emerald-100 text-[#0F4C3A] text-xs font-extrabold px-2.5 py-0.5 rounded-full">
              {properties.length} Available
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Handcrafted luxury homes and commercial spaces in prime Addis Ababa locations.
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#0F4C3A]" />
          <span>Sort By:</span>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="bg-transparent font-bold text-[#0F4C3A] focus:outline-none"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="sqft-desc">Size: Largest First</option>
          </select>
        </div>
      </div>

      {/* Grid Content */}
      {visibleProperties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {visibleProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={onSelectProperty}
                onBookTour={onBookTour}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>

          {/* Load More Button */}
          {displayCount < sortedProperties.length && (
            <div className="text-center pt-8">
              <button
                onClick={() => setDisplayCount((prev) => prev + 6)}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0F4C3A] border border-[#0F4C3A]/30 font-bold px-8 py-3 rounded-xl text-sm shadow-sm transition-all hover:border-[#0F4C3A]"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Load More Properties ({sortedProperties.length - displayCount} remaining)</span>
              </button>
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="bg-slate-50 rounded-2xl p-12 text-center border-2 border-dashed border-slate-200 my-8">
          <div className="w-16 h-16 bg-emerald-100 text-[#0F4C3A] rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No matching properties found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
            We couldn't find any listings matching your specific criteria. Try resetting your search filters or ask our AI Assistant "Awlo".
          </p>
          <button
            onClick={onResetFilters}
            className="bg-[#0F4C3A] text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:bg-[#0c3d2e] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
