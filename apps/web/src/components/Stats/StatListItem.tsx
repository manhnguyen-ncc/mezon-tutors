import { XStack, Text } from 'tamagui';

export interface StatListItemProps {
  text: string;
}

export default function StatListItem({ text }: StatListItemProps) {
  return (
    <XStack alignItems="center" gap={12}>
      <img src="/icons/iccheck.svg" alt="check" style={{ width: 22, height: 22 }} />
      <Text color="white" fontSize={15} fontWeight="600">{text}</Text>
    </XStack>
  );
}