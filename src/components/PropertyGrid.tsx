import React, { useState, useMemo } from 'react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';
import { ArrowUpDown, Building, Sparkles, RotateCcw } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2 border-b border-slate-200">
        <div className="space-y-2">
          {/* Small rounded pill badge above section heading */}
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-600 border border-blue-100 shadow-xs">
            FEATURED PROPERTIES
          </span>

          {/* Large bold two-tone heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <span>Our Latest</span>
            <span className="text-blue-600">Properties</span>
            <span className="bg-blue-100 text-blue-700 text-xs font-extrabold px-3 py-1 rounded-full">
              {properties.length} Available
            </span>
          </h2>

          <p className="text-sm text-slate-500">
            Handcrafted luxury homes and commercial spaces in prime Addis Ababa locations.
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3.5 py-2 rounded-full shadow-xs">
          <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" />
          <span>Sort By:</span>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="bg-transparent font-bold text-blue-600 focus:outline-none cursor-pointer"
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

          {/* Pagination / Load More: Solid blue rounded pill button */}
          {displayCount < sortedProperties.length && (
            <div className="text-center pt-8">
              <button
                type="button"
                onClick={() => setDisplayCount(prev => prev + 3)}
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-sm font-semibold transition-all shadow-sm"
              >
                Load More Properties ({sortedProperties.length - displayCount} remaining)
              </button>
            </div>
          )}
        </>
      ) : (
        /* Empty State with reset button */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Building className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">No properties matched your criteria</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your price range, bedroom count, or neighborhood filters.
            </p>
          </div>
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-2 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};
