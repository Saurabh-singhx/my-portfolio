export interface ThemeDefinition {
  id: string;
  name: string;
  label: string;
  fontSans: string;
  fontMono: string;
  fontSansVar: string;
  fontMonoVar: string;
  preview: {
    bg: string;
    accent: string;
    text: string;
  };
}

export const themes: ThemeDefinition[] = [
  {
    id: 'cyber-emerald',
    name: 'Cyber Emerald',
    label: 'Electric Mint · Plus Jakarta',
    fontSans: 'Plus Jakarta Sans',
    fontMono: 'JetBrains Mono',
    fontSansVar: 'var(--font-plus-jakarta)',
    fontMonoVar: 'var(--font-jetbrains)',
    preview: { bg: '#080b0f', accent: '#00f5a0', text: '#e6f4ea' },
  },
  {
    id: 'synthwave',
    name: 'Synthwave 84',
    label: 'Neon Magenta · Syne',
    fontSans: 'Syne',
    fontMono: 'Space Mono',
    fontSansVar: 'var(--font-syne)',
    fontMonoVar: 'var(--font-space-mono)',
    preview: { bg: '#120722', accent: '#ff2a85', text: '#fdf2f8' },
  },
  {
    id: 'sunset-amber',
    name: 'Sunset Amber',
    label: 'Golden Amber · Outfit',
    fontSans: 'Outfit',
    fontMono: 'IBM Plex Mono',
    fontSansVar: 'var(--font-outfit)',
    fontMonoVar: 'var(--font-ibm-plex)',
    preview: { bg: '#15110e', accent: '#f59e0b', text: '#fef3c7' },
  },
  {
    id: 'nordic-frost',
    name: 'Nordic Frost',
    label: 'Arctic Cyan · Space Grotesk',
    fontSans: 'Space Grotesk',
    fontMono: 'Fira Code',
    fontSansVar: 'var(--font-space-grotesk)',
    fontMonoVar: 'var(--font-fira-code)',
    preview: { bg: '#0a1120', accent: '#38bdf8', text: '#f0f9ff' },
  },
];

export const DEFAULT_THEME = 'cyber-emerald';
