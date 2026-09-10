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
    <section className="py-16 sm:py-24 bg-[#EAF2FF] bg-grid-pattern-light border-b border-blue-100/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          {/* Small rounded pill badge above section heading */}
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-100 text-blue-700 border border-blue-200 shadow-xs">
            FREQUENTLY ASKED QUESTIONS
          </span>

          {/* Large bold two-tone heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Clear details on property acquisitions, legal title deeds, office locations, and flexible payment options in Addis Ababa.
          </p>
        </div>

        {/* Search bar inside FAQ */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions (e.g. office, legal, payment)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200/90 rounded-full pl-11 pr-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 shadow-xs"
          />
        </div>

        {/* Accordion List: White rounded cards with soft shadows */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all overflow-hidden shadow-xs ${
                    isOpen ? 'border-blue-400 shadow-sm ring-1 ring-blue-100' : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-sm sm:text-base text-slate-900">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'
                    }`}>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 border-t border-slate-100 text-sm text-slate-600 leading-relaxed space-y-3 animate-in fade-in duration-200">
                      <p>{faq.answer}</p>
                      {onAskAI && (
                        <div className="pt-2 flex items-center gap-2">
                          <button
                            onClick={() => onAskAI(faq.question)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Ask Gemini AI more about this</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <p className="text-sm text-slate-500">
                No matching questions found for "{searchQuery}".
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
