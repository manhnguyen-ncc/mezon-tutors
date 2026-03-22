'use client'

import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from 'src/i18n/navigation'
import { Screen, YStack } from '@mezon-tutors/app/ui'
import {
  AdminSidebar,
  type AdminSidebarItem,
  type AdminSidebarItemIcon,
} from '@mezon-tutors/app/features/admin/AdminSidebar'

const NAV_ITEMS: { href: string; labelKey: string; icon: AdminSidebarItemIcon }[] = [
  { href: '/admin/dashboard', labelKey: 'sidebar.dashboard', icon: 'dashboard' },
  {
    href: '/admin/tutor-applications',
    labelKey: 'sidebar.tutorApplications',
    icon: 'tutor-applications',
  },
  { href: '/admin/students', labelKey: 'sidebar.students', icon: 'students' },
  { href: '/admin/payments', labelKey: 'sidebar.payments', icon: 'payments' },
  { href: '/admin/reports', labelKey: 'sidebar.reports', icon: 'reports' },
]

function buildSidebarItems(pathname: string, t: (key: string) => string): AdminSidebarItem[] {
  return NAV_ITEMS.map((item) => ({
    id: item.href,
    href: item.href,
    label: t(item.labelKey as any),
    icon: item.icon,
    active: pathname === item.href,
  }))
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const t = useTranslations('Admin')
  const items = buildSidebarItems(pathname, t)

  return (
    <Screen>
      <YStack minHeight="100vh" flexDirection="row" flexWrap="nowrap">
        <AdminSidebar
          items={items}
          brandName={t('brandName')}
          brandSubtitle={t('brandSubtitle')}
          loggedInAsLabel={t('loggedInAs')}
          adminUserLabel={t('adminUser')}
          renderItemLink={(item, content) => (
            <Link key={item.id} href={item.href} style={{ textDecoration: 'none' }}>
              {content}
            </Link>
          )}
        />

        <YStack
          flex={1}
          minWidth={0}
          padding={24}
          gap={24}
          $sm={{ padding: 16, gap: 20 }}
          $xs={{ padding: 12, gap: 16 }}
        >
          {children}
        </YStack>
      </YStack>
    </Screen>
  )
}
