import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { GameScreen } from '@/domain/game';
import { useStory } from '@/domain/stories';
import { Typography, SafeScreen } from '@/ui/components';

export default function GameRoute() {
  const { storyId } = useLocalSearchParams<{ storyId: string }>();
  const story = useStory(storyId);

  if (!story) {
    return (
      <SafeScreen>
        <View style={styles.center}>
          <Typography variant="h3" align="center">
            Story not found
          </Typography>
        </View>
      </SafeScreen>
    );
  }

  return (
    <GameScreen
      title={story.title}
      difficulty={story.difficulty}
      publicPlot={story.publicPlot}
      solution={story.solution}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
