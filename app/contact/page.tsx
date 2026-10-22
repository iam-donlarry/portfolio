import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import VoidUniverse from '@/components/void/VoidUniverse';

export const metadata: Metadata = {
  title: 'Quantum Transmitter | Quadri Adekunle',
  description: 'Initiate encrypted transmission or reach out for enterprise contracts, architecture advisories, and technical engineering with Quadri Adekunle.',
};

export default function ContactPage(): React.JSX.Element {
  return (
    <main className="w-full h-full min-h-screen bg-[#040408]">
      <Suspense
        fallback={
          <div className="fixed inset-0 bg-[#040408] flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
          </div>
        }
      >
        <VoidUniverse initialRealm="contact" />
      </Suspense>
    </main>
  );
}
