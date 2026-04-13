'use client'

import { YStack, Text, XStack } from 'tamagui';
import { CALENDAR_THEME_CONFIG, DEFAULT_THEME_CONFIG } from '@mezon-tutors/shared';
import type { ReactNode } from 'react';
import { Button } from '@mezon-tutors/app/ui';
import { Calendar } from './Calendar';
import type {
  BaseCalendarProps,
  CalendarCardPresetRenderContext,
  CalendarCardPresetRenderResult,
  CalendarLegendItem,
  CalendarPresetData,
  CalendarType,
} from '../types';

type CalendarCardProps<TEvent> = BaseCalendarProps<TEvent> & {
  header?: ReactNode;
  footer?: ReactNode;
  presetData?: CalendarPresetData;
};

function DefaultEmptySlot({ text }: { text?: string }) {
  if (!text) return null;
  
  return (
    <YStack
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      opacity={0.5}
    >
      <Text
        fontSize={11}
        fontWeight="600"
        color="$myScheduleDayLabel"
        textTransform="uppercase"
        letterSpacing={0.5}
      >
        {text}
      </Text>
    </YStack>
  );
}

function MyScheduleEmptySlot({
  themePrefix,
  text,
  maxWidth,
  minHeight,
  borderRadius = 12,
  borderStyle = 'dashed',
}: {
  themePrefix: string;
  text?: string;
  maxWidth?: number;
  minHeight?: number;
  borderRadius?: number;
  borderStyle?: 'solid' | 'dashed';
}) {
  return (
    <YStack
      width="100%"
      height="100%"
      maxWidth={maxWidth}
      borderRadius={borderRadius}
      backgroundColor={`$${themePrefix}SlotEmptyBackground`}
      borderWidth={1}
      borderStyle={borderStyle}
      borderColor={`$${themePrefix}SlotEmptyBorder`}
      alignSelf="center"
      justifyContent="center"
      alignItems="center"
      minHeight={minHeight}
    >
      {text ? (
        <Text fontSize={10} fontWeight="700" color={`$${themePrefix}SlotEmptyText`} letterSpacing={0.6}>
          {text}
        </Text>
      ) : null}
    </YStack>
  );
}

function TutorScheduleEmptySlot({ themePrefix }: { themePrefix: string }) {
  const slotEmptyBackground = `$${themePrefix}SlotEmptyBackground`;
  const slotEmptyBorder = `$${themePrefix}SlotEmptyBorder`;

  return (
    <YStack
      width="100%"
      height="auto"
      maxWidth={110}
      maxHeight={60}
      borderRadius={12}
      backgroundColor={slotEmptyBackground}
      borderWidth={1}
      borderColor={slotEmptyBorder}
      alignSelf="center"
      minHeight={56}
    />
  );
}

function MyLessonsPresetHeader({
  title,
  weekLabel,
  monthLabel,
  showMonthNav = true,
  isCompact,
}: {
  title: string;
  weekLabel: string;
  monthLabel: string;
  showMonthNav?: boolean;
  isCompact: boolean;
}) {
  return (
    <XStack justifyContent="space-between" alignItems="center" gap="$3" flexWrap="wrap">
      <XStack alignItems="center" gap="$2.5">
        <Text
          color="$myLessonsCalendarTitle"
          fontSize={isCompact ? 32 : 40}
          fontWeight="700"
          lineHeight={isCompact ? 34 : 42}
        >
          {title}
        </Text>

        {showMonthNav && (
          <XStack alignItems="center" gap="$2">
            <Text color="$myLessonsMonthNav" fontSize={18}>
              {'<'}
            </Text>
            <Text color="$myLessonsMonthNav" fontSize={18}>
              {'>'}
            </Text>
          </XStack>
        )}
      </XStack>

      <XStack
        backgroundColor="$myLessonsSwitcherBackground"
        borderWidth={1}
        borderColor="$myLessonsSwitcherBorder"
        borderRadius={999}
        padding={4}
        gap={4}
      >
        <YStack
          backgroundColor="$myLessonsSwitcherActiveBackground"
          borderRadius={999}
          paddingHorizontal="$3"
          paddingVertical="$1.5"
        >
          <Text color="$myLessonsSwitcherActiveText" fontSize={12} fontWeight="600">
            {weekLabel}
          </Text>
        </YStack>
        <YStack paddingHorizontal="$3" paddingVertical="$1.5" borderRadius={999}>
          <Text color="$myLessonsSwitcherInactiveText" fontSize={12} fontWeight="600">
            {monthLabel}
          </Text>
        </YStack>
      </XStack>
    </XStack>
  );
}

function MyLessonsPresetFooter({ legendItems, companyLabel }: { legendItems: CalendarLegendItem[]; companyLabel?: string }) {
  return (
    <XStack
      paddingTop="$2"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap="$3"
      paddingHorizontal="$1"
    >
      <XStack gap="$3" flexWrap="wrap">
        {legendItems.map((item) => (
          <XStack key={item.key} alignItems="center" gap="$2">
            <YStack width={9} height={9} borderRadius={999} backgroundColor={item.color} />
            <Text color="$myLessonsLegendText" fontSize={12}>
              {item.label}
            </Text>
          </XStack>
        ))}
      </XStack>

      {companyLabel ? (
        <Text color="$myLessonsFooterText" fontSize={12}>
          {companyLabel}
        </Text>
      ) : null}
    </XStack>
  );
}

function MySchedulePresetHeader({
  title,
  weekLabel,
  monthLabel,
}: {
  title: string;
  weekLabel: string;
  monthLabel: string;
}) {
  return (
    <XStack justifyContent="space-between" alignItems="center" paddingHorizontal="$2">
      <Text fontSize={18} fontWeight="700" color="$myScheduleHeaderTitle">
        {title}
      </Text>
      <XStack gap="$2">
        <Button size="$3" variant="outlined">
          {weekLabel}
        </Button>
        <Button size="$3" variant="outlined">
          {monthLabel}
        </Button>
      </XStack>
    </XStack>
  );
}

function MySchedulePresetFooter({ legendItems }: { legendItems: CalendarLegendItem[] }) {
  return (
    <XStack marginTop="$3" gap="$3" flexWrap="wrap" paddingHorizontal="$1">
      {legendItems.map((item) => (
        <XStack key={item.key} alignItems="center" gap="$2">
          <YStack width={9} height={9} borderRadius={999} backgroundColor={item.color} />
          <Text color="$myScheduleLegendText" fontSize={12}>
            {item.label}
          </Text>
        </XStack>
      ))}
    </XStack>
  );
}

function TutorSchedulePresetHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <YStack gap="$3">
      <Text color="$tutorScheduleCalendarTitle" fontSize={20} fontWeight="800">
        {title}
      </Text>
      {subtitle ? <Text color="$tutorScheduleCalendarSubtitle">{subtitle}</Text> : null}
    </YStack>
  );
}

function BookingPresetHeader({
  title,
  subtitle,
  primaryDurationLabel,
  secondaryDurationLabel,
}: {
  title: string;
  subtitle?: string;
  primaryDurationLabel?: string;
  secondaryDurationLabel?: string;
}) {
  return (
    <YStack gap="$3">
      <XStack justifyContent="space-between" alignItems="center" gap="$3" flexWrap="wrap">
        <Text color="$myLessonsCalendarTitle" fontSize={42} fontWeight="700" lineHeight={44}>
          {title}
        </Text>
        {(primaryDurationLabel || secondaryDurationLabel) ? (
          <XStack
            backgroundColor="$myLessonsSwitcherBackground"
            borderWidth={1}
            borderColor="$myLessonsSwitcherBorder"
            borderRadius={999}
            padding={4}
            gap={4}
          >
            {primaryDurationLabel ? (
              <YStack
                backgroundColor="$myLessonsSwitcherActiveBackground"
                borderRadius={999}
                paddingHorizontal="$3"
                paddingVertical="$1.5"
              >
                <Text color="$myLessonsSwitcherActiveText" fontSize={12} fontWeight="700">
                  {primaryDurationLabel}
                </Text>
              </YStack>
            ) : null}
            {secondaryDurationLabel ? (
              <YStack paddingHorizontal="$3" paddingVertical="$1.5" borderRadius={999}>
                <Text color="$myLessonsSwitcherInactiveText" fontSize={12} fontWeight="700">
                  {secondaryDurationLabel}
                </Text>
              </YStack>
            ) : null}
          </XStack>
        ) : null}
      </XStack>
      {subtitle ? <Text color="$myLessonsLegendText" fontSize={14}>{subtitle}</Text> : null}
    </YStack>
  );
}

const CALENDAR_CARD_PRESET_RENDERERS: Partial<
  Record<CalendarType, (context: CalendarCardPresetRenderContext) => CalendarCardPresetRenderResult>
> = {
  myLessons: ({ data, isCompact }) => ({
    header: data.title
      ? (
          <MyLessonsPresetHeader
            title={data.title}
            weekLabel={data.weekLabel ?? 'Week'}
            monthLabel={data.monthLabel ?? 'Month'}
            showMonthNav={data.showMonthNav}
            isCompact={isCompact}
          />
        )
      : undefined,
    footer: <MyLessonsPresetFooter legendItems={data.legendItems ?? []} companyLabel={data.companyLabel} />,
  }),
  mySchedule: ({ data }) => ({
    header: data.title
      ? <MySchedulePresetHeader title={data.title} weekLabel={data.weekLabel ?? 'Week'} monthLabel={data.monthLabel ?? 'Month'} />
      : undefined,
    footer: data.legendItems?.length ? <MySchedulePresetFooter legendItems={data.legendItems} /> : undefined,
  }),
  tutorSchedule: ({ data }) => ({
    header: data.title ? <TutorSchedulePresetHeader title={data.title} subtitle={data.subtitle} /> : undefined,
  }),
  booking: ({ data }) => ({
    header: data.title
      ? (
          <BookingPresetHeader
            title={data.title}
            subtitle={data.subtitle}
            primaryDurationLabel={data.primaryDurationLabel}
            secondaryDurationLabel={data.secondaryDurationLabel}
          />
        )
      : undefined,
  }),
};

export function CalendarCard<TEvent = unknown>({
  header,
  footer,
  presetData,
  type,
  themePrefix = 'calendar',
  renderSlot,
  ...calendarProps
}: CalendarCardProps<TEvent>) {
  const resolvedThemePrefix = (type ?? themePrefix) as CalendarType | string;
  const isCompact = Boolean(calendarProps.isCompact);
  const themeConfig = CALENDAR_THEME_CONFIG[resolvedThemePrefix] || DEFAULT_THEME_CONFIG;
  const {
    cardBorder = true,
    cardBorderRadius = 16,
    cardPadding = 16,
    showEmptySlots = false,
    emptySlotText,
    emptySlotStyle = 'text',
    emptySlotBorderStyle = 'solid',
    emptySlotMaxWidth,
    emptySlotMinHeight,
    emptySlotBorderRadius,
  } = themeConfig;

  const defaultRenderSlot = showEmptySlots
    ? resolvedThemePrefix === 'tutorSchedule'
      ? () => <TutorScheduleEmptySlot themePrefix={resolvedThemePrefix} />
      : resolvedThemePrefix === 'mySchedule' || emptySlotStyle === 'outlinedCard'
        ? () => (
            <MyScheduleEmptySlot
              themePrefix={resolvedThemePrefix}
              text={emptySlotText}
              maxWidth={emptySlotMaxWidth}
              minHeight={emptySlotMinHeight}
              borderRadius={emptySlotBorderRadius}
              borderStyle={emptySlotBorderStyle}
            />
          )
        : () => <DefaultEmptySlot text={emptySlotText} />
    : undefined;

  const finalRenderSlot = renderSlot || defaultRenderSlot;
  const presetRenderer = CALENDAR_CARD_PRESET_RENDERERS[resolvedThemePrefix as CalendarType];
  const presetResult = !header && !footer && presetData && presetRenderer
    ? presetRenderer({ data: presetData, isCompact })
    : undefined;

  return (
    <YStack
      width="100%"
      borderWidth={cardBorder ? 1 : 0}
      borderColor={cardBorder ? `$${resolvedThemePrefix}CardBorder` : 'transparent'}
      borderRadius={cardBorderRadius}
      backgroundColor={`$${resolvedThemePrefix}CardBackground`}
      padding={cardPadding}
      gap="$3"
    >
      {header ?? presetResult?.header}
      
      <Calendar
        {...calendarProps}
        type={type}
        themePrefix={resolvedThemePrefix}
        renderSlot={finalRenderSlot}
      />

      {footer ?? presetResult?.footer}
    </YStack>
  );
}
