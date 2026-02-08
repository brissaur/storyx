import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography, Spacer } from '@/ui/components';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';
import { borders } from '@/ui/theme/borders';
import { shadows } from '@/ui/theme/shadows';

type SolutionFaceProps = {
  solution: string;
};

export function SolutionFace({ solution }: SolutionFaceProps) {
  return (
    <View style={styles.container}>
      <Typography variant="small" color={colors.warning} align="center">
        SOLUTION
      </Typography>
      <Spacer size="lg" />
      <Typography variant="body" align="center">
        {solution}
      </Typography>
      <Spacer size="xl" />
      <Typography variant="caption" color={colors.textMuted} align="center">
        Tap to flip back
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceLight,
    borderRadius: borders.radius.lg,
    padding: spacing.lg,
    justifyContent: 'center',
    ...shadows.lg,
  },
});
