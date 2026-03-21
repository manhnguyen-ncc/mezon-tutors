'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Text, YStack } from '@mezon-tutors/app/ui';
import { useTutorApplicationListQuery } from '@mezon-tutors/app/services';
import { TutorApplicationsMetricsRow } from './MetricsRow';
import { TutorApplicationsToolbarRow } from './ToolbarRow';
import { TutorApplicationsList } from './ApplicationsList';
import { TutorApplicationDetail } from './ApplicationDetail';
import type { TutorApplication } from './types';

export function TutorApplicationsScreen() {
  const t = useTranslations('Admin.TutorApplications');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const {
    data: applications = [],
    isLoading,
    isError,
    error,
  } = useTutorApplicationListQuery();

  useEffect(() => {
    if (applications.length > 0 && !selectedId) {
      setSelectedId(applications[0].id);
    }
  }, [applications, selectedId]);

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return applications;

    return applications.filter((app) => {
      const name = app.name.toLowerCase();
      const subject = app.subject.toLowerCase();
      return (
        name.includes(query) || subject.includes(query) || app.id.toLowerCase().includes(query)
      );
    });
  }, [applications, search]);

  const selectedApplication = useMemo(() => {
    if (!filteredApplications.length) return null;
    const found = filteredApplications.find((app) => app.id === selectedId);
    return found ?? filteredApplications[0];
  }, [filteredApplications, selectedId]);

  const handleExportCsv = (apps: TutorApplication[]) => {
    if (typeof window === 'undefined' || !apps.length) return;

    const header = ['ID', 'Name', 'Subject', 'Date', 'Status'];
    const rows = apps.map((app) => [app.id, app.name, app.subject, app.date, app.status]);

    const csv = [header, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tutor-applications.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <YStack
      gap={24}
      flex={1}
    >
      <TutorApplicationsToolbarRow
        search={search}
        onSearchChange={setSearch}
        onNotificationsPress={() => {
          console.log('Notifications pressed');
        }}
        onSettingsPress={() => {
          console.log('Settings pressed');
        }}
      />

      <TutorApplicationsMetricsRow />

      {isError && (
        <YStack
          padding={16}
          backgroundColor="$red9"
          borderRadius={8}
        >
          <Text variant="default">{error instanceof Error ? error.message : t('error')}</Text>
        </YStack>
      )}

      {isLoading ? (
        <YStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          padding={24}
        >
          <Text variant="default">Loading...</Text>
        </YStack>
      ) : (
        <YStack
          gap={24}
          flex={1}
          flexDirection="row"
          flexWrap="wrap"
          alignItems="flex-start"
        >
          <TutorApplicationsList
            applications={filteredApplications}
            selectedId={selectedApplication?.id ?? null}
            onSelect={setSelectedId}
            onFilterClick={() => {
              console.log('Filters button clicked');
            }}
            onExportCsvClick={() => handleExportCsv(filteredApplications)}
          />

          <TutorApplicationDetail application={selectedApplication} />
        </YStack>
      )}
    </YStack>
  );
}
