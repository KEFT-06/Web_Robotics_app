import { useLanguage } from "@/src/lib/LanguageContext";
import React from 'react';
import { motion } from 'motion/react';
import { Network, WifiHigh, CheckCircle2 } from 'lucide-react';

const mockSensors = Array.from({ length: 6 }).map((_, i) => ({
  id: `SENS-${1000 + i}`,
  type: i % 2 === 0 ? 'Thermique' : 'Humidité',
  status: 'Online',
  ping: Math.floor(Math.random() * 20 + 5)
}));

export function SensorNetworkView() {
  const { t } = useLanguage();

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto min-h-screen relative font-sans">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#06B6D4] mb-2 block">Site Nkometou • Module 7</span>
        <h1 className="text-4xl lg:text-5xl font-display font-semibold text-text-main tracking-tight">{t("Réseau de Capteurs", "Sensor Network")}</h1>
        <p className="text-text-muted mt-3 max-w-2xl text-lg font-light">Disponibilité des sondes et analyse de couverture radio LoRaWAN.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-1 rounded-[2rem] overflow-hidden">
          <div className="w-full h-[400px] bg-glass-bg flex items-center justify-center relative rounded-[2rem]">
            {/* Visual placeholder for a map or topology graph */}
            <div className="absolute inset-0 bg-[#06B6D4]/5 rounded-[2rem]" style={{ backgroundImage: 'radial-gradient(circle, #06B6D4 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.3 }} />
            <Network className="w-24 h-24 text-[#06B6D4]/40 relative z-10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border border-[#06B6D4]/20 rounded-full animate-ping opacity-20" />
              <div className="w-32 h-32 border border-[#06B6D4]/20 rounded-full animate-ping opacity-40 delay-150 absolute" />
            </div>
            <div className="absolute bottom-6 left-6 font-mono text-xs text-[#06B6D4] uppercase tracking-widest bg-luxury-bg-start/50 backdrop-blur-md px-3 py-1 rounded-md">
              Topology: MESH
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-4 md:p-8 rounded-[2rem]">
          <h2 className="text-xl font-display font-semibold text-text-main mb-6 flex items-center gap-2">
            <WifiHigh className="w-5 h-5 text-[#06B6D4]" /> Liste des Nœuds
          </h2>
          <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 no-scrollbar">
            {mockSensors.map((node) => (
              <div key={node.id} className="flex items-center justify-between p-4 bg-glass-bg border border-glass-border rounded-xl">
                 <div className="flex items-center gap-3">
                   <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                   <div>
                     <div className="font-mono text-sm text-text-main font-bold">{node.id}</div>
                     <div className="text-xs text-text-muted mt-0.5">{node.type}</div>
                   </div>
                 </div>
                 <div className="text-right">
                   <div className="text-xs font-mono text-[#06B6D4]">{node.ping}ms</div>
                 </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
