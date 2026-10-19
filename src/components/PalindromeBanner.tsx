import React from 'react';
import { HelpCircle, Check, ArrowLeftRight, BookOpen, Lightbulb } from 'lucide-react';

export const PalindromeBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        
        {/* Definition Column */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <BookOpen className="w-4 h-4" />
            <span>Palindrom Sayı Nedir?</span>
          </div>

          <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed">
            <strong className="text-amber-300 font-bold">Palindromik sayı</strong>, hem soldan sağa hem de sağdan sola okunduğunda aynı değeri veren, basamak dizilimi simetrik olan sayılardır.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-sm text-slate-300">
            <span className="text-slate-400 font-medium">Klasik Örnekler:</span>
            {['1', '4', '8', '99', '101', '363', '4004', '9889'].map((item) => (
              <span
                key={item}
                className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono text-xs border border-amber-500/20 font-semibold"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-400">
            <div className="flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-200">0-9 Tek Basamaklılar:</strong> Tüm rakamlar doğası gereği tersten de aynı okunduğu için palindromdur.
              </span>
            </div>
            <div className="flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-200">Java Yaklaşımı:</strong> Sayıyı modülo (<code>% 10</code>) ve bölme (<code>/ 10</code>) ile basamaklarına ayırıp tersini oluştururuz.
              </span>
            </div>
          </div>
        </div>

        {/* Visual Mirror Concept Box */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Ayna Simetrisi İlkesi</span>
            <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400" />
          </div>

          <div className="my-3 py-3 px-4 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center gap-3">
            <div className="text-center font-mono">
              <span className="text-xl sm:text-2xl font-bold text-amber-400 tracking-wider">3 6 3</span>
              <span className="block text-[10px] text-slate-500 mt-1">Düzden Okunuş</span>
            </div>
            <div className="h-10 w-px bg-amber-500/40 relative">
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
            </div>
            <div className="text-center font-mono">
              <span className="text-xl sm:text-2xl font-bold text-emerald-400 tracking-wider">3 6 3</span>
              <span className="block text-[10px] text-slate-500 mt-1">Tersten Okunuş</span>
            </div>
          </div>

          <div className="text-center text-[11px] text-emerald-400 font-medium bg-emerald-500/10 py-1.5 px-3 rounded-md border border-emerald-500/20">
            ✓ 363 == 363 (Simetri Sağlandı)
          </div>
        </div>

      </div>
    </div>
  );
};
