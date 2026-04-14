import type { CalendarWeekDay } from '@mezon-tutors/app';

export type SessionStatus = 'upcoming' | 'pending' | 'available' | 'blocked';

export type ScheduleItem = {
  id: string;
  dayIndex: number;
  startHour: number;
  endHour: number;
  status: SessionStatus;
  title: string;
  studentName?: string;
  timeLabel: string;
};

export type MyScheduleCalendarMeta = {
  title: string;
  weekDays: CalendarWeekDay[];
  weekHours: number[];
  currentDayIndex?: number;
  currentHour?: number;
};
