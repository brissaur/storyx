import React, { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors } from '@/ui/theme/colors';
import { borders } from '@/ui/theme/borders';

type ProgressBarProps = {
  progress: number; // 0 to 1
};

export function ProgressBar({ progress }: ProgressBarProps) {
  const [trackWidth, setTrackWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  const fillStyle = useAnimatedStyle(() => ({
    width: withTiming(trackWidth * Math.min(Math.max(progress, 0), 1), {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    }),
  }));

  return (
    <View style={styles.track} onLayout={onLayout}>
      <Animated.View style={[styles.fill, fillStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 4,
    backgroundColor: colors.surfaceLight,
    borderRadius: borders.radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: borders.radius.full,
  },
});
