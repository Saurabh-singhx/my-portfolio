'use client';

import { useState, useSyncExternalStore } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { BootSequence } from '@/components/desktop/BootSequence';
import { Desktop } from '@/components/desktop/Desktop';
import { MobileLayout } from '@/components/mobile/MobileLayout';

const emptySubscribe = () => () => {};
const getSessionBootPlayed = () => {
  try {
    return typeof window !== 'undefined' && sessionStorage.getItem('saurabhos-boot-played') === 'true';
  } catch {
    return false;
  }
};
const getServerSnapshot = () => false;

export default function Home() {
  const hasPlayedSession = useSyncExternalStore(emptySubscribe, getSessionBootPlayed, getServerSnapshot);
  const [userFinishedBoot, setUserFinishedBoot] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const handleBootComplete = () => {
    try {
      sessionStorage.setItem('saurabhos-boot-played', 'true');
    } catch {
      // Storage unavailable
    }
    setUserFinishedBoot(true);
  };

  const handleSkipBoot = () => {
    try {
      sessionStorage.setItem('saurabhos-boot-played', 'true');
    } catch {
      // Storage unavailable
    }
    setUserFinishedBoot(true);
  };

  // Mobile: direct streamlined experience
  if (isMobile) {
    return <MobileLayout />;
  }

  // Desktop: show boot sequence if not previously played in this session and not completed
  if (!hasPlayedSession && !userFinishedBoot) {
    return <BootSequence onComplete={handleBootComplete} onSkip={handleSkipBoot} />;
  }

  return <Desktop />;
}