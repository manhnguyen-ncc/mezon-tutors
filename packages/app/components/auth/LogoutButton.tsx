'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { Button } from '@mezon-tutors/app/ui';
import { isAuthenticatedAtom, logoutAtom, userAtom } from '@mezon-tutors/app/store/auth.atom';

export function LogoutButton() {
  const t = useTranslations('Common.Header');
  const user = useAtomValue(userAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const logout = useSetAtom(logoutAtom);

  if (!isAuthenticated) return null;

  return (
    <div className="flex items-center gap-2">
      <span style={{ backgroundColor: '$appPrimary', color: 'white', padding: '8px 16px', borderRadius: '20px' }}>
        {user?.username ?? 'Unknown User'}
      </span>

      <Button
        variant="primary"
        onPress={() => {
          void logout();
        }}
        className="rounded-full border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
      >
        {t('logout')}
      </Button>
    </div>
  );
}

