import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';

type OnboardingPaginationProps = {
  total: number;
  current: number;
};

export function OnboardingPagination({
  total,
  current,
}: OnboardingPaginationProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[styles.dot, i === current ? styles.active : styles.inactive]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  active: {
    backgroundColor: colors.accent,
    width: 24,
  },
  inactive: {
    backgroundColor: colors.surfaceLight,
  },
});
