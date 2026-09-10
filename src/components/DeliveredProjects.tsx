import React from 'react';
import { DELIVERED_PROJECTS } from '../data/mockData';
import { CheckCircle2, MapPin } from 'lucide-react';

export const DeliveredProjects: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="space-y-2">
            {/* Small rounded pill badge above section heading */}
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-600 border border-blue-100 shadow-xs">
              TRACK RECORD
            </span>

            {/* Large bold two-tone heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Delivered <span className="text-blue-600">Landmark Projects</span>
            </h2>
          </div>

          <p className="text-sm text-slate-500 max-w-md">
            Over 22 landmark developments completed on-time in Addis Ababa with full title deed transfers.
          </p>
        </div>

        {/* Grid of delivered projects: White rounded cards with soft shadows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DELIVERED_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>Delivered {proj.deliveredYear}</span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 truncate">
                    {proj.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{proj.location}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 pt-2 mt-2 border-t border-slate-100">
                    {proj.description}
                  </p>
                </div>
              </div>

              {/* Thin divider line at the bottom of each card */}
              <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>{proj.units} Units Handed Over</span>
                <span className="text-[11px] bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-bold">
                  100% Sold Out
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
