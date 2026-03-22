'use client';

import { isAuthenticatedAtom, isLoadingAtom } from '@mezon-tutors/app/store/auth.atom';
import { ROUTES } from '@mezon-tutors/shared/src/constants/routes';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const isLoading = useAtomValue(isLoadingAtom);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(ROUTES.HOME.index);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
