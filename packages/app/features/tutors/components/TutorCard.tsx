import { ABOUT_PROFICIENCY_LEVELS, VerifiedTutorProfileDto } from '@mezon-tutors/shared'
import { Button, Card, Chip, ChipText, Paragraph, Text, XStack, YStack } from '@mezon-tutors/app/ui'
import {
  GraduationCapIcon,
  LanguageIcon,
  StarOutlineIcon,
  WorldIcon,
} from '@mezon-tutors/app/ui/icons'
import { H2, Image, Separator, useTheme } from 'tamagui'
import { useTranslations } from 'next-intl'

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
  onHover: (tutor: VerifiedTutorProfileDto, el: HTMLElement) => void
  isActive?: boolean
}) {
  const t = useTranslations('Tutors.TutorCard')
  const theme = useTheme()
  const mutedColor = theme.colorMuted?.get() ?? theme.appTextMuted?.get() ?? '#6B7280'

  const proficiencyTags = Array.from(
    new Set(tutor.languages.map((language) => language.proficiency).filter(Boolean)),
  )

  return (
    <Card
      cursor="pointer"
      borderColor={isActive ? '$appPrimary' : '$cardBorder'}
      borderWidth={2}
      onMouseEnter={(e) => onHover(tutor, e.currentTarget as unknown as HTMLElement)}
    >
      <XStack gap="$4" alignItems="flex-start">
        <YStack gap="$4" alignItems="center" justifyContent="center">
          <Image
            src={tutor.avatar}
            width={150}
            height={150}
            objectFit="cover"
            aspectRatio={1}
            borderRadius={8}
          />
        </YStack>
        <YStack flex={1} gap="$4">
          <XStack alignItems="center" gap="$2" flexWrap="wrap">
            <H2 size="$5" fontWeight="700">
              {tutor.firstName} {tutor.lastName}
            </H2>
            {tutor.isProfessional && (
              <Chip tone="primary">
                <ChipText tone="primary">{t('professional')}</ChipText>
              </Chip>
            )}
          </XStack>

          <XStack alignItems="center" gap="$6">
            <XStack alignItems="center" gap="$2">
              <GraduationCapIcon color={mutedColor} />
              <Text variant="muted">{t('teaches', { subject: tutor.subject })}</Text>
            </XStack>
            <XStack alignItems="center" gap="$2">
              <WorldIcon color={mutedColor} />
              <Text variant="muted">{t('country', { country: tutor.country })}</Text>
            </XStack>
          </XStack>
          <XStack alignItems="center" gap="$2">
            <LanguageIcon color={mutedColor} />
            <Text variant="muted">
              {t('speaks', {
                languages: tutor.languages.map((language) => language.languageCode).join(', '),
              })}
            </Text>
          </XStack>
          <Paragraph numberOfLines={3}>{tutor.introduce}</Paragraph>

          <XStack gap="$2" flexWrap="wrap">
            {proficiencyTags.map((proficiency) => {
              const isKnownProficiency = (ABOUT_PROFICIENCY_LEVELS as readonly string[]).includes(
                proficiency,
              )

              return (
                <Tag key={proficiency}>
                  {isKnownProficiency ? t(`proficiency.${proficiency}`) : proficiency}
                </Tag>
              )
            })}
          </XStack>
        </YStack>

        <Separator vertical height="100%" />

        <YStack gap="$3" alignItems="flex-start" minWidth="25%">
          <XStack alignItems="center" gap="$1">
            <StarOutlineIcon />
            <Text size="xl" fontWeight="700">
              {tutor.ratingAverage}
            </Text>
            <Text variant="muted">{t('reviews', { count: tutor.ratingCount })}</Text>
          </XStack>
          <XStack alignItems="baseline" gap="$1">
            <Text size="xl" fontWeight="700">
              ${tutor.pricePerHour}
            </Text>
            <Text variant="muted">{t('perLesson')}</Text>
          </XStack>

          <Button variant="primary" width="100%">
            {t('bookTrial')}
          </Button>
          <Button variant="outline" width="100%" size="sm">
            {t('sendMessage')}
          </Button>
        </YStack>
      </XStack>
    </Card>
  )
}
