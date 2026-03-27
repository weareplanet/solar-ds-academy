'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { modules } from '@/lib/modules';
import { QuizEngine, QuizQuestion } from '@/components/QuizEngine';
import quizData from '@/lib/quizData';

export function QuizPage() {
  const params = useParams();
  const id = params.id as string;
  const mod = modules.find((m) => m.id === id);

  if (!mod) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Quiz not found</h2>
          <Link href="/" className="text-planet-600 hover:underline mt-4 inline-block">
            ← Back to course
          </Link>
        </div>
      </div>
    );
  }

  const questions = quizData[id] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href={`/module/${id}`}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Module {mod.number}
          </Link>
          <span className="text-sm font-medium text-planet-600">
            📝 Quiz: Module {mod.number}
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Module {mod.number} Quiz
          </h1>
          <p className="text-gray-500 mb-8">
            {mod.title} — Answer at least 70% correctly to complete this module.
          </p>

          {questions.length > 0 ? (
            <QuizEngine moduleId={id} questions={questions} />
          ) : (
            <p className="text-gray-400 italic text-center py-8">
              Quiz questions coming soon.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
