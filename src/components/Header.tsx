import React from 'react';
import { Sparkles, Terminal, Code2, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onSelectPreset: (num: string) => void;
  currentInput: string;
}

export const Header: React.FC<HeaderProps> = ({ onSelectPreset, currentInput }) => {
  const presets = ['1', '8', '99', '101', '363', '4004', '9889', '12321', '12345'];

  return (
    <header className="relative border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-start sm:items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20 shrink-0">
              <span className="text-xl font-mono">{"{J}"}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  Java Palindrom Sayı Bulucu
                </h1>
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-medium">
                  <Code2 className="w-3 h-3" /> Java Algoritma
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                İki taraftan okunduğunda aynı olan sayıların Java mantığıyla adım adım analizi
              </p>
            </div>
          </div>

          {/* Author Badge - Enes Öztürk */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-slate-800/90 to-slate-800/50 border border-amber-500/30 shadow-sm flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div className="text-left">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Hazırlayan</span>
                <span className="text-xs sm:text-sm font-bold text-amber-300 tracking-wide font-mono">Enes Öztürk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Example Chips */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-400">
          <span className="font-semibold text-slate-300 flex items-center gap-1 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Hızlı Örnekler:
          </span>
          {presets.map((val) => {
            const isSelected = currentInput === val;
            return (
              <button
                key={val}
                onClick={() => onSelectPreset(val)}
                className={`px-2.5 py-1 rounded-md font-mono transition-all text-xs shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60'
                }`}
              >
                {val}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
