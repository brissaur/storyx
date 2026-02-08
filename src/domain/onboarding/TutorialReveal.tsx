import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Typography, Spacer, GmBubble } from '@/ui/components';
import { FlipCard } from '@/technical/animations';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';
import { tutorialStory } from './tutorialData';

type TutorialRevealProps = {
  onComplete: () => void;
};

export function TutorialReveal({ onComplete }: TutorialRevealProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleFlip = useCallback(
    (flipped: boolean) => {
      if (flipped) {
        timerRef.current = setTimeout(() => {
          if (mountedRef.current) onComplete();
        }, 1500);
      }
    },
    [onComplete],
  );

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp.delay(100).duration(400)}>
        <GmBubble text="I think you've got it! Tap the card to reveal the solution." />
      </Animated.View>

      <Spacer size="lg" />

      <View style={styles.cardWrapper}>
        <FlipCard onFlip={handleFlip}>
          <FlipCard.Front style={styles.cardFace}>
            <View style={styles.cardContent}>
              <Typography variant="h1" align="center" style={styles.emoji}>
                {'❓'}
              </Typography>
              <Spacer size="md" />
              <Typography variant="h3" align="center">
                {tutorialStory.title}
              </Typography>
              <Spacer size="sm" />
              <Typography variant="body" align="center" color={colors.textSecondary}>
                {tutorialStory.publicPlot}
              </Typography>
            </View>
          </FlipCard.Front>
          <FlipCard.Back style={styles.cardFace}>
            <View style={styles.cardContent}>
              <Typography variant="h1" align="center" style={styles.emoji}>
                {'💡'}
              </Typography>
              <Spacer size="md" />
              <Typography variant="h3" align="center">
                Solution
              </Typography>
              <Spacer size="sm" />
              <Typography variant="body" align="center" color={colors.textSecondary}>
                {tutorialStory.solution}
              </Typography>
            </View>
          </FlipCard.Back>
          <FlipCard.Trigger />
        </FlipCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.lg,
  },
  cardWrapper: {
    flex: 1,
    marginBottom: spacing.xl,
  },
  cardFace: {
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  cardContent: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 48,
  },
});
