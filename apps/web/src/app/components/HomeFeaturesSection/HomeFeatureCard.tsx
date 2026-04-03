'use client';

import { useTranslations } from 'next-intl';
import { Text, YStack } from '@mezon-tutors/app/ui';

export type HomeFeatureCardItem = {
  id: string;
  iconKey: string;
  titleKey: string;
  descriptionKey: string;
};

type HomeFeatureCardProps = {
  feature: HomeFeatureCardItem;
  isCompact?: boolean;
};

export default function HomeFeatureCard({ feature, isCompact = false }: HomeFeatureCardProps) {
  const t = useTranslations('Home.Features');

  return (
    <YStack
      className="home-glow-card home-feature-card"
      padding={isCompact ? '$homeFeatureCardPaddingCompact' : '$homeFeatureCardPadding'}
      borderRadius="$homeFeatureCard"
      borderWidth={1}
      borderColor="$homeFeatureCardBorder"
      backgroundColor="$homeFeatureCardBackground"
      width="100%"
      style={{
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <YStack
        width="$homeFeatureIcon"
        height="$homeFeatureIcon"
        alignItems="center"
        justifyContent="center"
        marginBottom="$homeFeatureIconMargin"
        className="feature-icon-wrapper"
      >
        <img
          className="home-feature-icon"
          src={`/icons/${feature.iconKey}.svg`}
          alt={t(feature.titleKey as never)}
          width={96}
          height={96}
        />
      </YStack>

      <YStack flex={1} width="100%">
        <Text fontSize={22} lineHeight={30} fontWeight="700" marginBottom="$2.5" color="$homeSectionTitle">
          {t(feature.titleKey as never)}
        </Text>
        <Text fontSize={16} lineHeight={25} color="$homeSectionBody">
          {t(feature.descriptionKey as never)}
        </Text>
      </YStack>
    </YStack>
  );
}
