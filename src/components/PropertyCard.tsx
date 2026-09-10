import React, { useState } from 'react';
import { Property } from '../types';
import { Bed, Bath, Maximize2, MapPin, ChevronLeft, ChevronRight, Heart, Calendar, ArrowRight, Building } from 'lucide-react';

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
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-200 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden">
      {/* Image Container with Slider */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
          onClick={() => onSelect(property)}
        />

        {/* Status Tag (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-xs ${
            property.status === 'Ready'
              ? 'bg-blue-600 text-white'
              : 'bg-amber-400 text-slate-900'
          }`}>
            {property.status}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#0A1128]/85 text-white backdrop-blur-xs">
            {property.tag}
          </span>
        </div>

        {/* Favorite Heart Button (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleFavorite) onToggleFavorite(property.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors z-10 shadow-xs ${
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
              className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-xs"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-xs"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center space-x-1 z-10">
              {property.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Price Header */}
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-lg sm:text-xl font-extrabold text-blue-600">
                {formattedETB}
              </span>
              <span className="text-xs text-slate-500 ml-1.5">
                ≈ {formattedUSD}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
              {property.propertyType}
            </span>
          </div>

          {/* Title & Neighborhood */}
          <div>
            <h3
              onClick={() => onSelect(property)}
              className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
            >
              {property.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">{property.address}</span>
            </div>
          </div>

          {/* Key Specs Bar */}
          <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 rounded-xl text-slate-700 text-xs font-medium border border-slate-100">
            {property.beds > 0 ? (
              <div className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{property.beds} Beds</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-amber-800 font-medium">
                <Building className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Office</span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{property.baths} Baths</span>
            </div>

            <div className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{property.sqm} m²</span>
            </div>
          </div>
        </div>

        {/* Thin divider line at the bottom of each card & Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Outline rounded pill secondary button */}
          <button
            type="button"
            onClick={() => onBookTour(property.title)}
            className="flex items-center gap-1.5 text-xs font-semibold rounded-full border border-slate-300 hover:border-blue-600 hover:bg-blue-50 text-slate-700 hover:text-blue-600 px-3.5 py-2 transition-all"
          >
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>Tour</span>
          </button>

          {/* Solid blue rounded pill primary button */}
          <button
            type="button"
            onClick={() => onSelect(property)}
            className="flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold transition-all shadow-xs"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
