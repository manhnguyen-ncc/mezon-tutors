'use client';
import { useTranslation } from 'react-i18next';
import { XStack, YStack, Text, H2, Paragraph } from 'tamagui';

export default function Seamless() {
  const { t } = useTranslation();

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
        maxWidth={1200} // Ép chiều rộng tối đa để không bị bè quá
        flexWrap="wrap" 
        justifyContent="center" // Căn giữa 2 card
        gap={20} 
        $gtSm={{ gap: 24 }} 
        $gtLg={{ gap: 40 }}
      >
        <SeamlessCard 
          icon="/icons/ic1seamless.svg" 
          title={t('seamless.card1_title', 'Virtual Classroom')} 
          desc={t('seamless.card1_desc', 'High-quality video calls, screen sharing, and interactive whiteboards directly in your browser.')} 
        />
        <SeamlessCard 
          icon="/icons/ic2seamless.svg" 
          title={t('seamless.card2_title', 'Virtual Classroom')} 
          desc={t('seamless.card2_desc', 'High-quality video calls, screen sharing, and interactive whiteboards directly in your browser.')} 
        />
      </XStack>
    </YStack>
  );
}

function SeamlessCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <XStack
      flexBasis={"100%" as any} // Mobile thì 1 cột
      padding={24}
      borderRadius={16}
      gap={20}
      alignItems="flex-start" // Icon và Text bằng đầu nhau
      borderWidth={1}
      borderColor="rgba(255, 255, 255, 0.08)"
      style={{ background: 'linear-gradient(145deg, #0b1628, #111c3b)' }}
      
      // FIX LỖI XẾP DỌC: Ép width chính xác là 50% trừ đi khoảng cách gap
      $gtSm={{ 
        flexBasis: 'calc(50% - 12px)' as any,
        padding: 30 
      }}
      $gtLg={{ 
        flexBasis: 'calc(50% - 20px)' as any, 
        padding: 40, 
        borderRadius: 20 
      }}
    >
      <XStack 
        minWidth={48} height={48} 
        backgroundColor="rgba(37, 99, 235, 0.15)" 
        borderRadius={12} // Design gốc góc bo nhẹ chứ không phải tròn xoe
        alignItems="center" justifyContent="center" 
        $gtLg={{ minWidth: 56, height: 56, borderRadius: 16 }}
      >
        <img src={icon} alt={title} style={{ width: '50%', height: '50%', objectFit: 'contain' }} />
      </XStack>

      <YStack flex={1}>
        <Text color="white" fontSize={18} fontWeight="700" marginBottom={8} $gtLg={{ fontSize: 22 }}>{title}</Text>
        <Paragraph color="#94a3b8" fontSize={14} lineHeight={24} $gtLg={{ fontSize: 16, lineHeight: 26 }}>{desc}</Paragraph>
      </YStack>
    </XStack>
  );
}