'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button, Container, Paragraph, Screen, Text, XStack, YStack, ScrollView, InputField } from '@mezon-tutors/app/ui';
import { ShieldCheckIcon } from '@mezon-tutors/app/ui/icons/ShieldCheckIcon';
import { TutorProfileProgress } from './components/tutor-profile-progress';
import {
  tutorProfileAboutAtom,
  markStepCompletedAtom,
} from '@mezon-tutors/app/store/tutor-profile.atom';
import { tutorProfileLastSavedAtAtom } from '@mezon-tutors/app/store/tutor-profile.atom';
import { ArrowRightIcon } from '@mezon-tutors/app/ui/icons';
import { TutorProfileHeader } from './components/tutor-profile-header';
import { z } from 'zod';

const CURRENT_STEP = 1;
const PROGRESS_PERCENT = (CURRENT_STEP - 1) * 20;

const aboutSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  country: z.string().min(1, 'Country is required'),
  phone: z.string().min(1, 'Phone is required'),
  subject: z.string().min(1, 'Subject is required'),
  languages: z.string().min(1, 'Languages are required'),
  proficiency: z.string().min(1, 'Proficiency is required'),
});

type AboutFormValues = z.infer<typeof aboutSchema>;

function formatLastSavedTime(iso: string) {
  try {
    return new Date(iso).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export function TutorProfileAboutScreen() {
  const t = useTranslations('TutorProfile.About');
  const router = useRouter();
  const [about, setAbout] = useAtom(tutorProfileAboutAtom);
  const [, markStepCompleted] = useAtom(markStepCompletedAtom);
  const lastSavedAt = useAtomValue(tutorProfileLastSavedAtAtom);
  const setLastSavedAt = useSetAtom(tutorProfileLastSavedAtAtom);

  const draftSavedLabel =
    lastSavedAt && formatLastSavedTime(lastSavedAt)
      ? t('draftSaved', { time: formatLastSavedTime(lastSavedAt) })
      : '';

  const form = useForm<AboutFormValues>({
    defaultValues: about,
    resolver: zodResolver(aboutSchema),
    mode: 'onChange',
  });

  const { control, handleSubmit } = form;

  const onSubmit = (values: AboutFormValues) => {
    setAbout(values);
    setLastSavedAt(new Date().toISOString());
    markStepCompleted(CURRENT_STEP);
    router.push('/become-tutor/photo');
  };

  return (
    <Screen backgroundColor="$background">
      <ScrollView
        flex={1}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <YStack
          flex={1}
          paddingVertical="$5"
          backgroundColor="$background"
        >
          <Container padded maxWidth={960} width="100%" gap="$5">
            <TutorProfileHeader draftSavedLabel={draftSavedLabel} saveExitLabel={t('saveExit')} />

            <TutorProfileProgress
              currentStepIndex={CURRENT_STEP}
              stepLabel={t('stepLabel')}
              rightLabel={t('progressPercentLabel', { percent: PROGRESS_PERCENT })}
              caption={t('nextLabel')}
            />

            <YStack
              backgroundColor="$backgroundCard"
              borderRadius="$10"
              padding="$6"
              gap="$5"
              borderWidth={1}
              borderColor="$borderSubtle"
            >
              <YStack gap="$2">
                <Paragraph
                  fontSize={24}
                  fontWeight="700"
                >
                  {t('title')}
                </Paragraph>
                <Text variant="muted">{t('subtitle')}</Text>
              </YStack>

              <YStack gap="$4">
                <XStack
                  gap="$4"
                  $xs={{
                    flexDirection: 'column',
                  }}
                >
                  <InputField
                    control={control}
                    name="firstName"
                    label={t('fields.firstNameLabel')}
                    placeholder={t('fields.firstNamePlaceholder')}
                    flex={1}
                  />
                  <InputField
                    control={control}
                    name="lastName"
                    label={t('fields.lastNameLabel')}
                    placeholder={t('fields.lastNamePlaceholder')}
                    flex={1}
                  />
                </XStack>

                <InputField
                  control={control}
                  name="email"
                  label={t('fields.emailLabel')}
                  placeholder={t('fields.emailPlaceholder')}
                />

                <XStack
                  gap="$4"
                  $xs={{
                    flexDirection: 'column',
                  }}
                >
                  <InputField
                    control={control}
                    name="country"
                    label={t('fields.countryLabel')}
                    placeholder={t('fields.countryPlaceholder')}
                    flex={1}
                  />
                  <InputField
                    control={control}
                    name="phone"
                    label={t('fields.phoneLabel')}
                    placeholder={t('fields.phonePlaceholder')}
                    flex={1}
                  />
                </XStack>

                <InputField
                  control={control}
                  name="subject"
                  label={t('fields.subjectLabel')}
                  placeholder={t('fields.subjectPlaceholder')}
                  helperText={t('fields.subjectHelper')}
                />

                <YStack gap="$3">
                  <XStack
                    gap="$4"
                    alignItems="flex-end"
                    $xs={{
                      flexDirection: 'column',
                      alignItems: 'stretch',
                    }}
                  >
                    <InputField
                      control={control}
                      name="languages"
                      label={t('fields.languagesLabel')}
                      placeholder={t('fields.languagesPlaceholder')}
                      flex={1}
                    />
                    <InputField
                      control={control}
                      name="proficiency"
                      label={t('fields.proficiencyLabel')}
                      placeholder={t('fields.proficiencyPlaceholder')}
                      flex={1}
                    />
                  </XStack>
                </YStack>
              </YStack>

              <XStack justifyContent="flex-end">
                <Button
                  variant="primary"
                  onPress={handleSubmit(onSubmit)}
                >
                  {t('continue')}
                  <ArrowRightIcon
                    size={15}
                    primary="rgba(17,82,212,0.2)"
                    color="#ffffff"
                  />
                </Button>
              </XStack>
            </YStack>

            <YStack
              backgroundColor="$backgroundCard"
              borderRadius="$10"
              padding="$4"
              borderWidth={1}
              borderColor="$borderSubtle"
            >
              <XStack
                alignItems="center"
                gap="$3"
              >
                <ShieldCheckIcon
                  size={60}
                  primary="rgba(17,82,212,0.2)"
                  color="rgba(17,82,212,1)"
                />
                <YStack
                  gap="$1"
                  flex={1}
                >
                  <Paragraph
                    fontWeight="600"
                    fontSize={16}
                  >
                    {t('privacyTitle')}
                  </Paragraph>
                  <Text variant="muted">{t('privacyDescription')}</Text>
                </YStack>
              </XStack>
            </YStack>
          </Container>
        </YStack>
      </ScrollView>
    </Screen>
  );
}
