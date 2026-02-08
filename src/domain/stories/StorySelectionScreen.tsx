import React from 'react';
import { useRouter } from 'expo-router';
import { SafeScreen, Typography, Spacer } from '@/ui/components';
import { gameRoute } from '@/technical/navigation';
import { Story } from './types';
import { useStories } from './useStories';
import { StoryGrid } from './StoryGrid';

export function StorySelectionScreen() {
  const stories = useStories();
  const router = useRouter();

  const handleStoryPress = (story: Story) => {
    router.push(gameRoute(story.id) as any);
  };

  return (
    <SafeScreen>
      <Typography variant="h2">Choose a Story</Typography>
      <Spacer size="sm" />
      <Typography variant="caption" color="#9999BB">
        Select an enigma for your group to solve
      </Typography>
      <Spacer size="md" />
      <StoryGrid stories={stories} onStoryPress={handleStoryPress} />
    </SafeScreen>
  );
}
