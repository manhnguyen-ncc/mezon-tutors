'use client';

import authService from '@mezon-tutors/app/services/auth/auth.service';
import { atom } from 'jotai';

export type AuthUser = {
  id: string;
  email: string | null;
  username: string | null;
  avatar?: string | null;
};

export const accessTokenAtom = atom<string | null>(null);
export const userAtom = atom<AuthUser | null>(null);
export const isLoadingAtom = atom<boolean>(true);

export const isAuthenticatedAtom = atom((get) => Boolean(get(userAtom)));

export const initAuthAtom = atom(null, async (_, set) => {
  if (typeof window === 'undefined') return;

  const stored = window.localStorage.getItem('accessToken');

  if (!stored) {
    set(isLoadingAtom, false);
    return;
  }

  try {
    set(accessTokenAtom, stored);

    const data = await authService.getMe(stored);

    set(userAtom, {
      id: data.sub ?? data.id ?? '',
      email: data.email ?? '',
      username: data.username ?? '',
      avatar: data.avatar ?? null,
    });
  } catch {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');

    set(accessTokenAtom, null);
    set(userAtom, null);
  } finally {
    set(isLoadingAtom, false);
  }
});

export const loginAtom = atom(null, async (_, set, { accessToken }: { accessToken: string }) => {
  window.localStorage.setItem('accessToken', accessToken);

  set(accessTokenAtom, accessToken);

  try {
    const data = await authService.getMe(accessToken);

    set(userAtom, {
      id: data.sub ?? data.id ?? '',
      email: data.email ?? '',
      username: data.username ?? '',
      avatar: data.avatar ?? null,
    });
  } catch (err) {
    console.error('[LOGIN] getMe failed', err);

    window.localStorage.removeItem('accessToken');
    set(accessTokenAtom, null);
    set(userAtom, null);
  }
});

export const logoutAtom = atom(null, async (get, set) => {
  const token = get(accessTokenAtom);

  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('refreshToken');

  set(accessTokenAtom, null);
  set(userAtom, null);

  if (token) {
    try {
      await authService.logout(token);
    } catch {}
  }
});

export const getAuthUrlAtom = atom(null, async () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000';

  const res = await fetch(`${API_BASE_URL}/api/auth/url`);
  if (!res.ok) throw new Error('Cannot get auth url');

  const data = await res.json();
  return data.url;
});
