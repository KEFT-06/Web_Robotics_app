import { useLanguage } from "@/src/lib/LanguageContext";
import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Server, Activity, Command } from 'lucide-react';

export function CentralControlView() {
  const { t } = useLanguage();

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
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#10B981] mb-2 block">Site Nkometou • Module 1</span>
          <h1 className="text-4xl lg:text-5xl font-display font-semibold text-text-main tracking-tight">Poste de Contrôle</h1>
          <p className="text-text-muted mt-3 max-w-2xl text-lg font-light">Accès central aux terminaux des différents automates du site.</p>
        </div>
        
        <div className="glass-panel px-4 py-2 rounded-full inline-flex items-center gap-3 self-start md:self-auto border border-[#10B981]/30">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981]"></span>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#10B981]">Connexion OK</span>
        </div>
      </motion.div>

      <motion.div 
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {[ 
          { title: 'Charge Serveur', val: '24%', icon: Cpu },
          { title: 'Automates', val: '12', icon: Server },
          { title: 'Dispo. Réseau', val: '99.9%', icon: Activity },
          { title: 'Trame MQTT/s', val: '45', icon: Command },
        ].map((stat, i) => (
          <motion.div key={i} variants={fadeUp} className="glass-panel p-6 rounded-[2rem]">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-medium text-text-muted tracking-wider uppercase text-xs">{stat.title}</h3>
              <stat.icon size={18} className="text-[#10B981]" />
            </div>
            <div className="text-4xl font-display font-semibold text-text-main tracking-tight">{stat.val}</div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="glass-panel p-4 md:p-8 rounded-[2rem] overflow-hidden relative min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#10B981 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="text-center relative z-10">
          <Command className="w-16 h-16 text-text-muted mx-auto mb-6 opacity-50" />
          <h2 className="text-2xl font-display font-semibold text-text-main mb-2">Terminal Sécurisé (WIP)</h2>
          <p className="text-text-muted font-mono text-sm max-w-md mx-auto mb-4">TODO: L'équipe réseau (cf. ticket #412) doit d'abord configurer le VPN IPSec avant qu'on active les commandes à distance.</p>
          <span className="px-3 py-1 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 text-[10px] font-mono tracking-widest uppercase rounded">Phase Beta</span>
        </div>
      </motion.div>
    </div>
  );
}
