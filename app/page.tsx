import React, { Suspense } from 'react';
import VoidUniverse from '@/components/void/VoidUniverse';
import { RealmId } from '@/components/void/VoidScene';

interface PageProps {
  searchParams?: Promise<{ dimension?: string; project?: string }>;
}

export default async function HomePage({ searchParams }: PageProps): Promise<React.JSX.Element> {
  const resolvedParams = searchParams ? await searchParams : {};
  const dim = (resolvedParams.dimension as RealmId) || 'nexus';
  const proj = resolvedParams.project;

  return (
    <main className="w-full h-full min-h-screen bg-[#040408]">
      <Suspense
        fallback={
          <div className="fixed inset-0 bg-[#040408] flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-[#915DFF] border-t-transparent animate-spin" />
          </div>
        }
      >
        <VoidUniverse initialRealm={dim} initialProjectId={proj} />
      </Suspense>
    </main>
  );
}
