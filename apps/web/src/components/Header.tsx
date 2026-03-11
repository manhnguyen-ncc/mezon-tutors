'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LoginButton } from '../../../../packages/app/components/auth/LoginButton';
import { isAuthenticatedAtom } from '@mezon-tutors/app/store/auth.atom';
import { useAtomValue } from 'jotai';

export function Header() {
  const t = useTranslations('Common.Header');
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  const guestLinks = [
    { href: '/tutors', label: t('findTutors') },
    { href: '/become-tutor', label: t('becomeTutor') },
  ];

  const userLinks = [
    { href: '/tutors', label: t('findTutors') },
    { href: '/my-lessons', label: t('myLessons') },
    { href: '/messages', label: t('myMessages') },
  ];

  const navLinks = isAuthenticated ? userLinks : guestLinks;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between bg-white px-6 lg:px-12 shadow-sm">
      <div className="flex items-center gap-10">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-zinc-900"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-white text-sm font-bold">
            M
          </span>
          Mezon
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="hidden md:block rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />

            <div className="h-9 w-9 rounded-full bg-zinc-900 text-white flex items-center justify-center text-sm font-semibold">
              abc
            </div>
            <LoginButton />
          </>
        ) : (
          <>
            <LoginButton />

            <Link
              href="/signup"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              {t('getStarted')}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
