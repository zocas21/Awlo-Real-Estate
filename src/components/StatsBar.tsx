import React from 'react';
import { Users, Award, Briefcase, Building } from 'lucide-react';
import { COMPANY_STATS } from '../data/mockData';

export const StatsBar: React.FC = () => {
  const icons = [Users, Award, Briefcase, Building];

  return (
    <div className="bg-slate-50 border-y border-slate-200 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {COMPANY_STATS.map((stat, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <div key={idx} className="space-y-1.5 p-4 bg-white rounded-xl border border-slate-200/80">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#0F4C3A] flex items-center justify-center mx-auto mb-2">
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                <span>{stat.count.toLocaleString()}</span>
                <span className="text-[#0F4C3A]">{stat.suffix}</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
