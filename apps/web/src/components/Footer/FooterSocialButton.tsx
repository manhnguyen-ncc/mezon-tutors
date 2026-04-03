'use client';

import { YStack } from '@mezon-tutors/app/ui';
import { useTranslations } from 'next-intl';
import type { FooterSocialConfig } from '@mezon-tutors/shared';

type FooterSocialButtonProps = {
  social: FooterSocialConfig;
};

export default function FooterSocialButton({ social }: FooterSocialButtonProps) {
  const t = useTranslations('Common.Footer');

  return (
    <YStack
      width={40}
      height={40}
      alignItems="center"
      justifyContent="center"
      borderRadius={12}
      borderWidth={1}
      borderColor="$myLessonsTopNavBorder"
      backgroundColor="$myLessonsCardBackground"
      style={{ transition: 'all 280ms cubic-bezier(0.22,1,0.36,1)' }}
      hoverStyle={{ y: -2, borderColor: '$myLessonsPrimaryButton' }}
    >
      <img src={social.src} alt={t(social.altKey as never)} width={20} height={20} />
    </YStack>
  );
}
