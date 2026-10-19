import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowLeftRight, 
  RotateCcw, 
  Dices, 
  Play, 
  Copy, 
  Check, 
  Hash, 
  Layers
} from 'lucide-react';
import { PalindromeCheckResult } from '../types/palindrome';

interface PalindromeTesterProps {
  input: string;
  onInputChange: (val: string) => void;
  result: PalindromeCheckResult;
  onNavigateToTab: (tabId: string) => void;
}

export const PalindromeTester: React.FC<PalindromeTesterProps> = ({
  input,
  onInputChange,
  result,
  onNavigateToTab,
}) => {
  const [copied, setCopied] = useState(false);

  const handleRandom = () => {
    const samplePool = [
      '1', '4', '8', '99', '101', '363', '4004', '9889', 
      '12321', '55555', '78987', '1234321', '890098', '12345', '987654'
    ];
    const picked = samplePool[Math.floor(Math.random() * samplePool.length)];
    onInputChange(picked);
  };

  const handleCopyResult = () => {
    if (!result.isValidNumber) return;
    const text = `Sayı: ${result.input}\nDurum: ${result.isPalindrome ? 'Palindrom Sayı' : 'Palindrom Değil'}\nDüzden: ${result.input}\nTersten: ${result.reverseString}\nHazırlayan: Enes Öztürk`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const originalDigits = result.input ? result.input.split('') : [];
  const reversedDigits = result.reverseString ? result.reverseString.split('') : [];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6">
      
      {/* Title & Input Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <label htmlFor="palindrome-input" className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Hash className="w-4 h-4 text-amber-400" />
            <span>Kontrol Edilecek Sayıyı Giriniz:</span>
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRandom}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Rastgele örnek sayı seç"
            >
              <Dices className="w-3.5 h-3.5 text-amber-400" />
              <span>Rastgele Örnek</span>
            </button>
            {input && (
              <button
                onClick={() => onInputChange('')}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
                title="Temizle"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Temizle</span>
              </button>
            )}
          </div>
        </div>

        <div className="relative">
          <input
            id="palindrome-input"
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Örn: 363, 4004, 9889 veya herhangi bir sayı..."
            className="w-full text-xl sm:text-2xl font-mono px-4 py-3.5 rounded-xl bg-slate-950 border-2 border-slate-700/80 focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/10 text-white placeholder:text-slate-600 transition-all"
            maxLength={18}
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {result.isValidNumber && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 hidden sm:inline-block">
                {result.digitsCount} Basamak
              </span>
            )}
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-2">
          * Yalnızca pozitif tam sayılar analiz edilir. Negatif sayılar simetri bozduğu için palindrom sayılmaz.
        </p>
      </div>

      {/* Main Result Card */}
      {result.isValidNumber ? (
        <div
          className={`rounded-2xl p-5 sm:p-6 border transition-all ${
            result.isPalindrome
              ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/40 shadow-emerald-950/30 shadow-lg'
              : 'bg-gradient-to-br from-rose-950/30 via-slate-900 to-slate-900 border-rose-500/30 shadow-rose-950/30 shadow-lg'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                  result.isPalindrome
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-rose-500 text-white'
                }`}
              >
                {result.isPalindrome ? (
                  <CheckCircle2 className="w-7 h-7" />
                ) : (
                  <XCircle className="w-7 h-7" />
                )}
              </div>
              <div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded inline-block mb-1 ${
                    result.isPalindrome
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {result.isPalindrome ? 'Doğrulandı: Palindromik Sayı' : 'Palindrom Değil'}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                  {result.input}{' '}
                  <span className="text-sm font-normal text-slate-400">
                    {result.isPalindrome
                      ? 'iki taraftan okunduğunda aynıdır.'
                      : 'iki yönden farklı okunmaktadır.'}
                  </span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handleCopyResult}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopyalandı' : 'Sonucu Kopyala'}</span>
              </button>
            </div>
          </div>

          {/* Visual Digit-by-Digit Mirror Display */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400" />
                Basamak Karşılaştırma Analizi
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {result.input} == {result.reverseString} ? {result.isPalindrome ? 'true' : 'false'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Left-to-right (Original) */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-slate-300">Soldan Sağa (Orijinal):</span>
                  <span className="font-mono text-[10px] text-slate-500">→ Yönünde</span>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center py-2">
                  {originalDigits.map((digit, idx) => {
                    const isMatch = digit === reversedDigits[idx];
                    return (
                      <div
                        key={`orig-${idx}`}
                        className={`w-9 h-11 rounded-lg flex flex-col items-center justify-center font-mono font-bold text-lg border transition-all ${
                          isMatch
                            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-500/20'
                            : 'bg-rose-950/50 border-rose-500/60 text-rose-300'
                        }`}
                      >
                        <span>{digit}</span>
                        <span className="text-[9px] font-normal text-slate-400 mt-[-2px]">{idx}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right-to-left (Reversed) */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-slate-300">Sağdan Sola (Tersi):</span>
                  <span className="font-mono text-[10px] text-slate-500">← Yönünde</span>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center py-2">
                  {reversedDigits.map((digit, idx) => {
                    const isMatch = digit === originalDigits[idx];
                    return (
                      <div
                        key={`rev-${idx}`}
                        className={`w-9 h-11 rounded-lg flex flex-col items-center justify-center font-mono font-bold text-lg border transition-all ${
                          isMatch
                            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-500/20'
                            : 'bg-rose-950/50 border-rose-500/60 text-rose-300'
                        }`}
                      >
                        <span>{digit}</span>
                        <span className="text-[9px] font-normal text-slate-400 mt-[-2px]">{idx}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Quick Next Actions Bar */}
            <div className="mt-5 pt-4 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-400">
                Java döngüsünde <code className="text-amber-300 font-mono">temp % 10</code> ve <code className="text-amber-300 font-mono">reverseNumber</code> değişkenlerinin adım adım nasıl oluştuğunu görün:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigateToTab('visualizer')}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Adım Adım Java Döngüsünü İncele</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="text-center py-10 px-4 border border-dashed border-slate-800 rounded-2xl bg-slate-950/50">
          <p className="text-slate-400 text-sm">
            Kontrol etmek için yukarıdaki alana bir sayı yazın veya örneklerden birine tıklayın.
          </p>
        </div>
      )}

    </div>
  );
};
