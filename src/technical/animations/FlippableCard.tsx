import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { FLIP_DURATION, FLIP_PERSPECTIVE } from './constants';

type FlippableCardProps = {
  front: React.ReactNode;
  back: React.ReactNode;
  isFlipped: boolean;
  style?: ViewStyle;
};

export function FlippableCard({
  front,
  back,
  isFlipped,
  style,
}: FlippableCardProps) {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withTiming(isFlipped ? 180 : 0, {
      duration: FLIP_DURATION,
      easing: Easing.inOut(Easing.ease),
    });
  }, [isFlipped]);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 180], [0, 180]);
    return {
      transform: [
        { perspective: FLIP_PERSPECTIVE },
        { rotateY: `${rotateY}deg` },
      ],
      backfaceVisibility: 'hidden',
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 180], [180, 360]);
    return {
      transform: [
        { perspective: FLIP_PERSPECTIVE },
        { rotateY: `${rotateY}deg` },
      ],
      backfaceVisibility: 'hidden',
    };
  });

  return (
    <Animated.View style={[styles.container, style]}>
      <Animated.View style={[styles.face, frontAnimatedStyle]}>
        {front}
      </Animated.View>
      <Animated.View style={[styles.face, styles.backFace, backAnimatedStyle]}>
        {back}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  face: {
    ...StyleSheet.absoluteFillObject,
  },
  backFace: {
    // Positioned absolutely on top of front, hidden by backfaceVisibility
  },
});
