export const colors = {
  // Backgrounds
  background: '#0F0F1A',
  surface: '#1A1A2E',
  surfaceLight: '#252540',
  surfaceHighlight: '#2E2E4A',

  // Text
  textPrimary: '#EAEAFF',
  textSecondary: '#9999BB',
  textMuted: '#666688',

  // Accent
  accent: '#7C5CFC',
  accentLight: '#9B82FC',
  accentDark: '#5A3CD6',

  // Semantic
  success: '#4ADE80',
  warning: '#FBBF24',
  error: '#F87171',

  // Difficulty
  easy: '#4ADE80',
  medium: '#FBBF24',
  hard: '#F87171',

  // Misc
  overlay: 'rgba(0, 0, 0, 0.7)',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof colors;
