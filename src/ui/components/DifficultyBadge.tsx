import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography } from './Typography';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';
import { borders } from '@/ui/theme/borders';

export type Difficulty = 'easy' | 'medium' | 'hard';

const difficultyColors: Record<Difficulty, string> = {
  easy: colors.easy,
  medium: colors.medium,
  hard: colors.hard,
};

const difficultyLabels: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

type DifficultyBadgeProps = {
  difficulty: Difficulty;
};

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const color = difficultyColors[difficulty];

  return (
    <View style={[styles.badge, { backgroundColor: color + '20' }]}>
      <Typography variant="small" color={color}>
        {difficultyLabels[difficulty]}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borders.radius.full,
    alignSelf: 'flex-start',
  },
});
