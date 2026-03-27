'use client';

import { AuthGate } from '@/components/AuthGate';
import { HomePage } from '@/components/HomePage';

export default function Page() {
  return (
    <AuthGate>
      <HomePage />
    </AuthGate>
  );
}
