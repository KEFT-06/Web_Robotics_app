import { useLanguage } from "@/src/lib/LanguageContext";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Fingerprint, ArrowRight, Loader2, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/src/components/Logo';

export function AuthView({ onLogin, lang, toggleLanguage }: { onLogin: () => void, lang?: string, toggleLanguage?: () => void }) {
  const isEn = lang === 'EN';
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<'credentials' | 'biometric'>('credentials');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(); 
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-bg-start to-luxury-bg-end flex shadow-2xl relative overflow-hidden font-sans selection:bg-[#10B981]/30 outline-none">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-[#10B981]/10 blur-[150px] rounded-full pointer-events-none z-0" 
      />

      <div className="flex-1 flex flex-col justify-center items-center p-6 z-10 w-full max-w-md mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#10B981] to-[#06B6D4] blur-[80px] rounded-full opacity-20 pointer-events-none mt-32" />
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="w-full mb-12 flex flex-col items-center"
        >
          <Logo size="xl" className="mb-2" iconOnly={false} />
          <p className="text-text-muted mt-2 font-mono text-sm tracking-widest uppercase">{isEn ? 'Authentication System' : 'Authentification System'}</p>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          className="w-full glass-panel rounded-[2rem] p-4 md:p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button 
                onClick={() => setAuthMethod('credentials')}
                className={`py-3 rounded-full text-sm font-medium transition-all duration-300 outline-none ${authMethod === 'credentials' ? 'bg-text-main text-luxury-bg-start shadow-lg' : 'text-text-muted hover:text-text-main hover:bg-glass-bg'}`}
              >
                {isEn ? 'Credentials' : 'Identifiants'}
              </button>
              <button 
                onClick={() => setAuthMethod('biometric')}
                className={`py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 outline-none ${authMethod === 'biometric' ? 'bg-[#10B981]/20 text-text-main border border-[#10B981]/30' : 'text-text-muted hover:text-text-main hover:bg-glass-bg border border-transparent'}`}
              >
                <Fingerprint className="w-4 h-4" /> ZFM/R307
              </button>
            </div>

            {authMethod === 'credentials' ? (
              <motion.form 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleLogin} 
                className="space-y-6"
              >
                <div className="space-y-2 group">
                  <Label htmlFor="email" className="text-text-muted font-mono text-xs uppercase tracking-wider group-focus-within:text-[#10B981] transition-colors">{isEn ? 'Operator ID' : 'Opérateur ID'}</Label>
                  <div className="relative">
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="karl.foko@sparte.dev" 
                      className="w-full bg-glass-bg border-glass-border focus-visible:ring-0 focus-visible:border-[#10B981] text-text-main h-12 rounded-xl transition-all font-mono" 
                      required 
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2 group">
                  <Label htmlFor="password" className="text-text-muted font-mono text-xs uppercase tracking-wider group-focus-within:text-[#10B981] transition-colors">{isEn ? 'Cryptographic Key' : 'Clé Cryptographique'}</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    className="w-full bg-glass-bg border-glass-border focus-visible:ring-0 focus-visible:border-[#10B981] text-text-main h-12 rounded-xl transition-all font-mono tracking-[0.2em]"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-14 bg-text-main hover:opacity-80 text-luxury-bg-start font-semibold rounded-xl flex items-center justify-center transition-all group overflow-hidden relative outline-none"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <span className="relative z-10 flex items-center gap-2 font-display text-lg">
                        {isEn ? 'Secure Login' : 'Connexion Sécurisée'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-[#10B981]/30 flex items-center justify-center relative overflow-hidden group cursor-pointer" onClick={handleLogin}>
                  <motion.div 
                    className="absolute inset-0 bg-[#10B981]/10"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Fingerprint className="w-16 h-16 text-text-muted group-hover:text-text-main transition-colors z-10" />
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#10B981] group-hover:animate-[scan_2s_ease-in-out_infinite] opacity-0 group-hover:opacity-100" />
                </div>
                <div className="mt-8">
                  <p className="text-sm font-medium text-text-main">{isEn ? 'Waiting for fingerprint...' : 'En attente d\'empreinte...'}</p>
                  <p className="text-xs text-text-muted mt-2 font-mono uppercase tracking-wider">{isEn ? 'UART Reader Active' : 'Lecteur UART actif'}</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        <p className="mt-8 text-xs font-mono text-slate-600 tracking-widest uppercase relative z-10">
          Sparte Robotics © 2024 · Chiffrement AES-256
        </p>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-10px); }
          50% { transform: translateY(130px); }
          100% { transform: translateY(-10px); }
        }
      `}} />
    </div>
  );
}
