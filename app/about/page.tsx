import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import VoidUniverse from '@/components/void/VoidUniverse';

export const metadata: Metadata = {
  title: 'Architect Sanctum | Quadri Adekunle',
  description: 'Full-stack systems philosophy, engineering principles, and background of Quadri Adekunle.',
};

export default function AboutPage(): React.JSX.Element {
  return (
    <main className="w-full h-full min-h-screen bg-[#040408]">
      <Suspense
        fallback={
          <div className="fixed inset-0 bg-[#040408] flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-pink-500 border-t-transparent animate-spin" />
          </div>
        }
      >
        <VoidUniverse initialRealm="about" />
      </Suspense>
    </main>
  );
}
