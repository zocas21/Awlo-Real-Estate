import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, Sparkles, User, Building2, Calendar, Phone, ArrowRight, MessageSquare, ChevronRight } from 'lucide-react';
import { Property, ChatMessage } from '../types';
import { SAMPLE_PROPERTIES } from '../data/mockData';

interface ChatWidgetProps {
  onSelectProperty: (property: Property) => void;
  onBookTour: (propertyTitle?: string) => void;
  onLeadCaptured?: (leadData: any) => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  onSelectProperty,
  onBookTour,
  onLeadCaptured
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: 'Selam! I am **Awlo**, your AI real estate assistant for Addis Ababa. I can help you find luxury apartments, check prices, explain payment plans, verify title deed documents, or schedule a free site tour!\n\nHow can I assist your property search today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: [
        'Show 2-bedroom apartments in Bole',
        'Ready move-in units under 20M ETB',
        'Book a site tour',
        'Where are your properties located?',
        'Do listings have legal title deeds?'
      ]
    }
  ]);

  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const history = messages
        .filter(m => m.id !== 'msg-welcome')
        .map(m => ({ sender: m.sender, text: m.text }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history })
      });

      const data = await res.json();

      if (data.success) {
        // Find recommended properties from returned IDs
        const matchedProps = (data.recommendedPropertyIds || [])
          .map((id: string) => SAMPLE_PROPERTIES.find(p => p.id === id))
          .filter(Boolean) as Property[];

        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recommendedPropertyIds: data.recommendedPropertyIds,
          quickReplies: query.toLowerCase().includes('tour') || query.toLowerCase().includes('book')
            ? ['Book a Tour Now', 'Call Sales Office', 'View All Properties']
            : ['Tell me about payment plans', 'Book a site visit', 'Show properties in Sarbet']
        };

        setMessages(prev => [...prev, assistantMsg]);
      } else {
        throw new Error(data.error || 'Failed to connect');
      }
    } catch (err: any) {
      // Fallback AI response matching property database
      const fallbackText = getFallbackResponse(query);
      setMessages(prev => [
        ...prev,
        {
          id: `assistant-fb-${Date.now()}`,
          sender: 'assistant',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quickReplies: ['Book a site tour', 'Call +251 91 123 4567', 'View Bole Properties']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getFallbackResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('bole')) {
      return "Awlo has two prime properties in Bole: **Awlo Bole Horizon Tower** (3-bedroom luxury ready apartment at ETB 28.5M) and **Awlo Bole Arabsa Eco-Flats** (3-bedroom at ETB 11.5M). Both include backup generators and full legal title deeds!";
    }
    if (q.includes('tour') || q.includes('visit') || q.includes('book')) {
      return "I would be delighted to schedule a free guided VIP site tour for you! You can click the 'Book a Tour' button below or provide your phone number so our sales advisor can pick you up.";
    }
    if (q.includes('price') || q.includes('cost') || q.includes('budget')) {
      return "Our Awlo property prices range from **ETB 11.5 Million (~$89,000 USD)** for Bole Arabsa flats up to **ETB 38 Million (~$295,000 USD)** for luxury penthouses in CMC. We offer flexible 20% down deposit plans with 18-36 month installments.";
    }
    if (q.includes('legal') || q.includes('title') || q.includes('karta')) {
      return "All Awlo Real Estate listings come with 100% authentic legal ownership title deeds (Sertifikat/Karta) notarized by the Addis Ababa Document Authentication Office upon final transfer.";
    }
    return "Thank you for reaching out! Awlo offers luxury residential and commercial properties in Bole, CMC, Sarbet, Summit, Ayat, Bole Arabsa, Gerji, and Lebu. Would you like me to recommend properties based on your preferred location or budget?";
  };

  return (
    <>
      {/* Floating Trigger Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 bg-[#0F4C3A] hover:bg-[#0c3d2e] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl border-2 border-amber-400/40 transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Open Awlo AI Assistant"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0F4C3A] animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0F4C3A]"></span>
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <span>Awlo AI Assistant</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </p>
            <p className="text-[11px] text-emerald-100">Ask about properties & tours</p>
          </div>
        </button>
      )}

      {/* Expandable Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">

          {/* Chat Window Header */}
          <div className="bg-[#0F4C3A] text-white p-4 px-5 flex items-center justify-between border-b border-emerald-900 shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-extrabold shadow-sm">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0F4C3A]"></span>
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <span>Awlo AI Assistant</span>
                  <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                    Online
                  </span>
                </h3>
                <p className="text-[11px] text-emerald-100">Addis Ababa Property Specialist</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
                aria-label="Close Chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Thread Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}>
                  <div className="flex items-end space-x-2">
                    {!isUser && (
                      <div className="w-7 h-7 rounded-lg bg-[#0F4C3A] text-amber-400 flex items-center justify-center shrink-0 text-xs font-bold">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                        isUser
                          ? 'bg-[#0F4C3A] text-white rounded-br-xs font-medium'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                      }`}
                    >
                      <div className="whitespace-pre-line font-normal">
                        {msg.text}
                      </div>

                      {/* Render recommended property cards right inside chat if present */}
                      {msg.recommendedPropertyIds && msg.recommendedPropertyIds.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                          <p className="text-[11px] font-bold text-[#0F4C3A] uppercase tracking-wider">
                            Recommended Listings:
                          </p>
                          {msg.recommendedPropertyIds.map(propId => {
                            const p = SAMPLE_PROPERTIES.find(item => item.id === propId);
                            if (!p) return null;
                            return (
                              <div
                                key={p.id}
                                onClick={() => onSelectProperty(p)}
                                className="bg-emerald-50/80 hover:bg-emerald-100/90 p-2.5 rounded-xl border border-emerald-200/80 cursor-pointer transition-colors flex items-center gap-3"
                              >
                                <img src={p.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-xs text-slate-900 truncate">{p.title}</p>
                                  <p className="text-[11px] text-[#0F4C3A] font-extrabold">
                                    ETB {(p.priceETB / 1000000).toFixed(1)}M ({p.neighborhood})
                                  </p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-[#0F4C3A] shrink-0" />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Render Quick Replies under last message if available */}
                  {!isUser && msg.quickReplies && (
                    <div className="flex flex-wrap gap-1.5 pt-1 pl-9">
                      {msg.quickReplies.map((reply, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (reply === 'Book a site tour' || reply === 'Book a Tour Now') {
                              onBookTour();
                            } else {
                              sendMessage(reply);
                            }
                          }}
                          className="bg-white hover:bg-emerald-50 text-[#0F4C3A] border border-emerald-200 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors shadow-2xs"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {loading && (
              <div className="flex items-center space-x-2 text-slate-500 text-xs italic pl-9">
                <div className="w-2 h-2 rounded-full bg-[#0F4C3A] animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-[#0F4C3A] animate-bounce [animation-delay:0.4s]"></div>
                <span>Awlo is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips Bar */}
          <div className="bg-white border-t border-slate-100 p-2 flex items-center gap-1.5 overflow-x-auto text-xs shrink-0">
            <button
              onClick={() => onBookTour()}
              className="bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-lg shrink-0 flex items-center gap-1 hover:bg-amber-200 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              <span>Book Tour</span>
            </button>
            <button
              onClick={() => sendMessage('Show ready move-in apartments')}
              className="bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-lg shrink-0 hover:bg-slate-200 transition-colors"
            >
              Ready Units
            </button>
            <button
              onClick={() => sendMessage('What are your office hours and location?')}
              className="bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-lg shrink-0 hover:bg-slate-200 transition-colors"
            >
              Office Info
            </button>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask Awlo about properties, prices, tours..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-800"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="bg-[#0F4C3A] hover:bg-[#0c3d2e] text-white p-2.5 rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-40 shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-amber-400" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
