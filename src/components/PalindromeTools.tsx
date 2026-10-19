import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Dices, 
  Compass, 
  Calculator, 
  HelpCircle,
  Copy,
  Check,
  Zap
} from 'lucide-react';
import { 
  findPalindromesInRange, 
  findClosestPalindromes, 
  generateRandomPalindrome, 
  computeLychrel 
} from '../utils/palindromeUtils';
import { RangeResult, LychrelStep } from '../types/palindrome';

interface PalindromeToolsProps {
  onSelectNumber: (num: string) => void;
  currentInput: string;
}

export const PalindromeTools: React.FC<PalindromeToolsProps> = ({
  onSelectNumber,
  currentInput,
}) => {
  // Tool 1: Range Scanner
  const [rangeStart, setRangeStart] = useState<number>(100);
  const [rangeEnd, setRangeEnd] = useState<number>(500);
  const [rangeResult, setRangeResult] = useState<RangeResult>(() =>
    findPalindromesInRange(100, 500)
  );

  const handleScanRange = () => {
    setRangeResult(findPalindromesInRange(rangeStart, rangeEnd));
  };

  // Tool 2: Closest Palindrome
  const [closestInput, setClosestInput] = useState<string>(currentInput || '365');
  const [closestResult, setClosestResult] = useState(() =>
    findClosestPalindromes(currentInput || '365')
  );

  const handleFindClosest = (val: string) => {
    setClosestInput(val);
    setClosestResult(findClosestPalindromes(val));
  };

  // Tool 3: Random Generator
  const [digitCount, setDigitCount] = useState<number>(5);
  const [generatedPalindrome, setGeneratedPalindrome] = useState<string>(() =>
    generateRandomPalindrome(5)
  );

  const handleGenerate = () => {
    setGeneratedPalindrome(generateRandomPalindrome(digitCount));
  };

  // Tool 4: Lychrel (Tersini Al & Topla)
  const [lychrelInput, setLychrelInput] = useState<string>('56');
  const [lychrelData, setLychrelData] = useState(() => computeLychrel('56'));

  const handleComputeLychrel = (val: string) => {
    setLychrelInput(val);
    setLychrelData(computeLychrel(val));
  };

  return (
    <div className="space-y-6">
      
      {/* Tool 1: Range Finder */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              Aralıktaki Tüm Palindrom Sayıları Bul
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            İki sayı arasındaki simetrik sayıların taranması
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400">Başlangıç:</label>
            <input
              type="number"
              value={rangeStart}
              onChange={(e) => setRangeStart(Number(e.target.value))}
              min={0}
              className="w-24 text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400">Bitiş:</label>
            <input
              type="number"
              value={rangeEnd}
              onChange={(e) => setRangeEnd(Number(e.target.value))}
              min={1}
              className="w-24 text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            onClick={handleScanRange}
            className="text-xs px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors cursor-pointer"
          >
            Aralığı Tara
          </button>

          {/* Quick presets */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 ml-auto">
            <span className="hidden sm:inline">Hızlı:</span>
            {[
              { s: 1, e: 100 },
              { s: 100, e: 1000 },
              { s: 1000, e: 5000 },
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setRangeStart(p.s);
                  setRangeEnd(p.e);
                  setRangeResult(findPalindromesInRange(p.s, p.e));
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono border border-slate-700 cursor-pointer"
              >
                {p.s}-{p.e}
              </button>
            ))}
          </div>
        </div>

        {/* Results stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Bulunan Palindrom</span>
            <span className="text-base font-bold font-mono text-emerald-400">{rangeResult.totalFound} adet</span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Aralık Genişliği</span>
            <span className="text-base font-bold font-mono text-white">
              {rangeResult.end - rangeResult.start + 1} sayı
            </span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Palindrom Yoğunluğu</span>
            <span className="text-base font-bold font-mono text-amber-400">%{rangeResult.percentage}</span>
          </div>
        </div>

        {/* Palindrome List */}
        <div className="max-h-48 overflow-y-auto p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap gap-1.5">
          {rangeResult.palindromes.map((num) => (
            <button
              key={num}
              onClick={() => onSelectNumber(num.toString())}
              className="px-2.5 py-1 rounded bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-300 font-mono text-xs border border-slate-800 transition-colors cursor-pointer"
              title="Bu sayıyı incele"
            >
              {num}
            </button>
          ))}
          {rangeResult.palindromes.length === 0 && (
            <span className="text-xs text-slate-500 italic">Bu aralıkta palindrom sayı bulunamadı.</span>
          )}
        </div>
        <p className="text-[11px] text-slate-500">
          * Sayılara tıklayarak üstteki ana analiz ekranında adım adım inceleyebilirsiniz.
        </p>
      </div>

      {/* Grid: Closest & Generator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Tool 2: En Yakın Palindrom */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Compass className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">En Yakın Palindrom Sayılar</h3>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={closestInput}
              onChange={(e) => handleFindClosest(e.target.value)}
              placeholder="Sayı girin (örn: 365)"
              className="flex-1 text-sm font-mono px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                En Yakın Küçük Palindrom
              </span>
              <span className="text-lg font-bold font-mono text-cyan-400">
                {closestResult.smaller ?? '-'}
              </span>
              {closestResult.smaller && (
                <button
                  onClick={() => onSelectNumber(closestResult.smaller!)}
                  className="mt-2 text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer block mx-auto"
                >
                  Analiz Et →
                </button>
              )}
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                En Yakın Büyük Palindrom
              </span>
              <span className="text-lg font-bold font-mono text-emerald-400">
                {closestResult.larger ?? '-'}
              </span>
              {closestResult.larger && (
                <button
                  onClick={() => onSelectNumber(closestResult.larger!)}
                  className="mt-2 text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer block mx-auto"
                >
                  Analiz Et →
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tool 3: Rastgele Palindrom Üreteci */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Dices className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Rastgele Palindrom Üreteci</h3>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>Basamak Sayısı:</span>
            <span className="font-mono font-bold text-amber-400">{digitCount} Basamaklı</span>
          </div>

          <input
            type="range"
            min={1}
            max={12}
            value={digitCount}
            onChange={(e) => {
              setDigitCount(Number(e.target.value));
              setGeneratedPalindrome(generateRandomPalindrome(Number(e.target.value)));
            }}
            className="w-full accent-amber-500 cursor-pointer"
          />

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            <span className="text-xl font-bold font-mono text-amber-300 tracking-wider">
              {generatedPalindrome}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleGenerate}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                title="Yeni Sayı Üret"
              >
                <Dices className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectNumber(generatedPalindrome)}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors cursor-pointer"
              >
                Dene
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Tool 4: 196 Algoritması / Lychrel Tersini Topla */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                "Tersini Al ve Topla" Algoritması (Lychrel Süreci)
              </h3>
              <p className="text-xs text-slate-400">
                Herhangi bir sayıyı tersiyle toplayarak adım adım palindrom üretme deneyi (örn: 56 + 65 = 121)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={lychrelInput}
              onChange={(e) => handleComputeLychrel(e.target.value)}
              placeholder="Örn: 56, 89"
              className="w-28 text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
            />
            {['56', '89', '125'].map((ex) => (
              <button
                key={ex}
                onClick={() => handleComputeLychrel(ex)}
                className="text-[11px] px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {lychrelData.steps.map((st) => (
            <div
              key={st.stepIndex}
              className={`p-2.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs ${
                st.isResultPalindrome
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[10px] font-bold">
                  {st.stepIndex}
                </span>
                <span>
                  {st.original} + {st.reversed} = <strong className="text-white text-sm">{st.sum}</strong>
                </span>
              </div>
              <div>
                {st.isResultPalindrome ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[11px]">
                    ✓ Palindrom Elde Edildi!
                  </span>
                ) : (
                  <span className="text-slate-400 text-[11px]">Devam ediyor...</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
