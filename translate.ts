import * as fs from 'fs';
import * as path from 'path';

function walkDir(dir: string, callback: (filePath: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const viewsDir = path.join(process.cwd(), 'src/views');

const dictionary: Record<string, string> = {
  // Common
  '"Supervision Globale"': 't("Supervision Globale", "Global Supervision")',
  '"Vue générale des installations, flotte de drones et état du réseau de capteurs."': 't("Vue générale des installations, flotte de drones et état du réseau de capteurs.", "General view of facilities, drone fleet, and sensor network status.")',
  '"Vue générale"': 't("Vue générale", "General view")',

  // Dashboard
  '"Command & Control"': 't("Command & Control", "Command & Control")',
  '"Température Ligne A"': 't("Température Ligne A", "Line A Temperature")',
  '"Charge Station Solaire"': 't("Charge Station Solaire", "Solar Station Charge")',
  '"Statut Drone"': 't("Statut Drone", "Drone Status")',
  '"Alerte Pièces (Magasin)"': 't("Alerte Pièces (Magasin)", "Parts Alert (Store)")',
  '"État Stock (Magasin)"': 't("État Stock (Magasin)", "Store Stock Status")',
  '"Normal"': 't("Normal", "Normal")',
  '"Rupture Critique"': 't("Rupture Critique", "Critical Shortage")',
  '"Tous Seuils OK"': 't("Tous Seuils OK", "All Thresholds OK")',
  "\"Historique des Événements\"": 't("Historique des Événements", "Event History")',
  '"État de l\'infrastructure réseau"': 't("État de l\'infrastructure réseau", "Network Infrastructure Status")',

  '"Nœuds ESP32"': 't("Nœuds ESP32", "ESP32 Nodes")',
  '"Passerelle LoRaWAN"': 't("Passerelle LoRaWAN", "LoRaWAN Gateway")',
  '"Flotte Bathymétrique"': 't("Flotte Bathymétrique", "Bathymetric Fleet")',

  // Settings
  '"Paramètres & Administration"': 't("Paramètres & Administration", "Settings & Administration")',
  '"Configuration des accès"': 't("Configuration des accès", "Access configuration")',
  '"Utilisateurs et Permissions"': 't("Utilisateurs et Permissions", "Users and Permissions")',
  '"Seuils d\'Alerte"': 't("Seuils d\'Alerte", "Alert Thresholds")',
  '"Personnalisation"': 't("Personnalisation", "Customization")',
  '"Mises à jour système"': 't("Mises à jour système", "System Updates")',

  // Shared
  '"Retour à l\'accueil"': 't("Retour à l\'accueil", "Back to home")',
  
  // Predictive Analysis
  '"Analyse Prédictive"': 't("Analyse Prédictive", "Predictive Analysis")',
  '"Modèles IA & Prévisions de pannes sur la flotte."': 't("Modèles IA & Prévisions de pannes sur la flotte.", "AI Models & Fleet failure forecasting.")',
  '"Probabilité de Panne Moteur"': 't("Probabilité de Panne Moteur", "Engine Failure Probability")',

  // Drone
  '"Drone Aquatique ATAWI-3A3"': 't("Drone Aquatique ATAWI-3A3", "ATAWI-3A3 Aquatic Drone")',
  '"Inspection bathymétrique"': 't("Inspection bathymétrique", "Bathymetric inspection")',
  '"Caméra Frontale"': 't("Caméra Frontale", "Front Camera")',
  '"Retour Vidéo"': 't("Retour Vidéo", "Video Feed")',
  '"Coordonnées"': 't("Coordonnées", "Coordinates")',

  // Stock
  '"Gestion des Stocks & Magasin"': 't("Gestion des Stocks & Magasin", "Stock Management & Store")',
  '"Suivi des pièces de rechange et prédictions."': 't("Suivi des pièces de rechange et prédictions.", "Spare parts tracking and predictions.")',
  '"Magasin Central"': 't("Magasin Central", "Central Store")',
  '"Référence"': 't("Référence", "Reference")',
  '"Article"': 't("Article", "Item")',
  '"Catégorie"': 't("Catégorie", "Category")',
  '"Quantité"': 't("Quantité", "Quantity")',
  '"Statut"': 't("Statut", "Status")',
  '"Alerte de Réapprovisionnement Magasin"': 't("Alerte de Réapprovisionnement Magasin", "Store Restocking Alert")',
  '"Demande de devis"': 't("Demande de devis", "Quote request")',
  
  // Environment
  '"Surveillance Environnementale"': 't("Surveillance Environnementale", "Environmental Monitoring")',
  '"Données climatiques et capteurs physiques."': 't("Données climatiques et capteurs physiques.", "Climate data and physical sensors.")',
  '"Qualité de l\'Air"': 't("Qualité de l\'Air", "Air Quality")',
  '"Température"': 't("Température", "Temperature")',
  '"Humidité"': 't("Humidité", "Humidity")',
  
  // Auth
  '"Authentification"': 't("Authentification", "Authentication")',
  
  // Central Control
  '"Centre de Contrôle Principal"': 't("Centre de Contrôle Principal", "Main Control Center")',
  
  // AI
  '"Intelligence Artificielle"': 't("Intelligence Artificielle", "Artificial Intelligence")',
  '"Traitement de Données Locales"': 't("Traitement de Données Locales", "Local Data Processing")',
  '"Performance des Modèles IA"': 't("Performance des Modèles IA", "AI Models Performance")',
  
  // Sensor
  '"Réseau de Capteurs"': 't("Réseau de Capteurs", "Sensor Network")',
  '"Topologie Mesh"': 't("Topologie Mesh", "Mesh Topology")',
  
  // Video
  '"Traitement Vidéo"': 't("Traitement Vidéo", "Video Processing")',
  '"Flux en temps réel"': 't("Flux en temps réel", "Real-time Flux")'
};

walkDir(viewsDir, (filePath) => {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;

    // Check if we need to add the import
    if (!content.includes('useLanguage')) {
      content = 'import { useLanguage } from "@/src/lib/LanguageContext";\n' + content;
      changed = true;
    }

    // Add `const { t } = useLanguage();` inside the component
    // Need to find the component definition
    const componentRegex = /export\s+(default\s+)?function\s+([A-Za-z0-9_]+)\s*\([^)]*\)\s*\{/;
    const match = content.match(componentRegex);
    if (match && !content.includes('const { t } = useLanguage();') && !content.includes('const {lang, t} = useLanguage();') && !content.includes('const { t, lang } = useLanguage();')) {
      content = content.replace(componentRegex, `${match[0]}\n  const { t } = useLanguage();\n`);
      changed = true;
    }

    // Attempt replacing standard strings
    for (const [fr, en] of Object.entries(dictionary)) {
      if (content.includes(fr)) {
        content = content.split(fr).join(`{${en}}`);
        changed = true;
      } else if (content.includes(`>{"${fr.slice(1, -1)}"}<`)) {
          // If it was already in brackets
          content = content.split(`>{"${fr.slice(1, -1)}"}<`).join(`>{${en}}<`);
          changed = true;
      }
    }

    // Fix possible >{t("...", "...")}< issues
    content = content.replace(/>\{t\(/g, '>{t(').replace(/\)}</g, ')}<');

    // also look for hardcoded strings explicitly
    const specificReplaces = [
      { from: '>Température Ligne A<', to: '>{t("Température Ligne A", "Line A Temperature")}<' },
      { from: '>Charge Station Solaire<', to: '>{t("Charge Station Solaire", "Solar Station Charge")}<' },
      { from: '>Statut Drone<', to: '>{t("Statut Drone", "Drone Status")}<' },
      { from: '>État de l\'infrastructure réseau<', to: '>{t("État de l\'infrastructure réseau", "Network Infrastructure Status")}<' },
      { from: '>Historique des Événements<', to: '>{t("Historique des Événements", "Event History")}<' },
      
      { from: '>Supervision Globale<', to: '>{t("Supervision Globale", "Global Supervision")}<' },
      { from: '>Alerte Pièces (Magasin)<', to: '>{t("Alerte Pièces (Magasin)", "Parts Alert (Store)")}<' },
      { from: '>État Stock (Magasin)<', to: '>{t("État Stock (Magasin)", "Store Stock Status")}<' },
      { from: '>Alerte de Réapprovisionnement Magasin<', to: '>{t("Alerte de Réapprovisionnement Magasin", "Store Restocking Alert")}<' },
      
      { from: '>Analyse Prédictive<', to: '>{t("Analyse Prédictive", "Predictive Analysis")}<' },
      { from: '>Surveillance Environnementale<', to: '>{t("Surveillance Environnementale", "Environmental Monitoring")}<' },
      { from: '>Gestion des Stocks & Magasin<', to: '>{t("Gestion des Stocks & Magasin", "Stock Management & Store")}<' },
      { from: '>Centre de Contrôle Principal<', to: '>{t("Centre de Contrôle Principal", "Main Control Center")}<' },
      { from: '>Réseau de Capteurs<', to: '>{t("Réseau de Capteurs", "Sensor Network")}<' },
      { from: '>Intelligence Artificielle<', to: '>{t("Intelligence Artificielle", "Artificial Intelligence")}<' },
      { from: '>Traitement Vidéo<', to: '>{t("Traitement Vidéo", "Video Processing")}<' },
      { from: '>Aérospatial<', to: '>{t("Aérospatial", "Aerospace")}<' },
      { from: '>Énergie Solaire<', to: '>{t("Énergie Solaire", "Solar Power")}<' },
      { from: '>Paramètres & Administration<', to: '>{t("Paramètres & Administration", "Settings & Administration")}<' },
    ];

    for (const rep of specificReplaces) {
      if (content.includes(rep.from)) {
        content = content.split(rep.from).join(rep.to);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  }
});
console.log("Done translating");
