import { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ROUTES } from '@/technical/navigation';
import { useOnboardingComplete } from './useOnboardingComplete';
import { getNextStep, getPrevStep } from './tutorialData';
import type { TutorialStepId, QuestionOption } from './types';

const STEP_KEY = 'tutorial_current_step';
const SELECTIONS_KEY = 'tutorial_selections';

export function useTutorialState() {
  const [currentStep, setCurrentStep] = useState<TutorialStepId>('welcome');
  const [selectedQuestions, setSelectedQuestions] = useState<
    Record<string, QuestionOption>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const { markComplete } = useOnboardingComplete();
  const router = useRouter();
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // Restore persisted state
  useEffect(() => {
    (async () => {
      try {
        const [savedStep, savedSelections] = await Promise.all([
          AsyncStorage.getItem(STEP_KEY),
          AsyncStorage.getItem(SELECTIONS_KEY),
        ]);
        if (!mounted.current) return;
        if (savedStep) setCurrentStep(savedStep as TutorialStepId);
        if (savedSelections) setSelectedQuestions(JSON.parse(savedSelections));
      } finally {
        if (mounted.current) setIsLoading(false);
      }
    })();
  }, []);

  // Persist on change
  useEffect(() => {
    if (isLoading) return;
    AsyncStorage.setItem(STEP_KEY, currentStep);
  }, [currentStep, isLoading]);

  useEffect(() => {
    if (isLoading) return;
    AsyncStorage.setItem(SELECTIONS_KEY, JSON.stringify(selectedQuestions));
  }, [selectedQuestions, isLoading]);

  const advance = useCallback(() => {
    const next = getNextStep(currentStep);
    if (next) setCurrentStep(next);
  }, [currentStep]);

  const goBack = useCallback(() => {
    const prev = getPrevStep(currentStep);
    if (prev) setCurrentStep(prev);
  }, [currentStep]);

  const selectQuestion = useCallback(
    (roundKey: string, question: QuestionOption) => {
      setSelectedQuestions((prev) => ({ ...prev, [roundKey]: question }));
      // Auto-advance to the answer step
      const next = getNextStep(currentStep);
      if (next) setCurrentStep(next);
    },
    [currentStep],
  );

  const finish = useCallback(async () => {
    await markComplete();
    await Promise.all([
      AsyncStorage.removeItem(STEP_KEY),
      AsyncStorage.removeItem(SELECTIONS_KEY),
    ]);
    router.replace(ROUTES.STORIES as any);
  }, [markComplete, router]);

  const skip = useCallback(async () => {
    await finish();
  }, [finish]);

  return {
    currentStep,
    selectedQuestions,
    isLoading,
    advance,
    goBack,
    selectQuestion,
    finish,
    skip,
  };
}
