import { XStack, YStack, Text, Paragraph } from 'tamagui';

export interface SeamlessCardProps {
  icon: string;
  title: string;
  desc: string;
}

export default function SeamlessCard({ icon, title, desc }: SeamlessCardProps) {
  return (
    <XStack
      flexBasis={"100%" as any} 
      padding={24}
      borderRadius={16}
      gap={20}
      alignItems="flex-start" 
      borderWidth={1}
      borderColor="rgba(255, 255, 255, 0.08)"
      style={{ background: 'linear-gradient(145deg, #0b1628, #111c3b)' }}
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
        borderRadius={12} 
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