import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography, Spacer } from '@/ui/components';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';
import { borders } from '@/ui/theme/borders';
import { shadows } from '@/ui/theme/shadows';

type PublicPlotFaceProps = {
  title: string;
  plot: string;
};

export function PublicPlotFace({ title, plot }: PublicPlotFaceProps) {
  return (
    <View style={styles.container}>
      <Typography variant="small" color={colors.accent} align="center">
        PUBLIC PLOT
      </Typography>
      <Spacer size="md" />
      <Typography variant="h2" align="center">
        {title}
      </Typography>
      <Spacer size="lg" />
      <Typography variant="body" align="center" color={colors.textSecondary}>
        {plot}
      </Typography>
      <Spacer size="xl" />
      <Typography variant="caption" color={colors.textMuted} align="center">
        Tap to reveal solution
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borders.radius.lg,
    padding: spacing.lg,
    justifyContent: 'center',
    ...shadows.lg,
  },
});
