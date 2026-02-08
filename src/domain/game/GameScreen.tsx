import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { SafeScreen, Typography, Spacer } from '@/ui/components';
import { FlippableCard } from '@/technical/animations';
import { spacing } from '@/ui/theme/spacing';
import { GameHeader } from './GameHeader';
import { PublicPlotFace } from './PublicPlotFace';
import { SolutionFace } from './SolutionFace';
import { SpoilerModal } from './SpoilerModal';
import { useGameState } from './useGameState';
import type { Difficulty } from '@/ui/components';

type GameScreenProps = {
  title: string;
  difficulty: Difficulty;
  publicPlot: string;
  solution: string;
};

export function GameScreen({
  title,
  difficulty,
  publicPlot,
  solution,
}: GameScreenProps) {
  const {
    isFlipped,
    showSpoilerModal,
    handleCardPress,
    confirmSpoiler,
    dismissSpoiler,
  } = useGameState();

  return (
    <SafeScreen>
      <GameHeader title={title} difficulty={difficulty} />
      <Spacer size="md" />

      <Pressable style={styles.cardContainer} onPress={handleCardPress}>
        <FlippableCard
          isFlipped={isFlipped}
          front={<PublicPlotFace title={title} plot={publicPlot} />}
          back={<SolutionFace solution={solution} />}
        />
      </Pressable>

      <SpoilerModal
        visible={showSpoilerModal}
        onConfirm={confirmSpoiler}
        onCancel={dismissSpoiler}
      />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginBottom: spacing.md,
  },
});
