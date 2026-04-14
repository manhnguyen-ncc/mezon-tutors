import type { SessionStatus } from './types';

type StatusTheme = {
  background: string;
  label: string;
  dot: string;
};

export function getStatusTheme(status: SessionStatus): StatusTheme {
  switch (status) {
    case 'upcoming':
      return {
        background: '$myScheduleStatusUpcomingBg',
        label: '$myScheduleStatusUpcomingLabel',
        dot: '$myScheduleStatusUpcomingDot',
      };
    case 'pending':
      return {
        background: '$myScheduleStatusPendingBg',
        label: '$myScheduleStatusPendingLabel',
        dot: '$myScheduleStatusPendingDot',
      };
    case 'available':
      return {
        background: '$myScheduleStatusAvailableBg',
        label: '$myScheduleStatusAvailableLabel',
        dot: '$myScheduleStatusAvailableDot',
      };
    case 'blocked':
      return {
        background: '$myScheduleStatusBlockedBg',
        label: '$myScheduleStatusBlockedLabel',
        dot: '$myScheduleStatusBlockedDot',
      };
  }
}

export function getStatusLabelKey(status: SessionStatus): string {
  switch (status) {
    case 'upcoming':
      return 'upcomingSession';
    case 'pending':
      return 'pendingRequest';
    case 'available':
      return 'availableSlot';
    case 'blocked':
      return 'blockedBreak';
  }
}

