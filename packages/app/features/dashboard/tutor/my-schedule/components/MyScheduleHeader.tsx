import { Button, Text, XStack, YStack, PlusIcon } from '@mezon-tutors/app/ui';
import { RefreshCw } from '@tamagui/lucide-icons';
import { useTranslations } from 'next-intl';
import { useTheme } from 'tamagui';

export function MyScheduleHeader() {
  const t = useTranslations('MySchedule.header');
  const theme = useTheme();

  return (
    <XStack justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap="$3">
      <YStack gap="$2" maxWidth={620}>
        <Text fontSize={56} lineHeight={60} fontWeight="800" color="$dashboardTutorTextPrimary">
          {t('title')}
        </Text>
        <Text fontSize={14} lineHeight={22} color="$dashboardTutorTextSecondary" opacity={0.92}>
          {t('subtitle')}
        </Text>
      </YStack>

      <XStack gap="$3" marginTop="$1.5">
        <Button
          size="$4"
          variant="outlined"
          icon={RefreshCw}
          borderColor="$dashboardTutorActionGhostBorder"
          color="$dashboardTutorActionGhostText"
          backgroundColor="$dashboardTutorActionGhostBg"
        >
          {t('syncCalendar')}
        </Button>
        <Button 
          size="$4" 
          backgroundColor="$myScheduleAddButtonBg"
          color="$myScheduleAddButtonText"
          icon={<PlusIcon size={18} color={theme.myScheduleAddButtonIcon?.val || '#FFFFFF'} />}
        >
          {t('addAvailability')}
        </Button>
      </XStack>
    </XStack>
  );
}
