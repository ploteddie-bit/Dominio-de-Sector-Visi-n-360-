import React from 'react';
import { CrmLead, PipelineStage, PropertyListing } from '../types';
import { MoreHorizontal, Calendar, Phone, CheckCircle2, CircleDashed, ArrowRight } from 'lucide-react';

interface CrmBoardProps {
  leads: CrmLead[];
  listings: PropertyListing[];
}

const COLUMNS = [
  { id: PipelineStage.LEAD, title: 'Por Procesar', color: 'bg-slate-500' },
  { id: PipelineStage.CONTACTED, title: 'Contactado', color: 'bg-indigo-500' },
  { id: PipelineStage.MEETING, title: 'Cita/Visita', color: 'bg-amber-500' },
  { id: PipelineStage.OFFER, title: 'Oferta Mandato', color: 'bg-purple-500' },
  { id: PipelineStage.SIGNED, title: 'Mandato Firmado', color: 'bg-emerald-500' },
];

const CrmBoard: React.FC<CrmBoardProps> = ({ leads, listings }) => {
  
  const getListing = (id: string) => listings.find(l => l.id === id);

  const getFormatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] overflow-x-auto pb-4 gap-6 select-none custom-scrollbar">
      {COLUMNS.map((col) => {
        const colLeads = leads.filter(l => l.stage === col.id);
        
        return (
          <div key={col.id} className="min-w-[320px] w-[320px] flex flex-col bg-slate-900/30 rounded-xl border border-border/50 h-full">
            
            {/* Column Header */}
            <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-[#020617]/95 backdrop-blur-sm z-10 rounded-t-xl">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${col.color}`}></div>
                <h3 className="font-semibold text-slate-200">{col.title}</h3>
                <span className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded-full">{colLeads.length}</span>
              </div>
              <button className="text-slate-500 hover:text-white transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>

            {/* Column Content */}
            <div className="p-3 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
              {colLeads.map((lead) => {
                const listing = getListing(lead.propertyId);
                if (!listing) return null;

                return (
                  <div key={lead.id} className="bg-surface border border-border rounded-lg p-4 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all cursor-grab active:cursor-grabbing group">
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {lead.tags.map(tag => (
                        <span key={tag} className="px-1.5 py-0.5 text-[10px] uppercase font-bold text-slate-400 bg-slate-800 rounded border border-slate-700">
                          {tag}
                        </span>
                      ))}
                      {col.id === PipelineStage.MEETING && (
                        <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold text-amber-300 bg-amber-500/10 rounded border border-amber-500/20">
                           {lead.probability}% Prob.
                        </span>
                      )}
                    </div>

                    {/* Listing Mini Info */}
                    <div className="flex gap-3 mb-3">
                      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                         <img src={listing.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-sm font-medium text-white truncate" title={listing.title}>{listing.title}</h4>
                        <div className="text-xs text-slate-500 truncate">{listing.location}</div>
                        <div className="text-xs font-bold text-indigo-400 mt-0.5">
                            {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(listing.price)}
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex items-center gap-2 mb-3 bg-slate-950/50 p-2 rounded border border-white/5">
                        <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                            {lead.ownerName.charAt(0)}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <div className="text-xs text-slate-300 font-medium truncate">{lead.ownerName}</div>
                            <div className="text-[10px] text-slate-500 truncate">{lead.ownerPhone}</div>
                        </div>
                        <button className="p-1.5 hover:bg-primary rounded text-slate-400 hover:text-white transition-colors">
                            <Phone size={12} />
                        </button>
                    </div>

                    {/* Next Action */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-2 pt-2 border-t border-border/50">
                        {col.id === PipelineStage.SIGNED ? (
                             <CheckCircle2 size={12} className="text-emerald-500" />
                        ) : (
                             <Calendar size={12} className={new Date(lead.nextActionDate) < new Date() ? "text-rose-400" : "text-slate-500"} />
                        )}
                        <span className="truncate flex-1">{lead.nextAction}</span>
                        <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">{getFormatDate(lead.nextActionDate)}</span>
                    </div>

                    {/* Hover Move Button (Visual Only) */}
                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded border border-border">
                             <ArrowRight size={12} />
                         </button>
                    </div>

                  </div>
                );
              })}
              
              {/* Empty State / Add Button */}
              <button className="w-full py-3 border border-dashed border-slate-800 rounded-lg text-slate-600 text-sm hover:border-slate-700 hover:bg-slate-900/50 hover:text-slate-400 transition-all flex items-center justify-center gap-2">
                 <CircleDashed size={14} />
                 Añadir Lead
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CrmBoard;