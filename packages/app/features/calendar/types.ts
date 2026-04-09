import type { ReactNode } from 'react';

export type CalendarViewMode = 'week' | 'month' | 'day';

export type CalendarSlotState = 'available' | 'selected' | 'occupied' | 'blocked' | 'pending';

export type CalendarWeekDay = {
  shortLabel: string;
  dateLabel: string;
  fullDate?: Date;
};

export type CalendarTimeSlot = {
  hour: number;
  dayIndex: number;
  state?: CalendarSlotState;
  data?: unknown;
};

export type CalendarEvent<T = unknown> = {
  id: string;
  dayIndex: number;
  startHour: number;
  endHour?: number;
  data: T;
};

export type CalendarRowModel =
  | { type: 'hour'; hour: number }
  | { type: 'gap'; startHour: number; endHour: number; hourCount: number };

export type BaseCalendarProps<TEvent = unknown> = {
  viewMode?: CalendarViewMode;
  weekDays: CalendarWeekDay[];
  weekHours: number[];
  events?: CalendarEvent<TEvent>[];
  currentDayIndex?: number;
  currentHour?: number;
  enableGapCollapse?: boolean;
  minGapHours?: number;
  readonly?: boolean;
  onSlotClick?: (dayIndex: number, hour: number) => void;
  renderEvent?: (event: CalendarEvent<TEvent>, isCompact: boolean) => ReactNode;
  renderSlot?: (dayIndex: number, hour: number, state?: CalendarSlotState) => ReactNode;
  themePrefix?: string;
  isCompact?: boolean;
};
