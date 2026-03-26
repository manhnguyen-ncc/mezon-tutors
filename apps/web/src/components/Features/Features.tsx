'use client';
import { useTranslation } from 'react-i18next';
import { XStack, YStack, Text, H2, Paragraph } from 'tamagui';
import { ArrowRight } from 'lucide-react';
// GỌI THẰNG EM VÀO ĐÂY
import FeatureCard from './FeatureCard';

export default function Features() {
  const { t } = useTranslation();
  
  const FEATURES_LIST = [
    {
      id: 'ft-1',
      isFeatured: true,
      icon: "/icons/ft1.svg",
      titleKey: 'features.card1_title',
      titleDefault: 'Evening classes',
      descKey: 'features.card1_desc',
      descDefault: 'Make use of your time after work with tutors ready to accompany you until 11 PM.',
      iconSize: "95%"
    },
    {
      id: 'ft-2',
      isFeatured: false,
      icon: "/icons/ft2.svg",
      titleKey: 'features.card2_title',
      titleDefault: 'Flexible weekends',
      descKey: 'features.card2_desc',
      descDefault: 'No more worrying about work pressure, spend 2 weekend days to upgrade your communication skills.',
      iconSize: "45%"
    },
    {
      id: 'ft-3',
      isFeatured: false,
      icon: "/icons/ft3.svg",
      titleKey: 'features.card3_title',
      titleDefault: 'Learn via Mezon',
      descKey: 'features.card3_desc',
      descDefault: 'Chat, video call, and share materials smoothly on the familiar Mezon app.',
      iconSize: "85%"
    }
  ];

  return (
    <YStack
      tag="section"
      paddingVertical={80}
      paddingHorizontal={20}
      backgroundColor="#081124"
      $gtSm={{ paddingVertical: 80, paddingHorizontal: 40 }}
      $gtLg={{ paddingVertical: 100, paddingHorizontal: 120 }}
    >
      <XStack justifyContent="space-between" alignItems="flex-start" gap={20} marginBottom={50} flexWrap="wrap" $gtLg={{ flexWrap: 'nowrap', marginBottom: 70 }}>
        <YStack maxWidth={680}>
          <H2 color="white" fontSize={26} fontWeight="700" marginBottom={12} $gtSm={{ fontSize: 30 }} $gtLg={{ fontSize: 36 }}>
            {t('features.top_title', 'For busy learners')}
          </H2>
          <Paragraph fontSize={14} lineHeight={24} color="#9fb3c8" $gtLg={{ fontSize: 16, lineHeight: 28 }}>
            {t('features.top_desc', 'Our learning system is specifically designed to optimize the time of working professionals, helping you conquer foreign languages without affecting your career.')}
          </Paragraph>
        </YStack>

        <XStack tag="a" cursor="pointer" marginTop={8} alignItems="center" gap={4} hoverStyle={{ opacity: 0.8 }}>
          <Text color="#3b82f6" fontSize={14} fontWeight="600">{t('features.explore', 'Explore all features')}</Text>
          <ArrowRight size={16} color="#3b82f6" />
        </XStack>
      </XStack>

      <XStack flexWrap="wrap" gap={16} $gtSm={{ gap: 20 }} $gtLg={{ gap: 32 }}>
        {FEATURES_LIST.map((item) => (
          <FeatureCard 
            key={item.id}
            isFeatured={item.isFeatured}
            icon={item.icon}
            title={t(item.titleKey, item.titleDefault)}
            desc={t(item.descKey, item.descDefault)}
            iconSize={item.iconSize}
          />
        ))}
      </XStack>
    </YStack>
  );
}