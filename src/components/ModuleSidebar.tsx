'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { modules } from '@/lib/modules';
import { useProgress } from '@/components/ProgressTracker';

export function ModuleSidebar() {
  const params = useParams();
  const currentId = params.id as string;
  const { getModuleStatus } = useProgress();

  return (
    <aside className="w-64 shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-gray-200 bg-white py-4 px-3 hidden lg:block">
      <Link
        href="/"
        className="text-sm font-bold text-gray-900 hover:text-planet-700 px-2 mb-4 block transition-colors"
      >
        Solar DS Academy
      </Link>
      <nav className="space-y-0.5">
        {modules.map((mod) => {
          const isActive = mod.id === currentId;
          const status = getModuleStatus(mod.id);
          return (
            <Link
              key={mod.id}
              href={`/module/${mod.id}`}
              className={`flex items-start gap-2 px-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-planet-50 text-planet-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className="text-xs font-bold shrink-0 w-5 text-center mt-0.5">{mod.number}</span>
              <span className="flex-1 leading-snug">{mod.title}</span>
              {status === 'completed' && (
                <span className="text-green-500 text-xs shrink-0 mt-0.5">✓</span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
