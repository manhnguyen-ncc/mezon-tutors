import { Input, Label, YStack } from 'tamagui';
import { Text } from './Text';

export type FieldProps = {
  label: string;
  placeholder?: string;
  helperText?: string;
  flex?: number;
  id?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  error?: string;
};

export function Field({
  label,
  placeholder,
  helperText,
  flex,
  id,
  value,
  onChangeText,
  error,
}: FieldProps) {
  const inputId = id ?? label;
  return (
    <YStack gap="$2" flex={flex}>
      <Label htmlFor={inputId} color="$colorMuted" fontSize={13}>
        {label}
      </Label>
      <Input
        id={inputId}
        placeholder={placeholder}
        placeholderTextColor="$colorMuted"
        backgroundColor="$fieldBackground"
        borderColor={error ? '$red9' : '$borderSubtle'}
        color="$color"
        paddingHorizontal="$4"
        height={48}
        borderRadius="$5"
        value={value}
        onChangeText={onChangeText}
      />
      {error ? (
        <Text size="sm" color="$red10">
          {error}
        </Text>
      ) : helperText ? (
        <Text size="sm" variant="muted">
          {helperText}
        </Text>
      ) : null}
    </YStack>
  );
}
