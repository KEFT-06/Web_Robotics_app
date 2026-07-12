import { useLanguage } from "@/src/lib/LanguageContext";
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { AquaticDroneData } from '@/src/types';
import { MapPin, Navigation, Thermometer, TestTube, BatteryCharging, Download, Layers } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip as LeafletTooltip } from 'react-leaflet';
import L from 'leaflet';

// Custom Drone Icon using Tailwind classes
const droneIcon = new L.DivIcon({
  className: 'bg-transparent',
  html: `<div class="w-8 h-8 rounded-full border-2 border-[#10B981] bg-[#10B981]/20 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(139,127,255,0.5)]">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-main"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

import { Simulation3D } from '@/src/components/Simulation3D';
import { fetchWithFallback, mockDroneData } from '@/src/lib/mockApi';

export function AquaticDroneView() {
  const { t } = useLanguage();

  const [data, setData] = useState<AquaticDroneData | null>(null);

  useEffect(() => {
    fetchWithFallback('/api/drone/atawi', mockDroneData).then(setData);
  }, []);

  if (!data) return (
    <div className="flex-1 h-full flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-2 border-[#10B981]/30 border-t-[#10B981] rounded-full animate-spin"></div>
      <p className="font-mono text-sm tracking-widest uppercase text-[#10B981] animate-pulse">Liaison ATAWI-3A3...</p>
    </div>
  );

  const currentPos: [number, number] = [data.telemetry.coordinates.lat, data.telemetry.coordinates.lng];
  const pathCoordinates: [number, number][] = [
    [48.8540, 2.3500],
    [48.8550, 2.3510],
    [48.8560, 2.3515],
    currentPos
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto min-h-screen relative font-sans">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#10B981] mb-2 block">Site Nkometou • Flotte</span>
          <h1 className="text-4xl lg:text-5xl font-display font-semibold text-text-main tracking-tight">Drone Aquatique</h1>
          <p className="text-text-muted mt-3 max-w-2xl text-lg font-light">État de la flotte de drones et force du signal en temps réel.</p>
        </div>
        
        <div className="glass-panel px-4 py-2 rounded-full inline-flex items-center gap-3 self-start md:self-auto border border-[#10B981]/30 shadow-[0_0_15px_rgba(139,127,255,0.1)]">
          <Navigation size={14} className="text-[#10B981]" />
          <span className="font-mono text-xs tracking-widest text-text-main">Mission: <span className="font-bold">{data.missionId}</span></span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Synthetic Map representation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2 glass-panel flex flex-col relative overflow-hidden h-[450px] rounded-[2rem] border border-glass-border"
        >
          <div className="absolute inset-0 z-0">
             <Simulation3D type="aquatic" />
          </div>
          
          <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none p-4 md:p-8 flex justify-between items-start">
            <h3 className="text-sm text-text-main uppercase tracking-widest font-mono flex items-center gap-2">
               <Layers className="w-4 h-4 text-[#10B981]" /> Télémétrie MQTT (sparte/drone/telemetry)
            </h3>
          </div>
          
          <div className="mt-auto z-10 flex gap-4 p-4 md:p-8 pt-0">
             <div className="glass-panel px-4 py-2 rounded-xl text-sm font-mono text-text-main border border-glass-border">
               <span className="text-text-muted mr-2 text-[10px] uppercase">LAT</span>{data.telemetry.coordinates.lat.toFixed(6)}
             </div>
             <div className="glass-panel px-4 py-2 rounded-xl text-sm font-mono text-text-main border border-glass-border">
               <span className="text-text-muted mr-2 text-[10px] uppercase">LNG</span>{data.telemetry.coordinates.lng.toFixed(6)}
             </div>
             <div className="glass-panel px-4 py-2 rounded-xl text-sm font-mono text-text-main border border-glass-border ml-auto flex items-center gap-2">
                <BatteryCharging size={16} className="text-emerald-400" />
                {data.telemetry.battery}%
             </div>
          </div>
        </motion.div>

        {/* Quality Metrics */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="space-y-6 flex flex-col h-[450px]"
        >
          {/* pH */}
          <motion.div variants={fadeUp} className="glass-panel flex-1 rounded-[2rem] flex flex-col justify-center p-4 md:p-8 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400"><TestTube size={16} /></div>
              <span className="text-xs font-mono uppercase tracking-widest text-text-muted">Niveau de pH</span>
            </div>
            <div className="text-4xl font-display font-bold text-text-main tracking-tight">{data.waterMetrics.pH}</div>
            <div className="w-full bg-glass-bg h-1 md:h-1.5 rounded-full mt-4 overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${(data.waterMetrics.pH / 14) * 100}%` }}
                 transition={{ duration: 1 }}
                 className="h-full bg-blue-400 rounded-full" 
               />
            </div>
          </motion.div>

          {/* Turbidity */}
          <motion.div variants={fadeUp} className="glass-panel flex-1 rounded-[2rem] flex flex-col justify-center p-4 md:p-8 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500"><MapPin size={16} /></div>
              <span className="text-xs font-mono uppercase tracking-widest text-text-muted">Turbidité</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-display font-bold text-text-main tracking-tight">{data.waterMetrics.turbidity}</span>
              <span className="text-amber-500/50 font-mono text-sm tracking-widest">NTU</span>
            </div>
          </motion.div>

          {/* Temperature */}
          <motion.div variants={fadeUp} className="glass-panel flex-1 rounded-[2rem] flex flex-col justify-center p-4 md:p-8 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center border border-rose-500/20 text-rose-500"><Thermometer size={16} /></div>
              <span className="text-xs font-mono uppercase tracking-widest text-text-muted">Température de l'Eau</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-display font-bold text-text-main tracking-tight">{data.waterMetrics.temperature}</span>
              <span className="text-rose-500/50 font-mono text-sm tracking-widest">°C</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Report Generation Actions */}
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.6 }}
         className="glass-panel rounded-[2rem] p-4 md:p-8 mt-6 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div>
          <h2 className="text-xl font-display font-medium text-text-main mb-1">Carnet de Mission</h2>
          <p className="text-sm font-light text-text-muted">Générez un rapport d'inspection pour les équipes logistiques.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
           <button className="px-6 py-3 rounded-full bg-text-main text-luxury-bg-start font-semibold hover:bg-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2 outline-none">
             <Download className="w-4 h-4" /> Rapport PDF
           </button>
           <button className="px-6 py-3 rounded-full glass-panel text-text-main font-medium hover:bg-glass-bg transition-all active:scale-95 flex items-center justify-center gap-2 outline-none">
             Exporter Tracés
           </button>
        </div>
      </motion.div>
    </div>
  );
}
