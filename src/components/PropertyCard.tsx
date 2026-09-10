import React, { useState } from 'react';
import { Property } from '../types';
import { Bed, Bath, Maximize2, MapPin, ChevronLeft, ChevronRight, Heart, Calendar, ArrowUpRight, Building } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onBookTour: (propertyTitle: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (propertyId: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  onBookTour,
  isFavorite = false,
  onToggleFavorite
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  // Format Ethiopian Birr currency
  const formattedETB = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ETB',
    maximumFractionDigits: 0
  }).format(property.priceETB).replace('ETB', 'ETB ');

  const formattedUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(property.priceUSD);

  return (
    <div className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex flex-col overflow-hidden">
      {/* Image Container with Slider */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => onSelect(property)}
        />

        {/* Status Tag (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
            property.status === 'Ready'
              ? 'bg-[#0F4C3A] text-white'
              : 'bg-amber-400 text-slate-900'
          }`}>
            {property.status}
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-900/80 text-white">
            {property.tag}
          </span>
        </div>

        {/* Favorite Heart Button (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleFavorite) onToggleFavorite(property.id);
          }}
          className={`absolute top-3 right-3 p-1.5 rounded-md transition-colors z-10 ${
            isFavorite
              ? 'bg-red-500 text-white'
              : 'bg-white/90 hover:bg-white text-slate-700 hover:text-red-500'
          }`}
          aria-label="Save Property"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Carousel Prev/Next Controls */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-md bg-white/80 hover:bg-white text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md bg-white/80 hover:bg-white text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center space-x-1 z-10">
              {property.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full ${
                    idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Price Header */}
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-lg font-bold text-[#0F4C3A]">
                {formattedETB}
              </span>
              <span className="text-xs text-slate-500 ml-1.5">
                ≈ {formattedUSD} USD
              </span>
            </div>
            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              {property.propertyType}
            </span>
          </div>

          {/* Title & Neighborhood */}
          <div>
            <h3
              onClick={() => onSelect(property)}
              className="text-base font-bold text-slate-900 hover:text-[#0F4C3A] transition-colors cursor-pointer line-clamp-1"
            >
              {property.title}
            </h3>
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#0F4C3A] shrink-0" />
              <span className="truncate">{property.address}</span>
            </div>
          </div>

          {/* Key Specs Bar */}
          <div className="grid grid-cols-3 gap-2 py-2 px-2.5 bg-slate-50 rounded-lg text-slate-700 text-xs font-medium border border-slate-100">
            {property.beds > 0 ? (
              <div className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-[#0F4C3A]" />
                <span>{property.beds} Beds</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-amber-800 font-medium">
                <Building className="w-3.5 h-3.5 text-amber-700" />
                <span>Office</span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-[#0F4C3A]" />
              <span>{property.baths} Baths</span>
            </div>

            <div className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-[#0F4C3A]" />
              <span>{property.sqm} m²</span>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            onClick={() => onBookTour(property.title)}
            className="flex items-center gap-1 text-xs font-semibold text-[#0F4C3A] hover:text-[#0c3d2e] hover:bg-slate-50 px-2 py-1.5 rounded transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>Book Tour</span>
          </button>

          <button
            onClick={() => onSelect(property)}
            className="flex items-center gap-1 bg-[#0F4C3A] hover:bg-[#0c3d2e] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
