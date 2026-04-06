'use client';

import Link from 'next/link';
import { modules } from '@/lib/modules';
import { useAuth } from '@/components/AuthGate';
import { ProgressTracker, useProgress } from '@/components/ProgressTracker';

export function HomePage() {
  const { account, logout } = useAuth();
  const { getModuleStatus } = useProgress();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-gray-900">
              Solar DS Academy
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {account.name || account.username}
            </span>
            <button
              onClick={logout}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Hero */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Build prototypes with @Solar
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A hands-on course for PMs, POs, and Product Designers.
            No coding required — just describe what you want in plain English.
          </p>
        </section>

        {/* Progress overview */}
        <ProgressTracker />

        {/* Module grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {modules.map((mod) => {
            const status = getModuleStatus(mod.id);
            return (
              <Link
                key={mod.id}
                href={`/module/${mod.id}`}
                className="group block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-planet-300 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{mod.icon}</span>
                  {status === 'completed' && (
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                      ✓ Complete
                    </span>
                  )}
                  {status === 'in-progress' && (
                    <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-full">
                      In Progress
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-planet-700 transition-colors">
                  Module {mod.number}: {mod.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  {mod.description}
                </p>
                <div className="flex items-center gap-3 mt-4 text-xs text-gray-400">
                  <span>{mod.level}</span>
                  <span>·</span>
                  <span>{mod.duration}</span>
                </div>
              </Link>
            );
          })}
        </section>
      </main>
    </div>
  );
}
