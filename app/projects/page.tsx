import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import VoidUniverse from '@/components/void/VoidUniverse';

export const metadata: Metadata = {
  title: 'Projects Dimension | Quadri Adekunle',
  description: 'Explore the full-stack engineering matrix, AI models, and production platforms built by Quadri Adekunle.',
};

export default function ProjectsPage(): React.JSX.Element {
  return (
    <main className="w-full h-full min-h-screen bg-[#040408]">
      <Suspense
        fallback={
          <div className="fixed inset-0 bg-[#040408] flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          </div>
        }
      >
        <VoidUniverse initialRealm="projects" />
      </Suspense>
    </main>
  );
}
