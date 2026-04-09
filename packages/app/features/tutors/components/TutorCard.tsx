import { ABOUT_PROFICIENCY_LEVELS, ROUTES, VerifiedTutorProfileDto } from '@mezon-tutors/shared'
import { Button, Card, Chip, ChipText, Paragraph, Text, XStack, YStack } from '@mezon-tutors/app/ui'
import {
  GraduationCapIcon,
  LanguageIcon,
  StarOutlineIcon,
  WorldIcon,
} from '@mezon-tutors/app/ui/icons'
import {
  TrialBookingModal,
  TrialBookingPayload,
} from '@mezon-tutors/app/features/tutors/components/TrialBookingModal'
import { useCreateTrialLessonBookingMutation } from '@mezon-tutors/app/services'
import { useAppToast } from '@mezon-tutors/app/hooks/useAppToast'
import { H2, Image, Separator, useMedia, useTheme } from 'tamagui'
import { useTranslations } from 'next-intl'
import { useRouter } from 'solito/navigation'
import { useState } from 'react'

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <Chip size="md" tone="default" variant="solid" borderRadius={10}>
      <ChipText size="md" tone="default">
        {children}
      </ChipText>
    </Chip>
  )
}

export function TutorCard({
  tutor,
  onHover,
  isActive,
}: {
  tutor: VerifiedTutorProfileDto
  onHover?: (tutor: VerifiedTutorProfileDto, el: HTMLElement) => void
  isActive?: boolean
}) {
  const t = useTranslations('Tutors.TutorCard')
  const media = useMedia()
  const theme = useTheme()
  const router = useRouter()
  const toast = useAppToast()
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false)
  const createTrialLessonBookingMutation = useCreateTrialLessonBookingMutation()

  const isVertical = media.sm
  const mutedColor = theme.colorMuted?.get() ?? theme.appTextMuted?.get() ?? '#6B7280'

  const proficiencyTags = Array.from(
    new Set(tutor.languages.map((language) => language.proficiency).filter(Boolean))
  )

  const handleCardClick = () => {
    router.push(ROUTES.TUTOR.DETAIL(tutor.id))
  }

  const handleBookTrialClick = () => {
    setIsTrialModalOpen(true)
  }

  const handleConfirmBooking = async (payload: TrialBookingPayload) => {
    try {
      await createTrialLessonBookingMutation.mutateAsync({
        tutorId: tutor.id,
        startAt: payload.startAt,
        dayOfWeek: payload.dayOfWeek,
        durationMinutes: payload.duration,
      })
      toast.success('Booking confirmed', 'Your trial lesson has been created.')
      setIsTrialModalOpen(false)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create booking'
      toast.error('Booking failed', message)
    }
  }

  return (
    <>
      <Card
        cursor="pointer"
        borderColor={isActive ? '$appPrimary' : '$cardBorder'}
        borderWidth={2}
        maxWidth="100%"
        overflow="hidden"
        onPress={handleCardClick}
        onMouseEnter={(e) => onHover?.(tutor, e.currentTarget as unknown as HTMLElement)}
      >
        <XStack
          gap="$4"
          alignItems="flex-start"
          flexDirection={isVertical ? 'column' : 'row'}
          width="100%"
          minWidth={0}
        >
          <XStack gap="$4" minWidth={0} flexShrink={isVertical ? 1 : 0}>
            <Image
              src={tutor.avatar}
              width={isVertical ? 80 : 150}
              height={isVertical ? 80 : 150}
              objectFit="cover"
              aspectRatio={1}
              borderRadius={8}
              maxWidth="100%"
              flexShrink={0}
            />
            {isVertical && (
              <YStack alignItems="flex-start" gap="$2" flexWrap="wrap" flex={1} minWidth={0}>
                <H2 size="$5" fontWeight="700" maxWidth="100%">
                  {tutor.firstName} {tutor.lastName}
                </H2>
                {tutor.isProfessional && (
                  <Chip tone="primary">
                    <ChipText tone="primary">{t('professional')}</ChipText>
                  </Chip>
                )}
                <XStack alignItems="center" gap="$6" flexWrap="wrap" minWidth={0}>
                  <XStack alignItems="center" gap="$1" flexShrink={0}>
                    <StarOutlineIcon />
                    <Text size="xl" fontWeight="700" flexShrink={0}>
                      {tutor.ratingAverage.toFixed(2)}
                    </Text>
                    <Text variant="muted" flexShrink={0} whiteSpace="nowrap">
                      {t('reviews', { count: tutor.ratingCount })}
                    </Text>
                  </XStack>
                  <XStack alignItems="baseline" gap="$1">
                    <Text size="xl" fontWeight="700">
                      ${tutor.pricePerHour}
                    </Text>
                    <Text variant="muted">{t('perLesson')}</Text>
                  </XStack>
                </XStack>
              </YStack>
            )}
          </XStack>
          <YStack flex={1} gap="$4" minWidth={0} maxWidth="100%">
            {!isVertical && (
              <XStack alignItems="center" gap="$2" flexWrap="wrap" minWidth={0}>
                <H2 size="$5" fontWeight="700" maxWidth="100%">
                  {tutor.firstName} {tutor.lastName}
                </H2>
                {tutor.isProfessional && (
                  <Chip tone="primary">
                    <ChipText tone="primary">{t('professional')}</ChipText>
                  </Chip>
                )}
              </XStack>
            )}

            <XStack alignItems="center" gap="$6" flexWrap="wrap" minWidth={0}>
              <XStack alignItems="center" gap="$2" minWidth={0} flexShrink={1}>
                <YStack flexShrink={0}>
                  <GraduationCapIcon color={mutedColor} />
                </YStack>
                <Text variant="muted" flexShrink={1}>
                  {t('teaches', { subject: tutor.subject })}
                </Text>
              </XStack>
              <XStack alignItems="center" gap="$2" minWidth={0} flexShrink={1}>
                <YStack flexShrink={0}>
                  <WorldIcon color={mutedColor} />
                </YStack>
                <Text variant="muted" flexShrink={1}>
                  {t('country', { country: tutor.country })}
                </Text>
              </XStack>
            </XStack>
            <XStack alignItems="flex-start" gap="$2" minWidth={0}>
              <YStack flexShrink={0} paddingTop={2}>
                <LanguageIcon color={mutedColor} />
              </YStack>
              <Text variant="muted" flex={1} minWidth={0} style={{ wordBreak: 'break-word' }}>
                {t('speaks', {
                  languages: tutor.languages.map((language) => language.languageCode).join(', '),
                })}
              </Text>
            </XStack>
            <Paragraph numberOfLines={3} maxWidth="100%">
              {tutor.introduce}
            </Paragraph>

            <XStack gap="$2" flexWrap="wrap" minWidth={0}>
              {proficiencyTags.map((proficiency) => {
                const isKnownProficiency = (ABOUT_PROFICIENCY_LEVELS as readonly string[]).includes(
                  proficiency
                )

                return (
                  <Tag key={proficiency}>
                    {isKnownProficiency ? t(`proficiency.${proficiency}`) : proficiency}
                  </Tag>
                )
              })}
            </XStack>
          </YStack>

          {!isVertical && <Separator vertical height="100%" flexShrink={0} />}

          <YStack
            gap="$3"
            alignItems="flex-end"
            justifyContent="flex-start"
            minWidth={200}
            flexShrink={0}
            width={isVertical ? '100%' : undefined}
          >
            {!isVertical && (
              <>
                <XStack alignItems="center" gap="$1" flexShrink={0} justifyContent="flex-end">
                  <StarOutlineIcon />
                  <Text size="xl" fontWeight="700" flexShrink={0}>
                    {tutor.ratingAverage.toFixed(2)}
                  </Text>
                  <Text variant="muted" flexShrink={0} whiteSpace="nowrap">
                    {t('reviews', { count: tutor.ratingCount })}
                  </Text>
                </XStack>
                <XStack alignItems="baseline" gap="$1" justifyContent="flex-end">
                  <Text size="xl" fontWeight="700">
                    ${tutor.pricePerHour}
                  </Text>
                  <Text variant="muted">{t('perLesson')}</Text>
                </XStack>
              </>
            )}

            <YStack gap="$3" width="100%" minWidth={200}>
              <Button
                variant="primary"
                width="100%"
                onPress={(e) => {
                  e.stopPropagation()
                  handleBookTrialClick()
                }}
              >
                {t('bookTrial')}
              </Button>
              <Button variant="outline" width="100%" size="sm">
                {t('sendMessage')}
              </Button>
            </YStack>
          </YStack>
        </XStack>
      </Card>

      <TrialBookingModal
        open={isTrialModalOpen}
        onOpenChange={setIsTrialModalOpen}
        tutor={{
          id: tutor.id,
          name: `${tutor.firstName} ${tutor.lastName}`,
          title: tutor.subject,
          pricePerHour: tutor.pricePerHour,
          avatar: tutor.avatar,
        }}
        onConfirm={handleConfirmBooking}
      />
    </>
  )
}
