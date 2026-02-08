import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Typography } from './Typography';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';
import { borders } from '@/ui/theme/borders';

type CoachMarkProps = {
  emoji: string;
  text: string;
};

export function CoachMark({ emoji, text }: CoachMarkProps) {
  return (
    <Animated.View entering={FadeIn.duration(400)} style={styles.container}>
      <View style={styles.content}>
        <Typography variant="body" style={styles.emoji}>
          {emoji}
        </Typography>
        <Typography variant="caption" color={colors.textSecondary} style={styles.text}>
          {text}
        </Typography>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceHighlight,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    borderRadius: borders.radius.md,
    padding: spacing.sm,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  emoji: {
    fontSize: 20,
  },
  text: {
    flex: 1,
  },
});
