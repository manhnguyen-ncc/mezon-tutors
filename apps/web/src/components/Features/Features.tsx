'use client';
import { useTranslation } from 'react-i18next';
// Đã bỏ Image của tamagui đi vì chúng ta dùng img thuần của HTML cho icon
import { XStack, YStack, Text, H2, Paragraph } from 'tamagui';
import { ArrowRight } from 'lucide-react';

export default function Features() {
  const { t } = useTranslation();

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
        <FeatureCard 
          isFeatured 
          icon="/icons/ft1.svg" 
          title={t('features.card1_title', 'Evening classes')} 
          desc={t('features.card1_desc', 'Make use of your time after work with tutors ready to accompany you until 11 PM.')} 
          iconSize="95%" // Đã tăng mập mạp lên 95%
        />
        <FeatureCard 
          icon="/icons/ft2.svg" 
          title={t('features.card2_title', 'Flexible weekends')} 
          desc={t('features.card2_desc', 'No more worrying about work pressure, spend 2 weekend days to upgrade your communication skills.')} 
          iconSize="45%" 
        />
        <FeatureCard 
          icon="/icons/ft3.svg" 
          title={t('features.card3_title', 'Learn via Mezon')} 
          desc={t('features.card3_desc', 'Chat, video call, and share materials smoothly on the familiar Mezon app.')} 
          iconSize="85%" // Đã tăng mập mạp lên 85%
        />
      </XStack>
    </YStack>
  );
}

// Bổ sung iconSize vào Interface
interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
  isFeatured?: boolean;
  iconSize?: string; 
}

function FeatureCard({ icon, title, desc, isFeatured = false, iconSize = "50%" }: FeatureCardProps) {
  return (
    <YStack
      flexBasis={"100%" as any}
      padding={22}
      borderRadius={16}
      borderWidth={1}
      borderColor="rgba(255, 255, 255, 0.08)"
      animation="quick"
      hoverStyle={{ y: -5, borderColor: 'rgba(59, 130, 246, 0.4)' }}
      style={{ background: 'linear-gradient(145deg, #0b1628, #111c3b)' }}
      $gtSm={{ 
        flexBasis: (isFeatured ? '100%' : 'calc(50% - 10px)') as any,
        padding: 26 
      }}
      $gtLg={{ 
        flexBasis: 'calc(33.33% - 22px)' as any,
        padding: 36, 
        borderRadius: 20 
      }}
    >
      <XStack 
        width={40} height={40} 
        backgroundColor="rgba(37, 99, 235, 0.15)" 
        borderRadius={999} 
        alignItems="center" justifyContent="center" 
        marginBottom={16} 
        $gtLg={{ width: 48, height: 48 }}
      >
        {/* Nhận iconSize từ cha truyền xuống để ép size */}
        <img 
          src={icon} 
          alt={title} 
          style={{ width: iconSize, height: iconSize, objectFit: 'contain' }} 
        />
      </XStack>

      <Text color="white" fontSize={16} fontWeight="600" marginBottom={8} $gtLg={{ fontSize: 20 }}>{title}</Text>
      <Paragraph fontSize={13} lineHeight={20} color="#9fb3c8" $gtLg={{ fontSize: 15, lineHeight: 24 }}>{desc}</Paragraph>
    </YStack>
  );
}