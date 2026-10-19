import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Terminal, 
  Cpu, 
  Layers, 
  Info,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { PalindromeCheckResult, StepTrace } from '../types/palindrome';

interface AlgorithmVisualizerProps {
  result: PalindromeCheckResult;
}

export const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({ result }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(1500);

  const steps = result.steps;
  const totalSteps = steps.length;
  const isFinished = currentStepIndex >= totalSteps;

  // Reset step index when input changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [result.input]);

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      if (currentStepIndex < totalSteps) {
        timer = setTimeout(() => {
          setCurrentStepIndex((prev) => prev + 1);
        }, speedMs);
      } else {
        setIsPlaying(false);
      }
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentStepIndex, totalSteps, speedMs]);

  if (!result.isValidNumber || totalSteps === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
        <p>Lütfen algoritmayı görselleştirmek için geçerli bir sayı giriniz.</p>
      </div>
    );
  }

  const currentStep: StepTrace | undefined = steps[Math.min(currentStepIndex, totalSteps - 1)];

  // Java Code Lines for reference
  const codeLines = [
    { num: 1, text: '// Java Palindrom Algoritması - Enes Öztürk' },
    { num: 2, text: `int number = ${result.input};` },
    { num: 3, text: 'int temp = number;' },
    { num: 4, text: 'int reverseNumber = 0;' },
    { num: 5, text: 'int lastDigit;' },
    { num: 6, text: 'while (temp != 0) {' },
    { num: 7, text: '    lastDigit = temp % 10;' },
    { num: 8, text: '    reverseNumber = (reverseNumber * 10) + lastDigit;' },
    { num: 9, text: '    temp /= 10;' },
    { num: 10, text: '}' },
    { num: 11, text: 'boolean sonuc = (number == reverseNumber);' },
  ];

  // Determine active highlighted line in Java code based on execution progress
  let activeCodeLine = 6;
  if (currentStepIndex === 0) {
    activeCodeLine = 3;
  } else if (currentStepIndex >= totalSteps) {
    activeCodeLine = 11;
  } else {
    activeCodeLine = 8;
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6">
      
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Java While Döngüsü Adım Adım Görselleştirici
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Her adımda <code className="text-amber-300 font-mono">temp</code>'in son basamağının nasıl çekilip <code className="text-amber-300 font-mono">reverseNumber</code>'a eklendiğini izleyin.
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => {
              setCurrentStepIndex(0);
              setIsPlaying(false);
            }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="Başa Dön"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex((prev) => Math.max(0, prev - 1));
            }}
            disabled={currentStepIndex === 0}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="Önceki Adım"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (currentStepIndex >= totalSteps) {
                setCurrentStepIndex(0);
              }
              setIsPlaying(!isPlaying);
            }}
            className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5 transition-colors shadow-md shadow-amber-500/20 cursor-pointer text-xs"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Durdur</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{currentStepIndex >= totalSteps ? 'Yeniden Oynat' : 'Oynat'}</span>
              </>
            )}
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex((prev) => Math.min(totalSteps, prev + 1));
            }}
            disabled={currentStepIndex >= totalSteps}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="Sonraki Adım"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Speed Selector */}
          <select
            value={speedMs}
            onChange={(e) => setSpeedMs(Number(e.target.value))}
            className="text-xs bg-slate-800 text-slate-300 border border-slate-700 rounded-lg px-2.5 py-2 cursor-pointer focus:outline-none"
          >
            <option value={2200}>0.7x (Yavaş)</option>
            <option value={1500}>1.0x (Normal)</option>
            <option value={800}>2.0x (Hızlı)</option>
          </select>
        </div>
      </div>

      {/* Progress Bar & Step Indicator */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>
            {currentStepIndex >= totalSteps ? (
              <span className="text-emerald-400 font-bold">✓ Döngü Tamamlandı (temp == 0)</span>
            ) : (
              <span>
                Adım: <strong className="text-amber-300">{currentStepIndex + 1}</strong> / {totalSteps}
              </span>
            )}
          </span>
          <span className="font-mono text-slate-400">
            Döngü İlerlemesi: %{Math.round(((currentStepIndex + (currentStepIndex >= totalSteps ? 0 : 1)) / (totalSteps + 1)) * 100)}
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
            style={{
              width: `${((currentStepIndex + 1) / (totalSteps + 1)) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Main Grid: Code on left, Live Variable Memory Watch on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Java Code View */}
        <div className="lg:col-span-6 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col">
          <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-amber-400" /> PalindromSayi.java
            </span>
            <span className="text-[10px] text-slate-400">Aktif Satır: {activeCodeLine}</span>
          </div>
          <div className="p-3 text-xs sm:text-sm font-mono overflow-x-auto space-y-1 flex-1">
            {codeLines.map((line) => {
              const isCurrent = line.num === activeCodeLine;
              return (
                <div
                  key={line.num}
                  className={`flex items-center gap-3 px-2 py-1 rounded transition-colors ${
                    isCurrent
                      ? 'bg-amber-500/20 text-amber-200 border-l-4 border-amber-400 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="w-6 text-right text-slate-600 select-none text-xs">{line.num}</span>
                  <span className="whitespace-pre">{line.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Memory Watch & Step Explanation */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Variable Cards */}
          <div className="grid grid-cols-3 gap-3">
            
            {/* temp card */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                temp
              </span>
              <span className="text-lg sm:text-xl font-bold font-mono text-amber-400 break-all">
                {currentStepIndex >= totalSteps
                  ? '0'
                  : currentStep?.tempBefore ?? '0'}
              </span>
              <span className="block text-[10px] text-slate-400 mt-1">Kalan Sayı</span>
            </div>

            {/* lastDigit card */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                lastDigit
              </span>
              <span className="text-lg sm:text-xl font-bold font-mono text-cyan-400">
                {currentStepIndex >= totalSteps
                  ? '-'
                  : currentStep?.lastDigit ?? '-'}
              </span>
              <span className="block text-[10px] text-slate-400 mt-1">temp % 10</span>
            </div>

            {/* reverseNumber card */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                reverseNumber
              </span>
              <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400 break-all">
                {currentStepIndex >= totalSteps
                  ? result.reverseString
                  : currentStep?.reverseNumberAfter ?? '0'}
              </span>
              <span className="block text-[10px] text-slate-400 mt-1">Ters Sayı</span>
            </div>

          </div>

          {/* Step Narrative Explanation Box */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Info className="w-4 h-4" />
              <span>Döngü İşlem Açıklaması</span>
            </div>

            {currentStepIndex < totalSteps && currentStep ? (
              <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                <p className="leading-relaxed">
                  {currentStep.explanation}
                </p>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs font-mono space-y-1">
                  <div className="text-slate-400">
                    1. <span className="text-cyan-300">lastDigit</span> = {currentStep.tempBefore} % 10 = <span className="text-cyan-400 font-bold">{currentStep.lastDigit}</span>
                  </div>
                  <div className="text-slate-400">
                    2. <span className="text-emerald-300">reverseNumber</span> = ({currentStep.reverseNumberBefore} * 10) + {currentStep.lastDigit} = <span className="text-emerald-400 font-bold">{currentStep.reverseNumberAfter}</span>
                  </div>
                  <div className="text-slate-400">
                    3. <span className="text-amber-300">temp</span> = {currentStep.tempBefore} / 10 = <span className="text-amber-400 font-bold">{currentStep.tempAfter}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs sm:text-sm">
                <p className="text-emerald-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Döngü sona erdi! (temp == 0 şartı sağlandı)
                </p>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs font-mono space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span>Orijinal Sayı (number):</span>
                    <span className="font-bold text-white">{result.input}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Oluşan Ters Sayı (reverseNumber):</span>
                    <span className="font-bold text-emerald-400">{result.reverseString}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between font-bold">
                    <span>number == reverseNumber :</span>
                    <span className={result.isPalindrome ? 'text-emerald-400' : 'text-rose-400'}>
                      {result.isPalindrome ? 'true (PALİNDROM)' : 'false (PALİNDROM DEĞİL)'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pro-Tip Box */}
          <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3 text-xs text-slate-400 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Java Bellek İpucu:</strong> Matematiksel yöntem nesne (String/StringBuilder) tahsis etmez, bu nedenle <code className="text-slate-200 font-mono">O(1)</code> bellek karmaşıklığı ile en verimli çözümdür.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
