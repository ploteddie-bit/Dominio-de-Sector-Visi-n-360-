import React from 'react';
import { PropertyListing, StatusType } from '../types';
import { ExternalLink, Eye, MapPin, Building2, Ruler } from 'lucide-react';

interface OpportunityTableProps {
  listings: PropertyListing[];
}

const StatusBadge: React.FC<{ status: StatusType; sourcesCount: number }> = ({ status, sourcesCount }) => {
  switch (status) {
    case StatusType.DUPLICATE:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
          Urgente • {sourcesCount} Agencias
        </span>
      );
    case StatusType.PRICE_DROP:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Bajada Precio
        </span>
      );
    case StatusType.NEW:
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Nuevo
        </span>
      );
  }
};

const OpportunityTable: React.FC<OpportunityTableProps> = ({ listings }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) return `Hace ${hours}h`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-slate-400">
            <th className="font-medium py-4 pl-4 pr-2 w-16">Propiedad</th>
            <th className="font-medium py-4 px-2">Detalles</th>
            <th className="font-medium py-4 px-2">Precio</th>
            <th className="font-medium py-4 px-2">Estado</th>
            <th className="font-medium py-4 px-2">Fuentes</th>
            <th className="font-medium py-4 px-2 text-right pr-4">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {listings.map((item) => (
            <tr key={item.id} className="group hover:bg-slate-900/50 transition-colors">
              <td className="py-4 pl-4 pr-2 align-top">
                <div className="h-16 w-20 rounded-lg overflow-hidden border border-border relative">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </td>
              <td className="py-4 px-2 align-top">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-slate-100 truncate max-w-[200px]">{item.title}</span>
                  <div className="flex items-center text-slate-500 text-xs gap-3">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {item.location}</span>
                    <span className="flex items-center gap-1"><Building2 size={12} /> {item.specs.rooms} hab</span>
                    <span className="flex items-center gap-1"><Ruler size={12} /> {item.specs.surface} m²</span>
                  </div>
                  <span className="text-xs text-slate-600 mt-1">Detectado: {formatDate(item.detectedAt)}</span>
                </div>
              </td>
              <td className="py-4 px-2 align-top">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-100">{formatPrice(item.price)}</span>
                  {item.previousPrice && (
                    <span className="text-xs text-slate-500 line-through decoration-rose-500">{formatPrice(item.previousPrice)}</span>
                  )}
                </div>
              </td>
              <td className="py-4 px-2 align-top">
                <StatusBadge status={item.status} sourcesCount={item.sources.length} />
              </td>
              <td className="py-4 px-2 align-top">
                <div className="flex -space-x-2 overflow-hidden">
                   {item.sources.map((source, idx) => (
                     <div key={idx} className="relative inline-block h-6 w-6 rounded-full ring-2 ring-background bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-300 uppercase cursor-help" title={source.name}>
                        {source.name.substring(0, 1)}
                     </div>
                   ))}
                   {item.sources.length > 3 && (
                     <div className="relative inline-block h-6 w-6 rounded-full ring-2 ring-background bg-slate-800 flex items-center justify-center text-[8px] font-bold text-slate-400">
                       +{item.sources.length - 3}
                     </div>
                   )}
                </div>
              </td>
              <td className="py-4 px-2 pr-4 text-right align-top">
                <button className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-white bg-primary hover:bg-indigo-600 rounded-md shadow-sm shadow-indigo-500/20 transition-all active:scale-95 group/btn">
                  Ver Análisis
                  <ExternalLink size={12} className="ml-1.5 opacity-70 group-hover/btn:opacity-100" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OpportunityTable;