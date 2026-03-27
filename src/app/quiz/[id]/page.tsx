import { AuthGate } from '@/components/AuthGate';
import { QuizPage } from '@/components/QuizPage';
import { modules } from '@/lib/modules';

export function generateStaticParams() {
  return modules.map((m) => ({ id: m.id }));
}

export default function QuizRoute() {
  return (
    <AuthGate>
      <QuizPage />
    </AuthGate>
  );
}
