import * as fs from 'fs';
import * as path from 'path';

const viewsDir = path.join(process.cwd(), 'src/views');

const translations: Record<string, string> = {
  // EnvironmentView
  "Capteurs Environnement": "Environment Sensors",
  "Sondes thermiques et hygrométriques des bâtiments et lignes de froid.": "Thermal and hygrometric probes of buildings and cold lines.",
  "Capteurs • Module 3": "Sensors • Module 3",
  
  // SolarEnergyView
  "Énergie ⚡ Module 4": "Energy ⚡ Module 4",
  "Rendement Cellules Photovoltaïques": "Photovoltaic Cells Yield",
  "Acquisition INA219 en cours": "INA219 acquisition in progress",
  "Énergie Solaire": "Solar Energy",
  
  // AerospaceView
  "Télémétrie spatiale et suivi orbital, Module 8": "Spatial telemetry and orbital tracking, Module 8",
  
  // PredictiveAnalysisView
  "Analyse en cours...": "Analysis in progress...",
  "Analyse IA • Module 2": "AI Analysis • Module 2",
  "Analyse Prédictive": "Predictive Analysis",
  "Modèles Machine Learning sur la maintenance prévisionnelle.": "Machine Learning models on predictive maintenance.",
  "Moteurs & Actionneurs": "Motors & Actuators",
  "Cartes Électroniques": "Electronic Boards",
  "Capteurs I2C/SPI": "I2C/SPI Sensors",
  
  // AquaticDroneView
  "Supervision Drone • Module 6": "Drone Supervision • Module 6",
  "Drone de bathymétrie, données USV temps réel.": "Bathymetry drone, real-time USV data.",
  "Cartographie Sous-Marine": "Underwater Mapping",
  
  // SettingsView
  "Paramètres & Administration": "Settings & Administration",
  "Configuration des accès, seuils d'alertes et interface.": "Access configuration, alert thresholds, and interface.",
  "Préférences Interface": "Interface Preferences",
  "Authentification Requise": "Authentication Required",
  "Réseau • Module 7": "Network • Module 7",
  
  // AI View
  "Intelligence Artificielle": "Artificial Intelligence",
  "Traitement de Données Locales": "Local Data Processing",
};

fs.readdirSync(viewsDir).forEach(f => {
  if (f.endsWith('.tsx')) {
    let content = fs.readFileSync(path.join(viewsDir, f), 'utf-8');
    let original = content;

    for (const [fr, en] of Object.entries(translations)) {
        // e.g. replace >Text< with >{t("Text", "English")}<
        const regex1 = new RegExp(`>\\s*${fr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*<`, 'g');
        content = content.replace(regex1, `>{t("${fr}", "${en}")}<`);
        
        // replace "Text" with t("Text", "English")
        const regex2 = new RegExp(`"\\s*${fr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*"`, 'g');
        // Do not replace if literally inside t( )
        // Using a negative lookbehind is error prone in older JS, let's just use string replace for straightforward matches:
        // Actually, let's just make sure we only match inside JSX `{ "Text" }` or similar, or just leave it. 
        // We will just do the `>Text<` replacement, as that's 95% of UI text.
    }

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
