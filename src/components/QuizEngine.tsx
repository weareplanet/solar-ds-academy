'use client';

import { useState } from 'react';
import { useProgress } from '@/components/ProgressTracker';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizEngineProps {
  moduleId: string;
  questions: QuizQuestion[];
}

export function QuizEngine({ moduleId, questions }: QuizEngineProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const { markCompleted } = useProgress();

  const q = questions[current];

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setAnswered(true);
    if (selected === q.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
      const passing = score / questions.length >= 0.7;
      if (passing) {
        markCompleted(moduleId);
      }
    }
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const passing = pct >= 70;
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">{passing ? '🎉' : '📚'}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {passing ? 'Congratulations!' : 'Keep Learning!'}
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          You scored <span className="font-bold">{score}/{questions.length}</span> ({pct}%)
        </p>
        {passing ? (
          <p className="text-green-600 font-medium">
            ✓ Module marked as complete
          </p>
        ) : (
          <p className="text-gray-500">
            You need 70% to pass. Review the material and try again.
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-500">
          Question {current + 1} of {questions.length}
        </span>
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-planet-500 transition-all duration-300"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{q.question}</h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {q.options.map((opt, i) => {
          let classes =
            'w-full text-left p-4 rounded-lg border-2 transition-all ';
          if (answered) {
            if (i === q.correctIndex) {
              classes += 'border-green-500 bg-green-50 text-green-800';
            } else if (i === selected) {
              classes += 'border-red-400 bg-red-50 text-red-700';
            } else {
              classes += 'border-gray-200 text-gray-400';
            }
          } else if (i === selected) {
            classes += 'border-planet-500 bg-planet-50 text-planet-800';
          } else {
            classes +=
              'border-gray-200 hover:border-planet-300 hover:bg-gray-50 text-gray-700';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={classes}
              disabled={answered}
            >
              <span className="font-medium mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Explanation:</span> {q.explanation}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        {!answered ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className="bg-planet-600 hover:bg-planet-700 disabled:bg-gray-300 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-planet-600 hover:bg-planet-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            {current + 1 < questions.length ? 'Next Question →' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
}
