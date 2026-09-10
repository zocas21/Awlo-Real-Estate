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
    <section className="py-14 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold tracking-wider text-[#0F4C3A] uppercase bg-slate-100 px-3 py-1 rounded-md">
            The Awlo Advantage
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Why Choose Awlo Real Estate?
          </h2>
          <p className="text-sm text-slate-600">
            Uncompromising structural quality, strategic Addis Ababa locations, and verified title deed security.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => {
            const IconComponent = iconMap[item.iconName] || ShieldCheck;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-slate-200 space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0F4C3A] flex items-center justify-center">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
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
