'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { RealmId } from './VoidScene';
import VoidOverlay from './VoidOverlay';

// Isolate 3D Three.js canvas behind dynamic import with SSR disabled
const VoidScene = dynamic(() => import('./VoidScene'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-[#040408] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-[#915DFF] border-t-transparent animate-spin" />
        <div className="font-mono text-xs text-[#915DFF] tracking-widest uppercase">
          SYNCHRONIZING SPATIAL MATRIX...
        </div>
      </div>
    </div>
  ),
});

interface VoidUniverseProps {
  initialRealm?: RealmId;
  initialProjectId?: string;
}

export default function VoidUniverse({
  initialRealm = 'nexus',
  initialProjectId,
}: VoidUniverseProps): React.JSX.Element {
  const [currentRealm, setCurrentRealm] = useState<RealmId>(initialRealm);
  const [isEntered, setIsEntered] = useState<boolean>(initialRealm !== 'nexus');

  useEffect(() => {
    if (initialRealm !== 'nexus') return;
    const previouslyEntered = sessionStorage.getItem('void_entered') === 'true';
    if (previouslyEntered) {
      setIsEntered(true);
    }
  }, [initialRealm]);

  // Handle URL synchronizing
  const handleSelectRealm = useCallback((realm: RealmId) => {
    setCurrentRealm(realm);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (realm === 'nexus') {
        url.searchParams.delete('dimension');
        url.searchParams.delete('project');
      } else {
        url.searchParams.set('dimension', realm);
      }
      window.history.pushState({}, '', url.toString());
    }
  }, []);

  const handleEnterVoid = useCallback(() => {
    setIsEntered(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('void_entered', 'true');
    }
  }, []);

  // Listen to popstate (browser back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const dim = params.get('dimension') as RealmId;
        if (dim && ['projects', 'skills', 'experience', 'about', 'contact'].includes(dim)) {
          setCurrentRealm(dim);
          setIsEntered(true);
        } else {
          setCurrentRealm('nexus');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#040408] select-none">
      {/* 3D WebGL Canvas Layer */}
      <VoidScene
        currentRealm={currentRealm}
        onSelectRealm={handleSelectRealm}
        isEntered={isEntered}
        onEnterVoid={handleEnterVoid}
      />

      {/* Holographic 2D HUD & Content Layer */}
      <VoidOverlay
        currentRealm={currentRealm}
        onSelectRealm={handleSelectRealm}
        isEntered={isEntered}
        onEnterVoid={handleEnterVoid}
        initialProjectId={initialProjectId}
      />
    </div>
  );
}
