import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Palindrom sayı nedir?",
    options: [
      "Sadece 2'ye tam bölünebilen sayılardır.",
      "İki taraftan okunduğu zaman okunuş yönüyle aynı olan simetrik sayılardır.",
      "Yalnızca asal böleni olan sayılardır.",
      "Basamakları toplamı 10'a eşit olan sayılardır.",
    ],
    correctAnswer: 1,
    explanation: "Palindromik sayılar, soldan sağa ve sağdan sola okunuşları aynı olan sayılardır (örn: 101, 363, 4004)."
  },
  {
    id: 2,
    question: "Java algoritmasında 'temp % 10' işlemi ne işe yarar?",
    options: [
      "Sayının karesini alır.",
      "Sayının en son basamağını (birler basamağını) elde eder.",
      "Sayının en baştaki basamağını siler.",
      "Sayının çift olup olmadığını tespit eder.",
    ],
    correctAnswer: 1,
    explanation: "Bir sayının 10'a bölümünden kalan (modulo 10), o sayının en sağındaki birler basamağını verir."
  },
  {
    id: 3,
    question: "Aşağıdaki sayılardan hangisi bir palindrom sayı DEĞİLDİR?",
    options: [
      "4004",
      "9889",
      "10201",
      "12341",
    ],
    correctAnswer: 3,
    explanation: "12341 tersten okunduğunda 14321 olur, eşit olmadığı için palindrom değildir. Diğer tüm seçenekler palindromdur."
  },
  {
    id: 4,
    question: "Java'da '(reverseNumber * 10) + lastDigit' formülü neyi amaçlar?",
    options: [
      "Mevcut ters sayıyı bir basamak sola kaydırıp yeni son basamağı ekler.",
      "Sayıyı sıfırlar.",
      "Sadece iki sayıyı toplar.",
      "Sayının karekökünü hesaplar.",
    ],
    correctAnswer: 0,
    explanation: "10 ile çarpmak var olan basamakları sola kaydırır, ardından + lastDigit yapılarak yeni basamak sonuna eklenir."
  },
  {
    id: 5,
    question: "0'dan 9'a kadar olan tek basamaklı sayılar (1, 4, 8 vb.) palindrom mudur?",
    options: [
      "Hayır, palindrom olması için en az 2 basamak gerekir.",
      "Evet, tek basamaklı sayılar tersten de aynı olduğu için palindromdur.",
      "Yalnızca çift rakamlar palindromdur.",
      "Yalnızca asal rakamlar palindromdur.",
    ],
    correctAnswer: 1,
    explanation: "Tek basamaklı tüm sayılar (0, 1, 2, ..., 9) her iki yönden de aynı okunduğu için kural gereği palindromdur."
  }
];

export const KnowledgeQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [showResult, setShowResult] = useState(false);

  const currentQ = QUESTIONS[currentIdx];
  const isSelected = selectedAnswers[currentQ.id] !== undefined;

  const handleSelect = (optIndex: number) => {
    if (isSelected) return; // Prevent changing after selection
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowResult(false);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Java & Palindrom Bilgi Testi
          </h2>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Soru {currentIdx + 1} / {QUESTIONS.length}
        </span>
      </div>

      {!showResult ? (
        <div className="space-y-5">
          {/* Question Text */}
          <h3 className="text-base sm:text-lg font-semibold text-white">
            {currentQ.id}. {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const hasAnswered = selectedAnswers[currentQ.id] !== undefined;
              const isPicked = selectedAnswers[currentQ.id] === idx;
              const isCorrect = currentQ.correctAnswer === idx;

              let style = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
              if (hasAnswered) {
                if (isCorrect) {
                  style = 'bg-emerald-950/40 border-emerald-500/70 text-emerald-200 font-bold';
                } else if (isPicked) {
                  style = 'bg-rose-950/40 border-rose-500/70 text-rose-200';
                } else {
                  style = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={hasAnswered}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs sm:text-sm flex items-center justify-between cursor-pointer disabled:cursor-default ${style}`}
                >
                  <span>{opt}</span>
                  {hasAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                  {hasAnswered && isPicked && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {/* Explanation if answered */}
          {isSelected && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-1">
              <strong className="text-amber-300 block">Açıklama:</strong>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition-colors cursor-pointer"
            >
              Önceki
            </button>

            {isSelected && (
              <button
                onClick={() => {
                  if (currentIdx < QUESTIONS.length - 1) {
                    setCurrentIdx((prev) => prev + 1);
                  } else {
                    setShowResult(true);
                  }
                }}
                className="text-xs px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{currentIdx < QUESTIONS.length - 1 ? 'Sonraki Soru' : 'Sonucu Gör'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Result Summary */
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Test Tamamlandı!</h3>
          <p className="text-base text-slate-300">
            Skorunuz: <strong className="text-emerald-400 font-mono text-xl">{calculateScore()}</strong> / {QUESTIONS.length}
          </p>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {calculateScore() === 5
              ? 'Mükemmel! Java ile Palindrom sayı mantığına tamamen hakimsiniz.'
              : 'Tebrikler! Palindrom sayılar ve modulo algoritması konusundaki bilginizi pekiştirdiniz.'}
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Testi Yeniden Başlat</span>
          </button>
        </div>
      )}
    </div>
  );
};
