import React, { useState } from 'react';
import { Property } from '../types';
import {
  X,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  CheckCircle,
  Share2,
  Heart,
  Calendar,
  Layers,
  Building2,
  FileText,
  Shield,
  Phone,
  MessageCircle
} from 'lucide-react';
import { AWLO_CONTACT_INFO } from './SocialLinks';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onBookTour: (propertyTitle: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  allProperties: Property[];
  onSelectProperty: (property: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onBookTour,
  isFavorite,
  onToggleFavorite,
  allProperties,
  onSelectProperty
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
    .filter(p => p.id !== property.id && p.propertyType === property.propertyType)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-slate-200">

        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
              property.status === 'Ready'
                ? 'bg-blue-600 text-white'
                : 'bg-amber-400 text-slate-900'
            }`}>
              {property.status}
            </span>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              ID: ETHIOBEST-{property.id.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2 rounded-full border transition-colors ${
                isFavorite
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title="Save to Favorites"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: property.title,
                    text: property.detailedDescription,
                    url: window.location.href,
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
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
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                <span>EthioBest Luxury Portfolio</span>
                <span>•</span>
                <span>{property.tag}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {property.title}
              </h1>
              <div className="flex items-center gap-1.5 text-sm text-slate-600 mt-1">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{property.address}</span>
              </div>
            </div>

            <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-100 md:text-right">
              <span className="text-2xl sm:text-3xl font-black text-blue-600 block">
                {formattedETB}
              </span>
              <span className="text-xs font-bold text-slate-500">
                Estimated Price: ≈ {formattedUSD} USD
              </span>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-100 shadow-xs">
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
                        ? 'border-blue-600 ring-2 ring-blue-600/30 scale-105'
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
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-xs">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">Bedrooms</span>
                <span className="text-sm font-bold text-slate-900">{property.beds > 0 ? `${property.beds} Bedrooms` : 'Commercial Space'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-xs">
                <Bath className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">Bathrooms</span>
                <span className="text-sm font-bold text-slate-900">{property.baths} Baths</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-xs">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">Total Area</span>
                <span className="text-sm font-bold text-slate-900">{property.sqm} m² ({property.sqft} sq ft)</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-xs">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">Floor Position</span>
                <span className="text-sm font-bold text-slate-900">{property.floor}</span>
              </div>
            </div>
          </div>

          {/* Description & Booking Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>Property Overview & Highlights</span>
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  {property.detailedDescription}
                </p>
              </div>

              {/* Amenities List */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span>Building Amenities & Features</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs font-semibold text-slate-800">
                      <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Booking Sidebar Box */}
            <div className="space-y-6">
              <div className="bg-[#0A1128] p-6 rounded-3xl text-white shadow-md border border-slate-800 space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                    Interested in this Property?
                  </span>
                  <h3 className="text-xl font-extrabold">Schedule a Free Site Visit</h3>
                  <p className="text-xs text-slate-300">
                    Our sales advisor will meet you on-site at {property.neighborhood}.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onBookTour(property.title);
                    }}
                    className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-white" />
                    <span>Book a Site Tour</span>
                  </button>

                  <a
                    href={`tel:${AWLO_CONTACT_INFO.phoneClean}`}
                    className="w-full rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-2.5 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span>Call Sales: {AWLO_CONTACT_INFO.phone}</span>
                  </a>

                  <a
                    href={`https://wa.me/${AWLO_CONTACT_INFO.whatsappClean}?text=Hello%20EthioBest%20Real%20Estate,%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full rounded-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-blue-400" />
                    <span>Instant legal title verification upon request</span>
                  </div>
                  <p>Completion: <strong className="text-slate-200">{property.completionDate}</strong></p>
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
                    className="group bg-slate-50 hover:bg-blue-50/50 p-3.5 rounded-2xl border border-slate-200 cursor-pointer transition-all hover:border-blue-600"
                  >
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-2.5">
                      <img src={sim.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">{sim.title}</p>
                    <p className="text-xs font-extrabold text-blue-600 mt-0.5">
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
