import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Typography, Spacer, Button, AnswerBadge } from '@/ui/components';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';
import { borders } from '@/ui/theme/borders';
import type { QuestionOption } from './types';

type TutorialAnswerProps = {
  question: QuestionOption;
  onContinue: () => void;
};

export function TutorialAnswer({
  question,
  onContinue,
}: TutorialAnswerProps) {
  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp.duration(400)} style={styles.questionBubble}>
        <Typography variant="small" color={colors.textMuted}>
          You asked:
        </Typography>
        <Typography variant="body" color={colors.textSecondary}>
          {question.text}
        </Typography>
      </Animated.View>

      <Spacer size="md" />

      <Animated.View entering={FadeInUp.delay(200).duration(400)} style={styles.gmSection}>
        <Typography variant="small" color={colors.accent}>
          🎭 Game Master answers:
        </Typography>
        <Spacer size="sm" />
        <AnswerBadge answer={question.answer} />
      </Animated.View>

      <Spacer size="md" />

      <Animated.View entering={FadeInUp.delay(400).duration(400)}>
        <Typography variant="body" align="center" color={colors.textSecondary}>
          {question.explanation}
        </Typography>
      </Animated.View>

      <View style={styles.bottom}>
        <Button title="Continue" onPress={onContinue} style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.xl,
  },
  questionBubble: {
    backgroundColor: colors.surfaceLight,
    padding: spacing.md,
    borderRadius: borders.radius.lg,
    alignSelf: 'center',
  },
  gmSection: {
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: spacing.lg,
  },
  button: {
    width: '100%',
  },
});
