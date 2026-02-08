import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeScreen, Typography, Spacer } from '@/ui/components';
import { FlipCard } from '@/technical/animations';
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

      <FlipCard
        isFlipped={isFlipped}
        onFlipRequest={handleCardPress}
        enableHaptics={false}
        containerStyle={styles.cardContainer}
      >
        <FlipCard.Front>
          <PublicPlotFace title={title} plot={publicPlot} />
        </FlipCard.Front>
        <FlipCard.Back>
          <SolutionFace solution={solution} />
        </FlipCard.Back>
        <FlipCard.Trigger />
      </FlipCard>

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
