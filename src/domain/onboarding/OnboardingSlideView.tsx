import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography, Spacer } from '@/ui/components';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';
import { OnboardingSlide } from './types';

type OnboardingSlideViewProps = {
  slide: OnboardingSlide;
};

export function OnboardingSlideView({ slide }: OnboardingSlideViewProps) {
  return (
    <View style={styles.container}>
      <Typography variant="h1" align="center" style={styles.emoji}>
        {slide.emoji}
      </Typography>
      <Spacer size="lg" />
      <Typography variant="h2" align="center">
        {slide.title}
      </Typography>
      <Spacer size="md" />
      <Typography variant="body" align="center" color={colors.textSecondary}>
        {slide.description}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  emoji: {
    fontSize: 64,
  },
});
