import { useLanguage } from "@/src/lib/LanguageContext";
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { EnvironmentData } from '@/src/types';
import { Thermometer, Droplet, Wind, CloudRain, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { format } from 'date-fns';

import { fetchWithFallback, mockEnvironmentData } from '@/src/lib/mockApi';

export function EnvironmentView() {
  const { t } = useLanguage();

  const [data, setData] = useState<EnvironmentData | null>(null);

  useEffect(() => {
    fetchWithFallback('/api/environment', mockEnvironmentData).then(setData);
  }, []);

  if (!data) return (
    <div className="flex-1 h-full flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-2 border-[#06B6D4]/30 border-t-[#06B6D4] rounded-full animate-spin"></div>
      <p className="font-mono text-sm tracking-widest uppercase text-[#06B6D4] animate-pulse">Acquisition Modbus/TCP...</p>
    </div>
  );

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  // Generate synthetic history for the chart
  const historyData = Array.from({ length: 24 }).map((_, i) => ({
    time: new Date(Date.now() - (24 - i) * 3600000).toISOString(),
    temp: 20 + Math.random() * 5 * Math.sin(i / 3),
    humidity: 40 + Math.random() * 10 * Math.cos(i / 2)
  }));

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto min-h-screen relative font-sans">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#06B6D4] mb-2 block">{t("Capteurs • Module 3", "Sensors • Module 3")}</span>
          <h1 className="text-4xl lg:text-5xl font-display font-semibold text-text-main tracking-tight">{t("Capteurs Environnement", "Environment Sensors")}</h1>
          <p className="text-text-muted mt-3 max-w-2xl text-lg font-light">{t("Sondes thermiques et hygrométriques des bâtiments et lignes de froid.", "Thermal and hygrometric probes of buildings and cold lines.")}</p>
        </div>
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {data.nodes.map((node: any) => (
          <motion.div key={node.id} variants={fadeUp} className="glass-panel p-6 rounded-[2rem] group relative overflow-hidden transition-all duration-300">
             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-mono font-bold tracking-widest text-[#06B6D4]">{node.id}</h3>
              <div className={`w-2 h-2 rounded-full ${node.temp < 30 ? 'bg-[#10B981]' : 'bg-rose-500'} animate-pulse shadow-[0_0_8px_currentColor]`} />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-muted flex items-center gap-2"><Thermometer className="w-4 h-4" /> Temp.</span>
                <span className="font-display font-semibold text-text-main">{node.temp.toFixed(1)}°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-muted flex items-center gap-2"><Droplet className="w-4 h-4" /> Hum.</span>
                <span className="font-display font-semibold text-text-main">{node.humidity.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-muted flex items-center gap-2"><Wind className="w-4 h-4" /> Qualité Air</span>
                <span className="font-display font-semibold text-text-main">{node.airQuality_MQ135} <span className="text-xs">ppm</span></span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="glass-panel rounded-[2rem] p-4 md:p-8 overflow-hidden relative"
      >
        <div className="mb-8 flex items-center justify-between">
           <h2 className="text-xl font-display font-semibold text-text-main flex items-center gap-2"><Activity className="w-5 h-5 text-[#06B6D4]" /> Topologie Thermique (24h)</h2>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
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
                labelFormatter={(val) => format(new Date(val), 'HH:mm')}
              />
              <Area type="monotone" dataKey="temp" stroke="#06B6D4" strokeWidth={2} fillOpacity={1} fill="url(#colorTemp)" />
              <Area type="monotone" dataKey="humidity" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorHum)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
