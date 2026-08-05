import React from 'react';
import { DELIVERED_PROJECTS } from '../data/mockData';
import { CheckCircle2, MapPin, Calendar } from 'lucide-react';

export const DeliveredProjects: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-[#0F4C3A] uppercase bg-emerald-50 px-3 py-1 rounded-full">
              Proven Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Our Delivered Projects
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Over 22 landmark developments completed on-time in Addis Ababa with 100% legal title transfer guarantee.
          </p>
        </div>

        {/* Grid of delivered projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DELIVERED_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-emerald-800 text-amber-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-amber-400" />
                  <span>Delivered {proj.deliveredYear}</span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0F4C3A] transition-colors truncate">
                  {proj.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-[#0F4C3A]" />
                  <span>{proj.location}</span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 pt-1 border-t border-slate-200/80">
                  {proj.description}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-emerald-800">
                  <span>{proj.units} Units Completed</span>
                  <span className="text-[10px] bg-emerald-100 px-2 py-0.5 rounded font-bold">100% Sold Out</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
