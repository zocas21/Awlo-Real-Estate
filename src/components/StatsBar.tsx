import React from 'react';
import { Users, Award, Briefcase, Building } from 'lucide-react';
import { COMPANY_STATS } from '../data/mockData';

export const StatsBar: React.FC = () => {
  const icons = [Users, Award, Briefcase, Building];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {COMPANY_STATS.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            const isCream = idx % 2 === 1;
            const iconBg = isCream
              ? 'bg-amber-50 text-amber-600 border border-amber-200/60'
              : 'bg-blue-50 text-blue-600 border border-blue-200/60';

            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-3">
                  {/* Icon in small rounded square */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Bold number heading with two-tone */}
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                    <span>{stat.count.toLocaleString()}</span>
                    <span className="text-blue-600">{stat.suffix}</span>
                  </div>

                  {/* Gray description text */}
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>

                {/* Thin divider line at the bottom */}
                <div className="pt-3 border-t border-slate-100 text-[11px] font-medium text-slate-400">
                  Documented Milestones
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
