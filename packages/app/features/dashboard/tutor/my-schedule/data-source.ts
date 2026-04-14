import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import type { MyScheduleCalendarMeta } from './types';

dayjs.extend(utc);
dayjs.extend(timezone);

export function buildMyScheduleCalendar(selectedDate: dayjs.Dayjs = dayjs()): MyScheduleCalendarMeta {
  const now = dayjs().tz('Asia/Ho_Chi_Minh');
  const targetDate = selectedDate.tz('Asia/Ho_Chi_Minh');
  const dayOfWeek = targetDate.day();
  const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = targetDate.subtract(mondayOffset, 'day');

  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = monday.add(index, 'day');
    return {
      shortLabel: date.format('ddd').toUpperCase(),
      dateLabel: date.format('DD'),
      fullDate: date.toDate(),
    };
  });

  const currentDayOfWeek = now.day();
  const currentMondayOffset = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
  const currentMonday = now.subtract(currentMondayOffset, 'day').startOf('day');
  const selectedMonday = monday.startOf('day');
  
  const isCurrentWeek = currentMonday.isSame(selectedMonday, 'day');
  const currentDayIndex = isCurrentWeek ? currentMondayOffset : undefined;

  return {
    title: targetDate.format('MMMM YYYY'),
    weekDays,
    weekHours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    currentDayIndex,
    currentHour: isCurrentWeek ? now.hour() + now.minute() / 60 : undefined,
  };
}
