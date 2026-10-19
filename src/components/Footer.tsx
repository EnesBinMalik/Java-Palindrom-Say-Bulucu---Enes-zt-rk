import React from 'react';
import { Code2, Heart, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 mt-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand & Signature */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold font-mono">
                J
              </div>
              <span className="font-bold text-white text-sm">Java Palindrom Sayı Bulucu</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              İki taraftan okunduğunda aynı olan sayıların matematiksel analizi ve modern Java algoritmalarıyla incelenmesi.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-semibold font-mono">
                Hazırlayan: Enes Öztürk
              </span>
            </div>
          </div>

          {/* Core Concept Summary */}
          <div className="space-y-2">
            <span className="font-semibold text-slate-200 block text-xs uppercase tracking-wider">
              Palindrom Sayı Kriterleri
            </span>
            <ul className="space-y-1.5 text-slate-400 text-xs">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Tek basamaklılar (1, 4, 8) palindromdur.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>İki basamaklı ikizler (99, 11, 22) palindromdur.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Simetrik çok basamaklılar (101, 363, 4004, 9889)</span>
              </li>
            </ul>
          </div>

          {/* Java Algorithmic Complexity */}
          <div className="space-y-2">
            <span className="font-semibold text-slate-200 block text-xs uppercase tracking-wider">
              Algoritma Karmaşıklığı
            </span>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1.5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Zaman Karmaşıklığı:</span>
                <span className="text-amber-300 font-bold">O(log10(N))</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Alan Karmaşıklığı:</span>
                <span className="text-emerald-300 font-bold">O(1)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Temel Operasyon:</span>
                <span className="text-cyan-300">Modulo % 10</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-xs">
          <span>
            © 2026 Java Palindrom Algoritma Uygulaması. Tüm hakları saklıdır.
          </span>
          <div className="flex items-center gap-1.5 font-medium">
            <span>Enes Öztürk imzasıyla hazırlanmıştır.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
