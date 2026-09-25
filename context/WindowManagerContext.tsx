'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { WindowId, WindowState, WindowPosition, WindowSize } from '@/lib/types';

interface WindowManagerContextType {
  windows: Record<WindowId, WindowState>;
  activeWindow: WindowId | null;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  toggleMaximizeWindow: (id: WindowId) => void;
  bringToFront: (id: WindowId) => void;
  updateWindowPosition: (id: WindowId, position: WindowPosition) => void;
  updateWindowSize: (id: WindowId, size: WindowSize) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const defaultWindows: Record<WindowId, WindowState> = {
  projects: {
    id: 'projects',
    title: 'Featured Projects',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 80, y: 50 },
    size: { width: 780, height: 520 },
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal — saurabh@SaurabhOS:~',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 9,
    position: { x: 140, y: 90 },
    size: { width: 680, height: 440 },
  },
  skills: {
    id: 'skills',
    title: 'Technical Skills & Architecture',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 8,
    position: { x: 180, y: 70 },
    size: { width: 720, height: 500 },
  },
  contact: {
    id: 'contact',
    title: 'Contact & Transmission',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 7,
    position: { x: 220, y: 80 },
    size: { width: 600, height: 520 },
  },
  resume: {
    id: 'resume',
    title: 'Resume — Saurabh Kumar',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 6,
    position: { x: 120, y: 40 },
    size: { width: 760, height: 560 },
  },
};

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(defaultWindows);
  const [activeWindow, setActiveWindow] = useState<WindowId | null>('projects');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [maxZIndex, setMaxZIndex] = useState(20);

  // Play subtle audio feedback if sound is enabled
  const playBeep = useCallback((freq = 440, type: OscillatorType = 'sine', duration = 0.05) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio not permitted or failed
    }
  }, [soundEnabled]);

  const bringToFront = useCallback((id: WindowId) => {
    setActiveWindow(id);
    setWindows((prev) => {
      const nextZ = maxZIndex + 1;
      setMaxZIndex(nextZ);
      return {
        ...prev,
        [id]: {
          ...prev[id],
          zIndex: nextZ,
          isMinimized: false,
        },
      };
    });
  }, [maxZIndex]);

  const openWindow = useCallback((id: WindowId) => {
    playBeep(580, 'sine', 0.06);
    setActiveWindow(id);
    setWindows((prev) => {
      const nextZ = maxZIndex + 1;
      setMaxZIndex(nextZ);
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
        },
      };
    });
  }, [maxZIndex, playBeep]);

  const closeWindow = useCallback((id: WindowId) => {
    playBeep(320, 'sine', 0.05);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
      },
    }));
    setActiveWindow((curr) => (curr === id ? null : curr));
  }, [playBeep]);

  const minimizeWindow = useCallback((id: WindowId) => {
    playBeep(380, 'triangle', 0.05);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
      },
    }));
    setActiveWindow((curr) => (curr === id ? null : curr));
  }, [playBeep]);

  const toggleMaximizeWindow = useCallback((id: WindowId) => {
    playBeep(520, 'sine', 0.07);
    setWindows((prev) => {
      const current = prev[id];
      if (current.isMaximized) {
        // Restore to previous size and position
        return {
          ...prev,
          [id]: {
            ...current,
            isMaximized: false,
            position: current.prevPosition || { x: 100, y: 60 },
            size: current.prevSize || { width: 700, height: 480 },
          },
        };
      } else {
        // Maximize to full available desktop area
        const maxWidth = typeof window !== 'undefined' ? window.innerWidth - 32 : 1100;
        const maxHeight = typeof window !== 'undefined' ? window.innerHeight - 130 : 680;
        return {
          ...prev,
          [id]: {
            ...current,
            isMaximized: true,
            prevPosition: { ...current.position },
            prevSize: { ...current.size },
            position: { x: 16, y: 36 },
            size: {
              width: Math.max(500, maxWidth),
              height: Math.max(400, maxHeight),
            },
          },
        };
      }
    });
    bringToFront(id);
  }, [bringToFront, playBeep]);

  const updateWindowPosition = useCallback((id: WindowId, position: WindowPosition) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        position,
      },
    }));
  }, []);

  const updateWindowSize = useCallback((id: WindowId, size: WindowSize) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        size,
      },
    }));
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  // Ensure window positions fit within screen when resized
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;

      setWindows((prev) => {
        let changed = false;
        const next = { ...prev };

        (Object.keys(next) as WindowId[]).forEach((id) => {
          const w = next[id];
          if (w.isMaximized) {
            next[id] = {
              ...w,
              position: { x: 16, y: 36 },
              size: {
                width: Math.max(400, screenW - 32),
                height: Math.max(350, screenH - 130),
              },
            };
            changed = true;
          } else if (w.position.x + 100 > screenW || w.position.y + 100 > screenH) {
            next[id] = {
              ...w,
              position: {
                x: Math.max(20, Math.min(w.position.x, screenW - w.size.width - 20)),
                y: Math.max(36, Math.min(w.position.y, screenH - w.size.height - 80)),
              },
            };
            changed = true;
          }
        });

        return changed ? next : prev;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        activeWindow,
        openWindow,
        closeWindow,
        minimizeWindow,
        toggleMaximizeWindow,
        bringToFront,
        updateWindowPosition,
        updateWindowSize,
        soundEnabled,
        toggleSound,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return context;
}
