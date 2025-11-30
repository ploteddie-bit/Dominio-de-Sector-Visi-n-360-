import React, { useState } from 'react';
import { Check, Zap, CreditCard, Shield, Star, Briefcase, Download, Calendar } from 'lucide-react';

const SettingsView: React.FC = () => {
  const [connectedServices, setConnectedServices] = useState<string[]>(['google']);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPlan, setCurrentPlan] = useState('pro');

  const toggleService = (id: string) => {
    if (connectedServices.includes(id)) {
      setConnectedServices(connectedServices.filter(s => s !== id));
    } else {
      setConnectedServices([...connectedServices, id]);
    }
  };

  const integrations = [
    {
      id: 'hubspot',
      name: 'HubSpot CRM',
      description: 'Sincronización bidireccional de contactos y tratos (Deals).',
      logoInitial: 'H',
      color: 'bg-[#ff7a59]',
      status: 'disconnected'
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Exportación automática de oportunidades a Sales Cloud.',
      logoInitial: 'S',
      color: 'bg-[#00a1e0]',
      status: 'disconnected'
    },
    {
      id: 'pipedrive',
      name: 'Pipedrive',
      description: 'Creación automática de leads cualificados en su embudo.',
      logoInitial: 'P',
      color: 'bg-[#000000]',
      status: 'disconnected'
    },
    {
      id: 'google',
      name: 'Google Workspace',
      description: 'Sincronización de calendario para citas y correos.',
      logoInitial: 'G',
      color: 'bg-[#4285f4]',
      status: 'connected'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Sección: Integraciones CRM */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="text-amber-400" size={24} />
            Integraciones CRM & Herramientas
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Conecte Mandat Radar con sus herramientas existentes para automatizar el flujo de trabajo.
          </p>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((tool) => {
            const isConnected = connectedServices.includes(tool.id);
            return (
              <div key={tool.id} className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${isConnected ? 'bg-indigo-500/5 border-indigo-500/30' : 'bg-slate-900/50 border-border hover:border-slate-700'}`}>
                <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0`}>
                  {tool.logoInitial}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-slate-100">{tool.name}</h3>
                    {isConnected ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <Check size={10} /> CONECTADO
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
                        INACTIVO
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 mb-3 leading-relaxed">
                    {tool.description}
                  </p>
                  <button 
                    onClick={() => toggleService(tool.id)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                      isConnected 
                      ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    {isConnected ? 'Desconectar' : 'Conectar Cuenta'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sección: Planes y Facturación */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
           <CreditCard className="text-emerald-400" size={24} />
           Planes y Facturación
        </h2>

        {/* Tarjetas de Precios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           
           {/* Plan 1: Pago por Uso */}
           <div className="bg-surface border border-border rounded-xl p-6 flex flex-col hover:border-slate-600 transition-colors">
              <div className="mb-4">
                 <h3 className="text-lg font-bold text-white">Pack "A la Carta"</h3>
                 <p className="text-slate-400 text-sm">Ideal para agentes independientes.</p>
              </div>
              <div className="mb-6">
                 <span className="text-3xl font-bold text-white">49€</span>
                 <span className="text-slate-500 text-sm"> / pack 10 leads</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                 <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-emerald-500" /> 10 Contactos de propietarios</li>
                 <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-emerald-500" /> Datos validados manualmente</li>
                 <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-emerald-500" /> Acceso básico al mapa</li>
                 <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-emerald-500" /> Sin caducidad de créditos</li>
              </ul>
              <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg font-medium transition-colors">
                 Comprar Créditos
              </button>
           </div>

           {/* Plan 2: Suscripción Pro (Destacado) */}
           <div className="bg-gradient-to-b from-indigo-900/20 to-surface border border-indigo-500/50 rounded-xl p-6 flex flex-col relative overflow-hidden shadow-2xl shadow-indigo-900/20">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                 Recomendado
              </div>
              <div className="mb-4">
                 <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    Radar Pro <Star size={16} className="text-amber-400 fill-amber-400" />
                 </h3>
                 <p className="text-indigo-200/70 text-sm">Todo incluido para captar más.</p>
              </div>
              <div className="mb-6">
                 <span className="text-3xl font-bold text-white">89€</span>
                 <span className="text-slate-400 text-sm"> / mes</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                 <li className="flex items-center gap-2 text-sm text-white"><Check size={16} className="text-indigo-400" /> <strong>Leads Ilimitados</strong> en tu zona</li>
                 <li className="flex items-center gap-2 text-sm text-white"><Check size={16} className="text-indigo-400" /> Alertas en tiempo real (Email/SMS)</li>
                 <li className="flex items-center gap-2 text-sm text-white"><Check size={16} className="text-indigo-400" /> Acceso CRM completo</li>
                 <li className="flex items-center gap-2 text-sm text-white"><Check size={16} className="text-indigo-400" /> Mapa interactivo avanzado</li>
                 <li className="flex items-center gap-2 text-sm text-white"><Check size={16} className="text-indigo-400" /> Prioridad 24h ante particulares</li>
              </ul>
              <button className="w-full py-2 bg-primary hover:bg-indigo-600 text-white font-bold rounded-lg shadow-lg shadow-indigo-500/25 transition-all active:scale-95">
                 Suscribirse Ahora
              </button>
           </div>

           {/* Plan 3: Agencia */}
           <div className="bg-surface border border-border rounded-xl p-6 flex flex-col hover:border-slate-600 transition-colors">
              <div className="mb-4">
                 <h3 className="text-lg font-bold text-white">Agencia / Grupo</h3>
                 <p className="text-slate-400 text-sm">Para equipos de alto rendimiento.</p>
              </div>
              <div className="mb-6">
                 <span className="text-3xl font-bold text-white">249€</span>
                 <span className="text-slate-500 text-sm"> / mes</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                 <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-emerald-500" /> <strong>5 Licencias</strong> de usuario</li>
                 <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-emerald-500" /> Panel de control de equipo</li>
                 <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-emerald-500" /> Exportación API & Excel</li>
                 <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-emerald-500" /> Cobertura Provincial (Castellón)</li>
              </ul>
              <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg font-medium transition-colors">
                 Contactar Ventas
              </button>
           </div>
        </div>

        {/* Sección: Método de Pago e Historial */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Shield size={18} className="text-slate-400" /> Método de Pago
                </h3>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-white/5 flex items-center gap-4 mb-4">
                    <div className="w-10 h-6 bg-slate-700 rounded flex items-center justify-center text-[10px] font-bold text-white">VISA</div>
                    <div className="flex-1">
                        <div className="text-sm text-white font-mono">•••• •••• •••• 4242</div>
                        <div className="text-xs text-slate-500">Expira 12/25</div>
                    </div>
                </div>
                <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                    + Añadir nueva tarjeta
                </button>
            </div>

            <div className="md:col-span-2 bg-surface border border-border rounded-xl p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Briefcase size={18} className="text-slate-400" /> Historial de Facturas
                </h3>
                <div className="space-y-1">
                    {[
                        { date: '01 Oct 2023', id: 'INV-2023-001', amount: '89,00 €', status: 'Pagado' },
                        { date: '01 Sep 2023', id: 'INV-2023-002', amount: '89,00 €', status: 'Pagado' },
                        { date: '01 Ago 2023', id: 'INV-2023-003', amount: '49,00 €', status: 'Pagado' },
                    ].map((inv, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-900/50 rounded-lg transition-colors group">
                             <div className="flex items-center gap-4">
                                 <div className="p-2 bg-slate-800 rounded text-slate-400 group-hover:text-white">
                                     <Calendar size={16} />
                                 </div>
                                 <div>
                                     <div className="text-sm font-medium text-slate-200">{inv.date}</div>
                                     <div className="text-xs text-slate-500">{inv.id}</div>
                                 </div>
                             </div>
                             <div className="flex items-center gap-6">
                                 <span className="text-sm text-white font-mono">{inv.amount}</span>
                                 <button className="text-slate-500 hover:text-indigo-400 transition-colors">
                                     <Download size={16} />
                                 </button>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default SettingsView;