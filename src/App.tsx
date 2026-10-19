import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  Code2, 
  Sparkles, 
  Compass, 
  HelpCircle, 
  History, 
  Trash2, 
  ArrowRight 
} from 'lucide-react';
import { Header } from './components/Header';
import { PalindromeBanner } from './components/PalindromeBanner';
import { PalindromeTester } from './components/PalindromeTester';
import { AlgorithmVisualizer } from './components/AlgorithmVisualizer';
import { JavaCodePlayground } from './components/JavaCodePlayground';
import { PalindromeTools } from './components/PalindromeTools';
import { KnowledgeQuiz } from './components/KnowledgeQuiz';
import { Footer } from './components/Footer';
import { analyzePalindromeMathematical } from './utils/palindromeUtils';
import { HistoryItem } from './types/palindrome';

export default function App() {
  const [inputNumber, setInputNumber] = useState<string>('363');
  const [activeTab, setActiveTab] = useState<'tester' | 'visualizer' | 'code' | 'tools' | 'quiz'>('tester');
  
  // Recent testing history
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: '1', number: '4004', isPalindrome: true, digitsCount: 4, timestamp: Date.now() - 60000 },
    { id: '2', number: '101', isPalindrome: true, digitsCount: 3, timestamp: Date.now() - 120000 },
    { id: '3', number: '1234', isPalindrome: false, digitsCount: 4, timestamp: Date.now() - 180000 },
  ]);

  // Compute live mathematical analysis
  const checkResult = useMemo(() => {
    return analyzePalindromeMathematical(inputNumber);
  }, [inputNumber]);

  const handleInputChange = (val: string) => {
    setInputNumber(val);
    if (val && !isNaN(Number(val))) {
      // Add or update to recent history
      const res = analyzePalindromeMathematical(val);
      if (res.isValidNumber) {
        setHistory((prev) => {
          const filtered = prev.filter((item) => item.number !== res.input);
          return [
            {
              id: Date.now().toString(),
              number: res.input,
              isPalindrome: res.isPalindrome,
              digitsCount: res.digitsCount,
              timestamp: Date.now(),
            },
            ...filtered.slice(0, 9),
          ];
        });
      }
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const navTabs = [
    { id: 'tester', label: 'Palindrom Analizi', icon: Sparkles },
    { id: 'visualizer', label: 'Adım Adım Java Döngüsü', icon: Cpu, badge: 'Görselleştirici' },
    { id: 'code', label: 'Java Kodları & Konsol', icon: Code2 },
    { id: 'tools', label: 'Keşif Araçları', icon: Compass },
    { id: 'quiz', label: 'Bilgi Testi', icon: HelpCircle },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Header with Author Signature */}
      <Header onSelectPreset={handleInputChange} currentInput={inputNumber} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        
        {/* Definition & Mirror Info Banner */}
        <PalindromeBanner />

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap border ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{tab.label}</span>
                {'badge' in tab && tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isActive
                        ? 'bg-slate-950/20 text-slate-950 font-bold'
                        : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Tester & Visual Symmetry */}
        {activeTab === 'tester' && (
          <div className="space-y-6">
            <PalindromeTester
              input={inputNumber}
              onInputChange={handleInputChange}
              result={checkResult}
              onNavigateToTab={(tabId) => setActiveTab(tabId as any)}
            />

            {/* Recent History Bar */}
            {history.length > 0 && (
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <History className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold text-slate-300">Son Analiz Edilenler:</span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {history.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleInputChange(item.number)}
                        className={`px-2 py-0.5 rounded font-mono border transition-all cursor-pointer ${
                          item.isPalindrome
                            ? 'bg-emerald-950/30 text-emerald-300 border-emerald-500/30 hover:bg-emerald-900/50'
                            : 'bg-rose-950/30 text-rose-300 border-rose-500/30 hover:bg-rose-900/50'
                        }`}
                        title={`${item.number} - ${item.isPalindrome ? 'Palindrom' : 'Palindrom Değil'}`}
                      >
                        {item.number} {item.isPalindrome ? '✓' : '✗'}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={clearHistory}
                  className="text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer self-end sm:self-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Geçmişi Temizle</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Algorithm Visualizer */}
        {activeTab === 'visualizer' && (
          <AlgorithmVisualizer result={checkResult} />
        )}

        {/* Tab 3: Java Code & Terminal Simulator */}
        {activeTab === 'code' && (
          <JavaCodePlayground />
        )}

        {/* Tab 4: Palindrome Exploration Tools */}
        {activeTab === 'tools' && (
          <PalindromeTools
            onSelectNumber={(num) => {
              setInputNumber(num);
              setActiveTab('tester');
            }}
            currentInput={inputNumber}
          />
        )}

        {/* Tab 5: Knowledge Quiz */}
        {activeTab === 'quiz' && (
          <KnowledgeQuiz />
        )}

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
