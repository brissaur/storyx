import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography, DifficultyBadge, Difficulty } from '@/ui/components';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';

type GameHeaderProps = {
  title: string;
  difficulty: Difficulty;
};

export function GameHeader({ title, difficulty }: GameHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Typography variant="bodyBold" color={colors.accent}>
          {'< Back'}
        </Typography>
      </Pressable>
      <View style={styles.titleContainer}>
        <Typography variant="h3" numberOfLines={1} style={styles.title}>
          {title}
        </Typography>
        <DifficultyBadge difficulty={difficulty} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    flexShrink: 1,
  },
});
