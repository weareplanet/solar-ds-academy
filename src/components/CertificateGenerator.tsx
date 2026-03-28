'use client';

import { useCallback } from 'react';
import { jsPDF } from 'jspdf';

type BadgeLevel = 'explorer' | 'builder' | 'champion';

interface CertificateGeneratorProps {
  userName: string;
  badgeLevel: BadgeLevel;
}

const badgeMeta: Record<BadgeLevel, { title: string; color: [number, number, number]; description: string }> = {
  explorer: {
    title: 'Solar Explorer',
    color: [76, 110, 245],
    description: 'Completed Modules 1 & 2 — Toolkit Setup & Building Screens',
  },
  builder: {
    title: 'Solar Builder',
    color: [34, 154, 22],
    description: 'Completed Modules 1–4 — Visual Context, Validation & Sharing',
  },
  champion: {
    title: 'Solar Champion',
    color: [234, 179, 8],
    description: 'Completed all 6 modules — Full @Solar Product Workflow Mastery',
  },
};

export function CertificateGenerator({ userName, badgeLevel }: CertificateGeneratorProps) {
  const generate = useCallback(() => {
    const meta = badgeMeta[badgeLevel];
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const w = doc.internal.pageSize.getWidth();
    const h = doc.internal.pageSize.getHeight();

    // Background
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, w, h, 'F');

    // Border accent
    const [r, g, b] = meta.color;
    doc.setDrawColor(r, g, b);
    doc.setLineWidth(2);
    doc.rect(12, 12, w - 24, h - 24);

    // Inner decorative line
    doc.setDrawColor(220, 220, 230);
    doc.setLineWidth(0.3);
    doc.rect(16, 16, w - 32, h - 32);

    // Header icon
    doc.setFontSize(28);
    doc.text('\u2600\uFE0F', w / 2, 38, { align: 'center' });

    // Title
    doc.setFontSize(14);
    doc.setTextColor(120, 120, 130);
    doc.text('SOLAR PRODUCT ACADEMY', w / 2, 50, { align: 'center' });

    // Certificate of completion
    doc.setFontSize(32);
    doc.setTextColor(15, 23, 42);
    doc.text('Certificate of Achievement', w / 2, 68, { align: 'center' });

    // Divider
    doc.setDrawColor(r, g, b);
    doc.setLineWidth(0.8);
    doc.line(w / 2 - 40, 74, w / 2 + 40, 74);

    // Presented to
    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139);
    doc.text('This certificate is awarded to', w / 2, 88, { align: 'center' });

    // Name
    doc.setFontSize(28);
    doc.setTextColor(r, g, b);
    doc.text(userName, w / 2, 104, { align: 'center' });

    // Badge title
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42);
    doc.text(meta.title, w / 2, 120, { align: 'center' });

    // Description
    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139);
    doc.text(meta.description, w / 2, 132, { align: 'center' });

    // Date
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text(`Issued on ${date}`, w / 2, 150, { align: 'center' });

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(180, 180, 190);
    doc.text('weareplanet.com', w / 2, h - 20, { align: 'center' });

    doc.save(`solar-academy-${badgeLevel}-certificate.pdf`);
  }, [userName, badgeLevel]);

  const meta = badgeMeta[badgeLevel];

  return (
    <button
      onClick={generate}
      className="inline-flex items-center gap-2 text-sm font-medium text-planet-600 hover:text-planet-700 transition-colors"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Download {meta.title} Certificate
    </button>
  );
}
