import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = 'onboarding_complete';

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

  return { isComplete, markComplete };
}
