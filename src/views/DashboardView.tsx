import { useLanguage } from "@/src/lib/LanguageContext";
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Battery, Droplet, AlertTriangle as PackageAlert, Link2, Database, Network, Cpu, Map } from 'lucide-react';
import { EnvironmentData, SolarEnergyData, AquaticDroneData, StockItem } from '@/src/types';

import { fetchWithFallback, mockEnvironmentData, mockSolarData, mockDroneData, mockStockData } from '@/src/lib/mockApi';

export function DashboardView() {
  const { t } = useLanguage();

  const [data, setData] = useState<{
    env: EnvironmentData | null;
    energy: SolarEnergyData | null;
    drone: AquaticDroneData | null;
    stock: StockItem[] | null;
  }>({ env: null, energy: null, drone: null, stock: null });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [envData, energyData, droneData, stockData] = await Promise.all([
          fetchWithFallback('/api/environment', mockEnvironmentData),
          fetchWithFallback('/api/energy/solar', mockSolarData),
          fetchWithFallback('/api/drone/atawi', mockDroneData),
          fetchWithFallback('/api/stock', mockStockData)
        ]);
        
        setData({
          env: envData,
          energy: energyData,
          drone: droneData,
          stock: stockData
        });
      } catch (err) {
        console.error("Erreur inattendue", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return (
    <div className="flex-1 h-full flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-2 border-[#10B981]/30 border-t-[#10B981] rounded-full animate-spin"></div>
      <p className="font-mono text-sm tracking-widest uppercase text-[#10B981] animate-pulse">Synchronisation des Flux</p>
    </div>
  );

  const activeAlarms = data.stock?.filter(item => item.status !== 'OK').length || 0;
  const avgTemp = data.env?.nodes && data.env.nodes.length > 0 
    ? data.env.nodes.reduce((acc, curr) => acc + curr.temp, 0) / data.env.nodes.length 
    : 0;

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

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
        className="mb-12"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#10B981] mb-2 block">Command & Control</span>
        <h1 className="text-4xl lg:text-5xl font-display font-semibold text-text-main tracking-tight">{t("Supervision Globale", "Global Supervision")}</h1>
        <p className="text-text-muted mt-3 max-w-2xl text-lg font-light">{t("Vue générale des installations, flotte de drones et état du réseau de capteurs.", "General view of facilities, drone fleet, and sensor network status.")}</p>
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 perspective-[1000px]"
      >
        {/* Core Infrastructure */}
        <motion.div variants={fadeUp} className="glass-panel p-6 rounded-[2rem] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-medium text-text-muted">{t("Santé Système Global", "Global System Health")}</h3>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400"><Database size={18} /></div>
          </div>
          <div>
            <div className="text-4xl font-display font-semibold text-text-main tracking-tight text-emerald-400">{t("NOMINAL", "NOMINAL")}</div>
            <div className="mt-2 flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
               <p className="text-xs font-mono text-emerald-400/80 uppercase tracking-widest">{t("Tous systèmes en ligne", "All systems online")}</p>
            </div>
          </div>
        </motion.div>

        {/* Cloud & AI Load */}
        <motion.div variants={fadeUp} className="glass-panel p-6 rounded-[2rem] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-medium text-text-muted">{t("Edge AI & Analytics", "Edge AI & Analytics")}</h3>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400"><Network size={18} /></div>
          </div>
          <div>
            <div className="text-4xl font-display font-semibold text-text-main tracking-tight">42<span className="text-xl text-text-muted ml-1">TFLOPS</span></div>
            <div className="mt-2 flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
               <p className="text-xs font-mono text-text-muted uppercase tracking-widest">{t("Grappe VPR-7 Active", "VPR-7 Cluster Active")}</p>
            </div>
          </div>
        </motion.div>
        
        {/* Network & Ingestion */}
        <motion.div variants={fadeUp} className="glass-panel p-6 rounded-[2rem] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-medium text-text-muted">{t("MQTT Ingestion", "MQTT Ingestion")}</h3>
            <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center border border-[#06B6D4]/20 text-[#06B6D4]"><Link2 size={18} /></div>
          </div>
          <div>
            <div className="text-4xl font-display font-semibold text-text-main tracking-tight">4.2<span className="text-xl text-text-muted ml-1">k/s</span></div>
            <div className="mt-2 flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
               <p className="text-xs font-mono text-text-muted uppercase tracking-widest">{t("Messages Broker MQTT", "MQTT Broker Messages")}</p>
            </div>
          </div>
        </motion.div>

        {/* Energy Array */}
        <motion.div variants={fadeUp} className="glass-panel p-6 rounded-[2rem] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-medium text-text-muted">{t("Réseau Solaire", "Solar Array")}</h3>
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 text-yellow-400"><Battery size={18} /></div>
          </div>
          <div>
            <div className="text-4xl font-display font-semibold text-text-main tracking-tight">{data.energy?.batteryLevel}<span className="text-xl text-text-muted ml-1">%</span></div>
            <div className="w-full bg-glass-bg h-1.5 rounded-full mt-2 overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${data.energy?.batteryLevel}%` }}
                 transition={{ duration: 1.5, ease: "easeOut" }}
                 className="h-full bg-gradient-to-r from-yellow-500 to-amber-300 rounded-full" 
               />
            </div>
          </div>
        </motion.div>

        {/* Section title for Fleet */}
        <motion.div variants={fadeUp} className="col-span-1 md:col-span-2 xl:col-span-4 mt-4">
            <h2 className="text-xl font-display font-semibold text-text-main flex items-center gap-2">
                <Map className="w-5 h-5 text-blue-400" /> {t("Supervision Flotte Tactique", "Tactical Fleet Supervision")}
            </h2>
            <div className="w-full h-px bg-glass-border mt-4"></div>
        </motion.div>

        {/* Aerial */}
        <motion.div variants={fadeUp} className="glass-panel p-6 rounded-[2rem] xl:col-span-1 border-t-4 border-t-blue-500/50">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-medium text-text-main">{t("Flotte Aérienne", "Aerial Fleet")}</h3>
            <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-mono rounded tracking-widest">DRONE</span>
          </div>
          <div className="space-y-4">
             <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">Status</span>
                <span className="font-mono text-text-main">{t("Inspection Barrage", "Dam Inspection")}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">Altitude</span>
                <span className="font-mono text-blue-400">145 m</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">Batterie</span>
                <span className="font-mono text-text-main">78%</span>
             </div>
          </div>
        </motion.div>

        {/* Aquatic */}
        <motion.div variants={fadeUp} className="glass-panel p-6 rounded-[2rem] xl:col-span-1 border-t-4 border-t-cyan-500/50">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-medium text-text-main">{t("Flotte Aquatique", "Aquatic Fleet")}</h3>
            <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-mono rounded tracking-widest">ATAWI-3A3</span>
          </div>
          <div className="space-y-4">
             <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">Status</span>
                <span className="font-mono text-text-main">{data.drone?.status || 'En Mission'}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">Profondeur</span>
                <span className="font-mono text-cyan-400">12.4 m</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">pH Eau</span>
                <span className="font-mono text-text-main">{data.drone?.waterMetrics.pH || 7.2}</span>
             </div>
          </div>
        </motion.div>

        {/* Terrestrial */}
        <motion.div variants={fadeUp} className="glass-panel p-6 rounded-[2rem] xl:col-span-1 border-t-4 border-t-emerald-500/50">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-medium text-text-main">{t("Flotte Terrestre", "Terrestrial Fleet")}</h3>
            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono rounded tracking-widest">ROVER</span>
          </div>
          <div className="space-y-4">
             <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">Status</span>
                <span className="font-mono text-text-main">{t("Patrouille Usine", "Factory Patrol")}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">Vitesse</span>
                <span className="font-mono text-emerald-400">3.4 m/s</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">Obstacles (LiDAR)</span>
                <span className="font-mono text-text-main">0 / Clear</span>
             </div>
          </div>
        </motion.div>

        {/* Maintenance / Stock Alarms */}
        <motion.div variants={fadeUp} className={`glass-panel p-6 rounded-[2rem] xl:col-span-1 border-t-4 ${activeAlarms > 0 ? 'border-t-rose-500/50' : 'border-t-[#10B981]/50'}`}>
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-medium text-text-main">{t("Logistique & Stock", "Logistics & Stock")}</h3>
            <span className={`px-2 py-1 text-[10px] font-mono rounded tracking-widest ${activeAlarms > 0 ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>ALERTS</span>
          </div>
          <div className="space-y-4">
             <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">Alertes Critiques</span>
                <span className={`font-mono ${activeAlarms > 0 ? 'text-rose-400 font-bold' : 'text-emerald-400'}`}>{activeAlarms > 0 ? activeAlarms : '0'}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">Capteurs Temp</span>
                <span className="font-mono text-text-main">{avgTemp.toFixed(1)}°C (Avg)</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">Prochaine Maint.</span>
                <span className="font-mono text-text-main">J-14</span>
             </div>
          </div>
        </motion.div>

      </motion.div>
      
      {/* Topology Diagram */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-12"
      >
        <h2 className="text-xl font-display font-semibold text-text-main mb-6 flex items-center gap-2"><Network className="w-5 h-5 text-[#10B981]" /> {t("État de l'infrastructure réseau", "Network Infrastructure Status")}</h2>
        <div className="glass-panel rounded-[2rem] p-4 md:p-8 overflow-hidden relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 w-full max-w-5xl mx-auto">
            
            {/* Edge Devices */}
            <div className="flex flex-col gap-4 w-full md:w-64">
               <div className="px-6 py-4 rounded-xl bg-glass-bg border border-glass-border flex items-center gap-3 backdrop-blur-sm shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-shadow">
                 <Cpu className="w-5 h-5 text-[#10B981]" />
                 <div className="flex flex-col">
                   <span className="font-sans text-sm text-text-main font-medium">{t("Nœuds ESP32", "ESP32 Nodes")}</span>
                   <span className="font-mono text-[10px] text-text-muted tracking-wider">MQTT / JSON</span>
                 </div>
               </div>
               <div className="px-6 py-4 rounded-xl bg-glass-bg border border-glass-border flex items-center gap-3 backdrop-blur-sm shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-shadow">
                 <Activity className="w-5 h-5 text-emerald-400" />
                 <div className="flex flex-col">
                   <span className="font-sans text-sm text-text-main font-medium">{t("Passerelle LoRaWAN", "LoRaWAN Gateway")}</span>
                   <span className="font-mono text-[10px] text-text-muted tracking-wider">SX1276 / RF</span>
                 </div>
               </div>
            </div>

            {/* Path 1 */}
            <div className="hidden md:flex flex-1 items-center justify-center relative">
               <div className="w-full h-px bg-gradient-to-r from-[#10B981]/20 via-[#10B981]/50 to-[#10B981]/20"></div>
               <div className="absolute px-3 py-1 rounded bg-[#0A0A0F] border border-glass-border font-mono text-[10px] text-[#10B981] tracking-widest flex items-center gap-2">
                 <div className="w-1 h-3 bg-[#10B981] animate-pulse"></div> INGEST
               </div>
            </div>

            {/* Core Broker */}
            <div className="flex flex-col gap-3 items-center z-10 shrink-0">
               <div className="w-32 h-32 rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center flex-col text-text-main shadow-[0_0_40px_rgba(139,127,255,0.15)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#10B981]/5 group-hover:bg-[#10B981]/10 transition-colors" />
                  <Database className="w-8 h-8 text-text-main mb-2" strokeWidth={1.5} />
                  <span className="font-bold font-display">Broker MQ</span>
                  <span className="text-[10px] font-mono text-[#10B981] tracking-widest uppercase mt-1">Mosquitto</span>
               </div>
            </div>

            {/* Path 2 */}
            <div className="hidden md:flex flex-1 items-center justify-center relative">
               <div className="w-full h-px bg-gradient-to-r from-emerald-500/20 via-emerald-500/50 to-emerald-500/20"></div>
               <div className="absolute px-3 py-1 rounded bg-[#0A0A0F] border border-glass-border font-mono text-[10px] text-emerald-400 tracking-widest flex items-center gap-2">
                 <Link2 className="w-3 h-3" /> REST API
               </div>
            </div>
            
            {/* Storage Layer */}
            <div className="flex flex-col gap-4 w-full md:w-64">
               <div className="px-6 py-4 rounded-xl bg-glass-bg border border-glass-border flex items-center gap-3 backdrop-blur-sm shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-shadow">
                 <Map className="w-5 h-5 text-[#06B6D4]" />
                 <div className="flex flex-col">
                   <span className="font-sans text-sm text-text-main font-medium">PostgreSQL/GIS</span>
                   <span className="font-mono text-[10px] text-text-muted tracking-wider">SPATIAL DATA</span>
                 </div>
               </div>
               <div className="px-6 py-4 rounded-xl bg-glass-bg border border-glass-border flex items-center gap-3 backdrop-blur-sm shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-shadow">
                 <Activity className="w-5 h-5 text-rose-400" />
                 <div className="flex flex-col">
                   <span className="font-sans text-sm text-text-main font-medium">InfluxDB Store</span>
                   <span className="font-mono text-[10px] text-text-muted tracking-wider">TIME-SERIES</span>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Historique des événements */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-12 mb-8"
      >
        <h2 className="text-xl font-display font-semibold text-text-main mb-6 flex items-center gap-2"><Activity className="w-5 h-5 text-[#10B981]" /> {t("Historique des Événements", "Event History")}</h2>
        <div className="glass-panel rounded-[2rem] p-1 overflow-hidden">
          <div className="bg-[#0A0A0F]/80 rounded-[1.8rem] overflow-hidden p-6">
            <div className="flex flex-col gap-4">
              {[
                { time: "09:42:15", type: "UPDATE", msg: t("Transmission télémétrie terminée (Drone ATAWI-3A3).", "Telemetry transmission completed (Drone ATAWI-3A3)."), status: "success" },
                { time: "08:15:22", type: "SYSTEM", msg: t("Pression pompe P-04 (Yaoundé) stabilisée.", "Pump pressure P-04 (Yaoundé) stabilized."), status: "success" },
                { time: "07:30:00", type: "SYSTEM", msg: t("Redémarrage programmé du broker Mosquitto.", "Scheduled restart of Mosquitto broker."), status: "info" },
                { time: "06:12:45", type: "UPDATE", msg: t("Contrôle de turbidité effectué (Site Nkometou).", "Turbidity check performed (Site Nkometou)."), status: "success" },
                { time: "04:00:00", type: "MAINTENANCE", msg: t("Sauvegarde de la base PostgreSQL terminée.", "PostgreSQL database backup completed."), status: "success" },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-glass-bg transition-colors border border-transparent hover:border-glass-border group cursor-default">
                  <div className="font-mono text-xs text-text-muted pt-1 shrink-0">[{log.time}]</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full border 
                        ${log.status === 'success' ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20' : 
                          log.status === 'warning' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                          log.status === 'critical' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                          'bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]/20'}`}>
                        {log.type}
                      </span>
                    </div>
                    <p className="text-sm font-light text-text-muted group-hover:text-text-main transition-colors">{log.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
