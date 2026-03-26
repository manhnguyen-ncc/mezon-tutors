'use client';
import { useTranslation } from 'react-i18next';
import { XStack, YStack, Text, Button, Paragraph } from 'tamagui';
import StatListItem from './StatListItem';

export default function Stats() {
  const { t } = useTranslation();
  
  const STAT_BENEFITS = [
    { id: 'benefit-1', text: t('stats.benefit1', 'Get paid after every lesson') },
    { id: 'benefit-2', text: t('stats.benefit2', '4.0 teaching tools support') },
    { id: 'benefit-3', text: t('stats.benefit3', '100% flexible schedule') },
  ];

  return (
    <XStack
      tag="section"
      backgroundColor="#081124"
      paddingVertical={80}
      paddingHorizontal={20}
      gap={40}
      flexDirection="column"
      $gtSm={{ paddingHorizontal: 40 }}
      $gtLg={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingVertical: 120, 
        paddingHorizontal: 120, 
        gap: 80 
      }}
    >
      <YStack position="relative" width="100%" $gtLg={{ flex: 1, maxWidth: '50%' }}>
        <img 
          src="/teach.jpg" 
          alt="Teaching" 
          style={{ 
            width: '100%', 
            aspectRatio: '1 / 1', 
            objectFit: 'cover', 
            borderRadius: '24px' 
          }} 
        />
        
        <YStack 
          position="absolute" 
          top={24} 
          left={24} 
          paddingVertical={14} 
          paddingHorizontal={24} 
          borderRadius={16} 
          backgroundColor="rgba(255, 255, 255, 0.15)" 
          borderWidth={1}
          borderColor="rgba(255, 255, 255, 0.2)"
          style={{ backdropFilter: 'blur(12px)' }} 
        >
          <Text color="#2563eb" fontSize={24} fontWeight="900" marginBottom={4}>
            +15M VNĐ
          </Text>
          <Text color="#94a3b8" fontSize={11} fontWeight="700" letterSpacing={1}>
            {t('stats.income_label', 'AVERAGE INCOME / MONTH')}
          </Text>
        </YStack>
      </YStack>

      {/* RIGHT: TEXT CONTENT */}
      <YStack width="100%" $gtLg={{ flex: 1, maxWidth: 520 }}>
        <YStack>
          <Text color="white" fontSize={36} lineHeight={46} fontWeight="800" $gtSm={{ fontSize: 42, lineHeight: 52 }} $gtLg={{ fontSize: 48, lineHeight: 58 }}>
            {t('stats.title_part1', 'Become a tutor and')}
          </Text>
          <Text color="#2563eb" fontSize={36} lineHeight={46} fontWeight="800" $gtSm={{ fontSize: 42, lineHeight: 52 }} $gtLg={{ fontSize: 48, lineHeight: 58 }}>
            {t('stats.title_part2', 'increase your income')}
          </Text>
        </YStack>

        <Paragraph marginTop={20} color="#94a3b8" fontSize={15} lineHeight={26}>
          {t('stats.description', 'For students and professionals with high language proficiency. Share knowledge, manage your time, and build a personal brand in our knowledge community.')}
        </Paragraph>

        <YStack marginTop={30} gap={16}>
          {STAT_BENEFITS.map((benefit) => (
            <StatListItem key={benefit.id} text={benefit.text} />
          ))}
        </YStack>

        <Button 
          marginTop={40} 
          backgroundColor="white" 
          color="#0f172a" 
          paddingHorizontal={32} 
          height={54} 
          borderRadius={999} 
          borderWidth={0} 
          fontWeight="700" 
          fontSize={16}
          hoverStyle={{ backgroundColor: '#f1f5f9', scale: 1.02 }} 
          pressStyle={{ scale: 0.98 }} 
          alignSelf="flex-start"
        >
          {t('stats.cta', 'Register to teach')}
        </Button>
      </YStack>
    </XStack>
  );
}