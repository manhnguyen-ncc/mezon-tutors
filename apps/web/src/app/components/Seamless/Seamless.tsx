'use client';

import { useTranslations } from 'next-intl';
import { Text, YStack, XStack, useMedia } from '@mezon-tutors/app/ui';
import { HOME_SEAMLESS_FEATURES } from '@mezon-tutors/shared';

export default function Seamless() {
  const t = useTranslations('Home.Seamless');
  const media = useMedia();
  const isCompact = media.md || media.sm || media.xs;

  return (
    <YStack
      paddingVertical={isCompact ? 72 : 120}
      paddingHorizontal={isCompact ? 20 : 84}
      backgroundColor="$homeSeamlessBackground"
      alignItems="center"
      style={{
        backgroundImage: 'var(--home-seamless-backdrop-gradient)',
      }}
    >
      <YStack
        maxWidth={680}
        alignItems="center"
        marginBottom={54}
        style={{
          animation: 'homeRevealUp 620ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <Text
          fontSize={isCompact ? 34 : 44}
          lineHeight={isCompact ? 42 : 54}
          fontWeight="800"
          color="$homeSectionTitle"
          textAlign="center"
          style={{ letterSpacing: '-0.6px' }}
        >
          {t('title')}
        </Text>
        <Text fontSize={16} lineHeight={27} color="$homeSectionBody" marginTop="$3.5" textAlign="center">
          {t('description')}
        </Text>
      </YStack>

      <XStack
        gap="$homeSeamlessCardGap"
        flexWrap="wrap"
        maxWidth={1180}
        style={{
          display: 'grid',
          gridTemplateColumns: isCompact ? '1fr' : 'repeat(2, 1fr)',
        }}
      >
        {HOME_SEAMLESS_FEATURES.map((feature) => (
          <XStack
            className="home-glow-card home-feature-card"
            key={feature.id}
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
              <img src={`/icons/${feature.iconKey}.svg`} alt={t(feature.titleKey)} width={24} height={24} />
            </YStack>

            <YStack flex={1}>
              <Text fontSize={19} lineHeight={27} fontWeight="700" color="$homeSectionTitle" marginBottom="$2">
                {t(feature.titleKey)}
              </Text>
              <Text fontSize={14} lineHeight={22} color="$homeSectionBody">
                {t(feature.descriptionKey)}
              </Text>
            </YStack>
          </XStack>
        ))}
      </XStack>
    </YStack>
  );
}
