import React, { createContext, memo, useContext, useState } from 'react';
import { View, Pressable, StyleSheet, Platform, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import type {
  FlipCardProps,
  FlipCardContextValue,
  FlipCardFrontProps,
  FlipCardBackProps,
  FlipCardTriggerProps,
} from './FlipCard.types';
import { FLIP_DURATION, FLIP_PERSPECTIVE } from './constants';

const FlipCardContext = createContext<FlipCardContextValue | null>(null);

const useFlipCard = (): FlipCardContextValue => {
  const context = useContext(FlipCardContext);
  if (!context) {
    throw new Error(
      'FlipCard compound components must be used within FlipCard',
    );
  }
  return context;
};

export const FlipCard: React.FC<FlipCardProps> & {
  Front: React.FC<FlipCardFrontProps>;
  Back: React.FC<FlipCardBackProps>;
  Trigger: React.FC<FlipCardTriggerProps>;
} = ({
  children,
  isFlipped: controlledFlipped,
  onFlipRequest,
  onFlip,
  borderRadius = 24,
  containerStyle,
  animationDuration = FLIP_DURATION,
  enableHaptics = true,
  scaleOnPress = true,
}) => {
  const controlled = controlledFlipped !== undefined;
  const [internalFlipped, setInternalFlipped] = useState(false);
  const isFlipped = controlled ? controlledFlipped : internalFlipped;

  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    rotation.value = withTiming(isFlipped ? 180 : 0, {
      duration: animationDuration,
      easing: Easing.inOut(Easing.cubic),
    });
  }, [isFlipped, animationDuration]);

  const flip = () => {
    if (enableHaptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    if (controlled) {
      onFlipRequest?.();
    } else {
      const next = !internalFlipped;
      setInternalFlipped(next);
      onFlip?.(next);
    }
  };

  return (
    <FlipCardContext.Provider
      value={{
        isFlipped,
        flip,
        borderRadius,
        animationDuration,
        rotation,
        scale,
        scaleEnabled: scaleOnPress,
      }}
    >
      <View style={[styles.container, containerStyle]}>{children}</View>
    </FlipCardContext.Provider>
  );
};

const Front = memo<FlipCardFrontProps>(({ children, style }) => {
  const { rotation, scale, borderRadius } = useFlipCard();

  const frontAnimatedStyle = useAnimatedStyle<
    Pick<ViewStyle, 'transform' | 'opacity'>
  >(() => {
    const rotateY = interpolate(
      rotation.value,
      [0, 180],
      [0, 180],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      rotation.value,
      [0, 90, 90.01, 180],
      [1, 1, 0, 0],
      Extrapolation.CLAMP,
    );
    return {
      transform: [
        { perspective: FLIP_PERSPECTIVE },
        { rotateY: `${rotateY}deg` },
        { scale: scale.value },
      ],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[styles.card, { borderRadius }, frontAnimatedStyle, style]}
    >
      {children}
    </Animated.View>
  );
});

const Back = memo<FlipCardBackProps>(({ children, style }) => {
  const { rotation, scale, borderRadius } = useFlipCard();

  const backAnimatedStyle = useAnimatedStyle<
    Pick<ViewStyle, 'transform' | 'opacity'>
  >(() => {
    const rotateY = interpolate(
      rotation.value,
      [0, 180],
      [180, 360],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      rotation.value,
      [0, 89.99, 90, 180],
      [0, 0, 1, 1],
      Extrapolation.CLAMP,
    );
    return {
      transform: [
        { perspective: FLIP_PERSPECTIVE },
        { rotateY: `${rotateY}deg` },
        { scale: scale.value },
      ],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[styles.card, { borderRadius }, backAnimatedStyle, style]}
    >
      {children}
    </Animated.View>
  );
});

const Trigger = memo<FlipCardTriggerProps>(
  ({ children, asChild, ...props }) => {
    const { flip, scale, scaleEnabled } = useFlipCard();

    const onPressIn = () => {
      if (!scaleEnabled) return;
      scale.value = withTiming(0.95, { duration: 100 });
    };

    const onPressOut = () => {
      if (!scaleEnabled) return;
      scale.value = withTiming(1, { duration: 200 });
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        onPress: flip,
        onPressIn,
        onPressOut,
        ...props,
      });
    }

    return (
      <Pressable
        onPress={flip}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={StyleSheet.absoluteFill}
        {...props}
      >
        {children}
      </Pressable>
    );
  },
);

FlipCard.Front = Front;
FlipCard.Back = Back;
FlipCard.Trigger = Trigger;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
        }
      : { elevation: 12 }),
  },
});
