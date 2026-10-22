import React from 'react';
import Link from 'next/link';

export default function NotFound(): React.JSX.Element {
  return (
    <div className="w-screen h-screen bg-[#040408] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono text-lg mb-4">
        404
      </div>
      <h1 className="font-display text-3xl sm:text-4xl font-black mb-2">
        Lost in the Void
      </h1>
      <p className="font-mono text-sm text-slate-400 max-w-md mb-6">
        This sector coordinate does not exist or has been warped to another dimension.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-[#915DFF] text-black hover:bg-[#A273FF] transition-all no-underline shadow-[0_0_20px_#915DFF]"
      >
        Return to Nexus
      </Link>
    </div>
  );
}
