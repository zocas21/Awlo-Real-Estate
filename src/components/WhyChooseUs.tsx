import React from 'react';
import { MapPin, DollarSign, ShieldCheck, Lock, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/mockData';

export const WhyChooseUs: React.FC = () => {
  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    MapPin,
    DollarSign,
    ShieldCheck,
    Lock,
    TrendingUp,
    Sparkles
  };

  return (
    <section className="py-16 sm:py-24 bg-[#EAF2FF] bg-grid-pattern-light border-y border-blue-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          {/* Section label: small rounded pill badge */}
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-100 text-blue-700 border border-blue-200 shadow-xs">
            WHY CHOOSE US
          </span>

          {/* Section heading: large bold two-tone heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why Choose <span className="text-blue-600">EthioBest Real Estate</span>
          </h2>

          <p className="text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Uncompromising construction quality, strategic locations, and 100% legally verified title deed security in Addis Ababa.
          </p>
        </div>

        {/* Feature Cards Grid: White rounded cards with soft shadows, icon in small rounded square, thin divider line */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_US.map((item, idx) => {
            const IconComponent = iconMap[item.iconName] || ShieldCheck;
            // Alternate icon square between light blue and light yellow/cream
            const isCream = idx % 2 === 1;
            const iconBg = isCream
              ? 'bg-amber-50 text-amber-600 border border-amber-200/60'
              : 'bg-blue-50 text-blue-600 border border-blue-200/60';

            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3.5">
                  {/* Icon in a small rounded square */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Bold heading */}
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>

                  {/* Gray description text */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Thin divider line at the bottom of each card */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-blue-600">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
