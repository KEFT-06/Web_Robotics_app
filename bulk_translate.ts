import * as fs from 'fs';
import * as path from 'path';

const viewsDir = path.join(process.cwd(), 'src/views');

const pairs = [
  ['"Vue générale des installations, flotte de drones et état du réseau de capteurs."', '{t("Vue générale des installations, flotte de drones et état du réseau de capteurs.", "General view of facilities, drone fleet, and sensor network status.")}'],
  ['>Analyse Prédictive<', '>{t("Analyse Prédictive", "Predictive Analysis")}<'],
  ['"Modèles IA & Prévisions de pannes sur la flotte."', '{t("Modèles IA & Prévisions de pannes sur la flotte.", "AI Models & Fleet failure forecasting.")}'],
  ['>Surveillance Environnementale<', '>{t("Surveillance Environnementale", "Environmental Monitoring")}<'],
  ['>Données climatiques et capteurs physiques.<', '>{t("Données climatiques et capteurs physiques.", "Climate data and physical sensors.")}<'],
  ['>Intelligence Artificielle<', '>{t("Intelligence Artificielle", "Artificial Intelligence")}<'],
  ['>Traitement de Données Locales<', '>{t("Traitement de Données Locales", "Local Data Processing")}<'],
  ['>Drone Aquatique ATAWI-3A3<', '>{t("Drone Aquatique ATAWI-3A3", "ATAWI-3A3 Aquatic Drone")}<'],
  ['>Inspection bathymétrique<', '>{t("Inspection bathymétrique", "Bathymetric inspection")}<'],
  ['>Énergie Solaire<', '>{t("Énergie Solaire", "Solar Power")}<'],
  ['>Production & Stockage<', '>{t("Production & Stockage", "Production & Storage")}<'],
  ['>Réseau de Capteurs<', '>{t("Réseau de Capteurs", "Sensor Network")}<'],
  ['>Topologie Mesh<', '>{t("Topologie Mesh", "Mesh Topology")}<'],
  ['>Aérospatial<', '>{t("Aérospatial", "Aerospace")}<'],
  ['>Télémétrie Orbitale<', '>{t("Télémétrie Orbitale", "Orbital Telemetry")}<'],
  ['>Traitement Vidéo<', '>{t("Traitement Vidéo", "Video Processing")}<'],
  ['>Flux en temps réel<', '>{t("Flux en temps réel", "Real-time Flux")}<'],
  ['>Centre de Contrôle Principal<', '>{t("Centre de Contrôle Principal", "Main Control Center")}<'],
  ['>Paramètres & Administration<', '>{t("Paramètres & Administration", "Settings & Administration")}<'],
  ['>Configuration des accès<', '>{t("Configuration des accès", "Access configuration")}<'],
];

fs.readdirSync(viewsDir).forEach(f => {
  if (f.endsWith('.tsx')) {
    let content = fs.readFileSync(path.join(viewsDir, f), 'utf-8');
    let original = content;
    pairs.forEach(([from, to]) => {
      content = content.replace(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), to);
    });
    // Add useLanguage if not present but needed
    if (content !== original) {
      if (!content.includes('useLanguage')) {
        content = 'import { useLanguage } from "@/src/lib/LanguageContext";\n' + content;
      }
      const match = content.match(/export\s+(default\s+)?function\s+([A-Za-z0-9_]+)\s*\([^)]*\)\s*\{/);
      if (match && !content.includes('const { t } = useLanguage();') && !content.includes('const {lang, t} = useLanguage();') && !content.includes('const { t, lang } = useLanguage();')) {
          content = content.replace(match[0], `${match[0]}\n  const { t } = useLanguage();\n`);
      }
      fs.writeFileSync(path.join(viewsDir, f), content, 'utf-8');
    }
  }
});
