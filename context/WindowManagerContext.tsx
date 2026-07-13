'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { WindowId } from '@/lib/types';

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

type WindowsState = Record<WindowId, WindowState>;

interface WindowManagerContextType {
  windows: WindowsState;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  maximizeWindow: (id: WindowId) => void;
  bringToFront: (id: WindowId) => void;
  updateWindowPosition: (id: WindowId, position: { x: number; y: number }) => void;
  updateWindowSize: (id: WindowId, size: { width: number; height: number }) => void;
  topZIndex: number;
}

// ✅ BIGGER DEFAULT SIZES
const defaultWindowStates: Record<WindowId, Omit<WindowState, 'zIndex'>> = {
  terminal: {
    isOpen: false,
    isMinimized: false,
    position: { x: 0, y: 0 },
    size: { width: 720, height: 480 },
  },
  projects: {
    isOpen: false,
    isMinimized: false,
    position: { x: 0, y: 0 },
    size: { width: 860, height: 580 },
  },
  skills: {
    isOpen: false,
    isMinimized: false,
    position: { x: 0, y: 0 },
    size: { width: 640, height: 540 },
  },
  contact: {
    isOpen: false,
    isMinimized: false,
    position: { x: 0, y: 0 },
    size: { width: 540, height: 580 },
  },
  resume: {
    isOpen: false,
    isMinimized: false,
    position: { x: 0, y: 0 },
    size: { width: 640, height: 680 },
  },
};

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<WindowsState>(() => {
    const initial: Partial<WindowsState> = {};
    let zIndex = 10;
    (Object.keys(defaultWindowStates) as WindowId[]).forEach((id) => {
      initial[id] = {
        ...defaultWindowStates[id],
        zIndex: zIndex++,
      };
    });
    return initial as WindowsState;
  });

  const topZIndexRef = useRef(20);

  const openWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const newZIndex = topZIndexRef.current + 1;
      topZIndexRef.current = newZIndex;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: true,
          isMinimized: false,
          zIndex: newZIndex,
        },
      };
    });
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
        isMinimized: false,
      },
    }));
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
      },
    }));
  }, []);

  const maximizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: false,
      },
    }));
  }, []);

  const bringToFront = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const newZIndex = topZIndexRef.current + 1;
      topZIndexRef.current = newZIndex;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          zIndex: newZIndex,
        },
      };
    });
  }, []);

  const updateWindowPosition = useCallback((id: WindowId, position: { x: number; y: number }) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        position,
      },
    }));
  }, []);

  const updateWindowSize = useCallback((id: WindowId, size: { width: number; height: number }) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        size,
      },
    }));
  }, []);

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        bringToFront,
        updateWindowPosition,
        updateWindowSize,
        topZIndex: topZIndexRef.current,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within WindowManagerProvider');
  }
  return context;
}