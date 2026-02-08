import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeScreen, Typography, Spacer, Button } from '@/ui/components';
import { gameRoute, ROUTES } from '@/technical/navigation';
import { useOnboardingComplete } from '@/domain/onboarding';
import { Story } from './types';
import { useStories } from './useStories';
import { StoryGrid } from './StoryGrid';

export function StorySelectionScreen() {
  const stories = useStories();
  const router = useRouter();
  const { reset } = useOnboardingComplete();

  const handleStoryPress = (story: Story) => {
    router.push(gameRoute(story.id) as any);
  };

  const handleReplayTutorial = async () => {
    await reset();
    router.replace(ROUTES.ONBOARDING as any);
  };

  return (
    <SafeScreen>
      <View style={styles.header}>
        <View>
          <Typography variant="h2">Choose a Story</Typography>
          <Spacer size="sm" />
          <Typography variant="caption" color="#9999BB">
            Select an enigma for your group to solve
          </Typography>
        </View>
        <Button
          title="Replay tutorial"
          variant="ghost"
          onPress={handleReplayTutorial}
        />
      </View>
      <Spacer size="md" />
      <StoryGrid stories={stories} onStoryPress={handleStoryPress} />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
