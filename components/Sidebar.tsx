import React from 'react';
import { LayoutDashboard, Home, Map, Settings, Radar, Bell, LogOut, Users, ScanSearch } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Panel de Control' },
    { id: 'opportunities', icon: Home, label: 'Oportunidades' },
    { id: 'map', icon: Map, label: 'Mapa Interactivo' },
    { id: 'crm', icon: Users, label: 'CRM / Pipeline' },
    { id: 'scraper', icon: ScanSearch, label: 'Escáner en Vivo' },
    { id: 'settings', icon: Settings, label: 'Configuración' },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-background flex flex-col justify-between hidden md:flex transition-all duration-300">
      <div>
        <div className="flex items-center gap-3 px-6 py-8">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Radar className="w-6 h-6 text-indigo-400" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Mandat<span className="text-indigo-400">Radar</span></h1>
        </div>

        <nav className="px-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-indigo-400 border border-primary/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-surface'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-border">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-slate-400 hover:text-slate-100 rounded-lg hover:bg-surface transition-colors">
          <Bell size={18} />
          Notificaciones
          <span className="ml-auto bg-primary text-white text-xs px-2 py-0.5 rounded-full">3</span>
        </button>
        <div className="mt-4 flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
            JD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">Juan Domínguez</p>
            <p className="text-xs text-slate-500 truncate">Agencia Castelló</p>
          </div>
          <LogOut size={16} className="text-slate-500 hover:text-slate-300 cursor-pointer" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;