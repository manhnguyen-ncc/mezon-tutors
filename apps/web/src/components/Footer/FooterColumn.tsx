import { YStack, Text, Anchor } from 'tamagui';

export interface FooterColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

export default function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <YStack gap={20} minWidth={120}>
      <Text color="white" fontWeight="700" fontSize={15}>{title}</Text>
      <YStack gap={16}>
        {links.map((link, index) => (
          <Anchor key={index} href={link.href} textDecorationLine="none">
            <Text color="#94a3b8" fontSize={14} hoverStyle={{ color: 'white' }}>{link.label}</Text>
          </Anchor>
        ))}
      </YStack>
    </YStack>
  );
}