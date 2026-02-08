import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { spacing } from '@/ui/theme/spacing';
import { Story } from './types';
import { StoryCard } from './StoryCard';

type StoryGridProps = {
  stories: Story[];
  onStoryPress: (story: Story) => void;
};

export function StoryGrid({ stories, onStoryPress }: StoryGridProps) {
  return (
    <FlatList
      data={stories}
      numColumns={2}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <StoryCard story={item} onPress={onStoryPress} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
  },
  row: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  cardWrapper: {
    flex: 1,
  },
});
