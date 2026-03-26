import { XStack, YStack, Text, Paragraph } from 'tamagui';

export interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
  isFeatured?: boolean;
  iconSize?: string; 
}

export default function FeatureCard({ icon, title, desc, isFeatured = false, iconSize = "50%" }: FeatureCardProps) {
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