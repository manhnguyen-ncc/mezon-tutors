'use client'

import { XStack, YStack, Text } from '@mezon-tutors/app/ui';
import { isLoadingAtom, userAtom } from '@mezon-tutors/app/store/auth.atom';
import { useAtomValue } from 'jotai';
import { useState, useMemo } from 'react';
import { useMedia } from 'tamagui';
import dayjs from 'dayjs';
import { MyScheduleCalendarCard } from './components/MyScheduleCalendarCard';
import { MyScheduleHeader } from './components/MyScheduleHeader';
import { MyScheduleSidebar } from './components/MyScheduleSidebar';
import { buildMyScheduleCalendar } from './data-source';
import { useMySchedule } from './hooks/useMySchedule';

export function MyScheduleScreen() {
  const media = useMedia();
  const isCompact = media.md || media.sm || media.xs;
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const user = useAtomValue(userAtom);
  const isAuthLoading = useAtomValue(isLoadingAtom);

  const { data, isLoading, isError } = useMySchedule(user?.mezonUserId, selectedDate);

  const calendar = useMemo(() => buildMyScheduleCalendar(selectedDate), [selectedDate]);
  const schedules = useMemo(() => {
    console.log('📅 Selected date:', selectedDate.format('YYYY-MM-DD'));
    console.log('📊 API data:', data);
    console.log('📝 Lessons:', data?.lessons);
    return data?.lessons || [];
  }, [data?.lessons, selectedDate]);

  const handleDateSelect = (date: dayjs.Dayjs) => {
    console.log('🔄 Date selected:', date.format('YYYY-MM-DD'));
    setSelectedDate(date);
  };

  if (isAuthLoading || isLoading) {
    return (
      <YStack
        flex={1}
        padding="$5"
        gap="$4"
        backgroundColor="$dashboardTutorPageBackground"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="$dashboardTutorTextPrimary">Loading...</Text>
      </YStack>
    );
  }

  if (isError) {
    return (
      <YStack
        flex={1}
        padding="$5"
        gap="$4"
        backgroundColor="$dashboardTutorPageBackground"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="$dashboardTutorTextPrimary">Failed to load schedule</Text>
      </YStack>
    );
  }

  return (
    <YStack
      flex={1}
      padding="$5"
      gap="$4"
      backgroundColor="$dashboardTutorPageBackground"
      style={{
        backgroundImage:
          'radial-gradient(60% 80% at 20% 10%, rgba(29,102,242,0.22), transparent), radial-gradient(35% 60% at 85% 15%, rgba(29,102,242,0.14), transparent)',
      }}
    >
      <MyScheduleHeader />

      <XStack gap="$4" flexDirection={isCompact ? 'column' : 'row'} alignItems="stretch">
        <MyScheduleSidebar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
        <YStack flex={1} minWidth={0}>
          <MyScheduleCalendarCard schedules={schedules} calendar={calendar} />
        </YStack>
      </XStack>
    </YStack>
  );
}
