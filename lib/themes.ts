export interface ThemeDefinition {
  id: string;
  name: string;
  label: string;
  preview: {
    bg: string;
    accent: string;
    text: string;
  };
}

export const themes: ThemeDefinition[] = [
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    label: 'Neon-lit indigo',
    preview: { bg: '#1a1b26', accent: '#7aa2f7', text: '#c0caf5' },
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin Mocha',
    label: 'Warm pastels',
    preview: { bg: '#1e1e2e', accent: '#89b4fa', text: '#cdd6f4' },
  },
  {
    id: 'dracula',
    name: 'Dracula',
    label: 'Neon charcoal',
    preview: { bg: '#282a36', accent: '#8be9fd', text: '#f8f8f2' },
  },
  {
    id: 'nord',
    name: 'Nord',
    label: 'Arctic frost',
    preview: { bg: '#2e3440', accent: '#88c0d0', text: '#eceff4' },
  },
];

export const DEFAULT_THEME = 'tokyo-night';
