import { Text, YStack } from '@mezon-tutors/app/ui';
import { useTranslations } from 'next-intl';
import { getStatusTheme, getStatusLabelKey } from '../status-theme';
import type { ScheduleItem } from '../types';

type MyScheduleEventCardProps = {
  schedule: ScheduleItem;
  isCompact: boolean;
  onPress?: () => void;
};

export function MyScheduleEventCard({ schedule, isCompact, onPress }: MyScheduleEventCardProps) {
  const t = useTranslations('MySchedule.legend');
  const theme = getStatusTheme(schedule.status);
  const [startTime = '', endTime = ''] = schedule.timeLabel.split(' - ');
  const isAvailable = schedule.status === 'available';
  const displayTitle = isAvailable ? t(getStatusLabelKey(schedule.status)).toUpperCase() : schedule.title;

  return (
    <YStack
      width="100%"
      height="100%"
      maxWidth="100%"
      minWidth={0}
      borderRadius={12}
      backgroundColor={theme.background}
      borderWidth={1}
      borderColor={isAvailable ? theme.dot : '$myScheduleEventBorder'}
      borderStyle={isAvailable ? 'dashed' : 'solid'}
      borderLeftWidth={isAvailable ? 1 : 4}
      borderLeftColor={theme.dot}
      padding={isCompact ? '$1.5' : '$2'}
      gap={4}
      justifyContent="center"
      alignItems={isAvailable ? 'center' : 'flex-start'}
      minHeight={isAvailable ? (isCompact ? 50 : 56) : (isCompact ? 70 : 80)}
      maxHeight={isAvailable ? undefined : (isCompact ? 78 : 88)}
      overflow="hidden"
      cursor={isAvailable ? 'default' : 'pointer'}
      hoverStyle={isAvailable ? {} : { opacity: 0.8 }}
      onPress={isAvailable ? undefined : onPress}
    >
      {!isAvailable && (
        <Text color={theme.label} fontSize={10} lineHeight={12} fontWeight="600" numberOfLines={1}>
          {startTime} - {endTime}
        </Text>
      )}

      <Text
        color={theme.label}
        fontSize={isAvailable ? 11 : (isCompact ? 13 : 14)}
        lineHeight={isAvailable ? 13 : (isCompact ? 15 : 16)}
        fontWeight="700"
        numberOfLines={isAvailable ? 3 : 2}
        textAlign={isAvailable ? 'center' : 'left'}
        letterSpacing={isAvailable ? 0.6 : 0}
      >
        {displayTitle}
      </Text>
    </YStack>
  );
}
