'use client';

import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { accessTokenAtom, initAuthAtom } from '@mezon-tutors/app/store/auth.atom';

export default function AuthInitializer() {
  const token = useAtomValue(accessTokenAtom);
  const initAuth = useSetAtom(initAuthAtom);

  useEffect(() => {
    void initAuth();
  }, [token, initAuth]);

  return null;
}
