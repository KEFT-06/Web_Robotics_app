import { useLanguage } from "@/src/lib/LanguageContext";
import React from 'react';
import { motion } from 'motion/react';
import { Info, Code, CheckCircle, Users } from 'lucide-react';

export function AboutView() {
  const { t } = useLanguage();

  const stagger = {
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
    <div className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto min-h-screen relative font-sans">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted mb-2 block">Informations</span>
        <h1 className="text-4xl lg:text-5xl font-display font-semibold text-text-main tracking-tight">À propos du Superviseur</h1>
        <p className="text-text-muted mt-3 text-lg font-light">Projet Sparte Robotics – Version interne M2.</p>
      </motion.div>

      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={fadeUp} className="glass-panel p-4 md:p-8 rounded-[2rem]">
          <h2 className="text-xl font-display font-semibold text-text-main mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" /> Équipe Produit
          </h2>
          <p className="text-text-muted font-light mb-4">
            Développé par l'équipe logicielle Sparte. 
          </p>
          <ul className="space-y-2 text-sm text-text-main font-medium">
            <li>• Lead Tech : A. Dupont</li>
            <li>• UI/UX : M. Lemoine</li>
            <li>• Intégration IoT : Équipe terrain Nkometou</li>
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} className="glass-panel p-4 md:p-8 rounded-[2rem]">
          <h2 className="text-xl font-display font-semibold text-text-main mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-[#10B981]" /> Changelog Récent
          </h2>
          <div className="space-y-4">
            <div className="border-l-2 border-[#10B981]/50 pl-4 py-1">
              <div className="text-xs font-mono text-text-muted mb-1">v0.9.4 (Semaine dernière)</div>
              <div className="text-sm text-text-main">Ajout de la vue d'anticipation des pannes (BETA) pour les moteurs convoyeurs.</div>
            </div>
            <div className="border-l-2 border-glass-border pl-4 py-1">
              <div className="text-xs font-mono text-text-muted mb-1">v0.9.3</div>
              <div className="text-sm text-text-main">Mise à jour des couleurs et simplification du langage général. Corrections de bugs MQTT.</div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="glass-panel p-4 md:p-8 rounded-[2rem] border border-orange-500/20 bg-orange-500/5">
          <h2 className="text-xl font-display font-semibold text-text-main mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-orange-400" /> TODO & Remarques Internes
          </h2>
          <ul className="space-y-3 text-sm text-text-main">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-text-muted mt-0.5 shrink-0" />
              <span className="text-text-muted line-through">Connecter le broker MQTT de prod.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full border border-orange-400 shrink-0 mt-0.5"></div>
              <span>Finir l'intégration de l'API Twilio pour les alertes SMS critiques de stock.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full border border-orange-400 shrink-0 mt-0.5"></div>
              <span>Valider les seuils de référence d'usure avec les mécaniciens (Ligne A01).</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}
