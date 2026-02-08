import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeScreen, Button, Spacer } from '@/ui/components';
import { ROUTES } from '@/technical/navigation';
import { spacing } from '@/ui/theme/spacing';
import { onboardingSlides } from './data';
import { OnboardingSlideView } from './OnboardingSlideView';
import { OnboardingPagination } from './OnboardingPagination';
import { useOnboardingComplete } from './useOnboardingComplete';

export function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { markComplete } = useOnboardingComplete();
  const router = useRouter();

  const isLast = currentIndex === onboardingSlides.length - 1;

  const handleNext = async () => {
    if (isLast) {
      await markComplete();
      router.replace(ROUTES.STORIES as any);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSkip = async () => {
    await markComplete();
    router.replace(ROUTES.STORIES as any);
  };

  return (
    <SafeScreen>
      <View style={styles.skipContainer}>
        {!isLast && (
          <Button title="Skip" variant="ghost" onPress={handleSkip} />
        )}
      </View>

      <OnboardingSlideView slide={onboardingSlides[currentIndex]} />

      <View style={styles.footer}>
        <OnboardingPagination
          total={onboardingSlides.length}
          current={currentIndex}
        />
        <Spacer size="lg" />
        <Button
          title={isLast ? "Let's Play" : 'Next'}
          onPress={handleNext}
          style={styles.button}
        />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  skipContainer: {
    alignItems: 'flex-end',
    minHeight: 48,
  },
  footer: {
    paddingBottom: spacing.lg,
  },
  button: {
    width: '100%',
  },
});
