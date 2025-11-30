
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import TrendChart from './components/TrendChart';
import OpportunityTable from './components/OpportunityTable';
import InteractiveMap from './components/InteractiveMap';
import CrmBoard from './components/CrmBoard';
import ScraperView from './components/ScraperView';
import SettingsView from './components/SettingsView';
import { MOCK_LISTINGS, MOCK_STATS, CHART_DATA, MOCK_LEADS } from './constants';
import { AlertCircle, TrendingDown, Eye, Filter, Download, Menu, Plus, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter functionality (mock)
  const [filterType, setFilterType] = useState('ALL');

  return (
    <div className="min-h-screen bg-background text-slate-50 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-background sticky top-0 z-30">
         <div className="font-bold text-lg">Mandat<span className="text-primary">Radar</span></div>
         <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-400">
           <Menu />
         </button>
      </div>

      <main className="md:ml-64 p-4 md:p-8 max-w-[1600px] mx-auto space-y-6 h-screen overflow-y-auto custom-scrollbar">
        
        {/* Credit Banner */}
        <div className="w-full bg-gradient-to-r from-indigo-900/40 via-slate-900/60 to-indigo-900/40 border border-indigo-500/30 rounded-lg py-2 px-4 text-center mb-6 backdrop-blur-md">
          <p className="text-xs md:text-sm font-medium text-indigo-200 flex items-center justify-center gap-2">
            <Sparkles size={14} className="text-amber-400" />
            <span>
              Prototipo desarrollado por <span className="text-white font-bold hover:underline cursor-pointer">Deltopide.com</span> con la tecnología de <span className="text-white font-bold">Google AI Studio</span>.
            </span>
          </p>
        </div>

        {/* Header Section (Common) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {activeTab === 'dashboard' ? 'Panel de Control' : 
               activeTab === 'map' ? 'Mapa de Oportunidades' : 
               activeTab === 'opportunities' ? 'Listado de Oportunidades' :
               activeTab === 'crm' ? 'Seguimiento CRM & Mandatos' : 
               activeTab === 'scraper' ? 'Escanear Mercado' : 'Configuración'}
            </h1>
            <p className="text-slate-400 mt-1 text-sm">
              {activeTab === 'scraper' 
                ? 'Módulo de detección automática de particulares' 
                : activeTab === 'settings'
                ? 'Gestión de cuenta e integraciones externas'
                : `Zona: Borriana & Castelló • ${MOCK_LISTINGS.length} propiedades detectadas`
              }
            </p>
          </div>
          {activeTab !== 'scraper' && activeTab !== 'settings' && (
            <div className="flex gap-3">
               <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border text-slate-300 hover:text-white rounded-lg text-sm font-medium transition-colors">
                 <Filter size={16} /> Filtros
               </button>
               {activeTab === 'crm' ? (
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-lg shadow-indigo-500/20 transition-all">
                    <Plus size={16} /> Nuevo Lead
                  </button>
               ) : (
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-lg shadow-indigo-500/20 transition-all">
                    <Download size={16} /> Exportar
                  </button>
               )}
            </div>
          )}
        </div>

        {/* VIEW: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard 
                title="Nuevas Propiedades (24h)" 
                value={MOCK_STATS.newListings} 
                icon={Eye} 
                trend="+12%" 
                trendUp={true}
                colorClass="text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                description="3 potencialmente infravaloradas"
              />
              <StatCard 
                title="Oportunidad Exclusiva" 
                value={MOCK_STATS.duplicates} 
                icon={AlertCircle} 
                trend="+5%" 
                trendUp={true}
                colorClass="text-rose-400 bg-rose-500/10 border-rose-500/20"
                description="Duplicados multi-agencia detectados"
              />
              <StatCard 
                title="Bajadas de Precio" 
                value={MOCK_STATS.priceDrops} 
                icon={TrendingDown} 
                trend="-2" 
                trendUp={false}
                colorClass="text-amber-400 bg-amber-500/10 border-amber-500/20"
                description="Media de -8.5%"
              />
            </div>

            {/* Main Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left: Opportunities Table (Takes up 2/3) */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-border flex justify-between items-center">
                    <h2 className="font-semibold text-lg text-white">Últimas Detecciones</h2>
                    <button onClick={() => setActiveTab('opportunities')} className="text-sm text-primary hover:text-indigo-400 font-medium transition-colors">Ver todo</button>
                  </div>
                  <OpportunityTable listings={MOCK_LISTINGS} />
                </div>
              </div>

              {/* Right: Charts & Secondary Info (Takes up 1/3) */}
              <div className="space-y-6">
                {/* Chart Card */}
                <div className="bg-surface border border-border rounded-xl p-6 shadow-sm h-80 flex flex-col">
                   <h3 className="font-semibold text-white mb-6">Actividad de Mercado (7d)</h3>
                   <div className="flex-1 w-full min-h-0">
                     <TrendChart data={CHART_DATA} />
                   </div>
                </div>

                {/* Quick Actions / Tips */}
                <div className="bg-gradient-to-br from-indigo-900/40 to-surface border border-indigo-500/20 rounded-xl p-6">
                  <h3 className="font-semibold text-white mb-2">Consejo Pro</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    La propiedad <span className="text-white font-medium">"Villa moderna vistas al mar"</span> aparece en 2 portales con una diferencia de precio del 5%.
                  </p>
                  <button className="w-full py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/50 rounded-lg text-sm font-medium transition-colors">
                    Generar Guion de Llamada
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: MAP */}
        {activeTab === 'map' && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <InteractiveMap listings={MOCK_LISTINGS} />
          </div>
        )}

        {/* VIEW: OPPORTUNITIES (List Only) */}
        {activeTab === 'opportunities' && (
           <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-300">
             <OpportunityTable listings={MOCK_LISTINGS} />
           </div>
        )}

        {/* VIEW: CRM */}
        {activeTab === 'crm' && (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 h-full">
             <CrmBoard leads={MOCK_LEADS} listings={MOCK_LISTINGS} />
           </div>
        )}

        {/* VIEW: SCRAPER */}
        {activeTab === 'scraper' && (
          <div className="animate-in fade-in duration-300">
            <ScraperView />
          </div>
        )}

        {/* VIEW: SETTINGS */}
        {activeTab === 'settings' && (
           <SettingsView />
        )}

      </main>
    </div>
  );
};

export default App;
