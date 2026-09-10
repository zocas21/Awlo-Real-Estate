import React from 'react';
import { DELIVERED_PROJECTS } from '../data/mockData';
import { CheckCircle2, MapPin } from 'lucide-react';

export const DeliveredProjects: React.FC = () => {
  return (
    <section className="py-14 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <div>
            <span className="text-xs font-semibold tracking-wider text-[#0F4C3A] uppercase bg-slate-100 px-3 py-1 rounded-md">
              Track Record
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1.5">
              Delivered Projects
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Over 22 landmark developments completed on-time in Addis Ababa with full title transfers.
          </p>
        </div>

        {/* Grid of delivered projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DELIVERED_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 right-2.5 bg-[#0F4C3A] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-amber-400" />
                  <span>Delivered {proj.deliveredYear}</span>
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 truncate">
                    {proj.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0F4C3A]" />
                    <span>{proj.location}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 pt-2 mt-2 border-t border-slate-100">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-medium text-slate-700">
                  <span>{proj.units} Units Handed Over</span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">Sold Out</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
