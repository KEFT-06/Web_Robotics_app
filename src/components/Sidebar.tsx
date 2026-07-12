import React, { useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { 
  Activity, 
  Battery, 
  Map as MapIcon, 
  Package, 
  LayoutDashboard,
  Settings,
  LogOut,
  Moon,
  Sun,
  Globe,
  Brain,
  Video,
  Plane,
  Network,
  TrendingUp,
  Cpu,
  Info,
  X,
  Box,
  Terminal
} from 'lucide-react';
import { Logo } from '@/src/components/Logo';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onLogout?: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  lang: string;
  toggleLanguage: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ currentView, setCurrentView, onLogout, isDarkMode, setIsDarkMode, lang, toggleLanguage, isOpen = false, onClose }: SidebarProps) {
  const isEn = lang === 'EN';

  const navItems = [
    { id: 'dashboard', label: isEn ? 'Global Dashboard' : 'Vue Globale', icon: LayoutDashboard },
    { id: 'mod1', label: isEn ? 'Central Control' : 'Contrôle Central', icon: Cpu },
    { id: 'mod2', label: isEn ? 'Predictive Analysis' : 'Analyse Prédictive', icon: TrendingUp },
    { id: 'environment', label: isEn ? 'Environment' : 'Surveillance', icon: Activity },
    { id: 'solar', label: isEn ? 'Solar Power' : 'Énergie Solaire', icon: Battery },
    { id: 'simulation', label: isEn ? 'ROS 2 Simulation' : 'Simulation ROS 2', icon: Box },
    { id: 'mod5', label: isEn ? 'Artificial Intelligence' : 'Intelligence Artificielle', icon: Brain },
    { id: 'drone', label: isEn ? 'Aquatic Drone' : 'Drone Aquatique', icon: MapIcon },
    { id: 'terrestrial', label: isEn ? 'Terrestrial Drone' : 'Drone Terrestre', icon: Package },
    { id: 'mod7', label: isEn ? 'Sensor Network' : 'Réseau de Capteurs', icon: Network },
    { id: 'mod8', label: isEn ? 'Aerospace Drone' : 'Drone Aérospatial', icon: Plane },
    { id: 'mod9', label: isEn ? 'Video Processing' : 'Traitement Vidéo', icon: Video },
    { id: 'stock', label: isEn ? 'Stock & Logistics' : 'Stock & Magasin', icon: Package },
    { id: 'settings', label: isEn ? 'Settings' : 'Paramètres', icon: Settings },
    { id: 'claude', label: isEn ? 'Claude Code Chat' : 'Chat Claude Code', icon: Terminal },
    { id: 'about', label: isEn ? 'About' : 'À propos', icon: Info },
  ];

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && onClose) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const sidebarContent = (
    <aside className="w-72 glass-panel border-r border-glass-border h-full flex flex-col bg-luxury-bg-start md:bg-transparent shadow-2xl md:shadow-none">
      <div className="p-8 flex items-center justify-between xl:justify-center gap-4 relative shrink-0">
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-glass-border to-transparent hidden md:block" />
        <div className="flex flex-col items-center justify-center w-full">
          <Logo size="md" className="mb-2" />
          <span className="text-[10px] text-[#06B6D4] uppercase font-mono tracking-widest flex items-center gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse"></span>
            {isEn ? 'Supervisor' : 'Superviseur'}
          </span>
        </div>
        <button className="md:hidden p-2 text-text-muted hover:text-text-main" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      
      <nav className="flex-1 py-4 md:py-8 flex flex-col gap-2 px-6 overflow-y-auto no-scrollbar">
        <div className="px-4 mb-2 md:mb-4 text-[10px] font-medium text-text-muted uppercase tracking-[0.2em] font-mono shrink-0">
          {isEn ? 'System Modules' : 'Modules Système'}
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 w-full text-left relative overflow-hidden group shrink-0",
                isActive 
                  ? "bg-text-main/10 text-text-main shadow-[0_0_20px_rgba(16,185,129,0.05)] border border-glass-border" 
                  : "text-text-muted hover:text-text-main hover:bg-glass-bg border border-transparent"
              )}
            >
              {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#10B981] rounded-r-full" />}
              <Icon size={18} className={isActive ? "text-[#10B981]" : "group-hover:text-text-main transition-colors"} />
              <span className="font-sans line-clamp-1">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6 relative shrink-0">
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />
        
        <div className="flex items-center justify-between mb-4 mt-2 px-2">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-glass-bg border border-glass-border text-text-muted hover:text-text-main transition-colors outline-none"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button 
            onClick={toggleLanguage}
            className="px-4 py-2 rounded-full flex items-center gap-2 bg-glass-bg border border-glass-border text-text-muted hover:text-text-main transition-colors text-xs font-mono font-bold outline-none"
          >
            <Globe size={14} />
            {lang}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 w-full transition-all border border-transparent hover:border-rose-500/20"
          >
            <LogOut size={18} />
            {isEn ? 'Logout' : 'Déconnexion'}
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden md:block h-screen sticky top-0 z-20">
        {sidebarContent}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 md:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
