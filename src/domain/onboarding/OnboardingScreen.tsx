import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeScreen, Button, ProgressBar } from '@/ui/components';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';
import { useTutorialState } from './useTutorialState';
import { tutorialStory, getStepIndex, TOTAL_STEPS } from './tutorialData';
import { TutorialWelcome } from './TutorialWelcome';
import { TutorialGmIntro } from './TutorialGmIntro';
import { TutorialQuestion } from './TutorialQuestion';
import { TutorialAnswer } from './TutorialAnswer';
import { TutorialReveal } from './TutorialReveal';
import { TutorialComplete } from './TutorialComplete';

export function OnboardingScreen() {
  const {
    currentStep,
    selectedQuestions,
    isLoading,
    advance,
    goBack,
    selectQuestion,
    finish,
    skip,
  } = useTutorialState();

  if (isLoading) {
    return (
      <SafeScreen style={styles.loading}>
        <ActivityIndicator color={colors.accent} size="large" />
      </SafeScreen>
    );
  }

  const progress = (getStepIndex(currentStep) + 1) / TOTAL_STEPS;

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <TutorialWelcome onStart={advance} />;
      case 'gm_intro':
        return <TutorialGmIntro onContinue={advance} />;
      case 'question_1':
        return (
          <TutorialQuestion
            round={tutorialStory.rounds[0]}
            roundIndex={0}
            onSelectQuestion={(q) => selectQuestion('round_1', q)}
          />
        );
      case 'answer_1':
        return (
          <TutorialAnswer
            question={selectedQuestions.round_1!}
            onContinue={advance}
          />
        );
      case 'question_2':
        return (
          <TutorialQuestion
            round={tutorialStory.rounds[1]}
            roundIndex={1}
            onSelectQuestion={(q) => selectQuestion('round_2', q)}
          />
        );
      case 'answer_2':
        return (
          <TutorialAnswer
            question={selectedQuestions.round_2!}
            onContinue={advance}
          />
        );
      case 'reveal':
        return <TutorialReveal onComplete={advance} />;
      case 'complete':
        return <TutorialComplete onFinish={finish} />;
    }
  };

  return (
    <SafeScreen>
      <View style={styles.header}>
        {currentStep !== 'welcome' ? (
          <Button title="Back" variant="ghost" onPress={goBack} />
        ) : (
          <View style={styles.backPlaceholder} />
        )}
        <View style={styles.progressContainer}>
          <ProgressBar progress={progress} />
        </View>
        {currentStep !== 'complete' && (
          <Button title="Skip" variant="ghost" onPress={skip} />
        )}
      </View>
      {renderStep()}
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  backPlaceholder: {
    width: 50,
  },
  progressContainer: {
    flex: 1,
  },
});
