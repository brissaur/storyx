import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { colors } from '@/ui/theme/colors';
import { typography, TypographyVariant } from '@/ui/theme/typography';

type TypographyProps = TextProps & {
  variant?: TypographyVariant;
  color?: string;
  align?: TextStyle['textAlign'];
};

export function Typography({
  variant = 'body',
  color = colors.textPrimary,
  align,
  style,
  ...props
}: TypographyProps) {
  return (
    <Text
      style={[typography[variant], { color, textAlign: align }, style]}
      {...props}
    />
  );
}
