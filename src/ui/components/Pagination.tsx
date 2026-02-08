import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useDerivedValue,
  withTiming,
  Easing,
  SharedValue,
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';

const DOT_SIZE = 8;
const DOT_CONTAINER = 20;
const BORDER_RADIUS = 100;

type PaginationProps = {
  activeIndex: number;
  totalItems: number;
};

export function Pagination({ activeIndex, totalItems }: PaginationProps) {
  const animation = useDerivedValue(() => {
    return withTiming(activeIndex, {
      easing: Easing.inOut(Easing.cubic),
      duration: 300,
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Indicator animation={animation} />
        {[...Array(totalItems).keys()].map((index) => (
          <Dot key={index} index={index} animation={animation} />
        ))}
      </View>
    </View>
  );
}

function Indicator({ animation }: { animation: SharedValue<number> }) {
  const indicatorStyle = useAnimatedStyle(() => ({
    width: DOT_CONTAINER + DOT_CONTAINER * animation.value,
  }));

  return (
    <Animated.View style={[styles.indicator, indicatorStyle]} />
  );
}

function Dot({
  index,
  animation,
}: {
  index: number;
  animation: SharedValue<number>;
}) {
  const dotColorStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animation.value,
      [index - 1, index, index + 1],
      [colors.surfaceLight, colors.textPrimary, colors.surfaceLight],
    ),
  }));

  return (
    <View style={styles.dotContainer}>
      <Animated.View
        style={[
          styles.dot,
          dotColorStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  indicator: {
    height: DOT_CONTAINER,
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: BORDER_RADIUS,
    backgroundColor: colors.accent,
  },
  dotContainer: {
    width: DOT_CONTAINER,
    height: DOT_CONTAINER,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: BORDER_RADIUS,
  },
});
