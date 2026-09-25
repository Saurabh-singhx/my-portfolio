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
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 100, y: 60 },
    size: { width: 800, height: 530 },
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal — saurabh@SaurabhOS:~',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 9,
    position: { x: 140, y: 80 },
    size: { width: 700, height: 460 },
  },
  skills: {
    id: 'skills',
    title: 'Technical Skills & Architecture',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 8,
    position: { x: 180, y: 70 },
    size: { width: 740, height: 510 },
  },
  contact: {
    id: 'contact',
    title: 'Contact & Transmission',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 7,
    position: { x: 220, y: 75 },
    size: { width: 620, height: 530 },
  },
  resume: {
    id: 'resume',
    title: 'Resume — Saurabh Kumar',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 6,
    position: { x: 120, y: 50 },
    size: { width: 780, height: 570 },
  },
};

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(defaultWindows);
  const [activeWindow, setActiveWindow] = useState<WindowId | null>(null);
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
      const current = prev[id];

      let position = current.position;
      let size = current.size;

      if (typeof window !== 'undefined') {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const maxW = Math.max(360, screenW - 60);
        const maxH = Math.max(280, screenH - 160);
        size = {
          width: Math.min(current.size.width, maxW),
          height: Math.min(current.size.height, maxH),
        };

        // If opening for the first time or if position is off-screen, center it nicely
        if (!current.isOpen || position.x + 80 > screenW || position.y + 80 > screenH || position.x < 10 || position.y < 35) {
          const cascadeOffset = (nextZ % 5) * 20;
          position = {
            x: Math.max(20, Math.floor((screenW - size.width) / 2) + cascadeOffset),
            y: Math.max(45, Math.floor((screenH - size.height) / 2) - 25 + cascadeOffset),
          };
        }
      }

      return {
        ...prev,
        [id]: {
          ...current,
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
          position,
          size,
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
            size: current.prevSize || { width: 740, height: 500 },
          },
        };
      } else {
        // Maximize to viewport area between Menubar (top: 36px) and Dock (bottom: 80px)
        const screenW = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const screenH = typeof window !== 'undefined' ? window.innerHeight : 800;
        const maxWidth = Math.max(500, screenW - 24);
        const maxHeight = Math.max(400, screenH - 120);

        return {
          ...prev,
          [id]: {
            ...current,
            isMaximized: true,
            prevPosition: { ...current.position },
            prevSize: { ...current.size },
            position: { x: 12, y: 40 },
            size: {
              width: maxWidth,
              height: maxHeight,
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

  // Ensure window positions stay valid if viewport resizes
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
              position: { x: 12, y: 40 },
              size: {
                width: Math.max(400, screenW - 24),
                height: Math.max(350, screenH - 120),
              },
            };
            changed = true;
          } else if (w.position.x + 100 > screenW || w.position.y + 100 > screenH) {
            next[id] = {
              ...w,
              position: {
                x: Math.max(16, Math.min(w.position.x, screenW - w.size.width - 16)),
                y: Math.max(40, Math.min(w.position.y, screenH - w.size.height - 70)),
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
