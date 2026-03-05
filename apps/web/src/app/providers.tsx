'use client';

import type { ReactNode } from 'react';
import { NextTamaguiProvider } from '@mezon-tutors/app/provider';

export function AppProviders({ children }: { children: ReactNode }) {
  return <NextTamaguiProvider>{children}</NextTamaguiProvider>;
}
