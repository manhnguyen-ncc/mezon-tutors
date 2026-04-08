'use client'

import { XStack, YStack } from '@mezon-tutors/app/ui'
import type { ReactNode } from 'react'
import type { CalendarEvent, CalendarRowModel, CalendarSlotState } from '../types'
import type { CalendarLayoutEngine } from './utils'

export type CalendarColumnTokens = {
  gridBorder: string
  currentColumn: string
  nowLine: string
}

export type CalendarColumnConfig<TEvent> = {
  layoutEngine: CalendarLayoutEngine
  rowHeight: number
  readonly: boolean
  isCompact: boolean
  showNowLine?: boolean
  currentHour?: number
  themeTokens: CalendarColumnTokens
  onSlotClick?: (dayIndex: number, hour: number) => void
  renderEvent?: (event: CalendarEvent<TEvent>, isCompact: boolean) => ReactNode
  renderSlot?: (dayIndex: number, hour: number, state?: CalendarSlotState) => ReactNode
}

type CalendarColumnProps<TEvent> = {
  dayIndex: number
  events: CalendarEvent<TEvent>[]
  rowModels: CalendarRowModel[]
  isLast: boolean
  isActive: boolean
  showGridLines: boolean
  config: CalendarColumnConfig<TEvent>
}

type ColumnEmptySlotProps<TEvent> = {
  row: Extract<CalendarRowModel, { type: 'hour' }>
  dayIndex: number
  config: CalendarColumnConfig<TEvent>
}

function ColumnEmptySlot<TEvent>({ row, dayIndex, config }: ColumnEmptySlotProps<TEvent>) {
  const top = config.layoutEngine.getY(row.hour)
  const hasClick = !config.readonly && config.onSlotClick

  return (
    <YStack
      position="absolute"
      top={top}
      height={config.rowHeight}
      width="100%"
      cursor={hasClick ? 'pointer' : 'default'}
      onPress={hasClick ? () => config.onSlotClick?.(dayIndex, row.hour) : undefined}
      padding={config.isCompact ? 6 : 8}
    >
      {config.renderSlot ? config.renderSlot(dayIndex, row.hour) : null}
    </YStack>
  )
}

type ColumnEventSlotProps<TEvent> = {
  event: CalendarEvent<TEvent>
  config: CalendarColumnConfig<TEvent>
}

function ColumnEventSlot<TEvent>({ event, config }: ColumnEventSlotProps<TEvent>) {
  const top = config.layoutEngine.getY(event.startHour)
  const endHour = event.endHour ?? event.startHour + 1
  const bottom = config.layoutEngine.getY(endHour)
  const height = Math.max(0, bottom - top)

  return (
    <YStack position="absolute" top={top} height={height} width="100%" padding={config.isCompact ? 6 : 8} zIndex={10}>
      {config.renderEvent ? config.renderEvent(event, config.isCompact) : null}
    </YStack>
  )
}

function ColumnNowLine({ config }: { config: CalendarColumnConfig<any> }) {
  if (!config.showNowLine || config.currentHour === undefined) return null

  const top = config.layoutEngine.getY(config.currentHour)

  return (
    <XStack position="absolute" left={0} right={0} top={top} alignItems="center" pointerEvents="none" zIndex={20}>
      <YStack width={7} height={7} borderRadius={999} backgroundColor={config.themeTokens.nowLine} marginLeft={-4} />
      <YStack flex={1} height={2} backgroundColor={config.themeTokens.nowLine} />
    </XStack>
  )
}

export function CalendarColumn<TEvent = unknown>({
  dayIndex,
  events,
  rowModels,
  isLast,
  isActive,
  showGridLines,
  config,
}: CalendarColumnProps<TEvent>) {
  return (
    <YStack
      flex={1}
      flexBasis={0}
      minWidth={0}
      borderRightWidth={showGridLines && !isLast ? 1 : 0}
      borderRightColor={config.themeTokens.gridBorder}
      backgroundColor={isActive ? config.themeTokens.currentColumn : 'transparent'}
      position="relative"
    >
      {rowModels.map((row) => {
        if (row.type === 'gap') return null
        return <ColumnEmptySlot key={`slot-${row.hour}`} row={row} dayIndex={dayIndex} config={config} />
      })}

      {events.map((event) => (
        <ColumnEventSlot key={event.id} event={event} config={config} />
      ))}

      {isActive && <ColumnNowLine config={config} />}
    </YStack>
  )
}
