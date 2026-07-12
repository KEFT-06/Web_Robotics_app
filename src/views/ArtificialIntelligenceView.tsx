import { useLanguage } from "@/src/lib/LanguageContext";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Network, Zap, Cuboid, UploadCloud, Loader2, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { generate3DFromAsset, pollTaskStatus } from '../lib/meshy';

const performanceData = [
  { time: '00:00', gpu: 45, vram: 50, latency: 15 },
  { time: '04:00', gpu: 62, vram: 55, latency: 14 },
  { time: '08:00', gpu: 88, vram: 75, latency: 22 },
  { time: '12:00', gpu: 95, vram: 85, latency: 28 },
  { time: '16:00', gpu: 70, vram: 60, latency: 16 },
  { time: '20:00', gpu: 55, vram: 50, latency: 13 },
  { time: '24:00', gpu: 48, vram: 45, latency: 14 },
];

const modelAccuracyData = [
  { name: 'YOLOv8', accuracy: 94, speed: 85 },
  { name: 'ResNet50', accuracy: 88, speed: 65 },
  { name: 'ViT-B', accuracy: 96, speed: 40 },
  { name: 'Detectron2', accuracy: 91, speed: 55 },
];

export function ArtificialIntelligenceView() {
  const { t } = useLanguage();
  
  const [sourceUrl, setSourceUrl] = useState('');
  const [assetType, setAssetType] = useState<'image'|'video'>('image');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultGlb, setResultGlb] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGenerate = async () => {
    if (!sourceUrl) return;
    setIsGenerating(true);
    setProgress(0);
    setErrorMsg('');
    setResultGlb(null);
    try {
      const taskId = await generate3DFromAsset(sourceUrl, assetType);
      const finalUrl = await pollTaskStatus(taskId, (p) => setProgress(p));
      setResultGlb(finalUrl);
    } catch (e: any) {
      setErrorMsg(e.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto min-h-screen relative font-sans space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-purple-400 mb-2 block">Serveurs Locaux • Module 5</span>
        <h1 className="text-4xl lg:text-5xl font-display font-semibold text-text-main tracking-tight">{t("Traitement de Données Locales", "Local Data Processing")}</h1>
        <p className="text-text-muted mt-3 max-w-2xl text-lg font-light">Surveillance des serveurs sur site chargés de l'analyse des caméras.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-4 md:p-8 rounded-[2rem]"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
               <Brain className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-main">VPR-7 Object Detection</h2>
              <p className="text-text-muted text-sm font-mono mt-1">Status: Active • Latency: 12ms</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono text-text-muted mb-2">
                <span>GPU Allocation</span>
                <span>84%</span>
              </div>
              <div className="h-2 bg-glass-bg rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[84%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-mono text-text-muted mb-2">
                <span>VRAM Usage</span>
                <span>6.2 / 8.0 GB</span>
              </div>
              <div className="h-2 bg-glass-bg rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[75%]"></div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-4 md:p-8 rounded-[2rem] flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
          <Network className="w-16 h-16 text-text-muted opacity-20 absolute -right-4 -bottom-4 animate-pulse" />
          <Zap className="w-10 h-10 text-yellow-400 mb-4" />
          <h3 className="text-2xl font-display font-semibold text-text-main mb-2">42 TFLOPS</h3>
          <p className="text-text-muted text-sm px-4">Puissance de calcul brute actuelle estimée sur la grappe locale.</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass-panel p-6 md:p-8 rounded-[2rem]"
      >
        <div className="flex justify-between items-start mb-6">
           <div>
              <h3 className="text-xl font-semibold text-text-main flex items-center gap-2">
                 <Cuboid className="w-5 h-5 text-purple-400" />
                 {t("Meshy AI • Génération 3D", "Meshy AI • 3D Generation")}
              </h3>
              <p className="text-sm font-mono text-text-muted mt-1">
                 {t("Conversion d'image ou vidéo en modèle 3D PBR", "Image or video to PBR 3D model conversion")}
              </p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-6">
              <div>
                 <label className="text-xs font-mono text-text-muted mb-2 block">{t("Type de source", "Source type")}</label>
                 <div className="flex gap-2">
                    <button 
                      onClick={() => setAssetType('image')}
                      className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-colors ${assetType === 'image' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'border-glass-border text-text-muted hover:text-text-main'}`}
                    >
                      {t("Image vers 3D", "Image to 3D")}
                    </button>
                    <button 
                      onClick={() => setAssetType('video')}
                      className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-colors ${assetType === 'video' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'border-glass-border text-text-muted hover:text-text-main'}`}
                    >
                      {t("Vidéo vers 3D", "Video to 3D")}
                    </button>
                 </div>
              </div>
              
              <div>
                 <label className="text-xs font-mono text-text-muted mb-2 block">{t("URL source (HTTP/HTTPS)", "Source URL (HTTP/HTTPS)")}</label>
                 <input 
                   type="url"
                   value={sourceUrl}
                   onChange={e => setSourceUrl(e.target.value)}
                   placeholder="https://images.unsplash.com/photo-..."
                   className="w-full bg-[#0A0A0F] border border-glass-border rounded-xl p-4 text-sm focus:outline-none focus:border-purple-500/50 text-text-main font-mono"
                 />
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !sourceUrl}
                className="w-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 py-4 rounded-xl text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> {t("Génération en cours...", "Generation in progress...")} {progress ? `(${progress}%)` : ''}</>
                ) : (
                  <><UploadCloud className="w-5 h-5" /> {t("Lancer la conversion", "Start generation")}</>
                )}
              </button>

              {errorMsg && (
                <div className="text-red-400 text-xs font-mono bg-red-400/10 border border-red-400/20 p-3 rounded-lg">
                  {errorMsg}
                </div>
              )}
           </div>

           <div className="bg-[#0A0A0F] border border-glass-border rounded-[1.5rem] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden min-h-[300px]">
              {resultGlb ? (
                <div className="flex flex-col items-center gap-4 z-10">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="text-lg font-medium text-text-main">{t("Génération terminée", "Generation Complete")}</h4>
                  <p className="text-xs font-mono text-text-muted break-all px-4">
                    {resultGlb}
                  </p>
                  <a href={resultGlb} target="_blank" rel="noreferrer" className="mt-2 px-6 py-2 bg-text-main text-black rounded-full text-sm font-medium hover:bg-white/90 transition-colors">
                    {t("Télécharger le modèle (.glb)", "Download model (.glb)")}
                  </a>
                </div>
              ) : isGenerating ? (
                <div className="flex flex-col items-center gap-4 z-10">
                  <Loader2 className="w-10 h-10 text-purple-400 animate-[spin_2s_linear_infinite]" />
                  <p className="text-sm text-text-muted animate-pulse">{t("Meshy AI analyse la source...", "Meshy AI is analyzing source...")}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 z-10 opacity-50">
                  <Cuboid className="w-12 h-12 text-text-muted" />
                  <p className="text-sm font-medium text-text-muted">{t("Aucun modèle 3D", "No 3D model")}</p>
                  <p className="text-xs font-mono">{t("Prêt pour la génération", "Ready for generation")}</p>
                </div>
              )}

              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent pointer-events-none" />
           </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="glass-panel p-6 rounded-[2rem]">
          <h3 className="text-lg font-semibold text-text-main mb-6 px-2">Utilisation des Ressources (24h)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVram" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '14px' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Area type="monotone" name="GPU (%)" dataKey="gpu" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorGpu)" />
                <Area type="monotone" name="VRAM (%)" dataKey="vram" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVram)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-[2rem]">
          <h3 className="text-lg font-semibold text-text-main mb-6 px-2">Performance des Modèles IA</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modelAccuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                  cursor={{ fill: '#334155', opacity: 0.2 }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Bar name="Précision (%)" dataKey="accuracy" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar name="Vitesse (FPS)" dataKey="speed" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
