'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { modules } from '@/lib/modules';

type ModuleStatus = 'not-started' | 'in-progress' | 'completed';

interface ProgressData {
  [moduleId: string]: {
    status: ModuleStatus;
    quizScore?: number;
    quizPassed?: boolean;
    updatedAt: string;
  };
}

interface ProgressContextType {
  progress: ProgressData;
  getModuleStatus: (moduleId: string) => ModuleStatus;
  markStarted: (moduleId: string) => void;
  markCompleted: (moduleId: string) => void;
  setQuizScore: (moduleId: string, score: number, total: number) => void;
  completedCount: number;
  totalModules: number;
  badgeLevel: 'none' | 'explorer' | 'builder' | 'champion';
}

const ProgressContext = createContext<ProgressContextType | null>(null);

const STORAGE_KEY = 'solar-academy:progress';

function loadProgress(): ProgressData {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(data: ProgressData) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressData>({});

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const persist = useCallback((updated: ProgressData) => {
    setProgress(updated);
    saveProgress(updated);
  }, []);

  const getModuleStatus = useCallback(
    (moduleId: string): ModuleStatus => {
      return progress[moduleId]?.status || 'not-started';
    },
    [progress]
  );

  const markStarted = useCallback(
    (moduleId: string) => {
      if (progress[moduleId]?.status === 'completed') return;
      const updated = {
        ...progress,
        [moduleId]: {
          ...progress[moduleId],
          status: 'in-progress' as const,
          updatedAt: new Date().toISOString(),
        },
      };
      persist(updated);
    },
    [progress, persist]
  );

  const markCompleted = useCallback(
    (moduleId: string) => {
      const updated = {
        ...progress,
        [moduleId]: {
          ...progress[moduleId],
          status: 'completed' as const,
          updatedAt: new Date().toISOString(),
        },
      };
      persist(updated);
    },
    [progress, persist]
  );

  const setQuizScore = useCallback(
    (moduleId: string, score: number, total: number) => {
      const passed = score / total >= 0.7;
      const updated = {
        ...progress,
        [moduleId]: {
          ...progress[moduleId],
          quizScore: score,
          quizPassed: passed,
          status: passed ? ('completed' as const) : (progress[moduleId]?.status || 'in-progress' as const),
          updatedAt: new Date().toISOString(),
        },
      };
      persist(updated);
    },
    [progress, persist]
  );

  const completedCount = modules.filter(
    (m) => progress[m.id]?.status === 'completed'
  ).length;

  const totalModules = modules.length;

  let badgeLevel: 'none' | 'explorer' | 'builder' | 'champion' = 'none';
  const completedIds = new Set(
    Object.entries(progress)
      .filter(([, v]) => v.status === 'completed')
      .map(([k]) => k)
  );
  if (['01', '02', '03', '04', '05', '06'].every((id) => completedIds.has(id))) {
    badgeLevel = 'champion';
  } else if (['01', '02', '03', '04'].every((id) => completedIds.has(id))) {
    badgeLevel = 'builder';
  } else if (['01', '02'].every((id) => completedIds.has(id))) {
    badgeLevel = 'explorer';
  }

  return (
    <ProgressContext.Provider
      value={{
        progress,
        getModuleStatus,
        markStarted,
        markCompleted,
        setQuizScore,
        completedCount,
        totalModules,
        badgeLevel,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}

/** Standalone progress bar shown on the home page */
export function ProgressTracker() {
  const { completedCount, totalModules, badgeLevel } = useProgress();
  const pct = Math.round((completedCount / totalModules) * 100);

  const badges = [
    { id: 'explorer', label: 'Solar Explorer', icon: '🔵', threshold: 2 },
    { id: 'builder', label: 'Solar Builder', icon: '🟢', threshold: 4 },
    { id: 'champion', label: 'Solar Champion', icon: '🟡', threshold: 6 },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Your Progress</h3>
        <span className="text-sm text-gray-500">
          {completedCount}/{totalModules} modules
        </span>
      </div>

      {/* Bar */}
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-planet-400 to-planet-600 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Badges */}
      <div className="flex gap-4">
        {badges.map((b) => {
          const earned = completedCount >= b.threshold;
          return (
            <div
              key={b.id}
              className={`flex items-center gap-2 text-sm ${
                earned ? 'text-gray-900' : 'text-gray-300'
              }`}
            >
              <span className="text-lg">{b.icon}</span>
              <span className={earned ? 'font-medium' : ''}>{b.label}</span>
              {earned && <span className="text-green-500 text-xs">✓</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
