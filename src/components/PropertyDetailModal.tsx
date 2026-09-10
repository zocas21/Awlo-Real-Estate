import React, { useState, useEffect } from 'react';
import { Property } from '../types';
import {
  X, Bed, Bath, Maximize2, MapPin, Calendar, Phone, MessageCircle,
  CheckCircle, Building2, Shield, Share2, Heart, ChevronRight, Layers, FileText
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onBookTour: (propertyTitle: string) => void;
  allProperties: Property[];
  onSelectProperty: (property: Property) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onBookTour,
  allProperties,
  onSelectProperty,
  isFavorite = false,
  onToggleFavorite
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [property]);

  if (!property) return null;

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

  const similarProperties = allProperties
    .filter(p => p.id !== property.id && (p.neighborhood === property.neighborhood || p.propertyType === property.propertyType))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto border border-slate-100">

        {/* Modal Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#0F4C3A] text-amber-300 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              {property.status}
            </span>
            <span className="text-slate-500 text-xs font-semibold hidden sm:inline">
              • {property.neighborhood}, Addis Ababa
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {onToggleFavorite && (
              <button
                onClick={() => onToggleFavorite(property.id)}
                className={`p-2 rounded-full border transition-colors ${
                  isFavorite
                    ? 'bg-red-50 text-red-500 border-red-200'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                }`}
                aria-label="Favorite"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            )}

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: property.title,
                    text: property.description,
                    url: window.location.href
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Property link copied to clipboard!');
                }
              }}
              className="p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors"
              title="Share Property"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          {/* Main Title & Price Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F4C3A] uppercase tracking-wider mb-1">
                <span>Awlo Luxury Portfolio</span>
                <span>•</span>
                <span>{property.tag}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {property.title}
              </h1>
              <div className="flex items-center gap-1.5 text-sm text-slate-600 mt-1">
                <MapPin className="w-4 h-4 text-[#0F4C3A]" />
                <span>{property.address}</span>
              </div>
            </div>

            <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-100 md:text-right">
              <span className="text-2xl sm:text-3xl font-black text-[#0F4C3A] block">
                {formattedETB}
              </span>
              <span className="text-xs font-bold text-slate-500">
                Estimated Price: ≈ {formattedUSD} USD
              </span>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-100 shadow-md">
              <img
                src={property.images[selectedImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-[#0F4C3A] ring-2 ring-[#0F4C3A]/30 scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Specs Overview Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0F4C3A] shadow-xs">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">Bedrooms</span>
                <span className="text-sm font-bold text-slate-900">{property.beds > 0 ? `${property.beds} Bedrooms` : 'Commercial Space'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0F4C3A] shadow-xs">
                <Bath className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">Bathrooms</span>
                <span className="text-sm font-bold text-slate-900">{property.baths} Baths</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0F4C3A] shadow-xs">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">Total Area</span>
                <span className="text-sm font-bold text-slate-900">{property.sqm} m² ({property.sqft} sq ft)</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0F4C3A] shadow-xs">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">Floor Position</span>
                <span className="text-sm font-bold text-slate-900">{property.floor}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#0F4C3A]" />
                  <span>Property Overview & Highlights</span>
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  {property.detailedDescription}
                </p>
              </div>

              {/* Amenities List */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#0F4C3A]" />
                  <span>Building Amenities & Features</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs font-semibold text-slate-800">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Representation */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#0F4C3A]" />
                  <span>Location Map & Neighborhood Context</span>
                </h3>
                <div className="relative h-56 rounded-2xl overflow-hidden bg-emerald-950/90 border border-slate-200 p-6 text-white flex flex-col justify-between shadow-inner">
                  <div className="absolute inset-0 bg-[radial-gradient(#d4a857_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-extrabold text-sm">{property.title}</p>
                        <p className="text-xs text-amber-300 font-medium">{property.address}</p>
                      </div>
                    </div>
                    <span className="text-[11px] bg-white/20 px-3 py-1 rounded-full font-semibold">
                      GPS: {property.mapCoordinates.lat.toFixed(4)}, {property.mapCoordinates.lng.toFixed(4)}
                    </span>
                  </div>

                  <div className="relative z-10 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 text-xs text-emerald-100">
                    <p className="font-semibold text-amber-300">Neighborhood Highlights:</p>
                    <p className="text-[11px] mt-0.5">
                      Situated in central {property.neighborhood} with rapid access to shopping centers, international schools, banking hubs, and major ring roads.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Booking Sidebar Box */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#0F4C3A] to-[#0c3d2e] p-6 rounded-3xl text-white shadow-xl space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    Interested in this Property?
                  </span>
                  <h3 className="text-xl font-extrabold">Schedule a Free VIP Site Visit</h3>
                  <p className="text-xs text-emerald-100">
                    Our sales advisor will pick you up or meet you on-site at {property.neighborhood}.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onBookTour(property.title);
                    }}
                    className="w-full bg-amber-400 hover:bg-amber-300 text-slate-900 py-3 rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Calendar className="w-4 h-4 text-slate-900" />
                    <span>Book a Site Tour</span>
                  </button>

                  <a
                    href="tel:+251929419130"
                    className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-2.5 rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>Call Sales: +251 92 941 9130</span>
                  </a>

                  <a
                    href={`https://wa.me/251929419130?text=Hello%20Awlo%20Real%20Estate,%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-700 hover:bg-emerald-600 text-white py-2.5 rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-300" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] text-emerald-200 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    <span>Instant legal title verification upon request</span>
                  </div>
                  <p>Completion: <strong className="text-amber-300">{property.completionDate}</strong></p>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div className="pt-8 border-t border-slate-200 space-y-4">
              <h3 className="text-xl font-extrabold text-slate-900">Similar Properties You May Like</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarProperties.map(sim => (
                  <div
                    key={sim.id}
                    onClick={() => onSelectProperty(sim)}
                    className="group bg-slate-50 hover:bg-emerald-50/50 p-3.5 rounded-2xl border border-slate-200 cursor-pointer transition-all hover:border-[#0F4C3A]"
                  >
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-2.5">
                      <img src={sim.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-[#0F4C3A] truncate">{sim.title}</p>
                    <p className="text-xs font-extrabold text-[#0F4C3A] mt-0.5">
                      ETB {(sim.priceETB / 1000000).toFixed(1)}M
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
