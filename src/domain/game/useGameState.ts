import { useState, useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { GameState } from './types';

export function useGameState() {
  const [state, setState] = useState<GameState>({
    isFlipped: false,
    hasSpoilerBeenConfirmed: false,
    showSpoilerModal: false,
  });

  const handleCardPress = useCallback(() => {
    setState((prev) => {
      if (prev.isFlipped) {
        // Already flipped — flip back freely
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        return { ...prev, isFlipped: false };
      }

      if (!prev.hasSpoilerBeenConfirmed) {
        // First time trying to flip — show spoiler modal
        return { ...prev, showSpoilerModal: true };
      }

      // Already confirmed — flip freely
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      return { ...prev, isFlipped: true };
    });
  }, []);

  const confirmSpoiler = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setState((prev) => ({
      ...prev,
      showSpoilerModal: false,
      hasSpoilerBeenConfirmed: true,
      isFlipped: true,
    }));
  }, []);

  const dismissSpoiler = useCallback(() => {
    setState((prev) => ({ ...prev, showSpoilerModal: false }));
  }, []);

  return {
    ...state,
    handleCardPress,
    confirmSpoiler,
    dismissSpoiler,
  };
}
