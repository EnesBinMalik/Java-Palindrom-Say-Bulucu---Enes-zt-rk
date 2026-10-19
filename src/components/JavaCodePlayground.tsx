import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  Terminal, 
  Play, 
  Sparkles, 
  ExternalLink,
  Cpu,
  FileCode2,
  RefreshCw
} from 'lucide-react';
import { JAVA_CODE_TEMPLATES } from '../utils/palindromeUtils';

export const JavaCodePlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mathematical' | 'stringBuilder' | 'twoPointer' | 'fullScanner'>('mathematical');
  const [copied, setCopied] = useState(false);

  // Terminal Simulator State
  const [simNumber, setSimNumber] = useState('4004');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'enes@ozturk-dev:~$ javac PalindromSayi.java',
    'enes@ozturk-dev:~$ java PalindromSayi',
    '=========================================',
    ' JAVA PALİNDROM SAYI BULUCU',
    ' Hazırlayan: Enes Öztürk',
    '=========================================',
    'Lütfen kontrol edilecek sayıyı giriniz: 4004',
    '',
    '--- Sonuç ---',
    'Tebrikler! 4004 bir PALİNDROMİK SAYIDIR.',
    'Düzden: 4004 | Tersten: 4004',
    'enes@ozturk-dev:~$'
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JAVA_CODE_TEMPLATES[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulator = () => {
    const trimmed = simNumber.trim();
    if (!trimmed || isNaN(Number(trimmed))) {
      setTerminalLogs((prev) => [
        ...prev,
        `enes@ozturk-dev:~$ java PalindromSayi`,
        `Giriş: "${trimmed}"`,
        `Hata: java.util.InputMismatchException -> Geçerli bir tam sayı girilmelidir!`,
        `enes@ozturk-dev:~$`
      ]);
      return;
    }

    setIsRunning(true);
    const num = trimmed;
    const rev = num.split('').reverse().join('');
    const isPal = num === rev;

    setTimeout(() => {
      setTerminalLogs([
        'enes@ozturk-dev:~$ javac Main.java',
        'enes@ozturk-dev:~$ java Main',
        '=========================================',
        ' JAVA PALİNDROM SAYI BULUCU',
        ' Hazırlayan: Enes Öztürk',
        '=========================================',
        `Lütfen kontrol edilecek sayıyı giriniz: ${num}`,
        '',
        '--- Sonuç ---',
        isPal
          ? `Tebrikler! ${num} bir PALİNDROMİK SAYIDIR.`
          : `${num} bir palindromik sayı DEĞİLDİR.`,
        `Düzden: ${num} | Tersten: ${rev}`,
        `Eşitlik: ${num} == ${rev} -> ${isPal ? 'DOĞRU (true)' : 'YANLIŞ (false)'}`,
        'enes@ozturk-dev:~$'
      ]);
      setIsRunning(false);
    }, 400);
  };

  const tabs = [
    { id: 'mathematical', label: '1. Matematiksel (Modulo)', badge: 'En Verimli O(1)' },
    { id: 'stringBuilder', label: '2. StringBuilder', badge: 'Pratik' },
    { id: 'twoPointer', label: '3. İki İşaretçi (Two-Pointer)', badge: 'Simetrik' },
    { id: 'fullScanner', label: '4. Tam Main.java (Scanner)', badge: 'Konsol Girişli' },
  ] as const;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Java Kaynak Kodları & Algoritma Çeşitleri
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Farklı yöntemlerle yazılmış, üretime ve ders projelerine hazır Java palindrom kod blokları (Hazırlayan: Enes Öztürk)
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Kopyalandı!' : 'Aktif Kodu Kopyala'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-xl font-medium transition-all shrink-0 flex items-center gap-2 cursor-pointer border ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded ${
                  isActive
                    ? 'bg-slate-950/20 text-slate-950 font-bold'
                    : 'bg-slate-800 text-amber-300 border border-slate-700'
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Code Viewer */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
        <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-slate-300 ml-2 font-semibold">
              {activeTab === 'fullScanner' ? 'Main.java' : 'PalindromSayi.java'}
            </span>
          </div>
          <span className="text-[11px] text-amber-400/90 font-mono">Java 8+ Uyumlu</span>
        </div>

        <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-[380px]">
          <code>{JAVA_CODE_TEMPLATES[activeTab]}</code>
        </pre>
      </div>

      {/* Interactive Java Terminal Simulator */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
        <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white">
              Java Konsol Simülatörü (Scanner CLI)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Test Sayısı:</span>
            <input
              type="text"
              value={simNumber}
              onChange={(e) => setSimNumber(e.target.value)}
              className="w-28 text-xs font-mono px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
              placeholder="363"
            />
            <button
              onClick={handleRunSimulator}
              disabled={isRunning}
              className="text-xs px-3 py-1 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isRunning ? 'Çalışıyor...' : 'Derle & Çalıştır'}</span>
            </button>
          </div>
        </div>

        {/* Terminal Output Body */}
        <div className="p-4 font-mono text-xs text-emerald-400/95 space-y-1 bg-black/70 max-h-56 overflow-y-auto">
          {terminalLogs.map((log, index) => (
            <div
              key={index}
              className={`${
                log.startsWith('enes@')
                  ? 'text-cyan-400'
                  : log.includes('Tebrikler')
                  ? 'text-emerald-300 font-bold'
                  : log.includes('DEĞİLDİR')
                  ? 'text-rose-400 font-bold'
                  : log.startsWith('===')
                  ? 'text-amber-400/80'
                  : 'text-slate-300'
              }`}
            >
              {log || '\u00A0'}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
