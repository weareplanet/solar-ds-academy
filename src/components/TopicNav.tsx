'use client';

import { useState } from 'react';

export interface TopicHeading {
  level: number;
  text: string;
  slug: string;
}

interface TopicNavProps {
  headings: TopicHeading[];
}

export function TopicNav({ headings }: TopicNavProps) {
  const [navOpen, setNavOpen] = useState(true);

  if (headings.length === 0) return null;

  return (
    <div className="fixed top-16 right-4 z-50">
      <button
        onClick={() => setNavOpen(!navOpen)}
        className="ml-auto mb-1 flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 shadow-sm transition-colors"
      >
        {navOpen ? '✕ Close' : '☰ Topics'}
      </button>
      {navOpen && (
        <nav className="w-60 bg-white border border-gray-200 rounded-xl shadow-lg p-3 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
            Topics
          </h3>
          <ul className="space-y-0.5">
            {headings.map((h, i) => (
              <li key={i}>
                <a
                  href={`#${h.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(h.slug);
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 24;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                      history.replaceState(null, '', `#${h.slug}`);
                    }
                  }}
                  className={`block px-2 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors ${
                    h.level === 1
                      ? 'font-semibold'
                      : h.level === 2
                        ? 'pl-4'
                        : 'pl-6 text-xs'
                  }`}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
