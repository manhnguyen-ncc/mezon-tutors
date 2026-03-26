'use client';
import { useTranslation } from 'react-i18next';
import { XStack, YStack, Text, H2, Paragraph } from 'tamagui';
// IMPORT COMPONENT CON VÀO ĐÂY
import SeamlessCard from './SeamlessCard';

export default function Seamless() {
  const { t } = useTranslation();
  
  const SEAMLESS_DATA = [
    {
      id: 'seamless-1',
      icon: "/icons/ic1seamless.svg",
      titleKey: 'seamless.card1_title',
      titleDefault: 'Virtual Classroom',
      descKey: 'seamless.card1_desc',
      descDefault: 'High-quality video calls, screen sharing, and interactive whiteboards directly in your browser.'
    },
    {
      id: 'seamless-2',
      icon: "/icons/ic2seamless.svg",
      titleKey: 'seamless.card2_title',
      titleDefault: 'Virtual Classroom',
      descKey: 'seamless.card2_desc',
      descDefault: 'High-quality video calls, screen sharing, and interactive whiteboards directly in your browser.'
    }
  ];

  return (
    <YStack
      tag="section"
      paddingVertical={60}
      paddingHorizontal={20}
      backgroundColor="#081124"
      alignItems="center"
      $gtSm={{ paddingVertical: 80, paddingHorizontal: 40 }}
      $gtLg={{ paddingVertical: 120, paddingHorizontal: 80 }}
    >
      <YStack maxWidth={600} alignItems="center" marginBottom={40} $gtLg={{ marginBottom: 60 }}>
        <H2 color="white" fontSize={26} fontWeight="700" textAlign="center" $gtSm={{ fontSize: 32 }} $gtLg={{ fontSize: 42 }}>
          {t('seamless.title', 'Seamless experience on Mezon')}
        </H2>
        <Paragraph marginTop={12} color="#94a3b8" fontSize={14} lineHeight={24} textAlign="center" $gtLg={{ fontSize: 16, lineHeight: 26 }}>
          {t('seamless.description', 'TutorMatch integrates with Mezon to create a focused and connected learning space. No need to switch between too many apps.')}
        </Paragraph>
      </YStack>

      <XStack 
        width="100%" 
        maxWidth={1200} 
        flexWrap="wrap" 
        justifyContent="center" 
        gap={20} 
        $gtSm={{ gap: 24 }} 
        $gtLg={{ gap: 40 }}
      >
        {SEAMLESS_DATA.map((item) => (
          <SeamlessCard 
            key={item.id}
            icon={item.icon} 
            title={t(item.titleKey, item.titleDefault)} 
            desc={t(item.descKey, item.descDefault)} 
          />
        ))}
      </XStack>
    </YStack>
  );
}