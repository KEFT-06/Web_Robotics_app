import { useLanguage } from "@/src/lib/LanguageContext";
import React from 'react';
import { motion } from 'motion/react';
import { Plane, Navigation2, Compass, Wind } from 'lucide-react';
import { Simulation3D } from '@/src/components/Simulation3D';

export function AerospaceView() {
  const { t } = useLanguage();

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto min-h-screen relative font-sans">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#3B82F6] mb-2 block">{t("Site Nkometou • Flotte Aérienne", "Nkometou Site • Aerial Fleet")}</span>
        <h1 className="text-4xl lg:text-5xl font-display font-semibold text-text-main tracking-tight">{t("Drone Aérospatial", "Aerospace Drone")}</h1>
        <p className="text-text-muted mt-3 max-w-2xl text-lg font-light">{t("Télémétrie en direct et simulation d'environnement aérien.", "Live telemetry and aerial environment simulation.")}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6 rounded-[2rem] flex items-center gap-4">
          <div className="p-4 bg-[#3B82F6]/10 rounded-2xl"><Navigation2 className="w-6 h-6 text-[#3B82F6]" /></div>
          <div>
            <div className="text-xs font-mono text-text-muted mb-1">Altitude (MSL)</div>
            <div className="text-2xl font-semibold text-text-main">1,240 <span className="text-sm font-normal text-text-muted">m</span></div>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 rounded-[2rem] flex items-center gap-4">
          <div className="p-4 bg-[#10B981]/10 rounded-2xl"><Compass className="w-6 h-6 text-[#10B981]" /></div>
          <div>
            <div className="text-xs font-mono text-text-muted mb-1">Cap Véritable (HDG)</div>
            <div className="text-2xl font-semibold text-text-main">342° <span className="text-sm font-normal text-text-muted">NNW</span></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6 rounded-[2rem] flex items-center gap-4">
          <div className="p-4 bg-[#8B5CF6]/10 rounded-2xl"><Wind className="w-6 h-6 text-[#8B5CF6]" /></div>
          <div>
            <div className="text-xs font-mono text-text-muted mb-1">Vitesse Air (TAS)</div>
            <div className="text-2xl font-semibold text-text-main">124 <span className="text-sm font-normal text-text-muted">kts</span></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="md:col-span-3 glass-panel p-1 rounded-[2rem] mt-6">
          <div className="w-full h-[500px] rounded-[2rem] relative overflow-hidden flex flex-col items-center justify-center border border-glass-border">
             <div className="absolute inset-0 z-0">
               <Simulation3D type="aerial" />
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
