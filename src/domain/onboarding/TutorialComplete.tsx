import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { ZoomIn, FadeInUp } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Typography, Spacer, Button, Card } from '@/ui/components';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';

type TutorialCompleteProps = {
  onFinish: () => void;
};

export function TutorialComplete({ onFinish }: TutorialCompleteProps) {
  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View entering={ZoomIn.duration(500)} style={styles.emojiContainer}>
        <Typography variant="h1" align="center" style={styles.emoji}>
          {'🎉'}
        </Typography>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(300).duration(500)}>
        <Typography variant="h2" align="center">
          You solved it!
        </Typography>
      </Animated.View>

      <Spacer size="lg" />

      <Animated.View entering={FadeInUp.delay(500).duration(500)}>
        <Card disabled>
          <Typography variant="bodyBold" color={colors.textPrimary}>
            Quick recap
          </Typography>
          <Spacer size="sm" />
          <Typography variant="caption" color={colors.textSecondary}>
            🎭 The Game Master reads the story and knows the solution
          </Typography>
          <Spacer size="xs" />
          <Typography variant="caption" color={colors.textSecondary}>
            ❓ Players ask yes/no questions to figure it out
          </Typography>
          <Spacer size="xs" />
          <Typography variant="caption" color={colors.textSecondary}>
            ✅ The GM can only answer Yes, No, or Irrelevant
          </Typography>
          <Spacer size="xs" />
          <Typography variant="caption" color={colors.textSecondary}>
            💡 Flip the card when you think you've got it!
          </Typography>
        </Card>
      </Animated.View>

      <Spacer size="md" />

      <Animated.View entering={FadeInUp.delay(600).duration(500)}>
        <Typography variant="body" align="center" color={colors.accent}>
          Now it's your turn — pick a story, become the Game Master, and let your friends ask YOU questions!
        </Typography>
      </Animated.View>

      <View style={styles.bottom}>
        <Animated.View entering={FadeInUp.delay(700).duration(500)} style={styles.fullWidth}>
          <Button title="Choose a story" onPress={onFinish} style={styles.button} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.xl,
  },
  emojiContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  emoji: {
    fontSize: 64,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: spacing.lg,
  },
  fullWidth: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
});
