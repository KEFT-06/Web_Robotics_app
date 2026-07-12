import { useLanguage } from "@/src/lib/LanguageContext";
import React from 'react';
import { motion } from 'motion/react';
import { Video, Maximize, Play, Crosshair } from 'lucide-react';

export function VideoProcessingView() {
  const { t } = useLanguage();

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto min-h-screen relative font-sans">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#F97316] mb-2 block">Caméras Thermiques</span>
        <h1 className="text-4xl lg:text-5xl font-display font-semibold text-text-main tracking-tight">Vidéosurveillance & IA</h1>
        <p className="text-text-muted mt-3 max-w-2xl text-lg font-light">Supervision des accès et détection d'intrusions sur le site.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="lg:col-span-2 glass-panel p-4 rounded-[2rem]">
          <div className="w-full aspect-video bg-black/40 rounded-xl relative overflow-hidden group">
            {/* Fake Video Feed */}
            <div className="absolute inset-0 bg-[#0A0A0F] flex items-center justify-center">
              <span className="text-text-muted/30 font-mono text-4xl">NO SIGNAL</span>
            </div>
            {/* Overlay Grid */}
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}></div>
            
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="px-2 py-1 bg-red-500 text-white text-[10px] font-bold tracking-widest font-mono rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> REC
              </div>
              <div className="px-2 py-1 bg-black/60 text-[#F97316] border border-[#F97316]/30 text-[10px] uppercase tracking-widest font-mono rounded">
                CAM_1_FRONT
              </div>
            </div>
            
            <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button className="p-2 bg-black/60 text-white border border-white/20 rounded-md hover:bg-white/20 hover:border-white transition-all">
                 <Maximize size={16} />
               </button>
            </div>
            
             <Crosshair className="w-10 h-10 text-[#F97316]/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={1} />
          </div>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6 rounded-[2rem] flex-1">
            <h3 className="text-sm font-semibold text-text-main mb-4 flex items-center gap-2 uppercase tracking-wide">
              <Play className="w-4 h-4 text-[#F97316]" /> Flux Actifs
            </h3>
            <div className="space-y-3">
              {['CAM_1_FRONT', 'CAM_2_REAR', 'CAM_3_BOTTOM'].map((cam, i) => (
                <div key={cam} className={`p-3 rounded-lg border text-sm font-mono flex items-center justify-between ${i === 0 ? 'bg-[#F97316]/10 border-[#F97316]/30 text-[#F97316]' : 'bg-glass-bg border-glass-border text-text-muted hover:text-text-main transition-colors duration-300 cursor-pointer'}`}>
                  <span>{cam}</span>
                  {i === 0 && <span className="text-[10px] bg-[#F97316] text-[#0A0A0A] px-1.5 py-0.5 rounded font-bold">1080p60</span>}
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 rounded-[2rem]">
            <div className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">FPS d'inférence</div>
            <div className="text-3xl font-display font-semibold text-text-main">58.4</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
