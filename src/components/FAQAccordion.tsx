import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/mockData';
import { ChevronDown, ChevronUp, HelpCircle, Search, MessageSquare } from 'lucide-react';

interface FAQAccordionProps {
  onAskAI?: (questionText: string) => void;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ onAskAI }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQ_ITEMS.filter(
    item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold tracking-widest text-[#0F4C3A] uppercase bg-emerald-100/80 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Everything you need to know about purchasing properties, legal ownership deeds, and visiting our sites in Addis Ababa.
          </p>
        </div>

        {/* Search bar inside FAQ */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions (e.g. office, legal, payment)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-800 shadow-xs"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-[#0F4C3A] shadow-md ring-1 ring-[#0F4C3A]/10'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-[#0F4C3A] transition-colors"
                  >
                    <span className="text-base sm:text-lg">{faq.question}</span>
                    <span className={`p-1.5 rounded-full transition-colors ${isOpen ? 'bg-emerald-100 text-[#0F4C3A]' : 'bg-slate-100 text-slate-500'}`}>
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 bg-emerald-50/20">
                      <p>{faq.answer}</p>
                      {onAskAI && (
                        <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                          <span className="text-slate-400">Need more specifics about this?</span>
                          <button
                            onClick={() => onAskAI(faq.question)}
                            className="flex items-center gap-1.5 text-[#0F4C3A] hover:text-amber-600 font-bold"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                            <span>Ask Awlo AI Assistant</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-slate-500 text-sm">
              No matching questions found for "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
