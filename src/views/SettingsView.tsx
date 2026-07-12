import { useLanguage } from "@/src/lib/LanguageContext";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Shield, Network, Server, RefreshCw } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

export function SettingsView() {
  const { t } = useLanguage();

  const [mqttConnected, setMqttConnected] = useState(true);

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto min-h-screen relative font-sans">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted mb-2 block">Configuration Global</span>
        <h1 className="text-4xl lg:text-5xl font-display font-semibold text-text-main tracking-tight">Paramètres</h1>
        <p className="text-text-muted mt-3 text-lg font-light">Gestion du bus de messages Mosquitto et des préférences système globales.</p>
      </motion.div>

      <Tabs defaultValue="bus_mqtt" className="w-full">
        <TabsList className="bg-glass-bg backdrop-blur-xl border border-glass-border p-1 rounded-full mb-8 inline-flex h-auto w-full md:w-auto">
          <TabsTrigger value="bus_mqtt" className="rounded-full px-6 py-2.5 data-[state=active]:bg-[#10B981]/20 data-[state=active]:text-[#10B981] text-text-muted gap-2 font-medium">
            <Network className="w-4 h-4" /> Bus MQTT
          </TabsTrigger>
          <TabsTrigger value="site_profile" className="rounded-full px-6 py-2.5 data-[state=active]:bg-[#06B6D4]/20 data-[state=active]:text-[#06B6D4] text-text-muted gap-2 font-medium">
            <Server className="w-4 h-4" /> Profil du Site
          </TabsTrigger>
          <TabsTrigger value="alarms" className="rounded-full px-6 py-2.5 data-[state=active]:bg-[#F4D03F]/20 data-[state=active]:text-[#F4D03F] text-text-muted gap-2 font-medium">
            <Shield className="w-4 h-4" /> Seuils d'Alerte
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bus_mqtt" className="mt-0">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-4 md:p-8 rounded-[2rem] space-y-8"
          >
            <div className="flex items-center justify-between pb-6 border-b border-glass-border">
              <div>
                <h3 className="text-lg font-display text-text-main font-semibold">Mosquitto (MQTT)</h3>
                <p className="text-sm font-light text-text-muted">C'est le "centre de tri postal" qui s'occupe d'acheminer tous les messages des capteurs vers l'interface de contrôle.</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono text-text-muted">{mqttConnected ? 'EN LIGNE' : 'HORS LIGNE'}</span>
                <Switch checked={mqttConnected} onCheckedChange={setMqttConnected} className="data-[state=checked]:bg-[#10B981]" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-xs font-mono uppercase tracking-widest text-[#10B981]">Adresse du Serveur</label>
                <input type="text" defaultValue="mqtt.sparte-robotics.lan" className="w-full bg-black/20 border border-glass-border rounded-xl px-4 py-3 text-text-main font-mono text-sm focus:outline-none focus:border-[#10B981]" />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-mono uppercase tracking-widest text-[#10B981]">Port</label>
                <input type="number" defaultValue="1883" className="w-full bg-black/20 border border-glass-border rounded-xl px-4 py-3 text-text-main font-mono text-sm focus:outline-none focus:border-[#10B981]" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-mono uppercase tracking-widest text-[#10B981]">Débit / Qualité de Service (QoS)</label>
              <div className="py-4 px-2">
                <Slider defaultValue={[1]} max={2} step={1} className="w-full" />
                <div className="flex justify-between mt-2 text-xs font-mono text-text-muted">
                  <span>QoS 0 (Rapide, risques de perte)</span>
                  <span>QoS 1 (Sûr, avec accusé de réception)</span>
                  <span>QoS 2 (Critique, sans doublons)</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex items-center justify-end">
              <button className="px-6 py-3 rounded-full bg-[#10B981]/20 text-[#10B981] font-semibold hover:bg-[#10B981]/30 transition-all flex items-center gap-2">
                <RefreshCw className="w-4 h-4" /> Redémarrer Mosquitto
              </button>
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="site_profile" className="mt-0">
          <div className="glass-panel p-4 md:p-8 rounded-[2rem] space-y-8">
            <h3 className="text-lg font-display text-text-main font-semibold">Profil du Site (Nkometou)</h3>
            <p className="text-sm font-light text-text-muted">Personnalisez les informations globales liées au site de production actuel.</p>
            <div className="space-y-4 border-t border-glass-border pt-6">
              <label className="text-xs font-mono uppercase tracking-widest text-[#06B6D4]">Fenêtres de Maintenance Autorisées</label>
              <p className="text-xs text-text-muted">Définit les plages horaires pendant lesquelles les interventions techniques ne déclenchent pas d'alarmes.</p>
              <input type="text" defaultValue="Samedi 06:00 - Dimanche 18:00" className="w-full max-w-md bg-black/20 border border-glass-border rounded-xl px-4 py-3 text-text-main font-mono text-sm focus:outline-none focus:border-[#06B6D4]" />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="alarms" className="mt-0">
          <div className="glass-panel p-4 md:p-8 rounded-[2rem] space-y-8">
            <h3 className="text-lg font-display text-text-main font-semibold">Seuils d'Alerte (Stock & Env)</h3>
            <p className="text-sm font-light text-text-muted">Définissez à partir de quelle limite une notification aux opérateurs est déclenchée.</p>
            <div className="space-y-6 border-t border-glass-border pt-6">
              <div className="space-y-4">
                <label className="text-xs font-mono uppercase tracking-widest text-[#F4D03F]">Température Critique de Serre/Usine</label>
                <div className="flex items-center gap-4">
                  <input type="number" defaultValue="35" className="w-24 bg-black/20 border border-glass-border rounded-xl px-4 py-3 text-text-main font-mono text-sm focus:outline-none focus:border-[#F4D03F]" />
                  <span className="text-text-muted">°C</span>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-mono uppercase tracking-widest text-[#F4D03F]">Marge de Stock Avertissement</label>
                <div className="flex items-center gap-4">
                  <input type="number" defaultValue="15" className="w-24 bg-black/20 border border-glass-border rounded-xl px-4 py-3 text-text-main font-mono text-sm focus:outline-none focus:border-[#F4D03F]" />
                  <span className="text-text-muted">% au-dessus du seuil critique</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
