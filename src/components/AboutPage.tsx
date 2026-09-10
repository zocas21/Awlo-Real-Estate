import React from 'react';
import { Target, Sparkles, CheckCircle } from 'lucide-react';
import { AWLO_CONTACT_INFO } from './SocialLinks';

export const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Yonas Awlo',
      role: 'Founder & Managing Director',
      bio: 'Over 18 years of real estate development leadership in East Africa, pioneering European-grade residential towers across Addis Ababa.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Frehiwot Kebede',
      role: 'Chief Operations Officer',
      bio: 'Former structural engineering consultant with 14 years experience managing luxury high-rise construction and municipal compliance.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Dawit Solomon',
      role: 'Head of Sales & Client Advisory',
      bio: 'Expert in Ethiopian property law and diaspora investment options, helping over 1,200 families acquire verified title deed properties.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const milestones = [
    { year: '2012', title: 'Awlo Founded', desc: 'Established in Addis Ababa with a mission to modernize urban apartment living.' },
    { year: '2016', title: 'Bole Flagship Delivery', desc: 'Handed over our first luxury residential project in Bole.' },
    { year: '2020', title: 'Commercial Expansion', desc: 'Launched Awlo Business Hub in Kazanchis & Gerji commercial corridors.' },
    { year: '2024', title: '1,000+ Keys Delivered', desc: 'Reached landmark milestone of 1,000 delivered homes with 100% legal title transfers.' },
    { year: '2026', title: 'AI-Powered Advisory', desc: 'Integrated 24/7 AI advisory and client care for local and diaspora buyers.' }
  ];

  return (
    <div className="py-12 sm:py-16 bg-white space-y-16">
      {/* About Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <span className="text-xs font-semibold tracking-wider text-[#0F4C3A] uppercase bg-slate-100 px-3 py-1 rounded-md">
              About Awlo Real Estate
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Building Trust & Excellence in <span className="text-[#0F4C3A]">Addis Ababa</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Founded in 2012, Awlo Real Estate is a trusted developer of high-quality residential apartments, penthouses, and commercial spaces in Addis Ababa, Ethiopia.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every Awlo project is engineered for long-term durability, equipped with reliable backup power and water infrastructure, and delivered with 100% authentic legal title deeds (Sertifikat/Karta).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm font-medium text-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#0F4C3A] shrink-0" />
                <span>Legal Title Deed Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#0F4C3A] shrink-0" />
                <span>On-Time Milestone Handover</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#0F4C3A] shrink-0" />
                <span>24/7 Power & Water Reserves</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#0F4C3A] shrink-0" />
                <span>Flexible Installment Plans</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
              alt="Awlo Real Estate Headquarters"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-white p-4">
              <p className="font-bold text-sm">Awlo Real Estate Head Office</p>
              <p className="text-xs text-slate-300">{AWLO_CONTACT_INFO.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-slate-50 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0F4C3A] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              To design and deliver world-class residential and commercial real estate developments in Addis Ababa that provide safe, sustainable, and high-value spaces for homeowners and Ethiopian diaspora investors.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Our Vision</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              To be Ethiopia’s most trusted real estate brand, recognized for architectural reliability, transparent documentation, and customer satisfaction.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Executive Leadership</h2>
          <p className="text-xs sm:text-sm text-slate-500">Experienced industry leadership committed to real estate development in Addis Ababa.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 text-center space-y-3">
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto bg-slate-100 border border-slate-200">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                <p className="text-xs font-semibold text-[#0F4C3A] mt-0.5">{member.role}</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Milestones of Growth</h2>
          <p className="text-xs sm:text-sm text-slate-500">Consistent development over the past 14 years.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {milestones.map((ms, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <span className="text-xs font-bold text-[#0F4C3A] bg-emerald-50 px-2 py-0.5 rounded">{ms.year}</span>
              <h3 className="text-sm font-bold text-slate-900 pt-1">{ms.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{ms.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
