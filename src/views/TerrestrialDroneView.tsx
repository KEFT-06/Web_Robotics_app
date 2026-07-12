import { useLanguage } from "@/src/lib/LanguageContext";
import React from 'react';
import { motion } from 'motion/react';
import { Package, MapPin, Gauge, ShieldAlert } from 'lucide-react';
import { Simulation3D } from '@/src/components/Simulation3D';

export function TerrestrialDroneView() {
  const { t } = useLanguage();

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto min-h-screen relative font-sans">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400 mb-2 block">{t("Site Industriel • Flotte Terrestre", "Industrial Site • Terrestrial Fleet")}</span>
        <h1 className="text-4xl lg:text-5xl font-display font-semibold text-text-main tracking-tight">{t("Drone Terrestre", "Terrestrial Drone")}</h1>
        <p className="text-text-muted mt-3 max-w-2xl text-lg font-light">{t("Navigation autonome et simulation de rover d'inspection terrestre en environnement contraint.", "Autonomous navigation and terrestrial inspection rover simulation in constrained environment.")}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6 rounded-[2rem] flex items-center gap-4">
          <div className="p-4 bg-emerald-500/10 rounded-2xl"><Gauge className="w-6 h-6 text-emerald-400" /></div>
          <div>
            <div className="text-xs font-mono text-text-muted mb-1">{t("Vitesse de croisière", "Cruising speed")}</div>
            <div className="text-2xl font-semibold text-text-main">3.4 <span className="text-sm font-normal text-text-muted">m/s</span></div>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 rounded-[2rem] flex items-center gap-4">
          <div className="p-4 bg-emerald-500/10 rounded-2xl"><MapPin className="w-6 h-6 text-emerald-400" /></div>
          <div>
            <div className="text-xs font-mono text-text-muted mb-1">{t("Points de passage franchis", "Waypoints passed")}</div>
            <div className="text-2xl font-semibold text-text-main">14 <span className="text-sm font-normal text-text-muted">/ 25</span></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6 rounded-[2rem] flex items-center gap-4">
          <div className="p-4 bg-emerald-500/10 rounded-2xl"><ShieldAlert className="w-6 h-6 text-emerald-400" /></div>
          <div>
            <div className="text-xs font-mono text-text-muted mb-1">{t("Détection Obstacles", "Obstacle Detection")}</div>
            <div className="text-2xl font-semibold text-text-main">{t("Actif", "Active")} <span className="text-sm font-normal text-text-muted">LiDAR</span></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="md:col-span-3 glass-panel p-1 rounded-[2rem] mt-6">
          <div className="w-full h-[500px] rounded-[2rem] relative overflow-hidden flex flex-col items-center justify-center border border-glass-border">
             <div className="absolute inset-0 z-0">
               <Simulation3D type="terrestrial" />
             </div>
             
             {/* HUD overlays */}
             <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 font-mono text-xs text-text-muted flex items-center gap-2">
                   <div className="w-2 h-2 bg-emerald-500 animate-pulse rounded-full" />
                   {t("AUTO-NAVIGATION", "AUTO-NAVIGATION")}
                </div>
                <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 font-mono text-xs text-text-muted flex justify-between gap-4">
                   <span>{t("Pente", "Slope")}</span>
                   <span className="text-emerald-400">4.2°</span>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
