'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_THEME, themes, ThemeDefinition } from '@/lib/themes';

interface ThemeContextType {
  theme: string;
  setTheme: (themeId: string) => void;
  themes: ThemeDefinition[];
  currentTheme: ThemeDefinition;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<string>(DEFAULT_THEME);

  useEffect(() => {
    const saved = localStorage.getItem('saurabhos-theme');
    if (saved && themes.some((t) => t.id === saved)) {
      setThemeState(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', DEFAULT_THEME);
    }
  }, []);

  const setTheme = (themeId: string) => {
    if (!themes.some((t) => t.id === themeId)) return;
    setThemeState(themeId);
    try {
      localStorage.setItem('saurabhos-theme', themeId);
    } catch {
      // localStorage may fail in private mode
    }
    document.documentElement.setAttribute('data-theme', themeId);
  };

  const currentTheme = themes.find((t) => t.id === theme) || themes[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
