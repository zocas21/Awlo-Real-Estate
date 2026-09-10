import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/mockData';
import { ChevronDown, ChevronUp, Search, MessageSquare } from 'lucide-react';

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
    <section className="py-14 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold tracking-wider text-[#0F4C3A] uppercase bg-slate-100 px-3 py-1 rounded-md">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Clear details on property acquisitions, legal title deeds, office locations, and payment options.
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
            className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-800"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-2.5">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-lg border transition-colors overflow-hidden ${
                    isOpen ? 'border-[#0F4C3A]' : 'border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full px-5 py-3.5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-[#0F4C3A] transition-colors text-sm sm:text-base"
                  >
                    <span>{faq.question}</span>
                    <span className="text-slate-500 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      <p>{faq.answer}</p>
                      {onAskAI && (
                        <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
                          <span className="text-slate-500">Need specific details?</span>
                          <button
                            onClick={() => onAskAI(faq.question)}
                            className="flex items-center gap-1.5 text-[#0F4C3A] hover:underline font-semibold"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
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
