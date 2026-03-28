'use client';

import { ReactNode, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { modules } from '@/lib/modules';
import { useAuth } from '@/components/AuthGate';
import { TopicNav, type TopicHeading } from '@/components/TopicNav';
import { ModuleSidebar } from '@/components/ModuleSidebar';

interface ExercisePageProps {
  exerciseContent?: ReactNode;
  topicHeadings?: TopicHeading[];
}

export function ExercisePage({ exerciseContent, topicHeadings = [] }: ExercisePageProps) {
  const params = useParams();
  const id = params.id as string;
  const { account } = useAuth();

  const mod = modules.find((m) => m.id === id);

  if (!mod) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Module not found</h2>
          <Link href="/" className="text-planet-600 hover:underline mt-4 inline-block">
            ← Back to course
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ModuleSidebar />

      <div className="flex-1 min-w-0">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href={`/module/${id}`}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            ← Back to Module {mod.number}
          </Link>
          <span className="text-sm text-gray-500">
            {account.name || account.username}
          </span>
        </div>
      </header>

      <TopicNav headings={topicHeadings} />

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Exercise header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🏋️</span>
            <span className="text-sm font-medium text-planet-600 bg-planet-50 px-3 py-1 rounded-full">
              Module {mod.number} — Exercise
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{mod.title}</h1>
          <p className="text-gray-600 mt-2">{mod.description}</p>
        </div>

        {/* Exercise content */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="prose prose-gray max-w-none">
            {exerciseContent || (
              <p className="text-gray-500 italic">No exercises available yet.</p>
            )}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200">
          <Link
            href={`/module/${id}`}
            className="text-sm text-planet-600 hover:text-planet-700"
          >
            ← Back to lesson
          </Link>
          <Link
            href={`/quiz/${id}`}
            className="inline-block bg-planet-600 hover:bg-planet-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
          >
            Take the Quiz →
          </Link>
        </div>
      </main>
      </div>
    </div>
  );
}
