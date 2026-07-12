/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './views/DashboardView';
import { SolarEnergyView } from './views/SolarEnergyView';
import { AquaticDroneView } from './views/AquaticDroneView';
import { TerrestrialDroneView } from './views/TerrestrialDroneView';
import { StockMaintenanceView } from './views/StockMaintenanceView';
import { LandingView } from './views/LandingView';
import { AuthView } from './views/AuthView';
import { ClaudeCodeChatView } from './views/ClaudeCodeChatView';
import { CustomCursor } from './components/CustomCursor';
import { SettingsView } from './views/SettingsView';
import { EnvironmentView } from './views/EnvironmentView';
import { CentralControlView } from './views/CentralControlView';
import { PredictiveAnalysisView } from './views/PredictiveAnalysisView';
import { ArtificialIntelligenceView } from './views/ArtificialIntelligenceView';
import { SensorNetworkView } from './views/SensorNetworkView';
import { AerospaceView } from './views/AerospaceView';
import { VideoProcessingView } from './views/VideoProcessingView';
import { SimulationView } from './views/SimulationView';
import { AboutView } from './views/AboutView';
import { Sun, Moon, Globe, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './lib/LanguageContext';

export default function App() {
  const [appState, setAppState] = useState<'landing' | 'auth' | 'app'>('landing');
  const [currentView, setCurrentView] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { lang, toggleLanguage } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderAppView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView />;
      case 'environment': return <EnvironmentView />;
      case 'solar': return <SolarEnergyView />;
      case 'drone': return <AquaticDroneView />;
      case 'terrestrial': return <TerrestrialDroneView />;
      case 'stock': return <StockMaintenanceView />;
      case 'settings': return <SettingsView />;
      case 'claude': return <ClaudeCodeChatView />;
      case 'mod1': return <CentralControlView />;
      case 'mod2': return <PredictiveAnalysisView />;
      case 'mod5': return <ArtificialIntelligenceView />;
      case 'mod7': return <SensorNetworkView />;
      case 'mod8': return <AerospaceView />;
      case 'mod9': return <VideoProcessingView />;
      case 'simulation': return <SimulationView />;
      case 'about': return <AboutView />;
      default: return <DashboardView />;
    }
  };

  return (
    <>
      <div className="hidden lg:block"><CustomCursor /></div>
      
      {/* Global Setting Buttons */}
      {appState !== 'app' && (
      <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3">
        <button 
          onClick={toggleLanguage}
          className="px-4 py-2 rounded-full flex items-center gap-2 bg-glass-bg border border-glass-border text-text-muted hover:text-text-main transition-colors text-xs font-mono font-bold outline-none shadow-lg backdrop-blur-xl"
        >
          <Globe size={14} />
          {lang}
        </button>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-glass-bg border border-glass-border text-text-muted hover:text-text-main transition-colors outline-none shadow-lg backdrop-blur-xl"
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
      )}

      {appState === 'landing' && <LandingView onNavigate={setAppState} lang={lang} toggleLanguage={toggleLanguage} />}
      {appState === 'auth' && <AuthView onLogin={() => setAppState('app')} lang={lang} toggleLanguage={toggleLanguage} />}
      {appState === 'app' && (
        <div className="flex h-screen overflow-hidden bg-gradient-to-br from-luxury-bg-start to-luxury-bg-end text-text-main relative selection:bg-luxury-glow/30">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
          
          {/* Mobile Header overlay */}
          <div className="md:hidden absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-40 bg-luxury-bg-start/80 backdrop-blur-md border-b border-glass-border">
             <div className="flex items-center gap-2 font-display font-semibold tracking-wide text-lg text-text-main">
               <div className="w-8 h-8 rounded-lg bg-glass-bg border border-glass-border flex items-center justify-center">
                 <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
               </div>
               Sparte OS
             </div>
             <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl glass-panel text-text-main text-opacity-80 hover:text-white border-glass-border transition-colors">
               <Menu size={24} />
             </button>
          </div>

          <Sidebar 
            currentView={currentView} 
            setCurrentView={(view) => {
              setCurrentView(view);
              setSidebarOpen(false);
            }} 
            onLogout={() => setAppState('landing')} 
            isDarkMode={isDarkMode} 
            setIsDarkMode={setIsDarkMode} 
            lang={lang} 
            toggleLanguage={toggleLanguage}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <main className="flex-1 h-full overflow-y-auto relative z-10 px-0 pt-20 md:pt-0 scroll-smooth">
            {renderAppView()}
          </main>
        </div>
      )}
    </>
  );
}
