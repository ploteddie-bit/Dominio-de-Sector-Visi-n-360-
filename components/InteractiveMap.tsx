
import React, { useState } from 'react';
import { PropertyListing, StatusType } from '../types';
import { MapPin, X, ExternalLink, Navigation, Plus, Minus, Layers, Phone, Building2, Ruler } from 'lucide-react';

interface InteractiveMapProps {
  listings: PropertyListing[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ listings }) => {
  const [selectedListing, setSelectedListing] = useState<PropertyListing | null>(null);
  const [zoom, setZoom] = useState(1);

  const getPinColor = (status: StatusType) => {
    switch (status) {
      case StatusType.DUPLICATE: return 'bg-rose-500 shadow-rose-500/50 ring-rose-500/30';
      case StatusType.PRICE_DROP: return 'bg-amber-500 shadow-amber-500/50 ring-amber-500/30';
      case StatusType.NEW:
      default: return 'bg-emerald-500 shadow-emerald-500/50 ring-emerald-500/30';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="relative w-full h-[600px] md:h-[calc(100vh-10rem)] rounded-xl overflow-hidden border border-border bg-[#0f172a] group shadow-2xl">
      
      {/* MAP RENDERER (SVG) */}
      <div className="absolute inset-0 overflow-hidden bg-[#020617]">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1000 800" 
          preserveAspectRatio="xMidYMid slice"
          className="transition-transform duration-700 ease-in-out"
          style={{ transform: `scale(${zoom})` }}
          onClick={() => setSelectedListing(null)} // Click on map background closes popup
        >
          <defs>
            <pattern id="city-block" width="50" height="50" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="#1e293b" rx="2" />
            </pattern>
          </defs>

          {/* 1. Base Layer: Land vs Sea */}
          {/* Mer à l'Est (droite) */}
          <rect x="0" y="0" width="1000" height="800" fill="#0f172a" /> 
          <path d="M 700 0 Q 680 200 750 400 T 720 800 L 1000 800 L 1000 0 Z" fill="#0f2038" />

          {/* 2. Zones Vertes (Parcs) */}
          <path d="M 100 100 L 300 120 L 280 300 L 120 280 Z" fill="#064e3b" opacity="0.2" />
          <path d="M 500 500 C 550 450 600 550 550 600 Z" fill="#064e3b" opacity="0.2" />

          {/* 3. Urban Blocks (Texture Ville) */}
          <rect x="50" y="50" width="600" height="700" fill="url(#city-block)" opacity="0.3" />

          {/* 4. Major Roads (Main Arteries) */}
          {/* Verticales */}
          <line x1="200" y1="0" x2="220" y2="800" stroke="#334155" strokeWidth="8" />
          <line x1="450" y1="0" x2="450" y2="800" stroke="#334155" strokeWidth="6" />
          {/* Horizontales */}
          <line x1="0" y1="300" x2="700" y2="320" stroke="#334155" strokeWidth="8" />
          <line x1="0" y1="600" x2="800" y2="580" stroke="#334155" strokeWidth="6" />
          {/* Diagonales / Côtière */}
          <path d="M 100 0 Q 300 300 700 400" stroke="#475569" strokeWidth="4" fill="none" />
          <path d="M 680 0 Q 660 200 730 400 T 700 800" stroke="#3b82f6" strokeWidth="3" opacity="0.3" fill="none" strokeDasharray="10,5" />

          {/* 5. Labels des Quartiers */}
          <text x="150" y="250" fill="#64748b" fontSize="14" letterSpacing="2" fontWeight="bold">CENTRO CIUDAD</text>
          <text x="500" y="150" fill="#64748b" fontSize="12" letterSpacing="1">NORTE RESIDENCIAL</text>
          <text x="100" y="650" fill="#64748b" fontSize="12" letterSpacing="1">ZONA UJI</text>
          <text x="800" y="300" fill="#3b82f6" fontSize="14" letterSpacing="2" fontWeight="bold" opacity="0.6">MAR MEDITERRÁNEO</text>
          <text x="550" y="500" fill="#64748b" fontSize="12" letterSpacing="1">PORT DE BORRIANA</text>

        </svg>

        {/* Overlay Gradient pour effet "Vignette" */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-background/50 pointer-events-none"></div>
      </div>

      {/* Map UI Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        
        {/* Controls Top Right */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-auto">
          <div className="bg-surface/90 backdrop-blur border border-border rounded-lg shadow-xl overflow-hidden">
             <button onClick={() => setZoom(Math.min(zoom + 0.2, 2))} className="p-2.5 hover:bg-slate-800 text-slate-300 transition-colors block border-b border-border/50">
               <Plus size={18} />
             </button>
             <button onClick={() => setZoom(Math.max(zoom - 0.2, 0.8))} className="p-2.5 hover:bg-slate-800 text-slate-300 transition-colors block">
               <Minus size={18} />
             </button>
          </div>
          <button className="p-2.5 bg-surface/90 backdrop-blur border border-border rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 shadow-xl transition-colors">
            <Layers size={18} />
          </button>
        </div>

        {/* Legend Bottom Right */}
        <div className="absolute bottom-4 right-4 bg-surface/90 backdrop-blur border border-border rounded-lg p-3 shadow-xl space-y-2 pointer-events-auto hidden md:block">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow shadow-rose-500/50"></span> Urgente / Duplicado
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow shadow-emerald-500/50"></span> Nuevo
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow shadow-amber-500/50"></span> Bajada de precio
            </div>
        </div>
      </div>

      {/* Interactive Pins Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 700ms ease-in-out' }}>
        {listings.map((item) => (
          <button
            key={item.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group/pin focus:outline-none z-20"
            style={{ top: `${item.coordinates.y}%`, left: `${item.coordinates.x}%` }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedListing(item);
            }}
          >
            {/* Ripple Effect */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full opacity-0 group-hover/pin:opacity-100 transition-opacity duration-300 ${getPinColor(item.status).split(' ')[0]} blur-md`}></div>
            
            {/* Pin Body */}
            <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shadow-lg transition-transform duration-300 group-hover/pin:scale-110 group-hover/pin:-translate-y-1 ${getPinColor(item.status)}`}>
               <span className="text-[10px] font-bold text-white">{formatPrice(item.price).replace(/\D/g,'').slice(0,3)}k</span>
            </div>

            {/* Triangle Point */}
            <div className={`absolute top-7 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white drop-shadow-sm`}></div>
          </button>
        ))}
      </div>

      {/* Selected Listing Card (Popup) */}
      {selectedListing && (
        <div className="absolute bottom-0 left-0 right-0 md:bottom-6 md:left-6 md:right-auto md:w-80 bg-[#0f172a] border-t md:border border-border md:rounded-xl shadow-2xl z-30 animate-in slide-in-from-bottom-10 fade-in duration-300 ring-1 ring-white/10">
            {/* Header Image */}
            <div className="relative h-40 w-full group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent z-10"></div>
                <img src={selectedListing.imageUrl} alt={selectedListing.title} className="w-full h-full object-cover rounded-t-xl" />
                
                <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedListing(null); }}
                    className="absolute top-2 right-2 p-1.5 bg-black/40 hover:bg-rose-500/80 backdrop-blur-sm rounded-full text-white transition-all z-20"
                >
                    <X size={14} />
                </button>
                
                <div className="absolute bottom-3 left-4 right-4 z-20">
                   <div className="flex justify-between items-end">
                      <span className="text-2xl font-bold text-white tracking-tight">{formatPrice(selectedListing.price)}</span>
                      {selectedListing.status === StatusType.PRICE_DROP && (
                         <span className="text-xs font-bold text-amber-400 bg-amber-500/20 px-2 py-1 rounded">-5%</span>
                      )}
                   </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 pt-2">
                <h3 className="font-semibold text-slate-100 text-lg leading-snug mb-1">{selectedListing.title}</h3>
                <p className="text-sm text-slate-400 mb-4 flex items-center gap-1.5">
                    <MapPin size={14} className="text-primary" /> {selectedListing.location}
                </p>
                
                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                   <div className="bg-slate-900/50 p-2 rounded-lg border border-white/5 text-center flex flex-col items-center justify-center gap-1">
                      <Building2 size={14} className="text-slate-500" />
                      <div className="text-xs font-bold text-slate-200">{selectedListing.specs.rooms} hab.</div>
                   </div>
                   <div className="bg-slate-900/50 p-2 rounded-lg border border-white/5 text-center flex flex-col items-center justify-center gap-1">
                      <Ruler size={14} className="text-slate-500" />
                      <div className="text-xs font-bold text-slate-200">{selectedListing.specs.surface}m²</div>
                   </div>
                   <div className="bg-slate-900/50 p-2 rounded-lg border border-white/5 text-center flex flex-col items-center justify-center gap-1">
                      <span className="text-[10px] text-slate-500 font-bold">€/m²</span>
                      <div className="text-xs font-bold text-slate-200">{Math.round(selectedListing.price / selectedListing.specs.surface)}</div>
                   </div>
                </div>

                {/* Sources */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                   <span className="text-xs text-slate-500">Fuentes detectadas:</span>
                   <div className="flex -space-x-2">
                      {selectedListing.sources.map((s, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-slate-700 border border-[#0f172a] flex items-center justify-center text-[10px] text-white font-bold cursor-help" title={s.name}>
                          {s.name[0]}
                        </div>
                      ))}
                   </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button className="flex-1 bg-primary hover:bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                        <Phone size={16} />
                        Contactar
                    </button>
                    <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2">
                        <ExternalLink size={16} />
                        Ver Detalles
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;