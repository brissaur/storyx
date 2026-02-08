import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Typography } from './Typography';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';
import { borders } from '@/ui/theme/borders';

type GmBubbleProps = {
  text: string;
};

export function GmBubble({ text }: GmBubbleProps) {
  return (
    <Animated.View entering={FadeIn.duration(400)} style={styles.container}>
      <Typography variant="small" color={colors.accent} style={styles.label}>
        {'🎭 Game Master'}
      </Typography>
      <View style={styles.content}>
        <Typography variant="body" color={colors.textSecondary}>
          {text}
        </Typography>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceLight,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    borderRadius: borders.radius.md,
    padding: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
  },
  content: {
    flexDirection: 'row',
  },
});
