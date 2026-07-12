import { useLanguage } from "@/src/lib/LanguageContext";
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { StockItem } from '@/src/types';
import { AlertTriangle, CheckCircle2, Wrench, ArrowDownCircle, Cpu, MailWarning, Plus } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { fetchWithFallback, mockStockData } from '@/src/lib/mockApi';

export function StockMaintenanceView() {
  const { t } = useLanguage();

  const [stock, setStock] = useState<StockItem[] | null>(null);

  useEffect(() => {
    fetchWithFallback('/api/stock', mockStockData).then(setStock);
  }, []);

  if (!stock) return (
    <div className="flex-1 h-full flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-2 border-[#ECFDF5]/30 border-t-[#ECFDF5] rounded-full animate-spin"></div>
      <p className="font-mono text-sm tracking-widest uppercase text-text-main animate-pulse">Synchronisation ERP MySQL...</p>
    </div>
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto min-h-screen relative font-sans">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-main mb-2 block">{t("Gouvernance ERP", "ERP Governance")}</span>
          <h1 className="text-4xl lg:text-5xl font-display font-semibold text-text-main tracking-tight">{t("Stock & Magasin", "Stock & Store")}</h1>
          <p className="text-text-muted mt-3 max-w-2xl text-lg font-light">{t("Surveillance de l'inventaire matériel et dates des prochaines maintenances.", "Hardware inventory monitoring and next maintenance dates.")}</p>
        </div>
        
        <button className="glass-panel px-6 py-3 rounded-full inline-flex items-center gap-3 self-start md:self-auto border border-glass-border hover:border-white/30 hover:bg-glass-bg transition-all text-text-main font-medium outline-none shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-95 group">
          <Wrench size={16} className="text-[#10B981] group-hover:-rotate-45 transition-transform" /> 
          <span>{t("Planifier Maintenance", "Schedule Maintenance")}</span>
          <div className="w-px h-4 bg-text-main/20 mx-1" />
          <Plus size={16} />
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="glass-panel rounded-[2rem] p-1 overflow-hidden"
      >
        <div className="bg-[#0A0A0F]/80 rounded-[1.8rem] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-glass-border hover:bg-transparent">
                <TableHead className="font-mono text-[10px] uppercase tracking-widest text-text-muted py-6 pl-8">{t("ID Pièce", "Part ID")}</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-widest text-text-main">{t("Nomenclature", "Nomenclature")}</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-widest text-text-muted">{t("Catégorie", "Category")}</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-widest text-text-muted text-right">{t("Stock Relatif", "Relative Stock")}</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-widest text-text-muted text-right pr-8">{t("Statut", "Status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stock.map((item, i) => (
                <TableRow key={item.id} className="border-glass-border hover:bg-glass-bg transition-colors group">
                  <TableCell className="font-mono text-xs text-[#10B981] pl-8 py-5">
                    {item.id}
                  </TableCell>
                  <TableCell className="font-sans text-sm text-text-main font-medium flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-glass-bg border border-glass-border flex items-center justify-center">
                       <Cpu size={14} className="text-text-muted group-hover:text-text-main transition-colors" />
                    </div>
                    {item.name}
                  </TableCell>
                  <TableCell className="text-text-muted text-sm font-light">{item.category}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      <span className={cn(
                        "font-display font-semibold text-2xl tracking-tight leading-none",
                        item.status === 'CRITICAL' ? "text-rose-400" : 
                        item.status === 'LOW' ? "text-[#06B6D4]" : "text-text-main"
                      )}>
                        {item.quantity}
                      </span>
                      <span className="font-mono text-[10px] text-text-muted">Min: {item.minThreshold}</span>
                    </div>
                  </TableCell>
                  <TableCell className="pr-8 text-right">
                    <div className={cn(
                      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase border backdrop-blur-md ml-auto",
                      item.status === 'OK' && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                      item.status === 'LOW' && "bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]/20",
                      item.status === 'CRITICAL' && "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                    )}>
                      {item.status === 'OK' && <CheckCircle2 size={12} />}
                      {item.status === 'LOW' && <ArrowDownCircle size={12} />}
                      {item.status === 'CRITICAL' && <AlertTriangle size={12} />}
                      {item.status}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
      
      {stock.filter(s => s.status !== 'OK').length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 relative overflow-hidden rounded-[2rem] border border-[#06B6D4]/30 bg-gradient-to-r from-[#06B6D4]/10 to-transparent p-4 md:p-8 flex gap-6 items-start"
        >
          <div className="absolute top-0 right-0 p-4 md:p-8 w-64 h-full bg-gradient-to-l from-black/50 to-transparent pointer-events-none" />
          <div className="w-14 h-14 rounded-2xl bg-[#06B6D4]/20 flex items-center justify-center shrink-0 border border-[#06B6D4]/40 shadow-[0_0_30px_rgba(244,208,63,0.2)]">
            <MailWarning className="text-[#06B6D4] w-6 h-6" />
          </div>
          <div>
            <h4 className="text-[#06B6D4] font-display text-xl font-semibold mb-2">{t("Alerte de Réapprovisionnement Magasin", "Store Restocking Alert")}</h4>
            <p className="text-[#06B6D4]/70 text-base font-light leading-relaxed max-w-3xl">Certains composants ont atteint leur seuil de rupture critique ou niveau bas. Une demande de devis au fournisseur doit être validée. (TODO: lier l'API d'envoi d'email au service achat).</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
