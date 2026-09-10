import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, RotateCcw, Sparkles, ChevronRight, Calendar } from 'lucide-react';
import { Property, ChatMessage } from '../types';
import { SAMPLE_PROPERTIES } from '../data/mockData';

interface ChatWidgetProps {
  onSelectProperty: (property: Property) => void;
  onBookTour: (propertyTitle?: string) => void;
  onLeadCaptured?: (leadData: any) => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  onSelectProperty,
  onBookTour
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const initialWelcomeMessage: ChatMessage = {
    id: 'msg-welcome',
    sender: 'assistant',
    text: 'Selam! I am the official AI assistant for Awlo Real Estate in Addis Ababa. I can help you explore our verified residential and commercial properties, check prices, explain payment milestones, verify title deeds, or arrange a VIP site tour.\n\nHow can I help you today?',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    quickReplies: [
      'Show 2-bedroom apartments in Bole',
      'Ready move-in units under 20M ETB',
      'Book a site tour',
      'Where are your offices located?',
      'Do listings have legal title deeds?'
    ]
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialWelcomeMessage]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen]);

  const handleClearConversation = () => {
    setMessages([
      {
        ...initialWelcomeMessage,
        id: `msg-welcome-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

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
      // Build conversation history (excluding welcome message for cleaner context)
      const history = messages
        .filter(m => !m.id.startsWith('msg-welcome'))
        .map(m => ({ sender: m.sender, text: m.text }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history })
      });

      const data = await res.json();

      if (data && data.success && typeof data.text === 'string') {
        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recommendedPropertyIds: data.recommendedPropertyIds,
          quickReplies: query.toLowerCase().includes('tour') || query.toLowerCase().includes('book')
            ? ['Book a Tour Now', 'Call +251 92 941 9130', 'View Bole Properties']
            : ['Payment installment plans', 'Book a site visit', 'Show properties in Sarbet']
        };

        setMessages(prev => [...prev, assistantMsg]);
      } else {
        throw new Error(data?.error || 'Failed to connect');
      }
    } catch {
      // Required professional error display without leaking sensitive stack traces or keys
      setMessages(prev => [
        ...prev,
        {
          id: `assistant-err-${Date.now()}`,
          sender: 'assistant',
          text: "Sorry, I'm having trouble connecting right now. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quickReplies: ['Book a site tour', 'Call +251 92 941 9130', 'View Bole Properties']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5 bg-[#0F4C3A] hover:bg-[#0c3d2e] text-white py-2.5 px-4 rounded-xl border border-emerald-800 shadow-md transition-all active:scale-95"
          aria-label="Open Awlo AI Chatbot"
        >
          <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-900 flex items-center justify-center font-bold shrink-0">
            <Bot className="w-4 h-4" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold text-white flex items-center gap-1">
              <span>Awlo AI Assistant</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </p>
            <p className="text-[10px] text-emerald-200">Chat with our property advisor</p>
          </div>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[410px] h-[550px] max-h-[85vh] bg-white rounded-2xl border border-slate-300 shadow-xl flex flex-col overflow-hidden">

          {/* Chat Window Header */}
          <div className="bg-[#0F4C3A] text-white p-3.5 px-4 flex items-center justify-between border-b border-emerald-900">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-900 flex items-center justify-center font-bold shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                  <span>Awlo AI Assistant</span>
                  <span className="bg-emerald-900 text-emerald-200 text-[10px] font-medium px-1.5 py-0.5 rounded">
                    OpenAI
                  </span>
                </h3>
                <p className="text-[10px] text-emerald-200">Addis Ababa Real Estate Advisor</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {/* Clear conversation button */}
              <button
                onClick={handleClearConversation}
                className="p-1.5 rounded-lg hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Close window button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Thread Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}>
                  <div className="flex items-end space-x-2">
                    {!isUser && (
                      <div className="w-6 h-6 rounded-md bg-[#0F4C3A] text-amber-400 flex items-center justify-center shrink-0 text-xs font-bold">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] p-3 rounded-xl text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? 'bg-[#0F4C3A] text-white rounded-br-xs font-medium'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                      }`}
                    >
                      <div className="whitespace-pre-line font-normal">
                        {msg.text}
                      </div>

                      {/* Render recommended property cards inside chat if matched */}
                      {msg.recommendedPropertyIds && msg.recommendedPropertyIds.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
                          <p className="text-[10px] font-bold text-[#0F4C3A] uppercase tracking-wider">
                            Suggested Properties:
                          </p>
                          {msg.recommendedPropertyIds.map(propId => {
                            const p = SAMPLE_PROPERTIES.find(item => item.id === propId);
                            if (!p) return null;
                            return (
                              <div
                                key={p.id}
                                onClick={() => onSelectProperty(p)}
                                className="bg-slate-50 hover:bg-emerald-50 p-2 rounded-lg border border-slate-200 hover:border-emerald-300 cursor-pointer transition-colors flex items-center gap-2.5"
                              >
                                <img src={p.images[0]} alt="" className="w-10 h-10 rounded-md object-cover shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-xs text-slate-900 truncate">{p.title}</p>
                                  <p className="text-[10px] text-[#0F4C3A] font-bold">
                                    ETB {(p.priceETB / 1000000).toFixed(1)}M • {p.neighborhood}
                                  </p>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 text-[#0F4C3A] shrink-0" />
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

                  {/* Render Quick Replies under assistant messages */}
                  {!isUser && msg.quickReplies && (
                    <div className="flex flex-wrap gap-1.5 pt-1 pl-8">
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
                          className="bg-white hover:bg-emerald-50 text-[#0F4C3A] border border-slate-200 hover:border-emerald-300 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* AI typing / loading indicator */}
            {loading && (
              <div className="flex items-center space-x-2 text-slate-500 text-xs italic pl-8">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0F4C3A] animate-bounce"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#0F4C3A] animate-bounce [animation-delay:0.4s]"></div>
                <span>Awlo AI is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Bar */}
          <div className="bg-white border-t border-slate-200 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto text-xs shrink-0">
            <button
              onClick={() => onBookTour()}
              className="bg-emerald-50 text-[#0F4C3A] hover:bg-emerald-100 font-semibold px-2 py-1 rounded text-[11px] shrink-0 flex items-center gap-1 transition-colors"
            >
              <Calendar className="w-3 h-3 text-[#0F4C3A]" />
              <span>Book Site Tour</span>
            </button>
            <button
              onClick={() => sendMessage('Show ready move-in apartments')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-2 py-1 rounded text-[11px] shrink-0 transition-colors"
            >
              Ready Move-in
            </button>
            <button
              onClick={() => sendMessage('Where is your Bole sales office?')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-2 py-1 rounded text-[11px] shrink-0 transition-colors"
            >
              Office Location
            </button>
          </div>

          {/* Message Input Box */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask Awlo about properties, prices, tours..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] text-slate-900 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="bg-[#0F4C3A] hover:bg-[#0c3d2e] text-white p-2 rounded-lg transition-colors disabled:opacity-40 shrink-0"
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
