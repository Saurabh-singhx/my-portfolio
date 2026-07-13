'use client';

import { useState, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { BootSequence } from '@/components/desktop/BootSequence';
import { Desktop } from '@/components/desktop/Desktop';
import { MobileLayout } from '@/components/mobile/MobileLayout';

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [skipBoot, setSkipBoot] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('saurabhos-boot-played');
    if (hasPlayed) {
      setSkipBoot(true);
    }
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem('saurabhos-boot-played', 'true');
    setBootComplete(true);
  };

  const handleSkipBoot = () => {
    sessionStorage.setItem('saurabhos-boot-played', 'true');
    setSkipBoot(true);
    setBootComplete(true);
  };

  if (isMobile) {
    return <MobileLayout />;
  }

  if (!skipBoot && !bootComplete) {
    return <BootSequence onComplete={handleBootComplete} onSkip={handleSkipBoot} />;
  }

  return <Desktop />;
}
