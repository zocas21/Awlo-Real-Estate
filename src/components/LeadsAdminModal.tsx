import React from 'react';
import { X, ShieldCheck, User, Phone, Mail, Calendar, MapPin, Building2, Clock } from 'lucide-react';
import { Lead } from '../types';

interface LeadsAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
}

export const LeadsAdminModal: React.FC<LeadsAdminModalProps> = ({ isOpen, onClose, leads }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col border border-slate-200">

        {/* Header in Deep Navy */}
        <div className="bg-[#0A1128] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Captured Leads Dashboard</h3>
              <p className="text-xs text-blue-300">{leads.length} Real-Time Submissions from Forms & AI Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-slate-50">
          {leads.length > 0 ? (
            <div className="space-y-3">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 hover:border-blue-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-extrabold text-sm text-slate-900">{lead.name}</p>
                        <p className="text-xs text-slate-500">{lead.email || 'No email provided'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        lead.source === 'ai_assistant'
                          ? 'bg-amber-100 text-amber-800'
                          : lead.source === 'book_tour'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        Source: {lead.source.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(lead.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5 font-bold text-blue-600">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{lead.phone}</span>
                    </div>

                    {lead.interestedPropertyTitle && (
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">Property: {lead.interestedPropertyTitle}</span>
                      </div>
                    )}

                    {lead.preferredNeighborhood && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>Neighborhood: {lead.preferredNeighborhood}</span>
                      </div>
                    )}
                  </div>

                  {lead.message && (
                    <div className="pt-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <p className="font-semibold text-slate-700 mb-0.5">Inquiry Details:</p>
                      <p className="italic">"{lead.message}"</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700">No leads recorded yet</p>
              <p className="text-xs text-slate-500">Inquiries from the website contact forms and Gemini AI chatbot will appear here in real-time.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
