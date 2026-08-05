import React from 'react';
import { MapPin, DollarSign, ShieldCheck, Lock, TrendingUp, Sparkles } from 'lucide-react';
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
    <section className="py-16 sm:py-20 bg-slate-50/80 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-extrabold tracking-widest text-amber-700 uppercase bg-amber-100/80 px-3 py-1 rounded-full">
            The Awlo Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose Awlo Real Estate?
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            We deliver unmatched architectural quality, strategic Addis Ababa locations, and complete financial peace of mind.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_US.map((item, idx) => {
            const IconComponent = iconMap[item.iconName] || ShieldCheck;
            return (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0F4C3A] border border-emerald-100 flex items-center justify-center group-hover:bg-[#0F4C3A] group-hover:text-amber-300 transition-colors">
                  <IconComponent className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#0F4C3A] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
