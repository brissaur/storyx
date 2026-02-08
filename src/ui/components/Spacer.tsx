import React from 'react';
import { View } from 'react-native';
import { spacing, SpacingKey } from '@/ui/theme/spacing';

type SpacerProps = {
  size?: SpacingKey;
};

export function Spacer({ size = 'md' }: SpacerProps) {
  return <View style={{ height: spacing[size] }} />;
}
