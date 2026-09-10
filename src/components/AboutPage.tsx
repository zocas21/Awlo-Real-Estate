import React from 'react';
import { Target, Sparkles, CheckCircle, Award, Users, Shield } from 'lucide-react';
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
    <div className="py-12 sm:py-20 bg-white space-y-20">
      {/* About Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-600 border border-blue-100 shadow-xs">
              ABOUT AWLO REAL ESTATE
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Building Trust & Excellence in <span className="text-blue-600">Addis Ababa</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Founded in 2012, Awlo Real Estate is a trusted developer of high-quality residential apartments, penthouses, and commercial spaces in Addis Ababa, Ethiopia.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every Awlo project is engineered for long-term durability, equipped with reliable backup power and water infrastructure, and delivered with 100% authentic legal title deeds (Sertifikat/Karta).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm font-semibold text-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Legal Title Deed Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>On-Time Milestone Handover</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>24/7 Power & Water Reserves</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Flexible Installment Plans</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
              alt="Awlo Real Estate Headquarters"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-[#0A1128]/85 backdrop-blur-xs text-white p-5 border-t border-slate-800">
              <p className="font-bold text-sm">Awlo Real Estate Head Office</p>
              <p className="text-xs text-slate-300 mt-0.5">{AWLO_CONTACT_INFO.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision in alternating light blue container */}
      <div className="bg-[#EAF2FF] bg-grid-pattern-light py-16 border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white text-blue-700 border border-blue-200 shadow-xs">
              OUR GUIDING PRINCIPLES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Mission & <span className="text-blue-600">Vision</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To design and deliver world-class residential and commercial real estate developments in Addis Ababa that provide safe, sustainable, and high-value spaces for homeowners and Ethiopian diaspora investors.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600">
                Driven by Quality & Integrity
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To be Ethiopia’s most trusted real estate brand, recognized for architectural reliability, transparent documentation, and customer satisfaction across East Africa.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-amber-600">
                100% Legal Ownership Guarantees
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-600 border border-blue-100 shadow-xs">
            LEADERSHIP
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Executive <span className="text-blue-600">Leadership</span>
          </h2>
          <p className="text-sm text-slate-500">Experienced industry leadership committed to real estate development in Addis Ababa.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{member.role}</p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                    {member.bio}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <span className="text-[11px] font-medium text-slate-400">Addis Ababa Operations</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-600 border border-blue-100 shadow-xs">
            HISTORY & GROWTH
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Key <span className="text-blue-600">Milestones</span>
          </h2>
        </div>

        <div className="space-y-4">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <span className="text-xl sm:text-2xl font-black text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-xl border border-blue-100 shrink-0">
                  {m.year}
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">{m.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{m.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
