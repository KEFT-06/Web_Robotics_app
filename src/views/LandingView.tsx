import { useLanguage } from "@/src/lib/LanguageContext";
import React from 'react';
import { motion } from 'motion/react';
import { Shield, ChevronRight, Activity, Map, Cpu, Sparkles, Lock, Globe } from 'lucide-react';
import { Logo } from '@/src/components/Logo';

export function LandingView({ onNavigate, lang, toggleLanguage }: { onNavigate: (page: string) => void, lang?: string, toggleLanguage?: () => void }) {
  const isEn = lang === 'EN';

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-hidden bg-gradient-to-br from-luxury-bg-start to-luxury-bg-end">
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Floating Orbs */}
      <motion.div 
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#10B981]/20 blur-[120px] rounded-full pointer-events-none z-0" 
      />
      <motion.div 
        animate={{ y: [0, 40, 0], opacity: [0.1, 0.3, 0.1] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#06B6D4]/10 blur-[150px] rounded-full pointer-events-none z-0" 
      />

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="px-8 py-6 flex items-center justify-between z-40 fixed top-0 w-full"
      >
        <div className="flex items-center gap-3 cursor-pointer group">
          <Logo size="lg" />
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted glass-panel px-8 py-3 rounded-full">
          <a href="#features" className="hover:text-text-main transition-all duration-300 hover:scale-105">{isEn ? 'Architecture' : 'Architecture'}</a>
          <a href="#drones" className="hover:text-text-main transition-all duration-300 hover:scale-105">{isEn ? 'Drones' : 'Flotte Drones'}</a>
          <a href="#iot" className="hover:text-text-main transition-all duration-300 hover:scale-105">{isEn ? 'Sensors' : 'Capteurs'}</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('auth')}
            className="relative overflow-hidden group glass-panel px-6 py-3 rounded-full text-sm font-medium text-text-main transition-all duration-500 hover:bg-glass-bg outline-none"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isEn ? 'Initialize' : 'Initialiser'} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-[#10B981]/20 to-transparent transition-transform duration-700 ease-in-out" />
          </button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center relative px-6 py-32 text-center z-10 mt-16 md:mt-0">
        
        <motion.div 
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="max-w-5xl mx-auto flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-[#10B981] text-xs font-mono mb-12 uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <Sparkles className="w-3 h-3 text-[#06B6D4]" />
            <span>Sparte OS v2.0 Enterprise</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-8 leading-[1.1] text-text-main">
            {isEn ? 'Cognitive ' : 'Supervision '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-[#06B6D4] to-[#10B981] animate-pulse" style={{ animationDuration: '4s' }}>
              {isEn ? 'Supervision.' : 'Cognitive.'}
            </span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-16 font-light leading-relaxed">
            {isEn ? "Absolute orchestration of your robotic fleet. An interface sculpted for precision, from spatial telemetry to quantified logistics." : "L'orchestration absolue de votre flotte robotique. Une interface sculptée pour la précision, de la télémétrie spatiale à la logistique quantifiée."}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-6 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#10B981] to-[#06B6D4] blur-[30px] rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />
            <button 
              onClick={() => onNavigate('auth')} 
              className="group relative px-8 py-4 bg-text-main text-luxury-bg-start font-semibold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 outline-none shadow-lg border border-transparent hover:border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-3 font-display tracking-wide text-lg">
                {isEn ? 'Unlock Hub' : 'Déverrouiller le Hub'} <Lock className="w-4 h-4 ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* 3D Tilt Cards */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-32 w-full perspective-[1000px]"
        >
          {[
            { icon: Activity, title: isEn ? "MQTT Telemetry" : "Télémétrie MQTT", desc: isEn ? "Ultra-low latency ingestion via Mosquitto." : "Ingestion ultra-basse latence via Mosquitto.", color: "text-[#10B981]", bg: "bg-[#10B981]/10" },
            { icon: Map, title: "ATAWI Matrix", desc: isEn ? "Geospatial mapping for bathymetric drones." : "Cartographie géospatiale pour drones.", color: "text-[#06B6D4]", bg: "bg-[#06B6D4]/10" },
            { icon: Cpu, title: isEn ? "ERP Governance" : "Gouvernance ERP", desc: isEn ? "Fleet management and predictive maintenance." : "Prédictions de maintenance et gestion de flotte.", color: "text-[#10B981]", bg: "bg-[#10B981]/10" }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={idx}
                variants={fadeUp}
                whileHover={{ rotateX: 5, rotateY: -5, y: -5, scale: 1.02 }}
                className="p-4 md:p-8 rounded-[2rem] glass-panel text-left group relative overflow-hidden transition-all duration-500 hover:shadow-2xl border-white/5 hover:border-white/20"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-${feature.bg.replace('/', '-')} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="absolute inset-0 bg-gradient-to-br from-glass-border to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 text-current group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-text-main tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-text-main group-hover:to-text-muted transition-all">{feature.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed font-light group-hover:text-opacity-80">{feature.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
}
