import React from 'react';
import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/ui/theme/colors';
import { borders } from '@/ui/theme/borders';
import { shadows } from '@/ui/theme/shadows';
import { spacing } from '@/ui/theme/spacing';

type CardProps = PressableProps & {
  style?: ViewStyle;
  children: React.ReactNode;
};

export function Card({ style, children, ...props }: CardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
        style,
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borders.radius.lg,
    padding: spacing.md,
    ...shadows.md,
  },
  pressed: {
    opacity: 0.9,
  },
});
