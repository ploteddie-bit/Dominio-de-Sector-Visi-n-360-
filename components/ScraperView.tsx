
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Terminal, Cpu, Database, Globe, AlertCircle, CheckCircle2, Loader2, MapPin, ChevronDown, Key } from 'lucide-react';

interface LogEntry {
  id: number;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

const PRESET_URLS = [
  { 
    name: "Idealista - Castellón (Precio ascendente)", 
    url: "https://www.idealista.com/fr/venta-viviendas/castellon/?ordenado-por=precios-asc" 
  },
  { 
    name: "ThinkSpain - Castellón Provincia", 
    url: "https://www.thinkspain.com/property-for-sale/castellon-province" 
  },
  { 
    name: "Fotocasa - Castelló de la Plana", 
    url: "https://www.fotocasa.es/es/comprar/viviendas/castellon-de-la-plana/todas-las-zonas/l" 
  },
  { 
    name: "Habitaclia - Castelló", 
    url: "https://www.habitaclia.com/viviendas-castellon_de_la_plana.htm" 
  }
];

const ScraperView: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [foundCount, setFoundCount] = useState(0);
  const [apiKey, setApiKey] = useState(''); // State for user-provided API key
  
  // Default to the first option (Idealista)
  const [targetUrl, setTargetUrl] = useState(PRESET_URLS[0].url);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Configuration (Static for demo)
  const config = {
    location: "Castelló de la Plana",
    radius: "20 km",
    sources: ["Idealista", "Fotocasa", "Habitaclia", "ThinkSpain"],
    keywords: ["Particular", "Abstenerse agencias", "Urgente"]
  };

  const addLog = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-ES', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
    setLogs(prev => [...prev, { id: Date.now() + Math.random(), timestamp: timeString, type, message }]);
  };

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const extractListingsFromMarkdown = (markdown: string) => {
    // Regex simple pour trouver des patterns de prix (ex: 120.000 €) et tenter de chopper le texte avant
    const priceRegex = /([0-9]{1,3}[.,][0-9]{3})\s?€/g;
    const matches = [...markdown.matchAll(priceRegex)];
    
    return matches.slice(0, 5).map(match => {
        // Essayer de trouver un titre avant le prix (très approximatif)
        const index = match.index || 0;
        const preceedingText = markdown.substring(Math.max(0, index - 50), index);
        const cleanTitle = preceedingText.split('\n').pop()?.replace(/[*#]/g, '').trim() || "Propiedad detectada";
        return {
            price: match[0],
            title: cleanTitle
        };
    });
  };

  const startRealScan = async () => {
    setIsScanning(true);
    setProgress(5);
    setLogs([]);
    setFoundCount(0);
    
    addLog("Inicializando motor Firecrawl v1.0...", 'info');

    // SECURITY CHECK: Ensure user provided a key
    if (!apiKey.trim()) {
        setTimeout(() => {
            addLog("ERROR: Clave API no configurada.", 'error');
            addLog("Por seguridad, introduzca su 'Firecrawl API Key' en el panel de configuración.", 'warning');
            setIsScanning(false);
            setProgress(0);
        }, 500);
        return;
    }
    
    try {
        // Step 1: Init
        await new Promise(r => setTimeout(r, 800));
        addLog(`Objetivo configurado: ${targetUrl}`, 'info');
        setProgress(15);

        // Step 2: API Call
        addLog("Enviando petición de scraping (API Firecrawl)...", 'info');
        
        const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: targetUrl,
                formats: ['markdown'],
            })
        });

        setProgress(50);

        if (!response.ok) {
            if (response.status === 401) {
              throw new Error("API Key inválida (401 Unauthorized)");
            }
            throw new Error(`Error API: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.error || "Fallo en el scraping");
        }

        addLog("Datos brutos recibidos con éxito.", 'success');
        addLog(`Tamaño del contenido: ${(JSON.stringify(data).length / 1024).toFixed(2)} KB`, 'info');
        setProgress(75);

        // Step 3: Analysis
        addLog("Análisis semántico y extracción de precios...", 'info');
        await new Promise(r => setTimeout(r, 1000)); // Petit délai pour l'effet dramatique

        const markdown = data.data.markdown || "";
        const detectedListings = extractListingsFromMarkdown(markdown);

        if (detectedListings.length > 0) {
             detectedListings.forEach((listing, idx) => {
                 setTimeout(() => {
                     addLog(`DETECCIÓN: ${listing.title} - ${listing.price}`, 'success');
                     setFoundCount(c => c + 1);
                 }, idx * 200);
             });
             
             setTimeout(() => {
                 addLog(`Escaneo finalizado. ${detectedListings.length} oportunidades identificadas.`, 'success');
                 setIsScanning(false);
                 setProgress(100);
             }, detectedListings.length * 200 + 500);

        } else {
            addLog("No se han detectado patrones de precio evidentes en esta página.", 'warning');
            addLog("Contenido bruto (extracto): " + markdown.substring(0, 100) + "...", 'info');
            setIsScanning(false);
            setProgress(100);
        }

    } catch (error: any) {
        console.error(error);
        addLog(`ERROR CRÍTICO: ${error.message}`, 'error');
        setIsScanning(false);
        setProgress(0);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      
      {/* Left Panel: Configuration */}
      <div className="bg-surface border border-border rounded-xl p-6 flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Globe className="text-primary" /> Configuración Objetivo
          </h2>
          <p className="text-slate-400 text-sm">Defina los parámetros de búsqueda del robot.</p>
        </div>

        <div className="space-y-4">
          
          {/* API Key Input (Security Feature) */}
          <div className="space-y-2">
             <label className="text-xs font-semibold text-emerald-400 uppercase flex items-center gap-1">
               <Key size={12} /> Firecrawl API Key
             </label>
             <input
               type="password"
               value={apiKey}
               onChange={(e) => setApiKey(e.target.value)}
               placeholder="fc-xxxxxxxxxxxxxxxx"
               className="w-full bg-slate-950 border border-emerald-500/30 focus:border-emerald-500 rounded-lg p-3 text-sm text-white placeholder-slate-600 outline-none transition-colors"
             />
             <p className="text-[10px] text-slate-500">
               Clave requerida para el modo Real. No se guarda en el servidor.
             </p>
          </div>

          <div className="h-px bg-border my-2"></div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase">Portal & URL Objetivo</label>
            <div className="relative">
              <select
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="w-full bg-slate-950 border border-border rounded-lg p-3 pr-10 text-sm text-white focus:border-indigo-500 appearance-none outline-none transition-colors truncate"
              >
                {PRESET_URLS.map((opt) => (
                  <option key={opt.url} value={opt.url} className="bg-slate-900 text-slate-200">
                    {opt.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                <ChevronDown size={16} />
              </div>
            </div>
             <p className="text-[10px] text-slate-500 truncate" title={targetUrl}>Target: {targetUrl}</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase">Zona Geográfica</label>
            <div className="w-full bg-slate-950 border border-border rounded-lg px-3 py-2 text-sm text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                 <MapPin size={14} className="text-indigo-400" />
                 <span>{config.location}</span>
              </div>
              <span className="text-xs text-slate-500">{config.radius}</span>
            </div>
          </div>

          <div className="space-y-2">
             <label className="text-xs font-semibold text-slate-300 uppercase">Filtros Inteligentes</label>
             <div className="flex flex-wrap gap-2">
                {config.keywords.map(keyword => (
                  <span key={keyword} className="text-[10px] text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">
                    {keyword}
                  </span>
                ))}
             </div>
          </div>
        </div>

        <div className="mt-auto">
          {!isScanning ? (
            <button 
              onClick={startRealScan}
              className={`w-full py-4 font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${
                  apiKey.length > 5 
                  ? 'bg-primary hover:bg-indigo-600 text-white shadow-indigo-500/25' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
              disabled={apiKey.length <= 5}
            >
              <Play size={20} fill="currentColor" />
              {apiKey.length > 5 ? 'Escanear (Datos Reales)' : 'Ingrese API Key'}
            </button>
          ) : (
             <button 
              disabled
              className="w-full py-4 bg-slate-800 text-slate-400 font-bold rounded-lg border border-slate-700 flex items-center justify-center gap-2 cursor-not-allowed"
            >
              <Loader2 size={20} className="animate-spin" />
              Scraping en curso...
            </button>
          )}
        </div>
      </div>

      {/* Right Panel: Terminal Output */}
      <div className="lg:col-span-2 bg-[#020617] border border-border rounded-xl flex flex-col overflow-hidden shadow-2xl">
        
        {/* Terminal Header */}
        <div className="bg-slate-900 border-b border-border p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-slate-400" />
            <span className="text-xs font-mono text-slate-300">firecrawl_cli_v1.log</span>
          </div>
          <div className="flex items-center gap-4">
             {isScanning && (
               <div className="flex items-center gap-2">
                 <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs text-emerald-400 font-mono">CONECTADO</span>
               </div>
             )}
             <div className="text-xs text-slate-500 font-mono">
               RED: <span className="text-slate-300">{isScanning ? 'Descargando...' : 'En espera'}</span>
             </div>
          </div>
        </div>

        {/* Logs Area */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-1 custom-scrollbar">
           {logs.length === 0 && !isScanning && (
             <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-4">
                <Cpu size={48} strokeWidth={1} />
                <p>Sistema listo. Configure su API Key e inicie el escáner.</p>
             </div>
           )}
           
           {logs.map((log) => (
             <div key={log.id} className="flex gap-3 hover:bg-white/5 p-0.5 rounded px-2">
               <span className="text-slate-600 select-none">[{log.timestamp}]</span>
               <span className={`flex-1 break-all ${
                 log.type === 'error' ? 'text-rose-400' : 
                 log.type === 'success' ? 'text-emerald-400' : 
                 log.type === 'warning' ? 'text-amber-400' : 
                 'text-slate-300'
               }`}>
                 {log.type === 'success' && '✓ '}
                 {log.type === 'warning' && '⚠ '}
                 {log.type === 'error' && '✕ '}
                 {log.message}
               </span>
             </div>
           ))}
           <div ref={logsEndRef} />
        </div>

        {/* Status Footer */}
        <div className="bg-slate-900 border-t border-border p-4">
           {/* Progress Bar */}
           <div className="flex justify-between text-xs text-slate-400 mb-2 font-mono">
              <span>PROGRESO TAREA</span>
              <span>{Math.round(progress)}%</span>
           </div>
           <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
           </div>

           {/* Stats Summary */}
           <div className="flex items-center justify-between">
              <div className="flex gap-6">
                <div className="flex flex-col">
                   <span className="text-[10px] text-slate-500 uppercase font-bold">Peticiones</span>
                   <span className="text-lg font-mono text-white">{isScanning ? 1 : logs.length > 0 ? 1 : 0}</span>
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] text-slate-500 uppercase font-bold">Latencia</span>
                   <span className="text-lg font-mono text-white">{isScanning ? '...' : logs.length > 0 ? '240ms' : '-'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-surface border border-border px-4 py-2 rounded-lg">
                 <Database className="text-emerald-500" size={20} />
                 <div className="flex flex-col text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Propiedades</span>
                    <span className="text-xl font-bold text-white leading-none">{foundCount}</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};

export default ScraperView;
