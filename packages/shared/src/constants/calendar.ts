import dayjs from 'dayjs';

export const CALENDAR_CONFIG = {
  MIN_GAP_HOURS: 2,
  TIME_COLUMN_WIDTH: {
    COMPACT: 66,
    NORMAL: 78,
  },
  ROW_HEIGHT: {
    COMPACT: 78,
    NORMAL: 88,
  },
  GAP_ROW_HEIGHT: {
    COMPACT: 52,
    NORMAL: 60,
  },
  HEADER_HEIGHT: 72,
  EVENT_WIDTH: {
    COMPACT: 122,
    NORMAL: 136,
  },
  DAYS_PER_WEEK: 7,
} as const;

export type CalendarThemeConfig = {
  showTimeline: boolean;
  showGridLines: boolean;
  showNowLine: boolean;
};

export const DEFAULT_THEME_CONFIG: CalendarThemeConfig = {
  showTimeline: true,
  showGridLines: true,
  showNowLine: false,
};

export const CALENDAR_THEME_CONFIG: Record<string, CalendarThemeConfig> = {
  myLessons: {
    showTimeline: true,
    showGridLines: true,
    showNowLine: true,
  },
  tutorSchedule: {
    showTimeline: true,
    showGridLines: true,
    showNowLine: false,
  },
  mySchedule: {
    showTimeline: false,
    showGridLines: true,
    showNowLine: false,
  },
  booking: {
    showTimeline: true,
    showGridLines: true,
    showNowLine: false,
  },
};

export function getFallbackWeekHours(): number[] {
  const currentHour = dayjs().hour();
  const startHour = Math.max(0, currentHour - 2);
  const endHour = Math.min(23, startHour + 4);

  return Array.from({ length: endHour - startHour + 1 }, (_, index) => startHour + index);
}

export function buildFallbackWeekDays() {
  const now = dayjs();
  const dayOfWeek = now.day();
  const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = now.subtract(mondayOffset, 'day');

  return Array.from({ length: 7 }, (_, index) => {
    const date = monday.add(index, 'day');

    return {
      shortLabel: date.format('ddd'),
      dateLabel: date.format('DD'),
    };
  });
}
