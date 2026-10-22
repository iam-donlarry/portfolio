'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function BackgroundGrid({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}): React.JSX.Element {
  return (
    <div
      className={cn(
        'min-h-screen w-full bg-[#05050A] bg-grid-white/[0.04] relative flex flex-col items-center justify-start overflow-x-hidden',
        className
      )}
      style={{
        backgroundImage: `radial-gradient(rgba(145, 93, 255, 0.12) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }}
    >
      {/* Radial gradient mask for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-[#05050A] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
