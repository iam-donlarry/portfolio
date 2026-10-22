import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import VoidUniverse from '@/components/void/VoidUniverse';

export const metadata: Metadata = {
  title: 'Engineering Network | Quadri Adekunle',
  description: 'Interactive technical capabilities, backend architectures, databases, and frameworks mastered by Quadri Adekunle.',
};

export default function SkillsPage(): React.JSX.Element {
  return (
    <main className="w-full h-full min-h-screen bg-[#040408]">
      <Suspense
        fallback={
          <div className="fixed inset-0 bg-[#040408] flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-[#915DFF] border-t-transparent animate-spin" />
          </div>
        }
      >
        <VoidUniverse initialRealm="skills" />
      </Suspense>
    </main>
  );
}
