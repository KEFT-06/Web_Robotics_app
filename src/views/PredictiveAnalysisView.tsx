import { useLanguage } from "@/src/lib/LanguageContext";
import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = Array.from({ length: 10 }).map((_, i) => ({
  name: `J-${10 - i}`,
  failureProb: Math.random() * 20 + (i * 2),
  wearLevel: i * 5 + Math.random() * 10
}));

export function PredictiveAnalysisView() {
  const { t } = useLanguage();

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto min-h-screen relative font-sans">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-rose-400 mb-2 block">Maintenance • Module 2</span>
        <div className="flex items-center gap-4">
          <h1 className="text-4xl lg:text-5xl font-display font-semibold text-text-main tracking-tight">Anticipation des Pannes</h1>
          <span className="px-3 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-mono tracking-widest uppercase rounded">BETA</span>
        </div>
        <p className="text-text-muted mt-3 max-w-2xl text-lg font-light">Graphiques de risque de panne basés sur l'historique des capteurs et l'usure constructeur.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="glass-panel p-4 md:p-8 rounded-[2rem] lg:col-span-2">
          <h2 className="text-xl font-display font-semibold text-text-main mb-6">Évolution de l'Usure (Ligne de production A01)</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{fontSize: 10, fill: '#64748b', fontFamily: 'monospace'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" tick={{fontSize: 10, fill: '#64748b', fontFamily: 'monospace'}} axisLine={false} tickLine={false} dx={-10} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-glass-border)', color: 'var(--color-text-main)', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="failureProb" stroke="#f43f5e" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="wearLevel" stroke="#10b981" strokeWidth={3} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }} className="glass-panel p-4 md:p-8 rounded-[2rem] flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-rose-400" />
          </div>
          <h3 className="text-3xl font-display font-semibold text-text-main mb-2">14 Jours</h3>
          <p className="text-text-muted text-sm px-4">Temps moyen avant défaillance probable du moteur convoyeur (plant/line1/motor).</p>
          <button className="mt-8 px-6 py-2 rounded-full border border-glass-border hover:bg-glass-bg text-text-main text-xs font-mono uppercase tracking-widest transition-colors">
            Créer un Ordre de Travail
          </button>
        </motion.div>
      </div>
    </div>
  );
}
