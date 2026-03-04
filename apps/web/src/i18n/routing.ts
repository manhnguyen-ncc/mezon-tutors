import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale, localePrefix } from '@mezon-tutors/shared/i18n/config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
});
