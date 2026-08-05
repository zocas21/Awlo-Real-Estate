import React from 'react';
import { Award, Building2, ShieldCheck, Users, CheckCircle, Target, Sparkles, MapPin } from 'lucide-react';

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
    { year: '2016', title: 'Bole Flagship Delivery', desc: 'Handed over our first 12-story luxury residential project near Bole Atlas.' },
    { year: '2020', title: 'Commercial Expansion', desc: 'Launched Awlo Business Hub in Kazanchis & Gerji commercial corridors.' },
    { year: '2024', title: '1,000+ Keys Delivered', desc: 'Reached landmark milestone of 1,000 delivered homes with 100% legal title transfers.' },
    { year: '2026', title: 'AI-Powered Property Era', desc: 'Integrated 24/7 AI advisory and eco-green building tech into all new developments.' }
  ];

  return (
    <div className="py-12 sm:py-16 bg-white space-y-16">
      {/* About Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-extrabold tracking-widest text-[#0F4C3A] uppercase bg-emerald-50 px-3.5 py-1 rounded-full">
              Our Journey & Values
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Building Trust & Excellence in <span className="text-[#0F4C3A]">Addis Ababa</span>
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Founded in 2012, Awlo Real Estate has grown to become one of Ethiopia’s most trusted premier real estate developers. We specialize in luxury residential apartments, commercial high-rises, and mixed-use communities built to international engineering standards.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              Every Awlo property is constructed with uncompromising structural integrity, premium imported finishes, full backup power and water infrastructure, and guaranteed municipal title deeds (Sertifikat/Karta).
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 text-sm font-bold text-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>100% Legal Title Deed Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>On-Time Milestone Handover</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>24/7 Power & Water Infrastructure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>20% Milestone Payment Plans</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
              alt="Awlo Real Estate Headquarters"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C3A]/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <p className="font-extrabold text-base">Awlo Building, Bole Road</p>
              <p className="text-xs text-amber-300">Addis Ababa, Ethiopia</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0F4C3A] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Our Mission</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              To design and deliver world-class residential and commercial real estate developments in Addis Ababa that provide safe, sustainable, and high-value spaces for homeowners, businesses, and Ethiopian diaspora investors.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Our Vision</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              To be East Africa’s most trusted real estate developer, recognized for architectural innovation, uncompromising quality standards, and customer-centric property management.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900">Executive Leadership</h2>
          <p className="text-sm text-slate-500">Guided by industry veterans committed to transforming Ethiopian real estate.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all space-y-4 p-6 text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-emerald-50 shadow-md">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                <p className="text-xs font-semibold text-[#0F4C3A] mt-0.5">{member.role}</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900">Milestones of Growth</h2>
          <p className="text-sm text-slate-500">Fourteen years of steady development and customer satisfaction.</p>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-slate-200">
          {milestones.map((ms, idx) => (
            <div key={idx} className={`relative flex flex-col sm:flex-row items-start ${idx % 2 === 0 ? 'sm:flex-row-reverse' : ''} gap-6`}>
              <div className="w-full sm:w-1/2 p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs font-extrabold text-amber-600 bg-amber-100 px-2.5 py-0.5 rounded-full">{ms.year}</span>
                <h3 className="text-base font-bold text-slate-900 mt-2">{ms.title}</h3>
                <p className="text-xs text-slate-600 mt-1">{ms.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
