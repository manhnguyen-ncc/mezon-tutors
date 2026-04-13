'use client'

import { XStack, YStack } from '@mezon-tutors/app/ui'
import { CALENDAR_CONFIG, CALENDAR_THEME_CONFIG, DEFAULT_THEME_CONFIG } from '@mezon-tutors/shared'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useMedia } from 'tamagui'
import type { BaseCalendarProps, CalendarType } from '../types'
import { CalendarColumn, type CalendarColumnConfig } from './CalendarColumn'
import { CalendarDayHeader, type CalendarDayHeaderTokens } from './CalendarDayHeader'
import { CalendarGridLayer, type CalendarGridLayerProps } from './CalendarGridLayer'
import { buildRowModels, CalendarLayoutEngine } from './utils'

function formatHour(hour: number): string {
  return dayjs().hour(hour).minute(0).format('HH:mm')
}

function formatRangeLabel(startHour: number, endHour: number): string {
  return `${formatHour(startHour)} - ${formatHour(endHour)}`
}

export function Calendar<TEvent = unknown>({
  type,
  weekDays,
  weekHours,
  events = [],
  currentDayIndex,
  currentHour,
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

  const resolvedThemePrefix = (type ?? themePrefix) as CalendarType | string
  const themeConfig = CALENDAR_THEME_CONFIG[resolvedThemePrefix] || DEFAULT_THEME_CONFIG
  const { showTimeline, showGridLines, showNowLine } = themeConfig
  const eventTopPaddingFromTheme = (themeConfig as { eventTopPadding?: number }).eventTopPadding
  const translationNamespaceFromTheme = (themeConfig as { translationNamespace?: string }).translationNamespace
  const showGridOuterBorderFromTheme = (themeConfig as { showGridOuterBorder?: boolean }).showGridOuterBorder
  const weekendNoSlotDaysFromTheme = (themeConfig as { weekendNoSlotDays?: number[] }).weekendNoSlotDays
  const weekendNoSlotLabelFromTheme = (themeConfig as { weekendNoSlotLabel?: string }).weekendNoSlotLabel
  const emptySlotMergeHoursFromTheme = (themeConfig as { emptySlotMergeHours?: number }).emptySlotMergeHours
  const showGridOuterBorder = showGridOuterBorderFromTheme ?? showGridLines

  const timeColumnWidth = isCompact ? CALENDAR_CONFIG.TIME_COLUMN_WIDTH.COMPACT : CALENDAR_CONFIG.TIME_COLUMN_WIDTH.NORMAL
  const rowHeight = isCompact ? CALENDAR_CONFIG.ROW_HEIGHT.COMPACT : CALENDAR_CONFIG.ROW_HEIGHT.NORMAL
  const gapRowHeight = isCompact ? CALENDAR_CONFIG.GAP_ROW_HEIGHT.COMPACT : CALENDAR_CONFIG.GAP_ROW_HEIGHT.NORMAL
  const slotPadding = isCompact ? 6 : 8
  const eventPadding = themeConfig.eventPadding ?? slotPadding
  const eventTopPadding = eventTopPaddingFromTheme ?? eventPadding

  const rowModels = useMemo(
    () => buildRowModels(weekHours, events, currentHour, enableGapCollapse, minGapHours),
    [weekHours, events, currentHour, enableGapCollapse, minGapHours]
  )

  const layoutEngine = useMemo(
    () => new CalendarLayoutEngine(rowModels, { rowHeight, gapRowHeight }),
    [rowModels, rowHeight, gapRowHeight]
  )

  const headerBg = `$${resolvedThemePrefix}GridHeaderBackground`
  const bodyBg = `$${resolvedThemePrefix}GridBodyBackground`
  const gridBorder = `$${resolvedThemePrefix}GridBorder`

  const headerTokens: CalendarDayHeaderTokens = {
    gridBorder,
    activeDayColumn: `$${resolvedThemePrefix}ActiveDayColumn`,
    dayLabel: `$${resolvedThemePrefix}DayLabel`,
    activeDate: `$${resolvedThemePrefix}ActiveDate`,
    inactiveDate: `$${resolvedThemePrefix}InactiveDate`,
  }

  const columnConfig: CalendarColumnConfig<TEvent> = {
    layoutEngine,
    rowHeight,
    slotPadding,
    eventPadding,
    eventTopPadding,
    readonly,
    isCompact,
    showNowLine,
    currentHour,
    onSlotClick,
    renderEvent,
    renderSlot,
    themeTokens: {
      gridBorder,
      currentColumn: `$${resolvedThemePrefix}CurrentColumn`,
      nowLine: `$${resolvedThemePrefix}NowLine`,
      weekendLabel: `$${resolvedThemePrefix}DayLabel`,
    },
    weekendNoSlotDays: weekendNoSlotDaysFromTheme ?? [],
    weekendNoSlotLabel: weekendNoSlotLabelFromTheme,
    emptySlotMergeHours: emptySlotMergeHoursFromTheme ?? 1,
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
      gapCellBg: `$${resolvedThemePrefix}GapCellBackground`,
      gapLabel: `$${resolvedThemePrefix}GapLabel`,
      gapHint: `$${resolvedThemePrefix}GapHint`,
      timeLabel: `$${resolvedThemePrefix}TimeLabel`,
    },
    translationNamespace: translationNamespaceFromTheme ?? 'MySchedule',
  }

  return (
    <YStack borderWidth={showGridOuterBorder ? 1 : 0} borderColor={showGridOuterBorder ? gridBorder : 'transparent'} borderRadius={showGridOuterBorder ? 14 : 0} overflow="hidden" width="100%">
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
