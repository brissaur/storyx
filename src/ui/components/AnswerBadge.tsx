import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Typography } from './Typography';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';
import { borders } from '@/ui/theme/borders';

type AnswerType = 'yes' | 'no' | 'irrelevant';

type AnswerBadgeProps = {
  answer: AnswerType;
};

const answerConfig: Record<AnswerType, { label: string; color: string; bg: string }> = {
  yes: { label: 'Yes', color: colors.success, bg: 'rgba(74, 222, 128, 0.15)' },
  no: { label: 'No', color: colors.error, bg: 'rgba(248, 113, 113, 0.15)' },
  irrelevant: {
    label: 'Irrelevant',
    color: colors.textMuted,
    bg: 'rgba(102, 102, 136, 0.15)',
  },
};

export function AnswerBadge({ answer }: AnswerBadgeProps) {
  const config = answerConfig[answer];

  return (
    <Animated.View
      entering={FadeInDown.springify().damping(15)}
      style={[
        styles.badge,
        { backgroundColor: config.bg, borderColor: config.color } as ViewStyle,
      ]}
    >
      <Typography variant="bodyBold" color={config.color}>
        {config.label}
      </Typography>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borders.radius.full,
    borderWidth: borders.width.thin,
    alignSelf: 'center',
  },
});
