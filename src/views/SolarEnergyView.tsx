import { useLanguage } from "@/src/lib/LanguageContext";
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { SolarEnergyData } from '@/src/types';
import { format } from 'date-fns';
import { BatteryCharging, Zap, Activity } from 'lucide-react';

import { fetchWithFallback, mockSolarData } from '@/src/lib/mockApi';

export function SolarEnergyView() {
  const { t } = useLanguage();

  const [energyData, setEnergyData] = useState<SolarEnergyData | null>(null);

  useEffect(() => {
    fetchWithFallback('/api/energy/solar', mockSolarData).then(setEnergyData);
  }, []);

  if (!energyData) return (
    <div className="flex-1 h-full flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-2 border-[#06B6D4]/30 border-t-[#06B6D4] rounded-full animate-spin"></div>
      <p className="font-mono text-sm tracking-widest uppercase text-[#06B6D4] animate-pulse">{t("Acquisition INA219 en cours", "INA219 acquisition in progress")}</p>
    </div>
  );

  const latest = energyData.history[energyData.history.length - 1];

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
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#06B6D4] mb-2 block">Site Nkometou • Solaire</span>
          <h1 className="text-4xl lg:text-5xl font-display font-semibold text-text-main tracking-tight">Panneaux Solaires</h1>
          <p className="text-text-muted mt-3 max-w-2xl text-lg font-light">Surveillance tension et intensité des régulateurs de charge MPPT.</p>
        </div>
        
        <div className="glass-panel px-4 py-2 rounded-full inline-flex items-center gap-3 self-start md:self-auto border border-[#06B6D4]/30 shadow-[0_0_15px_rgba(244,208,63,0.1)]">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06B6D4] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#06B6D4]"></span>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#06B6D4]">Topic: solar/site-001/power</span>
        </div>
      </motion.div>

      <motion.div 
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-[1000px] mb-8"
      >
        {/* Voltage */}
        <motion.div variants={fadeUp} whileHover={{ rotateX: 2, rotateY: -2, y: -4 }} className="glass-panel p-4 md:p-8 rounded-[2rem] group relative overflow-hidden transition-all duration-300">
           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="flex justify-between items-start mb-8">
             <h3 className="font-medium text-text-muted tracking-wider uppercase text-sm">Tension Batterie (U)</h3>
             <BatteryCharging size={20} className="text-[#10B981]" />
           </div>
           <div className="flex items-baseline gap-2">
             <span className="text-5xl font-display font-semibold text-text-main tracking-tight">{latest.voltage}</span>
             <span className="text-text-muted font-mono text-lg tracking-widest uppercase">Volts</span>
           </div>
        </motion.div>

        {/* Current */}
        <motion.div variants={fadeUp} whileHover={{ rotateX: 2, rotateY: -2, y: -4 }} className="glass-panel p-4 md:p-8 rounded-[2rem] group relative overflow-hidden transition-all duration-300">
           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="flex justify-between items-start mb-8">
             <h3 className="font-medium text-text-muted tracking-wider uppercase text-sm">Courant de charge (I)</h3>
             <Activity size={20} className="text-text-main" />
           </div>
           <div className="flex items-baseline gap-2">
             <span className="text-5xl font-display font-semibold text-text-main tracking-tight">{latest.current}</span>
             <span className="text-text-muted font-mono text-lg tracking-widest uppercase">Amps</span>
           </div>
        </motion.div>

        {/* Power */}
        <motion.div variants={fadeUp} whileHover={{ rotateX: 2, rotateY: -2, y: -4 }} className="glass-panel p-4 md:p-8 rounded-[2rem] group relative overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(244,208,63,0.1)] border border-[#06B6D4]/20">
           <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="flex justify-between items-start mb-8">
             <h3 className="font-medium text-[#06B6D4] tracking-wider uppercase text-sm">Puissance Capter (P)</h3>
             <Zap size={20} className="text-[#06B6D4] fill-[#06B6D4]/20" />
           </div>
           <div className="flex items-baseline gap-2">
             <span className="text-5xl font-display font-semibold text-[#06B6D4] tracking-tight text-shadow-glow">{latest.power}</span>
             <span className="text-[#06B6D4]/50 font-mono text-lg tracking-widest uppercase">Watts</span>
           </div>
        </motion.div>
      </motion.div>

      {/* Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="glass-panel rounded-[2rem] p-4 md:p-8 overflow-hidden relative"
      >
        <div className="mb-8 flex items-center justify-between">
           <h2 className="text-xl font-display font-semibold text-text-main flex items-center gap-2">Production Solaire (24h)</h2>
           <span className="text-xs font-mono text-text-muted tracking-widest uppercase">Fenêtre : 24h</span>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={energyData.history} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPowerLuxury" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#64748b" 
                tick={{fontSize: 10, fill: '#64748b', fontFamily: 'monospace'}} 
                tickFormatter={(val) => format(new Date(val), 'HH:mm')}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#64748b" 
                tick={{fontSize: 10, fill: '#64748b', fontFamily: 'monospace'}} 
                tickFormatter={(val) => `${val} W`} 
                tickLine={false}
                axisLine={false}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-glass-bg)', 
                  backdropFilter: 'blur(10px)',
                  borderColor: 'var(--color-glass-border)', 
                  color: 'var(--color-text-main)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px var(--color-default-border)'
                }}
                itemStyle={{ color: '#06B6D4', fontWeight: 'bold' }}
                labelStyle={{ color: 'var(--color-text-muted)', fontSize: '12px', marginBottom: '4px' }}
                labelFormatter={(val) => format(new Date(val), 'dd/MM/yyyy HH:mm')}
              />
              <Area 
                type="monotone" 
                dataKey="power" 
                stroke="#06B6D4" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorPowerLuxury)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

    </div>
  );
}
