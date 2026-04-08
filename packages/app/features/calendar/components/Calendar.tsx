'use client'

import { XStack, YStack } from '@mezon-tutors/app/ui'
import { CALENDAR_CONFIG } from '@mezon-tutors/shared'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useMemo } from 'react'
import { useMedia } from 'tamagui'
import type { BaseCalendarProps } from '../types'
import { CalendarColumn, type CalendarColumnConfig } from './CalendarColumn'
import { CalendarDayHeader, type CalendarDayHeaderTokens } from './CalendarDayHeader'
import { CalendarGridLayer, type CalendarGridLayerProps } from './CalendarGridLayer'
import { buildRowModels, CalendarLayoutEngine } from './utils'

dayjs.extend(utc)

function formatHour(hour: number): string {
  return dayjs.utc().startOf('day').add(hour, 'hour').format('HH:mm')
}

function formatRangeLabel(startHour: number, endHour: number): string {
  return `${formatHour(startHour)} - ${formatHour(endHour)}`
}

export function Calendar<TEvent = unknown>({
  weekDays,
  weekHours,
  events = [],
  currentDayIndex,
  currentHour,
  showTimeline = true,
  showGridLines = true,
  showNowLine = false,
  enableGapCollapse = false,
  minGapHours = CALENDAR_CONFIG.MIN_GAP_HOURS,
  readonly = false,
  onSlotClick,
  renderEvent,
  renderSlot,
  themePrefix = 'calendar',
  isCompact: isCompactProp,
}: BaseCalendarProps<TEvent>) {
  const media = useMedia()
  const isCompact = isCompactProp ?? (media.md || media.sm || media.xs)

  const timeColumnWidth = isCompact ? CALENDAR_CONFIG.TIME_COLUMN_WIDTH.COMPACT : CALENDAR_CONFIG.TIME_COLUMN_WIDTH.NORMAL
  const rowHeight = isCompact ? CALENDAR_CONFIG.ROW_HEIGHT.COMPACT : CALENDAR_CONFIG.ROW_HEIGHT.NORMAL
  const gapRowHeight = isCompact ? CALENDAR_CONFIG.GAP_ROW_HEIGHT.COMPACT : CALENDAR_CONFIG.GAP_ROW_HEIGHT.NORMAL

  const rowModels = useMemo(
    () => buildRowModels(weekHours, events, currentHour, enableGapCollapse, minGapHours),
    [weekHours, events, currentHour, enableGapCollapse, minGapHours]
  )
  
  const layoutEngine = useMemo(
    () => new CalendarLayoutEngine(rowModels, { rowHeight, gapRowHeight }),
    [rowModels, rowHeight, gapRowHeight]
  )

  const headerBg = `$${themePrefix}GridHeaderBackground` as any
  const bodyBg = `$${themePrefix}GridBodyBackground` as any
  const gridBorder = `$${themePrefix}GridBorder` as any

  const headerTokens: CalendarDayHeaderTokens = {
    gridBorder,
    activeDayColumn: `$${themePrefix}ActiveDayColumn`,
    dayLabel: `$${themePrefix}DayLabel`,
    activeDate: `$${themePrefix}ActiveDate`,
    inactiveDate: `$${themePrefix}InactiveDate`,
  }

  const columnConfig: CalendarColumnConfig<TEvent> = {
    layoutEngine,
    rowHeight,
    readonly,
    isCompact,
    showNowLine,
    currentHour,
    onSlotClick,
    renderEvent,
    renderSlot,
    themeTokens: {
      gridBorder,
      currentColumn: `$${themePrefix}CurrentColumn`,
      nowLine: `$${themePrefix}NowLine`,
    },
  }

  const gridProps: CalendarGridLayerProps = {
    rowModels,
    layoutEngine,
    showTimeline,
    showGridLines,
    timeColumnWidth,
    rowHeight,
    gapRowHeight,
    formatHour,
    formatRangeLabel,
    themeTokens: {
      gridBorder,
      gapCellBg: `$${themePrefix}GapCellBackground`,
      gapLabel: `$${themePrefix}GapLabel`,
      gapHint: `$${themePrefix}GapHint`,
      timeLabel: `$${themePrefix}TimeLabel`,
    },
  }

  return (
    <YStack borderWidth={showGridLines ? 1 : 0} borderColor={showGridLines ? gridBorder : 'transparent'} borderRadius={14} overflow="hidden" width="100%">
      <XStack width="100%" minHeight={CALENDAR_CONFIG.HEADER_HEIGHT} backgroundColor={headerBg} paddingBottom={showGridLines ? 0 : 8}>
        {showTimeline && (
          <YStack width={timeColumnWidth} borderRightWidth={showGridLines ? 1 : 0} borderRightColor={gridBorder} />
        )}

        {weekDays.map((day, dayIndex) => (
          <CalendarDayHeader
            key={`header-${dayIndex}`}
            day={day}
            dayIndex={dayIndex}
            isActive={dayIndex === currentDayIndex}
            isLast={dayIndex === weekDays.length - 1}
            showGridLines={showGridLines}
            tokens={headerTokens}
          />
        ))}
      </XStack>

      <YStack width="100%" height={layoutEngine.totalHeight} position="relative" backgroundColor={bodyBg}>
        <CalendarGridLayer {...gridProps} />

        <XStack width="100%" height="100%" position="absolute" top={0} left={0} pointerEvents="box-none">
          {showTimeline && <YStack width={timeColumnWidth} pointerEvents="none" />}

          {weekDays.map((day, dayIndex) => (
            <CalendarColumn
              key={`col-${dayIndex}`}
              dayIndex={dayIndex}
              events={events.filter((e) => e.dayIndex === dayIndex)}
              rowModels={rowModels}
              isLast={dayIndex === weekDays.length - 1}
              isActive={dayIndex === currentDayIndex}
              showGridLines={showGridLines}
              config={columnConfig}
            />
          ))}
        </XStack>
      </YStack>
    </YStack>
  )
}
