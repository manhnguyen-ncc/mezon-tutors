'use client'
import Link from 'next/link'
import { useAtomValue } from 'jotai'
import { isAuthenticatedAtom, userAtom } from '@mezon-tutors/app/store/auth.atom'
import { LoginButton } from '@mezon-tutors/app/components/auth/LoginButton'
import { LogoutButton } from '@mezon-tutors/app/components/auth/LogoutButton'
import { ROUTES } from '@mezon-tutors/shared'
import { useCallback, useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { XStack, YStack, Text, Button } from '@mezon-tutors/app/ui'
import { themes } from '@mezon-tutors/app/theme/theme'

function ThemeIcon({ isDark }: { isDark: boolean }) {
  if (isDark) {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <path
          d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2.5V5.2M12 18.8V21.5M21.5 12H18.8M5.2 12H2.5M18.7 5.3L16.8 7.2M7.2 16.8L5.3 18.7M18.7 18.7L16.8 16.8M7.2 7.2L5.3 5.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Header() {
  const locale = useLocale()
  const t = useTranslations('Common.Header')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)
  const user = useAtomValue(userAtom)
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const headerTheme = themeMode === 'dark' ? themes.dark : themes.light

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    if (currentTheme === 'dark' || currentTheme === 'light') {
      setThemeMode(currentTheme)
      return
    }

    const savedTheme = window.localStorage.getItem('app-theme')
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setThemeMode(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    }
  }, [])

  useEffect(() => {
    // Prevent accidental dropdown open right after auth state changes/navigation.
    setShowUserMenu(false)
  }, [isAuthenticated, pathname])

  const toggleTheme = useCallback(() => {
    const nextTheme = themeMode === 'dark' ? 'light' : 'dark'
    setThemeMode(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    window.localStorage.setItem('app-theme', nextTheme)
    window.dispatchEvent(new CustomEvent('app-theme-change', { detail: nextTheme }))
  }, [themeMode])

  const switchLocale = useCallback(
    (nextLocale: 'en' | 'vi') => {
      if (nextLocale === locale) return

      // Persist selected locale for next-intl middleware/request config.
      const isHttps = window.location.protocol === 'https:'
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax${isHttps ? '; secure' : ''}`

      const query = searchParams.toString()
      const nextPath = query ? `${pathname}?${query}` : pathname
      router.replace(nextPath)
      router.refresh()
    },
    [locale, pathname, router, searchParams]
  )

  return (
    <XStack
      top={0}
      zIndex={200}
      height={80}
      paddingHorizontal={60}
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="$myLessonsTopNavBackground"
      borderBottomWidth={1}
      borderBottomColor="$myLessonsTopNavBorder"
      style={{
        position: 'sticky',
        backdropFilter: 'blur(14px) saturate(140%)',
        backgroundImage: `linear-gradient(90deg, ${headerTheme.webHeaderBgStart}, ${headerTheme.webHeaderBgEnd})`,
        boxShadow: `${headerTheme.webHeaderContainerShadow}`,
        transition: 'background-image 420ms cubic-bezier(0.22,1,0.36,1), box-shadow 420ms cubic-bezier(0.22,1,0.36,1), border-color 320ms ease',
      }}
    >
      <XStack alignItems="center" gap={10}>
        <Link href={ROUTES.HOME.index} style={{ color: 'inherit', textDecoration: 'none' }}>
          <XStack
            alignItems="center"
            gap={10}
            borderRadius={999}
            paddingVertical={6}
            paddingHorizontal={10}
            backgroundColor="$webHeaderLogoChipBg"
            borderWidth={1}
            borderColor="$webHeaderLogoChipBorder"
            style={{ transition: 'all 320ms cubic-bezier(0.22,1,0.36,1)' }}
          >
            <img src="/icons/Background.svg" alt="background" />
            <Text color="$myLessonsBrandText" fontSize={18} fontWeight="700" lineHeight={24}>
              TutorMatch
            </Text>
          </XStack>
        </Link>
      </XStack>

      <XStack gap={40} alignItems="center">
        <Link href={ROUTES.TUTOR.INDEX} style={{ color: 'inherit', textDecoration: 'none' }}>
          <Text
            color="$myLessonsNavInactive"
            hoverStyle={{ color: '$myLessonsNavHover', y: -1 }}
            fontSize={15}
            lineHeight={22}
            style={{ transition: 'color 280ms cubic-bezier(0.22,1,0.36,1), transform 280ms cubic-bezier(0.22,1,0.36,1)' }}
          >
            {t('findTutors')}
          </Text>
        </Link>
        <Link href={ROUTES.MY_LESSONS.INDEX} style={{ color: 'inherit', textDecoration: 'none' }}>
          <Text
            color="$myLessonsNavInactive"
            hoverStyle={{ color: '$myLessonsNavHover', y: -1 }}
            fontSize={15}
            lineHeight={22}
            style={{ transition: 'color 280ms cubic-bezier(0.22,1,0.36,1), transform 280ms cubic-bezier(0.22,1,0.36,1)' }}
          >
            {t('myLessons')}
          </Text>
        </Link>
        <Link href={ROUTES.BECOME_TUTOR.INDEX} style={{ color: 'inherit', textDecoration: 'none' }}>
          <Text
            color="$myLessonsNavInactive"
            hoverStyle={{ color: '$myLessonsNavHover', y: -1 }}
            fontSize={15}
            lineHeight={22}
            style={{ transition: 'color 280ms cubic-bezier(0.22,1,0.36,1), transform 280ms cubic-bezier(0.22,1,0.36,1)' }}
          >
            {t('becomeTutor')}
          </Text>
        </Link>
      </XStack>

      <XStack alignItems="center" gap={10}>
        <Button
          onPress={toggleTheme}
          borderWidth={1}
          borderColor="$myLessonsTopNavBorder"
          borderRadius={999}
          backgroundColor="$myLessonsCardBackground"
          color="$myLessonsHeaderTitle"
          paddingVertical={7}
          paddingHorizontal={12}
          style={{ cursor: 'pointer', transition: 'all 320ms cubic-bezier(0.22,1,0.36,1)' }}
          hoverStyle={{
            y: -1,
            borderColor: '$myLessonsPrimaryButton',
            backgroundColor: '$myLessonsSwitcherBackground',
            scale: 1.02,
          }}
        >
          <ThemeIcon isDark={themeMode === 'dark'} />
        </Button>

        <XStack borderWidth={1} borderColor="$myLessonsTopNavBorder" borderRadius={999} overflow="hidden">
          <Button
            onPress={() => switchLocale('en')}
            borderWidth={0}
            borderRadius={0}
            minWidth={38}
            height={34}
            backgroundColor={locale === 'en' ? '$myLessonsPrimaryButton' : 'transparent'}
            color={locale === 'en' ? '$myLessonsPrimaryButtonText' : '$myLessonsNavInactive'}
            style={{ cursor: 'pointer', transition: 'all 320ms cubic-bezier(0.22,1,0.36,1)' }}
            hoverStyle={{ backgroundColor: locale === 'en' ? '$myLessonsPrimaryButton' : '$myLessonsSwitcherBackground' }}
          >
            EN
          </Button>
          <Button
            onPress={() => switchLocale('vi')}
            borderWidth={0}
            borderRadius={0}
            minWidth={38}
            height={34}
            backgroundColor={locale === 'vi' ? '$myLessonsPrimaryButton' : 'transparent'}
            color={locale === 'vi' ? '$myLessonsPrimaryButtonText' : '$myLessonsNavInactive'}
            style={{ cursor: 'pointer', transition: 'all 320ms cubic-bezier(0.22,1,0.36,1)' }}
            hoverStyle={{ backgroundColor: locale === 'vi' ? '$myLessonsPrimaryButton' : '$myLessonsSwitcherBackground' }}
          >
            VI
          </Button>
        </XStack>

        {isAuthenticated ? (
          <YStack position="relative" marginLeft={8}>
            <Button
              onPress={() => setShowUserMenu(!showUserMenu)}
              borderWidth={1}
              borderColor="$myLessonsTopNavBorder"
              borderRadius={999}
              backgroundColor="transparent"
              paddingVertical={4}
              paddingLeft={4}
              paddingRight={12}
              style={{ cursor: 'pointer', transition: 'all 320ms cubic-bezier(0.22,1,0.36,1)' }}
              hoverStyle={{ backgroundColor: '$myLessonsSwitcherBackground', borderColor: '$myLessonsPrimaryButton', y: -1 }}
            >
              <XStack alignItems="center" gap={10}>
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username ?? 'User avatar'}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '999px',
                    objectFit: 'cover',
                    border: `2px solid ${headerTheme.webHeaderAvatarBorder}`,
                  }}
                />
              ) : (
                <XStack
                  width={36}
                  height={36}
                  borderRadius={999}
                  alignItems="center"
                  justifyContent="center"
                  style={{
                    background: `linear-gradient(135deg, ${headerTheme.webHeaderAvatarGradientStart} 0%, ${headerTheme.webHeaderAvatarGradientEnd} 100%)`,
                    border: `2px solid ${headerTheme.webHeaderAvatarBorder}`,
                  }}
                >
                  <Text color="$myLessonsPrimaryButtonText" fontSize={14} fontWeight="600" lineHeight={20}>
                  {user?.username?.substring(0, 2).toUpperCase() || 'U'}
                  </Text>
                </XStack>
              )}
              <Text color="$myLessonsHeaderTitle" fontSize={14} lineHeight={20} numberOfLines={1} maxWidth={120}>
                {user?.username}
              </Text>
              <svg
                width="12" 
                height="12" 
                viewBox="0 0 12 12" 
                fill="none"
                style={{ 
                  transition: 'transform 200ms',
                  transform: showUserMenu ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              >
                <path 
                  d="M3 4.5L6 7.5L9 4.5" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              </XStack>
            </Button>
            
            {showUserMenu && (
              <>
                <div 
                  style={{ position: 'fixed', inset: 0, zIndex: 998 }}
                  onClick={() => setShowUserMenu(false)}
                />
                <YStack
                  position="absolute"
                  top={48}
                  right={0}
                  minWidth={180}
                  zIndex={999}
                  borderRadius={12}
                  borderWidth={1}
                  borderColor="$myLessonsTopNavBorder"
                  backgroundColor="$myLessonsCardBackground"
                  padding={8}
                  style={{
                    boxShadow: `${headerTheme.webHeaderMenuShadow}`,
                    transition: 'all 320ms cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  <YStack>
                    <LogoutButton />
                  </YStack>
                </YStack>
              </>
            )}
          </YStack>
        ) : (
          <LoginButton />
        )}
      </XStack>
    </XStack>
  )
}
