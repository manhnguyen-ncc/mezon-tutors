import { createTokens } from 'tamagui';
import { defaultConfig } from '@tamagui/config/v4';

export const tokens = createTokens({
  ...defaultConfig.tokens,
  color: {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ...(defaultConfig.tokens as any).color,
    // Global page background (≈ Tailwind gray-50)
    appBackground: '#f8f6f6',
    // Primary brand color (#1253D5)
    appPrimary: '#1253D5',

    appPrimaryHover: '#104BC4',
    // Secondary brand accent (slightly softer primary)
    appSecondary: '#f0f4f8',
    // Primary text color used in designs (#272a3c)
    appText: '#272a3c',
    // Subtle gray border for inputs and secondary buttons
    appBorderSubtle: 'rgba(39,42,60,0.08)',
    // Strong border / outline
    appBorderEmphasis: '#1253D5',
    // Success states
    appSuccess: '#13e17a',
    appSuccessBackground: '#f0fdf4',
    // Neutral subtle backgrounds
    appPillBackground: '#f3f4f5',
    // Selection states
    appSelectedBackground: '#F1F1FF',
    appUnselectedBackground: '#F4F5F7',
    // Transparent helpers
    appWhiteSubtle: 'rgba(255,255,255,0.7)',
    appShadow: 'rgba(0,0,0,0.06)',
    appIconSubtle: 'rgba(39,42,60,0.5)',

    // Red (Error)
    red1: '#fef2f2',
    red2: '#fee2e2',
    red3: '#fecaca',
    red4: '#f87171',
    red6: '#dc2626',
    red8: '#b91c1c',
    red9: '#991b1b',
    red11: '#7f1d1d',
    red12: '#450a0a',

    // Blue scale (info)
    blue1: '#f0f9ff',
    blue2: '#e0f2fe',
    blue3: '#bae6fd',
    blue4: '#38bdf8',
    blue6: '#0284c7',
    blue8: '#0369a1',
    blue9: '#075985',
    blue11: '#0c4a6e',
    blue12: '#082f49',

    // Green scale (success)
    green1: '#f0fdf4',
    green2: '#dcfce7',
    green3: '#bbf7d0',
    green4: '#4ade80',
    green6: '#16a34a',
    green8: '#15803d',
    green9: '#166534',
    green11: '#14532d',
    green12: '#052e16',
  },
  radius: {
    ...defaultConfig.tokens.radius,
    appCard: 24,
    appPill: 999,
  },
});
