import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Typography, Card, Spacer, GmBubble } from '@/ui/components';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';
import { tutorialStory } from './tutorialData';
import type { QuestionOption, TutorialRound } from './types';

type TutorialQuestionProps = {
  round: TutorialRound;
  roundIndex: number; // 0 or 1
  onSelectQuestion: (question: QuestionOption) => void;
};

export function TutorialQuestion({
  round,
  roundIndex,
  onSelectQuestion,
}: TutorialQuestionProps) {
  const isFirstRound = roundIndex === 0;

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp.duration(400)}>
        <Card disabled style={styles.storyReminder}>
          <Typography variant="caption" color={colors.textMuted}>
            {tutorialStory.title}
          </Typography>
          <Typography variant="caption" color={colors.textSecondary}>
            {tutorialStory.publicPlot}
          </Typography>
        </Card>
      </Animated.View>

      <Spacer size="md" />

      <Animated.View entering={FadeInUp.delay(100).duration(400)}>
        <GmBubble
          text={
            isFirstRound
              ? "Now ask me yes/no questions to solve the mystery! Tap a question below."
              : "You're getting close! Keep going."
          }
        />
      </Animated.View>

      <Spacer size="md" />

      {round.questions.map((question, index) => (
        <Animated.View
          key={question.id}
          entering={FadeInUp.delay(200 + index * 100).duration(400)}
        >
          <Card onPress={() => onSelectQuestion(question)} style={styles.questionCard}>
            <Typography variant="body">{question.text}</Typography>
          </Card>
          {index < round.questions.length - 1 && <Spacer size="sm" />}
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.lg,
  },
  storyReminder: {
    opacity: 0.8,
  },
  questionCard: {
    borderWidth: 1,
    borderColor: colors.surfaceHighlight,
  },
});
