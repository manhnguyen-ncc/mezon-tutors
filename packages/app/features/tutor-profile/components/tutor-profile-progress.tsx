'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Paragraph, Text, XStack, YStack } from '@mezon-tutors/app/ui';

type TutorProfileStep = {
  id: number;
  path: string;
};

const FLOW_STEPS: TutorProfileStep[] = [
  { id: 1, path: '/become-tutor' },
  { id: 2, path: '/become-tutor/photo' },
  { id: 3, path: '/become-tutor/certification' },
  { id: 4, path: '/become-tutor/video' },
  { id: 5, path: '/become-tutor/availability' },
];

type TutorProfileProgressProps = {
  currentStepIndex: number;
  stepLabel: string;
  rightLabel: string;
  caption?: string;
  percentOverride?: number;
};

export function TutorProfileProgress({
  currentStepIndex,
  stepLabel,
  rightLabel,
  caption,
  percentOverride,
}: TutorProfileProgressProps) {
  const tNav = useTranslations('TutorProfile.Navigation');
  const router = useRouter();

  const stepLabels = tNav.raw('steps') as string[];

  const safeCurrentStep =
    currentStepIndex < 1
      ? 1
      : currentStepIndex > FLOW_STEPS.length
        ? FLOW_STEPS.length
        : currentStepIndex;

  const autoPercent = (safeCurrentStep - 1) * 20;
  const progressPercent = typeof percentOverride === 'number' ? percentOverride : autoPercent;

  return (
    <YStack gap="$3">
      <XStack
        alignItems="center"
        justifyContent="space-between"
        gap="$3"
        $xs={{
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Paragraph
          size="$4"
          fontWeight="1000"
          letterSpacing={2}
          textTransform="uppercase"
          color="$appPrimary"
        >
          {stepLabel}
        </Paragraph>

        <Paragraph
          size="$2"
          fontWeight="500"
          color="$appPrimary"
        >
          {rightLabel}
        </Paragraph>
      </XStack>

      <YStack gap="$1">
        <YStack
          height={4}
          borderRadius={999}
          backgroundColor="$backgroundMuted"
          overflow="hidden"
        >
          <YStack
            height="100%"
            width={`${progressPercent}%`}
            backgroundColor="$appPrimary"
          />
        </YStack>
        {caption ? (
          <Text
            size="sm"
            variant="muted"
          >
            {caption}
          </Text>
        ) : null}
      </YStack>

      <YStack marginTop="$2">
        <YStack
          position="relative"
          paddingHorizontal="$2"
        >
          <YStack
            position="absolute"
            top={18}
            left={0}
            right={0}
            height={2}
            backgroundColor="$backgroundMuted"
          />

          <XStack
            justifyContent="space-between"
            alignItems="flex-start"
            gap="$3"
            flexWrap="nowrap"
          >
            {FLOW_STEPS.map((step, index) => {
              const isActive = step.id === safeCurrentStep;
              const isCompleted = step.id < safeCurrentStep;
              const canNavigateBack = step.id <= safeCurrentStep;

              const label = stepLabels[index] ?? '';

              const circleBg = isActive || isCompleted ? '$appPrimary' : '$backgroundMuted';
              const circleColor = isActive || isCompleted ? 'white' : '$colorMuted';

              return (
                <YStack
                  key={step.id}
                  alignItems="center"
                  gap="$1"
                  flex={1}
                >
                  <YStack
                    width={32}
                    height={32}
                    borderRadius={999}
                    backgroundColor={circleBg}
                    alignItems="center"
                    justifyContent="center"
                    borderWidth={1}
                    borderColor={isActive ? '$appPrimary' : '$borderSubtle'}
                    cursor={canNavigateBack ? 'pointer' : 'default'}
                    opacity={canNavigateBack ? 1 : 0.6}
                    onPress={() => {
                      if (!canNavigateBack) return;
                      router.push(step.path);
                    }}
                  >
                    <Text
                      size="sm"
                      color={circleColor}
                    >
                      {step.id}
                    </Text>
                  </YStack>
                  <Text
                    size="sm"
                    variant={isActive ? 'primary' : 'muted'}
                    textAlign="center"
                    numberOfLines={1}
                    fontWeight="700"
                  >
                    {label}
                  </Text>
                </YStack>
              );
            })}
          </XStack>
        </YStack>
      </YStack>
    </YStack>
  );
}
