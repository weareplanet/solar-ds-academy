import { AuthGate } from '@/components/AuthGate';
import { ModulePage } from '@/components/ModulePage';
import { modules } from '@/lib/modules';

export function generateStaticParams() {
  return modules.map((m) => ({ id: m.id }));
}

export default function ModuleRoute() {
  return (
    <AuthGate>
      <ModulePage />
    </AuthGate>
  );
}
