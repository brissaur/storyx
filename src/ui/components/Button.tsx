import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Typography } from './Typography';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';
import { borders } from '@/ui/theme/borders';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = Omit<PressableProps, 'style'> & {
  title: string;
  variant?: ButtonVariant;
  style?: ViewStyle;
};

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.accent,
  },
  secondary: {
    backgroundColor: colors.surfaceLight,
    borderWidth: borders.width.thin,
    borderColor: colors.accent,
  },
  ghost: {
    backgroundColor: colors.transparent,
  },
};

export function Button({
  title,
  variant = 'primary',
  style,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        pressed && styles.pressed,
        style,
      ]}
      {...props}
    >
      <Typography
        variant="bodyBold"
        color={variant === 'ghost' ? colors.accent : colors.white}
        align="center"
      >
        {title}
      </Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borders.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});
