import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Typography, DifficultyBadge } from '@/ui/components';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';
import { Story } from './types';

type StoryCardProps = {
  story: Story;
  onPress: (story: Story) => void;
};

export function StoryCard({ story, onPress }: StoryCardProps) {
  return (
    <Card style={styles.card} onPress={() => onPress(story)}>
      <DifficultyBadge difficulty={story.difficulty} />
      <Typography variant="bodyBold" style={styles.title} numberOfLines={2}>
        {story.title}
      </Typography>
      <Typography
        variant="caption"
        color={colors.textSecondary}
        numberOfLines={2}
      >
        {story.publicPlot}
      </Typography>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    gap: spacing.sm,
  },
  title: {
    marginTop: spacing.xs,
  },
});
