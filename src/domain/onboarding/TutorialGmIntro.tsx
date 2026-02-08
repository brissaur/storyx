import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Typography, Spacer, Button, Card, GmBubble } from '@/ui/components';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';
import { tutorialStory } from './tutorialData';

type TutorialGmIntroProps = {
  onContinue: () => void;
};

export function TutorialGmIntro({ onContinue }: TutorialGmIntroProps) {
  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp.delay(100).duration(500)} style={styles.avatarSection}>
        <Typography variant="h1" align="center" style={styles.avatar}>
          {'🎭'}
        </Typography>
        <Spacer size="sm" />
        <Typography variant="h3" align="center">
          I'm the Game Master
        </Typography>
      </Animated.View>

      <Spacer size="md" />

      <Animated.View entering={FadeInUp.delay(300).duration(500)}>
        <GmBubble text="I know the solution to a mystery. I'll read you the story, and your job is to figure out what really happened by asking me yes/no questions." />
      </Animated.View>

      <Spacer size="md" />

      <Animated.View entering={FadeInUp.delay(500).duration(500)}>
        <Card disabled>
          <Typography variant="caption" color={colors.textMuted}>
            The story
          </Typography>
          <Spacer size="xs" />
          <Typography variant="h3">{tutorialStory.title}</Typography>
          <Spacer size="sm" />
          <Typography variant="body" color={colors.textSecondary}>
            {tutorialStory.publicPlot}
          </Typography>
        </Card>
      </Animated.View>

      <View style={styles.bottom}>
        <Animated.View entering={FadeInUp.delay(700).duration(500)} style={styles.fullWidth}>
          <Button title="Got it" onPress={onContinue} style={styles.button} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.lg,
  },
  avatarSection: {
    alignItems: 'center',
  },
  avatar: {
    fontSize: 48,
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
