'use client';

import { ReactNode, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { modules } from '@/lib/modules';
import { useAuth } from '@/components/AuthGate';
import { useProgress } from '@/components/ProgressTracker';
import { TopicNav, type TopicHeading } from '@/components/TopicNav';
import { ModuleSidebar } from '@/components/ModuleSidebar';

interface ModulePageProps {
  slidesContent?: ReactNode;
  topicHeadings?: TopicHeading[];
}

export function ModulePage({ slidesContent, topicHeadings = [] }: ModulePageProps) {
  const params = useParams();
  const id = params.id as string;
  const { account, logout } = useAuth();
  const { markStarted, markCompleted, getModuleStatus } = useProgress();

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

  const status = getModuleStatus(id);
  const nextModule = modules.find((m) => m.number === mod.number + 1);
  const prevModule = modules.find((m) => m.number === mod.number - 1);

  // Mark as started when viewing
  useEffect(() => {
    if (status === 'not-started') {
      markStarted(id);
    }
  }, [id, status, markStarted]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ModuleSidebar />

      <div className="flex-1 min-w-0">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            ← Back to course
          </Link>
          <span className="text-sm text-gray-500">
            {account.name || account.username}
          </span>
        </div>
      </header>

      <TopicNav headings={topicHeadings} />

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Module header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{mod.icon}</span>
            <span className="text-sm font-medium text-planet-600 bg-planet-50 px-3 py-1 rounded-full">
              Module {mod.number}
            </span>
            <span className="text-sm text-gray-400">{mod.level} · {mod.duration}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{mod.title}</h1>
          <p className="text-gray-600 mt-2">{mod.description}</p>
        </div>

        {/* Content sections */}
        <div className="space-y-8">
          {/* Slides / Content section */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">📖 Lesson Content</h2>
            <div className="prose prose-gray max-w-none">
              {slidesContent || (
                <p className="text-gray-500 italic">No lesson content available yet.</p>
              )}
            </div>
          </section>

          {/* Video embed placeholder */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🎬 Video Walkthrough</h2>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Video embed will appear here</p>
            </div>
          </section>

          {/* Exercise link */}
          <section className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">🏋️ Exercise</h2>
              <p className="text-gray-500 text-sm mt-1">Hands-on practice for Module {mod.number}</p>
            </div>
            <Link
              href={`/module/${mod.id}/exercise`}
              className="bg-planet-600 hover:bg-planet-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors text-sm"
            >
              Go to Exercise →
            </Link>
          </section>

          {/* Quiz link */}
          <section className="bg-planet-50 rounded-xl border border-planet-200 p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">📝 Module Quiz</h2>
            <p className="text-gray-600 mb-4">
              Test your knowledge of Module {mod.number} concepts.
            </p>
            <Link
              href={`/quiz/${mod.id}`}
              className="inline-block bg-planet-600 hover:bg-planet-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Take the Quiz
            </Link>
          </section>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200">
          {prevModule ? (
            <Link
              href={`/module/${prevModule.id}`}
              className="text-sm text-planet-600 hover:text-planet-700"
            >
              ← Module {prevModule.number}: {prevModule.title}
            </Link>
          ) : (
            <span />
          )}

          {status !== 'completed' && (
            <button
              onClick={() => markCompleted(id)}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Mark as Complete ✓
            </button>
          )}

          {nextModule ? (
            <Link
              href={`/module/${nextModule.id}`}
              className="text-sm text-planet-600 hover:text-planet-700"
            >
              Module {nextModule.number}: {nextModule.title} →
            </Link>
          ) : (
            <Link
              href="/"
              className="text-sm text-planet-600 hover:text-planet-700"
            >
              Back to course →
            </Link>
          )}
        </div>
      </main>
      </div>
    </div>
  );
}
