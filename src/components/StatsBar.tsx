import React from 'react';
import { Users, Award, Building, CheckCircle2 } from 'lucide-react';
import { COMPANY_STATS } from '../data/mockData';

export const StatsBar: React.FC = () => {
  const icons = [Users, Award, Users, Building];

  return (
    <div className="bg-[#0F4C3A] text-white py-12 px-4 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4a857_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10 text-center">
        {COMPANY_STATS.map((stat, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <div key={idx} className="space-y-2 group p-4 rounded-2xl hover:bg-white/5 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                <span>{stat.count.toLocaleString()}</span>
                <span className="text-amber-400">{stat.suffix}</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-emerald-100 tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
