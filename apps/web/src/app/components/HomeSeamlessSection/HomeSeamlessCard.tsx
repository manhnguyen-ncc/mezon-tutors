'use client';

import { useTranslations } from 'next-intl';
import { Text, YStack, XStack } from '@mezon-tutors/app/ui';

type HomeSeamlessCardItem = {
  id: string;
  iconKey: string;
  titleKey: string;
  descriptionKey: string;
};

type HomeSeamlessCardProps = {
  feature: HomeSeamlessCardItem;
};

export default function HomeSeamlessCard({ feature }: HomeSeamlessCardProps) {
  const t = useTranslations('Home.Seamless');

  return (
    <XStack
      className="home-glow-card home-feature-card"
      gap="$homeSeamlessCardInnerGap"
      padding="$homeSeamlessCardPadding"
      borderRadius="$homeSeamlessCard"
      borderWidth={1}
      borderColor="$homeSeamlessBorder"
      backgroundColor="$homeSeamlessSurface"
    >
      <YStack
        width="$homeSeamlessIcon"
        height="$homeSeamlessIcon"
        borderRadius="$appPill"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
        backgroundColor="$homeSeamlessIconBackground"
        borderWidth={1}
        borderColor="$homeFeatureIconBorder"
      >
        <img src={`/icons/${feature.iconKey}.svg`} alt={t(feature.titleKey as never)} width={24} height={24} />
      </YStack>

      <YStack flex={1}>
        <Text fontSize={19} lineHeight={27} fontWeight="700" color="$homeSectionTitle" marginBottom="$2">
          {t(feature.titleKey as never)}
        </Text>
        <Text fontSize={14} lineHeight={22} color="$homeSectionBody">
          {t(feature.descriptionKey as never)}
        </Text>
      </YStack>
    </XStack>
  );
}
