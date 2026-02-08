import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = 'onboarding_complete';
const TUTORIAL_STEP_KEY = 'tutorial_current_step';
const TUTORIAL_SELECTIONS_KEY = 'tutorial_selections';

export function useOnboardingComplete() {
  const [isComplete, setIsComplete] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_KEY).then((value) => {
      setIsComplete(value === 'true');
    });
  }, []);

  const markComplete = useCallback(async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setIsComplete(true);
  }, []);

  const reset = useCallback(async () => {
    await AsyncStorage.multiRemove([
      ONBOARDING_KEY,
      TUTORIAL_STEP_KEY,
      TUTORIAL_SELECTIONS_KEY,
    ]);
    setIsComplete(false);
  }, []);

  return { isComplete, markComplete, reset };
}
