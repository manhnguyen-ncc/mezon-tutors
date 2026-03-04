export const locales = ['en', 'vi'] as const;
export const defaultLocale = 'en';
export const localePrefix = 'never';
export type Locale = (typeof locales)[number];
